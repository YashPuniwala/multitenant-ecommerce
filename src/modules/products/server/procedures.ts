import z from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import { CustomCategory } from "@/app/(app)/(home)/types";
import { Category, Media, Tenant } from "@/payload-types";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/constants";

function mapSort(input?: string | null): Sort {
  switch (input) {
    case "price_asc":
      return "price";
    case "price_desc":
      return "-price";

    case "curated":
      return "-createdAt";

    case "trending":
      return "price";

    case "hot_and_new":
      return "-createdAt";

    default:
      return "-createdAt";
  }
}

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.id,
        depth: 2,
      });

      return {
        ...product,
        image: product.image as Media | null,
        cover: product.cover as Media | null,
        tenant: product.tenant as Tenant & {image: Media | null}
      };
    }),
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      const sort: Sort = mapSort(input.sort);

      // price filters
      if (input.minPrice || input.maxPrice) {
        where.price = {};
        if (input.minPrice) {
          where.price.greater_than_equal = Number(input.minPrice);
        }
        if (input.maxPrice) {
          where.price.less_than_equal = Number(input.maxPrice);
        }
      }

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }

      // category filters
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          depth: 1,
          limit: 1,
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        const formattedData: CustomCategory[] = categoriesData.docs.map(
          (doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
              ...(doc as Category),
              subcategories: undefined,
            })),
          })
        );

        const subcategoriesSlugs: string[] = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );

          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }

      // tags filter
      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = { in: input.tags };
      }

      // ✅ Hot & New filter goes here
      if (input.sort === "hot_and_new") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        where.createdAt = {
          greater_than_equal: thirtyDaysAgo.toISOString(),
        };
      }

      // final query
      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});

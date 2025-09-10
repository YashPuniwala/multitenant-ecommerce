import { getPayload } from "payload";
import config from "@payload-config";
import { Where } from "payload";
import { CustomCategory } from "@/app/(app)/(home)/types";
import { Category } from "@/payload-types";

interface GetProductsParams {
  category?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
}

export const getProducts = async (params: GetProductsParams = {}) => {
  const payload = await getPayload({ config });
  const where: Where = {};

  if (params.minPrice) {
    where.price = {
      greater_than_equal: params.minPrice
    };
  }
  if (params.maxPrice) {
    where.price = {
      less_than_equal: params.maxPrice
    };
  }

  if (params.category) {
    const categoriesData = await payload.find({
      collection: "categories",
      depth: 1,
      limit: 1,
      pagination: false,
      where: {
        slug: {
          equals: params.category,
        },
      },
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

    const subcategoriesSlugs = [];
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

  const data = await payload.find({
    collection: "products",
    depth: 1,
    where,
  });

  return data;
};
"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useProductFilters } from "../../hooks/use-product-filters";
import ProductCard, { ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

const ProductList = ({ category, tenantSlug, narrowView }: Props) => {
  const [filters] = useProductFilters();
  const trpc = useTRPC();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          ...filters,
          category,
          tenantSlug,
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
        }
      )
    );

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border-2 border-dashed border-muted-foreground/30 flex items-center justify-center p-12 flex-col gap-4 bg-card w-full rounded-2xl">
        <InboxIcon className="size-12 text-muted-foreground" />
        <p className="text-lg font-semibold text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6",
          narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )}
      >
        {data?.pages.flatMap((page) =>
          page.docs.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant?.slug}
              tenantImageUrl={product.tenant?.image?.url}
              reviewRating={3}
              reviewCount={5.0}
              price={product.price}
            />
          ))
        )}
      </div>
      <div className="flex justify-center pt-12">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            variant="outline"
            size="lg"
            className="font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            {isFetchingNextPage ? "Loading..." : "Load more products"}
          </Button>
        )}
      </div>
    </>
  );
};

export default ProductList;

export const ProductListSkeleton = ({ narrowView }: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6",
        narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
      )}
    >
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

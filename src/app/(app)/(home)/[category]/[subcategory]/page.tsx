import ProductList, { ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<{
    minPrice?: string;
    maxPrice?: string;
  }>;
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const {subcategory} = await params;
  const { minPrice, maxPrice } = await searchParams;

  return (
    <div>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={subcategory} minPrice={minPrice} maxPrice={maxPrice} />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
import ProductFilters from "@/modules/products/ui/components/product-filters";
import ProductList, {
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    minPrice?: string;
    maxPrice?: string;
  }>;
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const { minPrice, maxPrice } = await searchParams;

  return (
    <div>
      <div className="px-4 lg:px-2 py-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>

          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} minPrice={minPrice} maxPrice={maxPrice} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
import React, { Suspense } from "react";
import ProductSort from "../components/product-sort";
import ProductFilters from "../components/product-filters";
import ProductList, { ProductListSkeleton } from "../components/product-list";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

const ProductListView = ({ category, tenantSlug, narrowView }: Props) => {
  return (
    <div className="px-4 lg:px-8 py-8 flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Curated for you
        </h1>
        <ProductSort />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-8">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>

        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
            <ProductList category={category} tenantSlug={tenantSlug} narrowView={narrowView} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;

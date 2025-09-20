"use client";

import React from "react";
import { useProductFilters } from "../../hooks/use-product-filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sortValues } from "../../search-params";

type SortType = typeof sortValues[number]; // union of all sort values

const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  const handleSortChange = (value: SortType) => {
    console.log(">>> ProductSort clicked:", value);
    setFilters({ ...filters, sort: value });
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button
        size="sm"
        className={cn(
          "rounded-full transition-all duration-200",
          filters.sort !== "curated" &&
            "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
        )}
        variant={filters.sort === "curated" ? "default" : "ghost"}
        onClick={() => handleSortChange("curated")}
      >
        Curated
      </Button>

      <Button
        size="sm"
        className={cn(
          "rounded-full transition-all duration-200",
          filters.sort !== "trending" &&
            "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
        )}
        variant={filters.sort === "trending" ? "default" : "ghost"}
        onClick={() => handleSortChange("trending")}
      >
        Trending
      </Button>

      <Button
        size="sm"
        className={cn(
          "rounded-full transition-all duration-200",
          filters.sort !== "hot_and_new" &&
            "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
        )}
        variant={filters.sort === "hot_and_new" ? "default" : "ghost"}
        onClick={() => handleSortChange("hot_and_new")}
      >
        Hot & New
      </Button>

      {/* Example extra sort buttons */}
      <Button
        size="sm"
        className={cn(
          "rounded-full transition-all duration-200",
          filters.sort !== "price_asc" &&
            "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
        )}
        variant={filters.sort === "price_asc" ? "default" : "ghost"}
        onClick={() => handleSortChange("price_asc")}
      >
        Price ↑
      </Button>

      <Button
        size="sm"
        className={cn(
          "rounded-full transition-all duration-200",
          filters.sort !== "price_desc" &&
            "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
        )}
        variant={filters.sort === "price_desc" ? "default" : "ghost"}
        onClick={() => handleSortChange("price_desc")}
      >
        Price ↓
      </Button>
    </div>
  );
};

export default ProductSort;

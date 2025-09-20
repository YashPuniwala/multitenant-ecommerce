"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import SubcategoryMenu from "./subcategoryMenu";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface CategoryDropdownProps {
  category: CategoriesGetManyOutput[1];
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => setIsOpen(false);

  // const toggleDropdown = () => {
  //   if(category.subcategories?.docs?.length) {
  //     setIsOpen(!isOpen)
  //   }
  // }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // onClick={toggleDropdown}
    >
      <div className="relative">
        <Button
          variant="outline"
          className={cn(
            "h-10 px-4 rounded-full border-2 transition-all duration-200 font-medium",
            isActive && !isNavigationHovered && "bg-primary text-primary-foreground border-primary shadow-lg",
            isOpen &&
              "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
          )}
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category?.subcategories.length > 0 && (
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-primary transition-opacity",
              isOpen ? "opacity-100" : "opacity-0"
            )}
            style={{ top: "120%", zIndex: 200 }}
          />
        )}
      </div>

      <SubcategoryMenu category={category} isOpen={isOpen} />
    </div>
  );
};

export default CategoryDropdown;

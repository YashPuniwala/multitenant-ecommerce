import { Category } from "@/payload-types";
import Link from "next/link";
import React from "react";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface SubcategoryMenuProps {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
}

const SubcategoryMenu = ({
  category,
  isOpen,
}: SubcategoryMenuProps) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="absolute z-50 mt-2"
      style={{ top: "100%", left: 0 }}
    >
      <div className="h-2 w-64" />
      <div
        className="w-64 text-foreground rounded-xl overflow-hidden border-0 shadow-xl backdrop-blur-md bg-card/95"
        style={{ backgroundColor }}
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              href={`/${category.slug}/${subcategory.slug}`}
              key={subcategory.slug}
              className="w-full text-left p-4 hover:bg-primary hover:text-primary-foreground flex justify-between items-center font-medium transition-all duration-200 first:rounded-t-xl last:rounded-b-xl"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryMenu;

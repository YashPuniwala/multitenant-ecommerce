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
      className="absolute z-100 mt-2"
      style={{ top: "100%", left: 0 }}
    >
      <div className="h-3 w-60" />
      <div
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
        style={{ backgroundColor }}
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              href={`/${category.slug}/${subcategory.slug}`}
              key={subcategory.slug}
              className="w-full text-left p-3 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
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

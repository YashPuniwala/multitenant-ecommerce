"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CustomCategory } from "@/app/(app)/(home)/types";
import { getCategories } from "@/actions/getCategories";

interface CategoriesSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CategoriesSidebar = ({
  open,
  onOpenChange,
}: CategoriesSidebarProps) => {
  const router = useRouter();
  const [data, setData] = useState<CustomCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setData(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || "white";

  if (loading) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="left" className="p-0 transition-none">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Categories</SheetTitle>
          </SheetHeader>
          <div className="p-4">Loading...</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="flex flex-col pb-2">
            {parentCategories && (
              <button
                onClick={handleBackClick}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              >
                <ChevronLeftIcon className="size-4 mr-2" />
                Back
              </button>
            )}
            {currentCategories?.map((category: CustomCategory) => (
              <button
                key={category.slug}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <ChevronRightIcon className="size-4" />
                  )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesSidebar;
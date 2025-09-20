"use client";

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import CategoriesSidebar from "./categoriesSidebar";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <div className="flex items-center gap-3 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
          className="pl-12 h-12 text-base shadow-lg"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        className="size-12 shrink-0 flex lg:hidden shadow-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>

      {session.data?.user && (
        <Button asChild variant="gradient" className="shadow-lg">
          <Link href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;

export const SearchFiltersLoading = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};

import React, { Suspense } from "react";
import { Navbar } from "../../../modules/home/ui/components/navbar";
import { Footer } from "../../../modules/home/ui/components/footer";
import SearchFilters, { SearchFiltersSkeleton } from "../../../modules/home/ui/components/search-filters";
import { getSession } from "@/actions/auth";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar user={session?.user} />
      <Suspense fallback={<SearchFiltersSkeleton />}>
        <SearchFilters />
      </Suspense>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
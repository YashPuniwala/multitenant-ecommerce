"use client";

import Link from "next/link";
import React from "react";
import { generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  slug: string;
}

const Navbar = ({ slug }: Props) => {
  return (
    <nav className="h-16 border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Button variant="outline" asChild className="shadow-lg">
          <Link href={generateTenantUrl(slug)}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

export const NavbarSkeleton = () => {
  return (
    <nav className="h-16 border-b bg-card/80 backdrop-blur-md">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        {/* <p className="text-xl">{data.name}</p> */}
      </div>
    </nav>
  );
};

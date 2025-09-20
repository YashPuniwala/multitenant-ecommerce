"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { generateTenantUrl } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="bg-white">
        <ShoppingCartIcon className="text-black" />
      </Button>
    ),
  }
);

interface Props {
  slug: string;
}

const Navbar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <nav className="h-16 border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link
          href={generateTenantUrl(slug)}
          className="flex items-center gap-3 group"
        >
          {data.image?.url && (
            <Image
              src={data.image?.url}
              width={40}
              height={40}
              className="rounded-full border-2 shrink-0 size-[40px] group-hover:scale-105 transition-transform"
              alt={slug}
            />
          )}
          <p className="text-xl font-semibold group-hover:text-primary transition-colors">{data.name}</p>
        </Link>

        <CheckoutButton tenantSlug={slug} />
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

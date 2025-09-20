"use client";

import dynamic from "next/dynamic";
import StarRatings from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

 const CartButton = dynamic(
  () =>
    import("../components/cart-button").then((mod) => mod.CartButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="flex-1 bg-pink-200">
        Loading...
      </Button>
    ),
  }
);

interface ProductViewProps {
  productId: string;
  tenantSlug: string;
}

const ProductView = ({ productId, tenantSlug }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );
  return (
    <div className="px-4 lg:px-12 py-8">
      <div className="rounded-3xl bg-card overflow-hidden shadow-2xl border-0">
        <div className="relative aspect-[3.9] overflow-hidden">
          <Image
            src={data.cover?.url || "/placeholder.png"}
            alt={data.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-8">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{data.name}</h1>
            </div>
            <div className="border-y border-border/50 flex">
              <div className="px-8 py-6 flex items-center justify-center border-r border-border/50">
                <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg">
                  <p className="text-xl font-bold">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>

              <div className="px-8 py-6 flex items-center justify-center lg:border-r border-border/50">
                <Link
                  href={generateTenantUrl(tenantSlug)}
                  className="flex items-center gap-3 group"
                >
                  {data.tenant.image?.url && (
                    <Image
                      src={data.tenant.image.url}
                      alt={data.tenant.name}
                      width={24}
                      height={24}
                      className="rounded-full border-2 shrink-0 size-[24px] group-hover:scale-105 transition-transform"
                    />
                  )}
                  <p className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {data.tenant.name}
                  </p>
                </Link>
              </div>

              <div className="hidden lg:flex px-8 py-6 items-center justify-center">
                <div className="flex items-center gap-2">
                  <StarRatings rating={3} iconClassName="size-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="block lg:hidden px-8 py-6 items-center justify-center border-b border-border/50">
              <div className="flex items-center gap-2">
                <StarRatings rating={4} iconClassName="size-5 fill-yellow-400 text-yellow-400" />
                <p className="text-lg font-medium text-muted-foreground">{5} ratings</p>
              </div>
            </div>

            <div className="p-8">
              {data.description ? (
                <p className="text-lg leading-relaxed text-muted-foreground">{data.description}</p>
              ) : (
                <p className="text-lg font-medium text-muted-foreground italic">
                  No description provided
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="border-t lg:border-t-0 lg:border-l border-border/50 h-full bg-muted/30">
              <div className="flex flex-col gap-6 p-8 border-b border-border/50">
                <div className="flex flex-row items-center gap-3">
                  <CartButton productId={data.id} tenantSlug={tenantSlug} />
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-12 shadow-lg border-2"
                    onClick={() => {}}
                    disabled={false}
                  >
                    <LinkIcon />
                  </Button>
                </div>

                <p className="text-center font-semibold text-muted-foreground">
                  {data.refundPolicy === "no-refunds"
                    ? "No refunds"
                    : `${data.refundPolicy} money back guarantee`}
                </p>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Ratings</h3>
                  <div className="flex items-center gap-2 font-semibold">
                    <StarIcon className="size-5 fill-yellow-400 text-yellow-400" />
                    <p className="text-lg">4.8 ({5} reviews)</p>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] gap-4 mt-6">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Fragment key={stars}>
                      <div className="font-semibold text-sm">
                        {stars} {stars === 1 ? "star" : "stars"}
                      </div>
                      <Progress value={stars * 20} className="h-2" />
                      <div className="font-semibold text-sm text-muted-foreground">
                        {25}%
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

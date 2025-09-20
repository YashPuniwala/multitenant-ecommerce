"use client";

import React, { useEffect } from "react";
import { useCart } from "../../hooks/use-cart";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { generateTenantUrl } from "@/lib/utils";
import CheckoutItem from "../components/checkout-item";
import CheckoutSidebar from "../components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";

interface CheckoutViewProps {
  tenantSlug: string;
}

const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
  const { productIds, clearAllCarts, removeproduct } = useCart(tenantSlug);

  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );

  const purchase = useMutation(trpc.checkout.purchase.mutationOptions({
    onSuccess: () => {},
    onError: () => {},
  }));

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearAllCarts]);

  if (isLoading) {
    return (
      <div className="lg:pt-16 pt-8 px-4 lg:px-12">
        <div className="border-2 border-dashed border-muted-foreground/30 flex items-center justify-center p-12 flex-col gap-4 bg-card w-full rounded-2xl">
          <LoaderIcon className="size-8 text-muted-foreground animate-spin" />
          <p className="text-lg font-semibold text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (data?.totalDocs === 0) {
    return (
      <div className="lg:pt-16 pt-8 px-4 lg:px-12">
        <div className="border-2 border-dashed border-muted-foreground/30 flex items-center justify-center p-12 flex-col gap-4 bg-card w-full rounded-2xl">
          <InboxIcon className="size-12 text-muted-foreground" />
          <p className="text-lg font-semibold text-muted-foreground">Your cart is empty</p>
          <p className="text-sm text-muted-foreground">Add some products to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pt-16 pt-8 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="rounded-2xl overflow-hidden bg-card shadow-lg border-0">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeproduct(product.id)}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
            isCanceled={false}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;

import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CheckoutItemProps {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}

const CheckoutItem = ({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantUrl,
  tenantName,
  price,
  onRemove,
}: CheckoutItemProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-6 p-6 border-b last:border-b-0",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden rounded-xl">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <Link href={productUrl}>
            <h4 className="font-bold text-lg hover:text-primary transition-colors">{name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-semibold text-muted-foreground hover:text-primary transition-colors mt-1">{tenantName}</p>
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <p className="font-bold text-xl text-primary">{formatCurrency(price)}</p>
        <button
          className="text-destructive hover:text-destructive/80 font-semibold cursor-pointer transition-colors"
          onClick={onRemove}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;

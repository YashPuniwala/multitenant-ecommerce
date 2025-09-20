import { formatCurrency, generateTenantUrl } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImageUrl,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps) => {
  const router = useRouter();
  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(generateTenantUrl(tenantSlug));
  };

  return (
    <Link href={`${generateTenantUrl(tenantSlug)}/products/${id}`}>
      <div className="group bg-card rounded-2xl overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            alt={name}
            fill
            src={imageUrl || "/placeholder.png"}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">{name}</h2>
          <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={handleUserClick}>
            {tenantImageUrl && (
              <Image
                alt={tenantSlug}
                src={tenantImageUrl}
                width={20}
                height={20}
                className="rounded-full border-2 shrink-0 size-[20px]"
              />
            )}
            <p className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{tenantSlug}</p>
          </div>

          {reviewCount > 0 && (
            <div className="flex items-center gap-2">
              <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
              <p className="text-sm font-medium text-muted-foreground">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>

        <div className="p-5 pt-0">
          <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-xl w-fit shadow-lg">
            <p className="text-lg font-bold">{formatCurrency(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-[3/4] bg-muted rounded-2xl animate-pulse shadow-lg" />
  );
};

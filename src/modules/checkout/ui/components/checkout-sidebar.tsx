import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";
import React from "react";

interface CheckoutSidebarProps {
  total: number;
  onPurchase: () => void;
  isCanceled?: boolean;
  disabled?: boolean;
}

const CheckoutSidebar = ({
  total,
  onPurchase,
  isCanceled,
  disabled,
}: CheckoutSidebarProps) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-card shadow-lg flex flex-col border-0">
      <div className="flex items-center justify-between p-6 border-b">
        <h4 className="font-semibold text-xl">Total</h4>
        <p className="font-bold text-2xl text-primary">{formatCurrency(total)}</p>
      </div>
      <div className="p-6 flex items-center justify-center">
        <Button
          variant="gradient"
          disabled={disabled}
          onClick={onPurchase}
          size="lg"
          className="text-lg w-full font-semibold shadow-lg"
        >
          {disabled ? "Processing..." : "Checkout"}
        </Button>
      </div>

      {isCanceled && (
        <div className="p-6 justify-center items-center border-t">
          <div className="bg-destructive/10 border border-destructive/20 font-medium px-4 py-3 rounded-xl flex items-center">
            <div className="flex items-center">
              <CircleXIcon className="size-6 mr-3 text-destructive" />
              <span className="text-destructive font-semibold">Checkout failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSidebar;

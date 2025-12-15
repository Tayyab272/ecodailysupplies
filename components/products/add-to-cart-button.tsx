"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useAuth } from "@/components/auth/auth-provider";
import { Product, ProductVariant } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  quantityOptionPrice?: number; // Price from selected quantity option
  disabled?: boolean;
}

export function AddToCartButton({
  product,
  variant,
  quantity,
  quantityOptionPrice,
  disabled = false,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();
  const { user } = useAuth();

  const handleClick = async () => {
    await addItem(
      product,
      variant,
      quantity,
      user?.id,
      quantityOptionPrice
    );
    setIsAdded(true);

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      size="lg"
      className="w-full rounded-xl bg-primary py-5 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={handleClick}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" strokeWidth={2.5} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" strokeWidth={2.5} />
          Add to Cart
        </>
      )}
    </Button>
  );
}

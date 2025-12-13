"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cart-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Leaf, Package, ArrowRight } from "lucide-react";
import { CartItem } from "./cart-item";

interface MiniCartProps {
  children?: React.ReactNode;
}

export function MiniCart({ children }: MiniCartProps) {
  const [open, setOpen] = useState(false);
  const { items, getCartSummary, getItemCount } = useCartStore();
  const summary = getCartSummary();
  const itemCount = getItemCount();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            <ShoppingBag className="h-5 w-5 text-gray-700" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md ring-2 ring-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
              <ShoppingBag className="h-6 w-6 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <SheetTitle className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                Shopping Cart
              </SheetTitle>
              <SheetDescription className="text-sm font-medium">
                {itemCount === 0 ? (
                  <span className="text-gray-500">Your cart is empty</span>
                ) : (
                  <span className="text-primary font-semibold">
                    {itemCount} {itemCount === 1 ? "item" : "items"} in cart
                  </span>
                )}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center px-4">
              <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-2xl bg-gray-50 border border-gray-200">
                <ShoppingBag
                  className="h-14 w-14 text-gray-300"
                  strokeWidth={1}
                />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 tracking-tight">
                Your cart is empty
              </h3>
              <p className="mb-8 text-sm text-gray-600 max-w-sm">
                Start adding eco-friendly products to your cart
              </p>
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 uppercase tracking-wider font-bold px-8 py-6 rounded-full"
                onClick={() => setOpen(false)}
              >
                <Link href="/products" className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-6">
            {/* Order Summary */}
            <div className="space-y-3 text-sm mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  £{summary.subtotal.toFixed(2)}
                </span>
              </div>

              {summary.discount > 0 && (
                <div className="flex justify-between items-center text-primary">
                  <span className="font-medium">Discount</span>
                  <span className="font-semibold">
                    -£{summary.discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Shipping</span>
                <span className="font-semibold text-gray-900">
                  {summary.shipping === 0 ? (
                    <span className="text-primary font-bold">Free</span>
                  ) : (
                    `£${summary.shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
                <span className="font-bold text-gray-900 uppercase tracking-wider text-base">
                  Total
                </span>
                <span className="font-bold text-gray-900 text-xl">
                  £{summary.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Eco Badge */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Eco-Friendly Packaging • Carbon Neutral Shipping
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full h-12 bg-primary text-white font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 rounded-full"
                size="lg"
              >
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2"
                >
                  <Package className="h-5 w-5" />
                  View Full Cart
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full h-11 border border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400 font-medium transition-all duration-200 rounded-full"
                onClick={() => setOpen(false)}
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

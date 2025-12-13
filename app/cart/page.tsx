"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  UserPlus,
  LogIn,
  ShoppingBag,
  Package,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useAuth } from "@/components/auth/auth-provider";
import { CartItem } from "@/components/cart/cart-item";
import { OrderSummary } from "@/components/cart/order-summary";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

function CartPageContent() {
  const { items, getCartSummary, clearCart } = useCartStore();
  const { user } = useAuth();
  const summary = getCartSummary();

  const isEmpty = items.length === 0;

  const handleClearCart = async () => {
    await clearCart(user?.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12">
        {/* Page Header - Centered with Icon */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center justify-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mr-4">
              <ShoppingBag className="h-8 w-8 text-primary" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Your Cart
              </h1>
              {!isEmpty && (
                <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider font-medium">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guest User Login Prompt */}
        {!user && !isEmpty && (
          <div className="mb-8 md:mb-10 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-lg p-6 md:p-8 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12"></div>

              <div className="relative flex flex-col md:flex-row items-start gap-6">
                <div className="shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                    <UserPlus className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2
                      className="h-5 w-5 text-primary"
                      strokeWidth={2}
                    />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      Sign in for faster checkout
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Save your addresses, track orders, and enjoy a seamless
                    shopping experience
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/auth/login?redirect=/cart"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup?redirect=/cart"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-primary transition-all duration-300"
                    >
                      <UserPlus className="h-4 w-4" />
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isEmpty ? (
          /* Empty Cart State */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border-2 border-gray-300 shadow-xl p-12 md:p-16 text-center">
              <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-gray-100 to-gray-200 border-4 border-white shadow-lg">
                <ShoppingBag
                  className="h-12 w-12 text-gray-400"
                  strokeWidth={1}
                />
              </div>
              <h2 className="mb-4 text-2xl md:text-3xl font-bold text-gray-900">
                Your cart is empty
              </h2>
              <p className="mb-8 text-gray-600 max-w-sm mx-auto">
                Discover our premium eco-friendly packaging solutions
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl"
              >
                <Link href="/products" className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Start Shopping
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Cart Items - Left Column */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                      Items in Cart
                    </h2>
                    <span className="text-sm text-gray-500 font-medium">
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>

                  {/* Continue Shopping Button */}
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors group"
                    >
                      <ArrowLeft
                        className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                        strokeWidth={2}
                      />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Summary - Right Column */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  {/* Order Summary Card */}
                  <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-300">
                      <Package
                        className="h-5 w-5 text-primary"
                        strokeWidth={2}
                      />
                      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                        Order Summary
                      </h2>
                    </div>

                    <OrderSummary summary={summary} />

                    {/* Checkout Button */}
                    <Button
                      asChild
                      size="lg"
                      className="mt-6 w-full h-14 bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
                    >
                      <Link
                        href="/checkout"
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        Proceed to Checkout
                      </Link>
                    </Button>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t border-gray-300 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <CheckCircle2
                          className="h-4 w-4 text-primary shrink-0"
                          strokeWidth={2}
                        />
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <CheckCircle2
                          className="h-4 w-4 text-primary shrink-0"
                          strokeWidth={2}
                        />
                        <span>Free shipping on orders over £50</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <CheckCircle2
                          className="h-4 w-4 text-primary shrink-0"
                          strokeWidth={2}
                        />
                        <span>Next day delivery available</span>
                      </div>
                    </div>
                  </div>

                  {/* Clear Cart Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all duration-200 rounded-xl"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <ErrorBoundary
      title="Cart Error"
      description="We encountered an error while loading your cart. Please try again or continue shopping."
      showBackButton
      backUrl="/products"
      showHomeButton
    >
      <CartPageContent />
    </ErrorBoundary>
  );
}

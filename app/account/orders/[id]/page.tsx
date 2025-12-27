import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  ChevronLeft,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { getOrderById } from "@/services/orders/order.service";
import { getCurrentUserServer } from "@/services/auth/auth-server.service";
import { notFound } from "next/navigation";
import { ORDER_STATUS_CONFIG } from "@/lib/constants";
import { SHIPPING_OPTIONS } from "@/types/shipping";

// Force fresh data on every request - no caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Placeholder image for missing product images
const PLACEHOLDER_IMAGE = "/placeholder-image.png";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params;

  // Get current user
  const authResult = await getCurrentUserServer();

  if (!authResult.success || !authResult.user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-300/60 overflow-hidden max-w-md w-full text-center">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-50"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Package className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to view order details
            </p>
            <Link href="/auth/login">
              <Button className="bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 h-11 px-8 font-semibold rounded-xl shadow-lg shadow-primary/25">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailContent orderId={id} userId={authResult.user.id} />
    </Suspense>
  );
}

// Status icon component
function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "delivered":
      return <CheckCircle2 className="h-5 w-5" strokeWidth={2} />;
    case "cancelled":
      return <XCircle className="h-5 w-5" strokeWidth={2} />;
    case "shipped":
      return <Truck className="h-5 w-5" strokeWidth={2} />;
    default:
      return <Clock className="h-5 w-5" strokeWidth={2} />;
  }
}

// Order Detail Content Component
async function OrderDetailContent({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) {
  // Fetch order from Supabase
  const order = await getOrderById(orderId);
  if (!order) {
    notFound();
  }

  // Verify user owns this order
  if (order.userId !== userId) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 md:p-12 shadow-2xl border border-red-200 overflow-hidden max-w-md w-full text-center">
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-red-100 flex items-center justify-center">
                <XCircle className="h-8 w-8 text-red-500" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              You don&apos;t have access to this order
            </p>
            <Link href="/account?tab=orders">
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:border-primary hover:bg-white h-11 px-8 font-semibold rounded-xl"
              >
                Back to Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format order data for display
  const displayOrder = {
    id: order.orderNumber,
    date: order.createdAt.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    shortDate: order.createdAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    status: order.status,
    total: order.total,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping: order.shipping,
    shippingMethod: order.shippingMethod || null,
    vatAmount: order.vatAmount || 0,
    shippingAddress: {
      name: order.shippingAddress?.fullName || "N/A",
      street: order.shippingAddress?.address || "N/A",
      city: order.shippingAddress?.city || "N/A",
      state: order.shippingAddress?.state || "N/A",
      zip: order.shippingAddress?.zipCode || "N/A",
      country: order.shippingAddress?.country || "N/A",
    },
    items: order.items.map((item, index) => ({
      id: item.id || `${index}`,
      name: item.product?.name || "Unknown Product",
      variant: item.variant?.name || "Default",
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
      total: item.totalPrice,
      image: item.product.image || "/placeholder-image.png",
    })),
  };

  const statusConfig =
    ORDER_STATUS_CONFIG[
      displayOrder.status as keyof typeof ORDER_STATUS_CONFIG
    ] || ORDER_STATUS_CONFIG.pending;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button & Header */}
      <div className="mb-8">
        <Link
          href="/account?tab=orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6 group"
        >
          <ChevronLeft
            className="h-4 w-4 group-hover:-translate-x-1 transition-transform"
            strokeWidth={2}
          />
          <span className="text-sm font-medium">Back to Orders</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Order #{displayOrder.id}
            </h1>
            <p className="mt-2 text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" strokeWidth={2} />
              {displayOrder.date}
            </p>
          </div>

          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${statusConfig.className}`}
          >
            <StatusIcon status={displayOrder.status} />
            {statusConfig.label}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items Card */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" strokeWidth={2} />
                Order Items
                <span className="text-sm font-normal text-gray-500">
                  ({displayOrder.items.length}{" "}
                  {displayOrder.items.length === 1 ? "item" : "items"})
                </span>
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {displayOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {item.image && item.image !== PLACEHOLDER_IMAGE ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-50">
                        <Package
                          className="h-8 w-8 text-gray-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {item.variant !== "Default" && (
                        <span className="mr-2">{item.variant}</span>
                      )}
                      <span>Qty: {item.quantity}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      £{item.pricePerUnit.toFixed(2)} each
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-gray-900">
                      £{item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" strokeWidth={2} />
                Shipping Address
              </h2>
            </div>
            <div className="p-6">
              <div className="text-gray-700 space-y-1">
                <p className="font-semibold text-gray-900">
                  {displayOrder.shippingAddress.name}
                </p>
                <p>{displayOrder.shippingAddress.street}</p>
                <p>
                  {displayOrder.shippingAddress.city}
                  {displayOrder.shippingAddress.state &&
                    `, ${displayOrder.shippingAddress.state}`}{" "}
                  {displayOrder.shippingAddress.zip}
                </p>
                <p>{displayOrder.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Order Summary Card */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden sticky top-6">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" strokeWidth={2} />
                Order Summary
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="text-gray-900 font-medium">
                  £{displayOrder.subtotal.toFixed(2)}
                </span>
              </div>

              {displayOrder.discount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="text-green-600 font-medium">
                    -£{displayOrder.discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <div>
                  <span>Shipping</span>
                  {displayOrder.shippingMethod && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {SHIPPING_OPTIONS.find(
                        (opt) => opt.id === displayOrder.shippingMethod
                      )?.name || displayOrder.shippingMethod}
                    </p>
                  )}
                </div>
                <span className="text-gray-900 font-medium">
                  {displayOrder.shipping === 0
                    ? "Free"
                    : `£${displayOrder.shipping.toFixed(2)}`}
                </span>
              </div>

              {displayOrder.vatAmount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>VAT (20%)</span>
                  <span className="text-gray-900 font-medium">
                    £{displayOrder.vatAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    £{displayOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="border-t border-gray-200/50 px-6 py-4 bg-gray-50/30">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Number</span>
                  <span className="font-mono text-gray-900">
                    #{displayOrder.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Date</span>
                  <span className="text-gray-900">{displayOrder.shortDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you have questions about your order, please contact our support
              team.
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 hover:border-primary hover:bg-white font-medium rounded-xl"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Detail Skeleton
function OrderDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Card Skeleton */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-5">
                  <div className="h-20 w-20 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Address Card Skeleton */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-6 space-y-2">
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Summary Card Skeleton */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-gray-300 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Help Card Skeleton */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 shadow-xl p-6">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

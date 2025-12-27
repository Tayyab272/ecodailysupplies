"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Truck,
  CreditCard,
  ChevronLeft,
  Save,
  User,
  MapPin,
  Calendar,
  Hash,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ORDER_STATUS_CONFIG } from "@/lib/constants";
import type { AdminOrder } from "@/services/admin/order.service";
import { CartItem } from "@/types/cart";

// Status icon component
function StatusIcon({
  status,
  className = "h-5 w-5",
}: {
  status: string;
  className?: string;
}) {
  switch (status) {
    case "delivered":
      return <CheckCircle2 className={className} strokeWidth={2} />;
    case "cancelled":
      return <XCircle className={className} strokeWidth={2} />;
    case "shipped":
      return <Truck className={className} strokeWidth={2} />;
    case "processing":
      return <Loader2 className={className} strokeWidth={2} />;
    default:
      return <Clock className={className} strokeWidth={2} />;
  }
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [status, setStatus] = useState<string>("pending");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/orders?id=${orderId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Order not found");
        } else if (response.status === 403) {
          setError("You don't have permission to view this order");
        } else {
          setError("Failed to load order");
        }
        return;
      }

      const orderData = await response.json();
      const orderWithDates = {
        ...orderData,
        createdAt: new Date(orderData.createdAt),
        updatedAt: new Date(orderData.updatedAt),
      };
      setOrder(orderWithDates);
      setStatus(orderWithDates.status);
      setTrackingNumber(orderWithDates.trackingNumber || "");
      setNotes(orderWithDates.notes || "");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load order");
      console.error("Error fetching order:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      setUpdating(true);
      setSaveSuccess(false);
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: status !== order?.status ? status : undefined,
          trackingNumber: trackingNumber || undefined,
          notes: notes || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      await fetchOrder();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update order");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  if (loading) {
    return <OrderDetailSkeleton />;
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 md:p-12 shadow-2xl border border-red-200 overflow-hidden max-w-md w-full text-center">
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-500" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {error === "Order not found" ? "Order Not Found" : "Error"}
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "Unable to load order details"}
            </p>
            <Link href="/admin?tab=orders">
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:border-primary hover:bg-white h-11 px-8 font-semibold rounded-xl"
              >
                <ChevronLeft className="mr-2 h-4 w-4" strokeWidth={2} />
                Back to Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasChanges =
    status !== order.status ||
    trackingNumber !== (order.trackingNumber || "") ||
    notes !== (order.notes || "");

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin?tab=orders"
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
              Order #{order.orderNumber}
            </h1>
            <p className="mt-2 text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" strokeWidth={2} />
              {formatDate(order.createdAt)}
            </p>
          </div>

          {/* Current Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              ORDER_STATUS_CONFIG[
                order.status as keyof typeof ORDER_STATUS_CONFIG
              ]?.className || ORDER_STATUS_CONFIG.pending.className
            }`}
          >
            <StatusIcon status={order.status} className="h-4 w-4" />
            {ORDER_STATUS_CONFIG[
              order.status as keyof typeof ORDER_STATUS_CONFIG
            ]?.label || order.status}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items Card */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" strokeWidth={2} />
                Order Items
                <span className="text-sm font-normal text-gray-500">
                  ({order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"})
                </span>
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item: CartItem, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {item.product?.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product?.name || "Product"}
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
                      {item.product?.name || "Product"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {item.variant?.name && item.variant.name !== "Default" && (
                        <span className="mr-2">{item.variant.name}</span>
                      )}
                      <span>Qty: {item.quantity}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(item.pricePerUnit)} each
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Update Order Card */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" strokeWidth={2} />
                Update Order
              </h2>
            </div>
            <div className="p-6 space-y-5">
              {/* Status Select */}
              <div>
                <Label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Order Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger
                    id="status"
                    className="h-11 border-gray-300 rounded-xl focus:border-primary focus:ring-primary"
                  >
                    <div className="flex items-center gap-2">
                      {/* <StatusIcon status={status} className="h-4 w-4" /> */}
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-600" />
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="processing">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 text-blue-600" />
                        Processing
                      </div>
                    </SelectItem>
                    <SelectItem value="shipped">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-primary" />
                        Shipped
                      </div>
                    </SelectItem>
                    <SelectItem value="delivered">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Delivered
                      </div>
                    </SelectItem>
                    <SelectItem value="cancelled">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Cancelled
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tracking Number */}
              <div>
                <Label
                  htmlFor="tracking"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Tracking Number
                </Label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="tracking"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number..."
                    className="h-11 pl-10 border-gray-300 rounded-xl focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <Label
                  htmlFor="notes"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Admin Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this order..."
                  className="border-gray-300 rounded-xl focus:border-primary focus:ring-primary resize-none"
                  rows={3}
                />
              </div>

              {/* Save Button */}
              <Button
                onClick={handleUpdateStatus}
                disabled={!hasChanges || updating}
                className={`w-full h-12 font-semibold rounded-xl transition-all duration-300 ${
                  saveSuccess
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
                } text-white shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Saved Successfully
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" strokeWidth={2} />
                    Save Changes
                  </>
                )}
              </Button>

              {!hasChanges && !saveSuccess && (
                <p className="text-center text-sm text-gray-500">
                  No changes to save
                </p>
              )}
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
                  {order.shippingAddress?.fullName || "N/A"}
                </p>
                <p>{order.shippingAddress?.address || ""}</p>
                {order.shippingAddress?.address2 && (
                  <p>{order.shippingAddress.address2}</p>
                )}
                <p>
                  {order.shippingAddress?.city}
                  {order.shippingAddress?.state &&
                    `, ${order.shippingAddress.state}`}{" "}
                  {order.shippingAddress?.zipCode}
                </p>
                <p>{order.shippingAddress?.country}</p>
                {order.shippingAddress?.phone && (
                  <p className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {order.shippingAddress.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
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
                  {formatCurrency(order.subtotal)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="text-green-600 font-medium">
                    -{formatCurrency(order.discount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-gray-900 font-medium">
                  {order.shipping === 0
                    ? "Free"
                    : formatCurrency(order.shipping)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Meta */}
            <div className="border-t border-gray-200/50 px-6 py-4 bg-gray-50/30">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    Order ID
                  </span>
                  <span className="font-mono text-gray-900 text-xs">
                    {order.id.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Created
                  </span>
                  <span className="text-gray-900">
                    {formatDateTime(order.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Updated
                  </span>
                  <span className="text-gray-900">
                    {formatDateTime(order.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Card */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" strokeWidth={2} />
                Customer
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {order.customerName || "Guest Customer"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.userId ? "Registered" : "Guest"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-gray-700 truncate">{order.email}</span>
                </div>
                {order.customerPhone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-gray-700">{order.customerPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tracking Card */}
          {order.trackingNumber && (
            <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
              <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" strokeWidth={2} />
                  Tracking
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Truck className="h-5 w-5 text-primary" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Tracking Number
                    </p>
                    <p className="font-mono font-semibold text-gray-900 truncate">
                      {order.trackingNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes Card */}
          {order.notes && (
            <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
              <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" strokeWidth={2} />
                  Admin Notes
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm whitespace-pre-wrap">
                  {order.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton Loader
function OrderDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
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
              {[1, 2].map((i) => (
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

          {/* Update Card Skeleton */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-11 w-full bg-gray-200 rounded-xl animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-11 w-full bg-gray-200 rounded-xl animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-24 w-full bg-gray-200 rounded-xl animate-pulse" />
              </div>
              <div className="h-12 w-full bg-gray-300 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Address Skeleton */}
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
          {/* Summary Skeleton */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
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

          {/* Customer Skeleton */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 shadow-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gray-50/50">
              <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

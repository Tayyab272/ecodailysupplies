"use client";

import { useState, useMemo, memo } from "react";
import Link from "next/link";
import {
  Package,
  DollarSign,
  Calendar,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import type { Order } from "@/types/cart";
import { ORDER_STATUS_CONFIG } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface OrdersTableProps {
  orders: Order[];
  loading?: boolean;
}

export function OrdersTable({ orders, loading }: OrdersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Memoize filtered and sorted orders for better performance
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return order.orderNumber.toLowerCase().includes(searchLower);
        }
        return true;
      })
      .filter((order) => {
        if (statusFilter === "all") return true;
        return order.status === statusFilter;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case "date":
            comparison = a.createdAt.getTime() - b.createdAt.getTime();
            break;
          case "total":
            comparison = a.total - b.total;
            break;
          case "status":
            comparison = a.status.localeCompare(b.status);
            break;
          default:
            return 0;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
  }, [orders, searchTerm, statusFilter, sortBy, sortOrder]);

  if (loading) {
    return <OrdersTableSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 sm:py-20">
        <div className="text-center space-y-8 max-w-md px-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-3xl"></div>
              <div className="relative rounded-3xl bg-linear-to-br from-primary/10 to-primary/5 p-6 border-2 border-primary/20">
                <Package className="h-10 w-10 text-primary" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-300/60">
            <p className="text-xl font-bold text-gray-900 mb-2">
              No Orders Found
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              You haven&apos;t placed any orders yet
            </p>
          </div>
          <Link href="/products">
            <button className="bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Premium Filters Section */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-gray-300/50 bg-linear-to-r from-gray-50/50 to-transparent">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              strokeWidth={2.5}
            />
            <Input
              placeholder="Search orders by number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-11 w-full border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Filter
              className="h-5 w-5 text-gray-500 shrink-0"
              strokeWidth={2.5}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] h-11 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile Card View (< 768px) - Premium Style */}
      <div className="md:hidden px-4 sm:px-6 pb-4">
        {filteredOrders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm font-medium text-gray-600">
              No orders match your filters
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table (≥ 768px) - Premium Style */}
      <div className="hidden md:block px-5 sm:px-6 pb-5 sm:pb-6">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300/60 bg-linear-to-r from-gray-50/80 to-transparent">
                <th className="text-left py-4 px-5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <button
                    className="flex items-center gap-2 hover:text-primary transition-colors duration-200 group"
                    onClick={() => {
                      if (sortBy === "date") {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("date");
                        setSortOrder("desc");
                      }
                    }}
                  >
                    Date
                    <ArrowUpDown
                      className="h-3.5 w-3.5 text-gray-400 group-hover:text-primary transition-colors"
                      strokeWidth={2.5}
                    />
                  </button>
                </th>
                <th className="text-left py-4 px-5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Order #
                </th>
                <th className="text-left py-4 px-5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left py-4 px-5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <button
                    className="flex items-center gap-2 hover:text-primary transition-colors duration-200 group"
                    onClick={() => {
                      if (sortBy === "total") {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("total");
                        setSortOrder("desc");
                      }
                    }}
                  >
                    Total
                    <ArrowUpDown
                      className="h-3.5 w-3.5 text-gray-400 group-hover:text-primary transition-colors"
                      strokeWidth={2.5}
                    />
                  </button>
                </th>
                <th className="text-left py-4 px-5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <button
                    className="flex items-center gap-2 hover:text-primary transition-colors duration-200 group"
                    onClick={() => {
                      if (sortBy === "status") {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("status");
                        setSortOrder("asc");
                      }
                    }}
                  >
                    Status
                    <ArrowUpDown
                      className="h-3.5 w-3.5 text-gray-400 group-hover:text-primary transition-colors"
                      strokeWidth={2.5}
                    />
                  </button>
                </th>
                <th className="text-right py-4 px-5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <p className="text-sm font-medium text-gray-600">
                      No orders match your filters
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Count - Premium Style */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-gray-300/50 bg-linear-to-r from-gray-50/30 to-transparent">
        <p className="text-sm font-semibold text-gray-600">
          Showing <span className="text-gray-900">{filteredOrders.length}</span>{" "}
          of <span className="text-gray-900">{orders.length}</span> orders
        </p>
      </div>
    </div>
  );
}

// Mobile Card Component - Memoized for performance
const OrderCard = memo(function OrderCard({ order }: { order: Order }) {
  const itemCount = useMemo(
    () => order.items.reduce((sum, item) => sum + item.quantity, 0),
    [order.items]
  );

  return (
    <Link
      href={`/account/orders/${order.id}`}
      className="block p-5 hover:bg-linear-to-r hover:from-primary/5 hover:to-transparent border-2 border-gray-300/60 transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/30 group relative overflow-hidden"
    >
      {/* Hover Border Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-bold text-base text-gray-900">
              #{order.orderNumber}
            </h3>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-linear-to-br from-primary/20 to-primary/10 p-2.5 border-2 border-primary/30 shadow-md">
            <Package className="h-4 w-4 text-primary" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
              Items
            </p>
            <p className="text-base font-bold text-gray-900">{itemCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-linear-to-br from-primary/20 to-primary/10 p-2.5 border-2 border-primary/30 shadow-md">
            <DollarSign className="h-4 w-4 text-primary" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
              Total
            </p>
            <p className="text-base font-bold truncate text-gray-900">
              £{order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-300/50 text-xs font-medium text-gray-600">
        <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
        <span>{formatDate(order.createdAt)}</span>
      </div>
    </Link>
  );
});

// Desktop Table Row Component - Memoized for performance
const OrderRow = memo(function OrderRow({ order }: { order: Order }) {
  const itemCount = useMemo(
    () => order.items.reduce((sum, item) => sum + item.quantity, 0),
    [order.items]
  );

  return (
    <tr className="hover:bg-linear-to-r hover:from-primary/5 hover:to-transparent border-b border-gray-300/50 transition-all duration-300 bg-white group">
      <td className="py-4 px-5">
        <p className="text-sm font-medium text-gray-700">
          {formatDate(order.createdAt)}
        </p>
      </td>
      <td className="py-4 px-5">
        <Link
          href={`/account/orders/${order.id}`}
          className="text-sm font-bold text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
        >
          #{order.orderNumber}
        </Link>
      </td>
      <td className="py-4 px-5">
        <p className="text-sm font-medium text-gray-700">{itemCount} items</p>
      </td>
      <td className="py-4 px-5">
        <p className="text-base font-bold text-gray-900">
          £{order.total.toFixed(2)}
        </p>
      </td>
      <td className="py-4 px-5">
        <StatusBadge status={order.status} />
      </td>
      <td className="py-4 px-5 text-right">
        <Link href={`/account/orders/${order.id}`}>
          <span className="text-sm font-bold text-primary hover:text-primary/80 hover:underline transition-all duration-200 inline-flex items-center gap-1 group-hover:gap-2">
            View
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              →
            </span>
          </span>
        </Link>
      </td>
    </tr>
  );
});

// Loading Skeleton
function OrdersTableSkeleton() {
  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Filters Skeleton */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="h-10 flex-1 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-[140px] bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="md:hidden divide-y divide-gray-200">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 space-y-3 bg-white">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden md:block px-4 sm:px-6 pb-4 sm:pb-6">
        <table className="w-full">
          <thead className="border border-gray-300 bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">
                Order #
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">
                Items
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">
                Total
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">
                Status
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <td className="py-3 px-4">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-4">
                  <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Status Badge Component - Memoized for performance
const StatusBadge = memo(function StatusBadge({
  status,
}: {
  status: Order["status"];
}) {
  const config = ORDER_STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
});

// Helper function
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

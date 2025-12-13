import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatsCard } from "../stats-card";
import type { DashboardStats } from "@/services/admin/admin-server.service";
import type { AdminOrder } from "@/services/admin/order.service";

interface DashboardTabProps {
  stats: DashboardStats;
  orders: AdminOrder[];
}

export function DashboardTab({ stats }: DashboardTabProps) {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Premium Header */}
      <div className="pb-4 border-b border-gray-300">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg">
              <LayoutDashboard
                className="h-7 w-7 text-primary"
                strokeWidth={2}
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1.5 font-medium">
              Overview of your store performance
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today's Revenue"
          value={`£${stats.todayRevenue.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          icon={<DollarSign className="h-5 w-5" />}
          color="primary"
        />
        <StatsCard
          title="Total Orders"
          value={stats.total.toLocaleString()}
          icon={<ShoppingBag className="h-5 w-5" />}
          color="secondary"
        />
        <StatsCard
          title="Average Order Value"
          value={`£${stats.averageOrderValue.toFixed(2)}`}
          icon={<TrendingUp className="h-5 w-5" />}
          color="tertiary"
        />
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers?.toLocaleString() || "—"}
          icon={<Users className="h-5 w-5" />}
          color="quaternary"
        />
      </div>

      {/* Order Status Overview */}
      <div className="rounded-2xl border-2 border-gray-300 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="relative">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg">
                <Package className="h-6 w-6 text-primary" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Order Status Overview
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <OrderStatusCard
              value={stats.pending}
              label="Pending"
              color=" bg-gray-300/90"
              iconColor="text-gray-600"
            />
            <OrderStatusCard
              value={stats.processing}
              label="Processing"
              color="bg-blue-300/90"
              iconColor="text-blue-400"
            />
            <OrderStatusCard
              value={stats.shipped}
              label="Shipped"
              color="bg-orange-300/90 "
              iconColor="text-orange-500"
            />
            <OrderStatusCard
              value={stats.delivered}
              label="Delivered"
              color="bg-primary/90 "
              iconColor="text-secondary/50"
            />
            <OrderStatusCard
              value={stats.cancelled}
              label="Cancelled"
              color="bg-red-400/90 border-red-200"
              iconColor="text-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Status Card Component - Premium Style
function OrderStatusCard({
  value,
  label,
  color,
  iconColor,
}: {
  value: number;
  label: string;
  color: string;
  iconColor: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border ${color} p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] backdrop-blur-sm`}
    >
      {/* <div className="absolute inset-0 bg-linear-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
      <div className="relative">
        <div
          className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl ${color} flex items-center justify-center mb-3 sm:mb-4 shadow-md transition-all duration-200 group-hover:scale-110`}
        >
          <Package
            className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`}
            strokeWidth={2.5}
          />
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 tracking-tight">
          {value.toLocaleString()}
        </div>
        <div className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
}

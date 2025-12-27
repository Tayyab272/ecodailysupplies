"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  Package,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/services/admin/admin-server.service";
import type { AdminOrder } from "@/services/admin/order.service";
import type { AdminCustomer } from "@/services/admin/customer.service";
import type { AdminB2BRequest } from "@/types/b2b-request";

// Import tab content components
import { DashboardTab } from "./tabs/dashboard-tab";
import { OrdersTab } from "./tabs/orders-tab";
import { CustomersTab } from "./tabs/customers-tab";
import { AnalyticsTab } from "./tabs/analytics-tab";
import { B2BRequestsTab } from "./tabs/b2b-requests-tab";

interface AdminDashboardClientProps {
  initialStats: DashboardStats;
  initialOrders: AdminOrder[];
  initialCustomers: AdminCustomer[];
  initialB2BRequests: AdminB2BRequest[];
  pendingB2BRequestsCount: number;
}

type TabType =
  | "dashboard"
  | "orders"
  | "customers"
  | "analytics"
  | "b2b-requests";

const tabs = [
  { id: "dashboard" as TabType, label: "Dashboard", icon: LayoutDashboard },
  { id: "orders" as TabType, label: "Orders", icon: ShoppingBag },
  { id: "customers" as TabType, label: "Customers", icon: Users },
  { id: "b2b-requests" as TabType, label: "B2B Requests", icon: Briefcase },
  { id: "analytics" as TabType, label: "Analytics", icon: BarChart3 },
];

const externalLink = {
  label: "Content",
  href: "/studio",
  icon: Package,
};

export function AdminDashboardClient({
  initialStats,
  initialOrders,
  initialCustomers,
  initialB2BRequests,
  pendingB2BRequestsCount,
}: AdminDashboardClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get tab from URL or default to dashboard
  const urlTab = searchParams.get("tab") as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(urlTab || "dashboard");

  // Handle tab change - instant, no navigation
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Update URL without navigation for deep linking
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`/admin?${params.toString()}`, { scroll: false });
  };

  // Render active tab content
  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab stats={initialStats} orders={initialOrders} />;
      case "orders":
        return <OrdersTab orders={initialOrders} />;
      case "customers":
        return <CustomersTab customers={initialCustomers} />;
      case "b2b-requests":
        return <B2BRequestsTab requests={initialB2BRequests} />;
      case "analytics":
        return <AnalyticsTab orders={initialOrders} stats={initialStats} />;
      default:
        return <DashboardTab stats={initialStats} orders={initialOrders} />;
    }
  }, [
    activeTab,
    initialStats,
    initialOrders,
    initialCustomers,
    initialB2BRequests,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Mobile/Tablet Top Tabs (< 1024px) - Match Account Dashboard */}
      <div className="lg:hidden mb-6">
        <div className="rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <nav className="flex min-w-max bg-linear-to-r from-gray-50/50 to-white p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const showBadge =
                  tab.id === "b2b-requests" && pendingB2BRequestsCount > 0;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold transition-all duration-300 whitespace-nowrap relative rounded-xl",
                      isActive
                        ? "b text-white shadow-lg shadow-primary/20 scale-105"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-all duration-300",
                        isActive ? "text-primary scale-110" : "text-gray-500"
                      )}
                      strokeWidth={2.5}
                    />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-8 bg-primary/60 rounded-full"></div>
                    )}
                    {showBadge && (
                      <span
                        className={cn(
                          "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow-lg",
                          isActive
                            ? "bg-white text-red-500"
                            : "bg-red-500 text-white"
                        )}
                      >
                        {pendingB2BRequestsCount > 9
                          ? "9+"
                          : pendingB2BRequestsCount}
                      </span>
                    )}
                  </button>
                );
              })}
              {/* External Content Link */}
              <a
                href={externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold transition-all duration-300 whitespace-nowrap text-gray-600 hover:text-gray-900 hover:bg-white/60 rounded-xl"
              >
                <externalLink.icon
                  className="h-4 w-4 text-gray-500"
                  strokeWidth={2.5}
                />
                <span className="hidden sm:inline">{externalLink.label}</span>
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Navigation (≥ 1024px) - Match Account Dashboard */}
      <aside className="hidden lg:block">
        <div className="sticky top-4">
          <div className="rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Sidebar Header */}
            <div className="px-5 py-4 border-b border-gray-300 bg-linear-to-r from-primary/5 to-transparent">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Navigation
              </span>
            </div>

            {/* Navigation Items */}
            <nav className="p-2">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const showBadge =
                  tab.id === "b2b-requests" && pendingB2BRequestsCount > 0;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3.5 mb-1 text-sm font-bold transition-all duration-300 relative rounded-xl group",
                      isActive
                        ? "bg-linear-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Active Indicator Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-white/40 rounded-r-full"></div>
                    )}

                    {/* Icon Container */}
                    <div
                      className={cn(
                        "relative flex items-center justify-center transition-all duration-300",
                        isActive ? "scale-110" : "group-hover:scale-105"
                      )}
                    >
                      {/* Icon Glow Effect for Active */}
                      {isActive && (
                        <div className="absolute inset-0 bg-white/20 blur-md rounded-lg"></div>
                      )}
                      <Icon
                        className={cn(
                          "relative h-5 w-5 transition-all duration-300 z-10",
                          isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-primary"
                        )}
                        strokeWidth={2.5}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={cn(
                        "relative z-10 transition-all duration-300",
                        isActive && "tracking-wide"
                      )}
                    >
                      {tab.label}
                    </span>

                    {/* Badge */}
                    {showBadge && (
                      <span
                        className={cn(
                          "ml-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow-lg relative z-10",
                          isActive
                            ? "bg-white text-red-500"
                            : "bg-red-500 text-white"
                        )}
                      >
                        {pendingB2BRequestsCount > 9
                          ? "9+"
                          : pendingB2BRequestsCount}
                      </span>
                    )}

                    {/* Active Dot */}
                    {isActive && (
                      <div className="ml-auto">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/60"></div>
                      </div>
                    )}

                    {/* Hover Effect Overlay */}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                );
              })}

              {/* External Content Link */}
              <a
                href={externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3.5 mt-2 text-sm font-bold transition-all duration-300 relative rounded-xl group text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
              >
                <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <externalLink.icon
                    className="relative h-5 w-5 transition-all duration-300 z-10 text-gray-500 group-hover:text-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="relative z-10">{externalLink.label}</span>
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </nav>
          </div>
        </div>
      </aside>

      {/* Content Area - Instant switching */}
      <div className="lg:col-span-3">{renderTabContent}</div>
    </div>
  );
}

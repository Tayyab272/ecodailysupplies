import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/services/auth/auth-server.service";
import {
  getDashboardStats,
  getAllOrders,
  getAllCustomers,
  getAdminB2BRequests,
  getAdminPendingB2BRequestsCount,
} from "@/services/admin/admin-server.service";
import { AdminDashboardClient } from "@/components/admin/admin-dashboard-client";

// Dynamic page - always fetch fresh data for admin dashboard
// No revalidation needed as this is user-specific data
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Check authentication and admin role
  const authResult = await getCurrentUserServer();

  if (!authResult.success || !authResult.user) {
    redirect("/auth/login");
  }

  return (
    <Suspense fallback={<AdminDashboardSkeleton />}>
      <AdminDashboardContent />
    </Suspense>
  );
}

// Fetch ALL admin data at once for instant tab switching
async function AdminDashboardContent() {
  // Parallel data fetching for maximum performance
  const [stats, orders, customers, b2bRequests, pendingB2BCount] =
    await Promise.all([
      getDashboardStats(),
      getAllOrders(),
      getAllCustomers(),
      getAdminB2BRequests(),
      getAdminPendingB2BRequestsCount(),
    ]);

  // Pass all data to client component for instant tab switching
  return (
    <AdminDashboardClient
      initialStats={stats}
      initialOrders={orders}
      initialCustomers={customers}
      initialB2BRequests={b2bRequests}
      pendingB2BRequestsCount={pendingB2BCount}
    />
  );
}

// Loading Skeleton - Matches actual dashboard layout with grid
function AdminDashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Mobile Tabs Skeleton (< 1024px) */}
      <div className="lg:hidden mb-6">
        <div className="rounded-2xl border-2 border-gray-300 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <nav className="flex min-w-max">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-1 min-w-[120px] px-5 py-4">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Skeleton (≥ 1024px) - Uses grid col-span-1 */}
      <aside className="hidden lg:block lg:col-span-1">
        <div className="rounded-2xl border-2 border-gray-300 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden sticky top-4">
          <div className="divide-y divide-gray-200/50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                <div className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
              </div>
            ))}
            {/* External Link Skeleton */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </aside>

      {/* Content Area Skeleton - Uses grid col-span-3 */}
      <div className="lg:col-span-3">
        <div className="space-y-6 sm:space-y-8">
          {/* Stats Grid Skeleton */}
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border-2 border-gray-300 bg-white/80 backdrop-blur-xl p-4 sm:p-6 shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="h-3 w-20 bg-gray-300 rounded animate-pulse" />
                    <div className="h-8 sm:h-9 w-24 bg-gray-300 rounded animate-pulse" />
                  </div>
                  <div className="h-12 w-12 bg-gray-300 rounded-xl animate-pulse shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Order Status Overview Skeleton */}
          <div className="rounded-2xl border-2 border-gray-300 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="h-10 w-10 rounded-xl bg-gray-300 animate-pulse shrink-0" />
              <div className="h-7 w-48 max-w-full bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border-2 border-gray-300 bg-white/80 backdrop-blur-xl p-4 sm:p-5 md:p-6 shadow-lg"
                >
                  <div className="h-10 w-10 rounded-xl bg-gray-300 animate-pulse mb-3 md:mb-4" />
                  <div className="h-7 md:h-8 w-16 bg-gray-300 rounded animate-pulse mb-1" />
                  <div className="h-3 sm:h-4 w-20 bg-gray-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

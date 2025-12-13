// app/account/page.tsx
import { Suspense } from "react";
import { getCurrentUserServer } from "@/services/auth/auth-server.service";
import { getUserOrders } from "@/services/orders/order.service";
import { getSavedAddresses } from "@/services/users/user-server.service";
import { AccountDashboardClient } from "@/components/account/account-dashboard-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserCircle } from "lucide-react";

// Dynamic page - always fetch fresh data for user account
// No revalidation needed as this is user-specific data
export const dynamic = "force-dynamic";

export default async function AccountDashboard() {
  // Get current user
  const authResult = await getCurrentUserServer();

  // If not authenticated, show sign-in prompt
  if (!authResult.success || !authResult.user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] py-20 sm:py-24">
        <div className="text-center space-y-8 max-w-lg px-4 w-full">
          {/* Premium Card with Glass Effect */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-300/60 overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-50"></div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

            <div className="relative z-10">
              {/* Premium Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-3xl"></div>
                  <div className="relative h-20 w-20 rounded-3xl bg-linear-to-br from-primary to-primary/80 border-2 border-primary/30 flex items-center justify-center shadow-xl">
                    <UserCircle
                      className="h-10 w-10 text-white"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Access Your Dashboard
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
                Sign in to manage your orders, track shipments, save addresses,
                and customize your account preferences.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 h-12 px-10 font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
                <LogIn className="h-5 w-5 mr-2" strokeWidth={2.5} />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 hover:border-primary hover:bg-white h-12 px-10 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<AccountDashboardSkeleton />}>
      <AccountDashboardContent userId={authResult.user.id} />
    </Suspense>
  );
}

// Fetch ALL data at once for instant tab switching
async function AccountDashboardContent({ userId }: { userId: string }) {
  // Fetch all data in parallel
  const [orders, addresses] = await Promise.all([
    getUserOrders(userId),
    getSavedAddresses(userId),
  ]);

  // Pass all data to client component for instant tab switching
  return (
    <AccountDashboardClient
      userId={userId}
      initialOrders={orders}
      initialAddresses={addresses}
    />
  );
}

// Loading Skeleton - Premium Dashboard Style
function AccountDashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Mobile Tabs Skeleton (< 1024px) */}
      <div className="lg:hidden mb-6">
        <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <nav className="flex min-w-max bg-linear-to-r from-gray-50/50 to-white p-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[120px] px-5 py-3.5 rounded-xl"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <div className="h-4 w-4 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Skeleton (≥ 1024px) */}
      <aside className="hidden lg:block lg:col-span-1">
        <div className="sticky top-4 rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-300/50">
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="p-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3.5 mb-1 rounded-xl"
              >
                <div className="h-5 w-5 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Content Area Skeleton */}
      <div className="lg:col-span-3">
        <div className="space-y-6 sm:space-y-8">
          {/* Stats Grid Skeleton */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-24 bg-gray-300 rounded-lg animate-pulse" />
                  </div>
                  <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders Skeleton */}
          <div className="rounded-2xl border border-gray-300/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-300/50 p-6">
              <div className="h-7 w-32 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="divide-y divide-gray-200/50">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="h-4 w-40 max-w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-32 max-w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0">
                      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

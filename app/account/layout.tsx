// app/account/layout.tsx
import Link from "next/link";
import { ChevronRight, User } from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Premium Top Bar with Breadcrumbs */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-300/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
          <div className="flex items-center justify-between h-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <ChevronRight
                className="h-3.5 w-3.5 text-gray-400"
                strokeWidth={2.5}
              />
              <span className="text-gray-900 font-semibold">
                Account Dashboard
              </span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-8 lg:py-12">
        {/* Modern Dashboard Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            {/* Title Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
                  <div className="relative h-14 w-14 rounded-2xl bg-linear-to-br from-primary to-primary/80 border-2 border-primary/30 flex items-center justify-center shadow-lg">
                    <User className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    Account Dashboard
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500 mt-1 font-medium">
                    Manage your orders, addresses, and preferences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-size-[24px_24px] opacity-50 pointer-events-none"></div>

          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}

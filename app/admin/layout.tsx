export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-[1600px]">
        {/* Premium Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
                  <div className="relative h-14 w-14 rounded-2xl bg-linear-to-br from-primary to-primary/80 border-2 border-primary/30 flex items-center justify-center shadow-lg">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500 mt-1 font-medium">
                    Manage your store and customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout - Navigation is now handled by AdminDashboardClient */}
        <div className="grid gap-6 lg:gap-8">{children}</div>
      </div>
    </div>
  );
}

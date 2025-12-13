import { CustomerTable } from "../customer-table";
import type { AdminCustomer } from "@/services/admin/customer.service";
import { Users } from "lucide-react";

interface CustomersTabProps {
  customers: AdminCustomer[];
}

export function CustomersTab({ customers }: CustomersTabProps) {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header - Match Account Dashboard */}
      <div className="pb-4 border-b border-gray-200/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg">
              <Users className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Customers
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1.5 font-medium">
              View and manage customer accounts
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
        <CustomerTable customers={customers} loading={false} />
      </div>
    </div>
  );
}

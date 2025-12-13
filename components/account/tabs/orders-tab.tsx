import { OrdersTable } from '../orders-table'
import type { Order } from '@/types/cart'

interface OrdersTabProps {
  orders: Order[]
}

export function OrdersTab({ orders }: OrdersTabProps) {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Premium Header */}
      <div className="pb-6 border-b border-gray-200/50">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
          Order History
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium">
          View and track all your past orders
        </p>
      </div>

      {/* Premium Orders Table Card */}
      <div className="rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
        <OrdersTable orders={orders} />
      </div>
    </div>
  )
}



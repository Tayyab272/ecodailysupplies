import Link from 'next/link'
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ORDER_STATUS_CONFIG } from '@/lib/constants'
import type { Order } from '@/types/cart'

interface DashboardTabProps {
  userId: string
  orders: Order[]
}

export function DashboardTab({ orders }: DashboardTabProps) {
  // Calculate stats
  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
  const averageOrder = totalOrders > 0 ? totalSpent / totalOrders : 0
  const lastOrderDate =
    orders.length > 0
      ? orders[0].createdAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'No orders yet'

  // Get recent orders (limit 3)
  const recentOrders = orders.slice(0, 3)

  // Order status counts (single pass)
  const ordersByStatus = orders.reduce(
    (acc, order) => {
      if (order.status in acc) {
        acc[order.status as keyof typeof acc]++
      }
      return acc
    },
    { processing: 0, shipped: 0, delivered: 0, cancelled: 0 }
  )

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Premium Stats Grid */}
      <div className="grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<ShoppingBag className="h-5 w-5" strokeWidth={2.5} />}
          label="Total Orders"
          value={totalOrders.toString()}
          color="primary"
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5" strokeWidth={2.5} />}
          label="Total Spent"
          value={`£${totalSpent.toFixed(2)}`}
          color="secondary"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" strokeWidth={2.5} />}
          label="Average Order"
          value={`£${averageOrder.toFixed(2)}`}
          color="tertiary"
        />
        <StatCard
          icon={<Package className="h-5 w-5" strokeWidth={2.5} />}
          label="Last Order"
          value={lastOrderDate}
          small
          color="quaternary"
        />
      </div>

      {/* Order Status Breakdown - Premium Card */}
      {totalOrders > 0 && (
        <div className="rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
          <div className="mb-6 pb-5 border-b border-gray-200/50">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Order Status Overview
            </h3>
            <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-medium">
              Current status distribution
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-4">
            <StatusCard label="Processing" value={ordersByStatus.processing} color="processing" />
            <StatusCard label="Shipped" value={ordersByStatus.shipped} color="shipped" />
            <StatusCard label="Delivered" value={ordersByStatus.delivered} color="delivered" />
            <StatusCard label="Cancelled" value={ordersByStatus.cancelled} color="cancelled" />
          </div>
        </div>
      )}

      {/* Recent Orders - Premium Card */}
      <div className="rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="border-b border-gray-200/50 p-6 sm:p-8 bg-linear-to-r from-gray-50/50 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight sm:text-2xl">
                Recent Orders
              </h2>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-medium">
                Your latest order history
              </p>
            </div>
          </div>
        </div>

        {recentOrders.length === 0 ? (
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
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/60">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Start shopping to see your orders appear here
                </p>
              </div>
              <Link href="/products">
                <Button className="bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200/50">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component - Premium Style
function StatCard({
  icon,
  label,
  value,
  small = false,
  color = 'primary',
}: {
  icon: React.ReactNode
  label: string
  value: string
  small?: boolean
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
}) {
  const iconColors = {
    primary: 'bg-linear-to-br from-primary/20 to-primary/10 text-primary border-2 border-primary/30 shadow-lg shadow-primary/10',
    secondary: 'bg-linear-to-br from-gray-100 to-gray-50 text-gray-700 border-2 border-gray-200 shadow-md',
    tertiary: 'bg-linear-to-br from-primary/15 to-primary/5 text-primary border-2 border-primary/20 shadow-md',
    quaternary: 'bg-linear-to-br from-gray-50 to-white text-gray-600 border-2 border-gray-200 shadow-sm',
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-primary/40 hover:scale-[1.02]">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1 space-y-3 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-gray-500 tracking-wider uppercase">
            {label}
          </p>
          <p
            className={
              small
                ? 'text-lg sm:text-xl font-bold text-gray-900'
                : 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900'
            }
          >
            {value}
          </p>
        </div>
        <div
          className={`relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl transition-all duration-300 group-hover:scale-110 ${iconColors[color]}`}
        >
          {/* Icon Glow */}
          {color === 'primary' && (
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          <div className="relative z-10">{icon}</div>
        </div>
      </div>
    </div>
  )
}

// Status Card Component - Premium Style
function StatusCard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color?: 'processing' | 'shipped' | 'delivered' | 'cancelled'
}) {
  const statusColors = {
    processing: 'bg-linear-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200/60 shadow-lg shadow-blue-100/30',
    shipped: 'bg-linear-to-br from-purple-50 to-purple-100/50 border-2 border-purple-200/60 shadow-lg shadow-purple-100/30',
    delivered: 'bg-linear-to-br from-green-50 to-green-100/50 border-2 border-green-200/60 shadow-lg shadow-green-100/30',
    cancelled: 'bg-linear-to-br from-red-50 to-red-100/50 border-2 border-red-200/60 shadow-lg shadow-red-100/30',
  }

  return (
    <div
      className={`group relative rounded-2xl p-5 sm:p-6 ${statusColors[color || 'processing']} transition-all duration-300 hover:shadow-xl hover:scale-[1.03] overflow-hidden`}
    >
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-size-[12px_12px]"></div>
      
      <div className="relative">
        <div className="text-xs sm:text-sm font-bold mb-3 text-gray-700 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  )
}

// Order Card Component - Premium Style
function OrderCard({ order }: { order: Order }) {
  const statusConfig = ORDER_STATUS_CONFIG[order.status as keyof typeof ORDER_STATUS_CONFIG]
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
  const orderDate = order.createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link
      href={`/account/orders/${order.id}`}
      className="block p-5 sm:p-6 transition-all duration-300 hover:bg-linear-to-r hover:from-primary/5 hover:to-transparent group relative"
    >
      {/* Hover Border Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className="font-bold text-base sm:text-lg text-gray-900">
              #{order.orderNumber}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                statusConfig?.className || ORDER_STATUS_CONFIG.processing.className
              }`}
            >
              {statusConfig?.label || order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <span className="font-medium">{orderDate}</span>
            <span className="text-gray-400">•</span>
            <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-3 sm:gap-2">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            £{order.total.toFixed(2)}
          </div>
          <span className="text-xs sm:text-sm text-primary hover:text-primary/80 font-bold group-hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-1">
            View Details
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}



'use client'

import dynamic from 'next/dynamic'
import { TrendingUp, Package, BarChart3, PieChart, CalendarDays } from 'lucide-react'
import type { AdminOrder } from '@/services/admin/order.service'
import type { DashboardStats } from '@/services/admin/admin-server.service'
import { ChartSkeleton, DoughnutSkeleton } from '../chart-skeleton'

// Lazy-load heavy chart components
const RevenueChart = dynamic(
  () =>
    import('../revenue-chart').then((mod) => ({
      default: mod.RevenueChart,
    })),
  {
    ssr: false,
    loading: () => (
      <ChartSkeleton />
    ),
  }
)

const OrdersStatusChart = dynamic(
  () =>
    import('../orders-status-chart').then((mod) => ({
      default: mod.OrdersStatusChart,
    })),
  {
    ssr: false,
    loading: () => (
      <DoughnutSkeleton />
    ),
  }
)

const TopProductsList = dynamic(
  () =>
    import('../top-products-list').then((mod) => ({
      default: mod.TopProductsList,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-16 rounded-2xl border border-gray-200 bg-white animate-pulse" />
        ))}
      </div>
    ),
  }
)

interface AnalyticsTabProps {
  orders: AdminOrder[]
  stats: DashboardStats
}

export function AnalyticsTab({ orders, stats }: AnalyticsTabProps) {
  const weekday = buildWeekdaySeries(orders)
  const recent = buildRecentDailySeries(orders, 14)

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header - Match Account Dashboard */}
      <div className="pb-4 border-b border-gray-200/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg">
              <BarChart3 className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Analytics
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1.5 font-medium">
              Detailed insights and performance metrics
            </p>
          </div>
        </div>
      </div>

      {/* Useful quick charts (computed locally) */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border-2 border-primary/20">
              <CalendarDays className="h-6 w-6 text-primary" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                Orders by weekday
              </h3>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Demand pattern across the week
              </p>
            </div>
          </div>
          <WeekdayBars data={weekday} />
        </div>

        <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border-2 border-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                Last 14 days
              </h3>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Revenue and orders trend snapshot
              </p>
            </div>
          </div>
          <RecentTrendSparkline data={recent} />
        </div>
      </div>

      {/* Row 1: Revenue Chart */}
      <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border-2 border-primary/20">
            <TrendingUp className="h-6 w-6 text-primary" strokeWidth={2} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Revenue overview
          </h3>
        </div>
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <RevenueChart />
        </div>
      </div>

      {/* Row 2: Two Columns */}
      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Order Status Distribution */}
        <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border-2 border-primary/20">
              <PieChart className="h-6 w-6 text-primary" strokeWidth={2} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Order status distribution
            </h3>
          </div>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <OrdersStatusChart />
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border-2 border-primary/20">
              <Package className="h-6 w-6 text-primary" strokeWidth={2} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Top products
            </h3>
          </div>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <TopProductsList />
          </div>
        </div>
      </div>
    </div>
  )
}

type WeekdayDatum = { label: string; orders: number }
type RecentDatum = { label: string; orders: number; revenue: number }

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
  }
  return null
}

function buildWeekdaySeries(orders: AdminOrder[]): WeekdayDatum[] {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const buckets = new Array<number>(7).fill(0)

  for (const o of orders) {
    const d = toDate((o as unknown as { createdAt?: unknown }).createdAt)
    if (!d) continue
    // JS: 0=Sun..6=Sat -> map to Mon..Sun
    const day = d.getDay()
    const idx = day === 0 ? 6 : day - 1
    buckets[idx] += 1
  }

  return labels.map((label, i) => ({ label, orders: buckets[i] }))
}

function buildRecentDailySeries(orders: AdminOrder[], days: number): RecentDatum[] {
  const now = new Date()
  const start = new Date(now)
  start.setDate(start.getDate() - (days - 1))
  start.setHours(0, 0, 0, 0)

  const map = new Map<string, { orders: number; revenue: number }>()

  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    map.set(key, { orders: 0, revenue: 0 })
  }

  for (const o of orders) {
    const d = toDate((o as unknown as { createdAt?: unknown }).createdAt)
    if (!d) continue
    const dayKey = new Date(d.getFullYear(), d.getMonth(), d.getDate())
      .toISOString()
      .slice(0, 10)

    const bucket = map.get(dayKey)
    if (!bucket) continue

    bucket.orders += 1
    bucket.revenue += Number((o as unknown as { total?: unknown }).total) || 0
  }

  const formatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' })

  return [...map.entries()].map(([iso, v]) => ({
    label: formatter.format(new Date(iso)),
    orders: v.orders,
    revenue: v.revenue,
  }))
}

function WeekdayBars({ data }: { data: WeekdayDatum[] }) {
  const max = Math.max(1, ...data.map((d) => d.orders))

  return (
    <div className="grid grid-cols-7 gap-2 items-end h-40">
      {data.map((d) => {
        const height = Math.round((d.orders / max) * 100)
        return (
          <div key={d.label} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-xl bg-gray-100 border border-gray-200 h-28 flex items-end overflow-hidden">
              <div
                className="w-full bg-linear-to-t from-primary/80 to-primary"
                style={{ height: `${height}%` }}
              />
            </div>
            <div className="text-xs font-semibold text-gray-600">{d.label}</div>
          </div>
        )
      })}
    </div>
  )
}

function RecentTrendSparkline({ data }: { data: RecentDatum[] }) {
  const maxRevenue = Math.max(1, ...data.map((d) => d.revenue))
  const maxOrders = Math.max(1, ...data.map((d) => d.orders))

  const revenuePoints = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - (d.revenue / maxRevenue) * 100
      return `${x},${y}`
    })
    .join(' ')

  const ordersPoints = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - (d.orders / maxOrders) * 100
      return `${x},${y}`
    })
    .join(' ')

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            £{totalRevenue.toFixed(2)}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">{totalOrders}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <svg viewBox="0 0 100 100" className="h-28 w-full" preserveAspectRatio="none">
          <polyline
            points={revenuePoints}
            fill="none"
            stroke="rgb(234, 91, 111)"
            strokeWidth="2.5"
          />
          <polyline
            points={ordersPoints}
            fill="none"
            stroke="rgba(17, 24, 39, 0.5)"
            strokeWidth="2.5"
          />
        </svg>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-600 font-medium">
          <span>{data[0]?.label}</span>
          <span>{data[data.length - 1]?.label}</span>
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Revenue
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-700/50" />
            Orders
          </div>
        </div>
      </div>
    </div>
  )
}



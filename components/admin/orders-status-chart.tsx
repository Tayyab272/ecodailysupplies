"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Package } from "lucide-react";
import { DoughnutSkeleton } from "./chart-skeleton";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusData {
  status: string;
  count: number;
  percentage: number;
}

interface OrdersStatusChartProps {
  initialData?: StatusData[];
}

export function OrdersStatusChart({ initialData = [] }: OrdersStatusChartProps) {
  const [data, setData] = useState<StatusData[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);

  useEffect(() => {
    if (!initialData.length) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/analytics?type=ordersByStatus");

      if (!response.ok) {
        throw new Error("Failed to fetch status data");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching status data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: data.map((entry) => entry.status),
    datasets: [
      {
        data: data.map((entry) => entry.count),
        backgroundColor: [
          "rgba(203, 213, 225, 0.8)", // Pending - slate-300
          "rgba(234, 91, 111, 0.35)", // Processing - primary/35
          "rgba(234, 91, 111, 0.55)", // Shipped - primary/55
          "rgba(234, 91, 111, 0.75)", // Delivered - primary/75
          "rgba(239, 68, 68, 0.8)", // Cancelled - red-500
        ],
        borderColor: [
          "rgb(203, 213, 225)", // slate-300
          "rgba(234, 91, 111, 0.45)", // primary/45
          "rgba(234, 91, 111, 0.65)", // primary/65
          "rgba(234, 91, 111, 0.9)", // primary/90
          "rgb(239, 68, 68)", // red-500
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            family: "Inter, sans-serif",
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = ((value / context.dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
        titleFont: {
          family: "Inter, sans-serif",
          size: 13,
          weight: 600,
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 12,
        },
      },
    },
  };

  if (loading) {
    return <DoughnutSkeleton />;
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-2xl bg-primary/10 p-4 border-2 border-primary/20 shadow-lg">
              <Package className="mx-auto h-12 w-12 text-primary" strokeWidth={2.5} />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/60">
            <p className="mt-4 text-lg font-medium text-gray-900">No orders yet</p>
            <p className="mt-2 text-sm text-gray-600">
              Order status data will appear here once orders are placed
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate center text
  const totalOrders = data.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <div className="relative h-[400px]">
      <Doughnut data={chartData} options={chartOptions} />
      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{totalOrders}</div>
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            Total Orders
          </div>
        </div>
      </div>
    </div>
  );
}

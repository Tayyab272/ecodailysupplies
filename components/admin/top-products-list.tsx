"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Package } from "lucide-react";

interface TopProduct {
  name: string;
  quantity: number;
  revenue: number;
}

interface TopProductsListProps {
  initialData?: TopProduct[];
  limit?: number;
}

export function TopProductsList({ initialData = [], limit = 10 }: TopProductsListProps) {
  const [products, setProducts] = useState<TopProduct[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);

  useEffect(() => {
    if (!initialData.length) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/analytics?type=topProducts&limit=${limit}`);

      if (!response.ok) {
        throw new Error("Failed to fetch top products");
      }

      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching top products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mx-auto" />
          <p className="text-sm text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/60">
          <div className="flex justify-center mb-4">
            <div className="rounded-2xl bg-primary/10 p-4 border-2 border-primary/20 shadow-lg">
              <Package className="h-12 w-12 text-primary" strokeWidth={2.5} />
            </div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-900">No products data</p>
          <p className="mt-2 text-sm text-gray-600">
            Product analytics will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product, index) => {
        // Medal colors for top 3 - premium primary/neutral theme
        const getRankColor = (rank: number) => {
          if (rank === 0) return "from-primary to-primary/80 text-white";
          if (rank === 1) return "from-gray-900 to-gray-700 text-white";
          if (rank === 2) return "from-primary/70 to-primary/50 text-white";
          return "from-gray-100 to-gray-50 text-gray-700";
        };

        return (
          <div
            key={product.name}
            className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${getRankColor(
                  index
                )} shadow-lg`}
              >
                <span className="text-lg font-bold">#{index + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 transition-colors group-hover:text-primary">
                  {product.name}
                </div>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Package className="h-3 w-3" strokeWidth={2} />
                    {product.quantity} sold
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {formatCurrency(product.revenue)}
              </div>
              <div className="text-xs text-gray-600">Revenue</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Helper function for currency formatting
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}


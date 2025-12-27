/**
 * Shared Constants
 * Centralized constants used across the application
 */

import type { OrderStatus } from "@/types/cart";

// Re-export OrderStatus for convenience
export type { OrderStatus };

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { className: string; label: string }
> = {
  pending: {
    className: "bg-amber-100 text-amber-700",
    label: "Pending",
  },
  processing: {
    className: "bg-blue-100 text-blue-700",
    label: "Processing",
  },
  shipped: {
    className: "bg-primary/20 text-primary",
    label: "Shipped",
  },
  delivered: {
    className: "bg-primary text-white",
    label: "Delivered",
  },
  cancelled: {
    className: "bg-red-100 text-red-600",
    label: "Cancelled",
  },
};

export const DASHBOARD_COLORS: Record<
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "quinary"
  | "senary"
  | "septenary"
  | "octonary"
  | "nonary"
  | "denary",
  string
> = {
  primary: "bg-[#EA5B6F]",
  secondary: "bg-[#FF894F]",
  tertiary: "bg-[#FFCB61]",
  quaternary: "bg-[#77BEF0]",
  quinary: "bg-indigo-400",
  senary: "bg-purple-400",
  septenary: "bg-green-400",
  octonary: "bg-red-400",
  nonary: "bg-[#000000]",
  denary: "bg-[#FFFFFF]",
};

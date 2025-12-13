"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SHIPPING_OPTIONS } from "@/types/shipping";
import { Check } from "lucide-react";

interface ShippingSelectorProps {
  selectedShippingId: string;
  onShippingChange: (shippingId: string) => void;
}

export function ShippingSelector({
  selectedShippingId,
  onShippingChange,
}: ShippingSelectorProps) {
  return (
    <div className="space-y-3">
      <RadioGroup
        value={selectedShippingId}
        onValueChange={onShippingChange}
        className="space-y-2"
      >
        {SHIPPING_OPTIONS.map((option) => (
          <div
            key={option.id}
            className={`relative flex items-start rounded-lg border-2 p-3 transition-all ${
              selectedShippingId === option.id
                ? "border-primary bg-primary text-white shadow-md"
                : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm"
            }`}
          >
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className="sr-only"
            />
            <Label
              htmlFor={option.id}
              className="flex-1 cursor-pointer min-w-0 w-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-semibold ${
                        selectedShippingId === option.id
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {option.name}
                    </span>
                    {selectedShippingId === option.id && (
                      <Check className="h-4 w-4 text-white shrink-0" />
                    )}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      selectedShippingId === option.id
                        ? "text-white/90"
                        : "text-gray-600"
                    }`}
                  >
                    {option.deliveryTime}
                  </p>
                </div>
                <span
                  className={`font-bold shrink-0 ${
                    selectedShippingId === option.id
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {option.price === 0 ? (
                    <span
                      className={
                        selectedShippingId === option.id
                          ? "text-white"
                          : "text-primary"
                      }
                    >
                      Free
                    </span>
                  ) : (
                    `£${option.price.toFixed(2)}`
                  )}
                </span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <p className="text-xs text-gray-500 mt-3">
        * Delivery times are estimates and may vary. Orders are processed
        Monday-Friday (excluding UK bank holidays).
      </p>
    </div>
  );
}

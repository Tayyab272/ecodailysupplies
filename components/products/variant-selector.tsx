"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProductVariant } from "@/types/product";

interface VariantSelectorProps {
  variants: ProductVariant[];
  label?: string;
  onVariantChange?: (variantId: string) => void;
}

export function VariantSelector({
  variants,
  label = "Size",
  onVariantChange,
}: VariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    variants[0]?.id || ""
  );

  const handleValueChange = (value: string) => {
    if (value) {
      setSelectedVariant(value);
      onVariantChange?.(value);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
          {label.toUpperCase()}
        </span>
        {selectedVariant && (
          <span className="text-xs text-gray-500">
            {variants.find((v) => v.id === selectedVariant)?.name}
          </span>
        )}
      </div>
      <ToggleGroup
        type="single"
        value={selectedVariant}
        onValueChange={handleValueChange}
        className="flex flex-wrap gap-2"
      >
        {variants.map((variant) => (
          <ToggleGroupItem
            key={variant.id}
            value={variant.id}
            aria-label={`Select ${variant.name}`}
            className="h-10 min-w-11 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:font-bold data-[state=on]:shadow-sm data-[state=on]:ring-2 data-[state=on]:ring-primary/20"
          >
            {variant.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useMemo,
  useCallback,
  useState,
  useEffect,
  startTransition,
} from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroup {
  name: string;
  key: string;
  options: FilterOption[];
}

const baseFilters: FilterGroup[] = [
  {
    name: "Category",
    key: "category",
    options: [
      { value: "boxes", label: "Boxes" },
      { value: "bubble-wrap", label: "Bubble Wrap" },
      { value: "packing-tape", label: "Packing Tape" },
      { value: "envelopes", label: "Envelopes" },
      { value: "containers", label: "Containers" },
    ],
  },
  {
    name: "Material",
    key: "material",
    options: [
      { value: "cardboard", label: "Cardboard" },
      { value: "plastic", label: "Plastic" },
      { value: "paper", label: "Paper" },
      { value: "foam", label: "Foam" },
      { value: "metal", label: "Metal" },
    ],
  },
];

type CategoryOption = { value: string; label: string };

function FilterContent({
  categories,
  onClose,
}: {
  categories?: CategoryOption[];
  onClose?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [optimisticFilters, setOptimisticFilters] = useState<
    Record<string, string[]>
  >({});

  const filters: FilterGroup[] = useMemo(() => {
    if (categories && categories.length > 0) {
      return [
        { name: "Category", key: "category", options: categories },
        ...baseFilters.filter((f) => f.key !== "category"),
      ];
    }
    return baseFilters;
  }, [categories]);

  const activeFilters = useMemo(() => {
    const filters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      if (
        key !== "sort" &&
        key !== "search" &&
        key !== "priceMin" &&
        key !== "priceMax"
      ) {
        filters[key] = value.split(",");
      }
    });
    return filters;
  }, [searchParams]);

  const updateFilters = useCallback(
    (key: string, value: string, checked: boolean) => {
      setOptimisticFilters((prev) => {
        const newFilters = { ...prev };
        const currentValues = newFilters[key] || activeFilters[key] || [];
        const newValues = [...currentValues];

        if (checked) {
          if (!newValues.includes(value)) newValues.push(value);
        } else {
          const index = newValues.indexOf(value);
          if (index > -1) newValues.splice(index, 1);
        }

        if (newValues.length > 0) {
          newFilters[key] = newValues;
        } else {
          delete newFilters[key];
        }
        return newFilters;
      });

      const params = new URLSearchParams(searchParams.toString());
      const currentValues = params.get(key)?.split(",").filter(Boolean) || [];
      const newValues = [...currentValues];

      if (checked) {
        if (!newValues.includes(value)) newValues.push(value);
      } else {
        const index = newValues.indexOf(value);
        if (index > -1) newValues.splice(index, 1);
      }

      if (newValues.length > 0) params.set(key, newValues.join(","));
      else params.delete(key);

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, router, activeFilters]
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams();
    const sort = searchParams.get("sort");
    const search = searchParams.get("search");
    if (sort) params.set("sort", sort);
    if (search) params.set("search", search);

    setOptimisticFilters({});
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
    onClose?.();
  }, [searchParams, pathname, router, onClose]);

  useEffect(() => {
    setOptimisticFilters({});
  }, [searchParams]);

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-gray-500 hover:text-black underline transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={filters.map((f) => f.key)}
        className="w-full"
      >
        {filters.map((filter) => (
          <AccordionItem
            key={filter.key}
            value={filter.key}
            className="border-none mb-6"
          >
            <AccordionTrigger className="py-2 text-sm font-bold text-gray-900 hover:no-underline hover:text-gray-600">
              {filter.name}
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-2">
              <div className="space-y-3">
                {filter.options.map((option) => {
                  const isChecked =
                    optimisticFilters[filter.key]?.includes(option.value) ||
                    activeFilters[filter.key]?.includes(option.value) ||
                    false;
                  return (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 group"
                    >
                      <Checkbox
                        id={`${filter.key}-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          updateFilters(
                            filter.key,
                            option.value,
                            checked as boolean
                          )
                        }
                        className="rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <Label
                        htmlFor={`${filter.key}-${option.value}`}
                        className="flex-1 cursor-pointer text-sm font-medium text-gray-600 group-hover:text-black transition-colors"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function ProductFilters({
  categories,
}: {
  categories?: CategoryOption[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden mb-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full border-gray-200 bg-white text-gray-900"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter Products
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md bg-white">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-left text-xl font-bold">Filters</SheetTitle>
            </SheetHeader>
            <FilterContent
              categories={categories}
              onClose={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden lg:block">
        <FilterContent categories={categories} />
      </aside>
    </>
  );
}

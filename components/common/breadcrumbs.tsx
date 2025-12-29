"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // Generate BreadcrumbList structured data for SEO
  useEffect(() => {
    if (typeof window === "undefined") return;

    const siteUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        ...items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: item.label,
          item: item.href ? `${siteUrl}${item.href}` : undefined,
        })),
      ],
    };

    // Remove script if it already exists
    const existingScript = document.getElementById("breadcrumb-schema");
    if (existingScript) {
      existingScript.remove();
    }

    // Add new script
    const script = document.createElement("script");
    script.id = "breadcrumb-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumbList);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("breadcrumb-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  // Get the last item (current page)
  const lastItem = items[items.length - 1];
  // Get items to show on mobile (Home > ... > Current)
  const mobileItems = items.length > 2 ? [items[0], lastItem] : items;

  return (
    <nav
      className={cn(
        "mb-6 md:mb-8 flex items-center justify-start py-3 md:py-4 overflow-x-auto scrollbar-hide",
        className
      )}
      aria-label="Breadcrumb"
    >
      {/* Desktop: Show all breadcrumbs */}
      <div className="hidden md:flex items-center gap-2 flex-wrap">
        {/* Home Link */}
        <Link
          href="/"
          className="text-xs font-bold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors whitespace-nowrap"
        >
          Home
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight
              className="h-3 w-3 text-gray-400 shrink-0"
              strokeWidth={2}
            />

            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                  index === items.length - 1
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider whitespace-nowrap">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Show Home > ... > Current (if more than 2 items) */}
      <div className="flex md:hidden items-center gap-1.5 min-w-0 flex-1">
        {/* Home Link */}
        <Link
          href="/"
          className="text-xs font-bold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors shrink-0"
        >
          Home
        </Link>

        {items.length > 2 && (
          <>
            <ChevronRight
              className="h-3 w-3 text-gray-400 shrink-0"
              strokeWidth={2}
            />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0">
              ...
            </span>
          </>
        )}

        {mobileItems.slice(1).map((item) => {
          const actualIndex = items.indexOf(item);
          const isLast = actualIndex === items.length - 1;

          return (
            <div
              key={actualIndex}
              className="flex items-center gap-1.5 min-w-0"
            >
              <ChevronRight
                className="h-3 w-3 text-gray-400 shrink-0"
                strokeWidth={2}
              />

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-xs font-bold text-gray-600 uppercase tracking-wider transition-colors truncate max-w-[120px]"
                  title={item.label}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-xs font-bold text-gray-900 uppercase tracking-wider truncate max-w-[150px]"
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

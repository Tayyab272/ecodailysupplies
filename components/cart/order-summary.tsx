import { Cart } from "@/types/cart";

interface OrderSummaryProps {
  summary: Cart;
  showTitle?: boolean;
}

export function OrderSummary({ summary, showTitle = true }: OrderSummaryProps) {
  return (
    <div className="space-y-4">
      {showTitle && (
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">
          Order Summary
        </h3>
      )}

      <div className="space-y-4 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Subtotal</span>
          <span className="font-semibold text-gray-900">
            £{summary.subtotal.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        {summary.discount > 0 && (
          <div className="flex justify-between items-center text-primary">
            <span className="font-medium">Discount</span>
            <span className="font-semibold">
              -£{summary.discount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Shipping</span>
          <span className="font-semibold text-gray-900">
            {summary.shipping === 0 ? (
              <span className="text-primary font-bold">Free</span>
            ) : (
              `£${summary.shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-4" />

        {/* Total */}
        <div className="flex justify-between items-center text-base">
          <span className="font-bold text-gray-900 uppercase tracking-wider">
            Total
          </span>
          <span className="font-bold text-gray-900 text-xl">
            £{summary.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Order Confirmation Email Template
 *
 * Optimized for deliverability with:
 * - Preheader text for preview
 * - Proper text-to-image ratio
 * - Physical address in footer
 * - Clean, professional design
 */

import * as React from "react";
import type { Order } from "@/types/cart";

interface OrderConfirmationEmailProps {
  order: Order;
  customerEmail: string;
}

export const OrderConfirmationEmail: React.FC<
  Readonly<OrderConfirmationEmailProps>
> = ({ order, customerEmail }) => {
  const orderDate = order.createdAt.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const preheaderText = `Thank you for your order #${order.orderNumber}. Your order total is £${order.total.toFixed(2)}.`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <title>{`Your Eco Daily Supplies Order #${order.orderNumber}`}</title>
      </head>
      <body
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          lineHeight: "1.6",
          color: "#333333",
          backgroundColor: "#f5f5f5",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Preheader text - hidden but shown in email preview */}
        <div
          style={{
            display: "none",
            fontSize: "1px",
            color: "#f5f5f5",
            lineHeight: "1px",
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
            overflow: "hidden",
          }}
        >
          {preheaderText}
          {/* Padding to push other content out of preview */}
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        </div>

        <table
          role="presentation"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ backgroundColor: "#f5f5f5", padding: "32px 16px" }}
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="600"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  backgroundColor: "#ffffff",
                  maxWidth: "600px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* Header */}
                <tr>
                  <td
                    style={{
                      backgroundColor: "#1a1a1a",
                      padding: "28px 32px",
                      textAlign: "center",
                    }}
                  >
                    <h1
                      style={{
                        margin: 0,
                        color: "#ffffff",
                        fontSize: "22px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                      }}
                    >
                      Eco Daily Supplies
                    </h1>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#cccccc",
                        fontSize: "13px",
                      }}
                    >
                      Sustainable Packaging Solutions
                    </p>
                  </td>
                </tr>

                {/* Order Confirmed Message */}
                <tr>
                  <td style={{ padding: "40px 32px 24px", textAlign: "center" }}>
                    <table
                      role="presentation"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ margin: "0 auto 20px" }}
                    >
                      <tr>
                        <td
                          style={{
                            width: "56px",
                            height: "56px",
                            backgroundColor: "#e8f5e9",
                            borderRadius: "50%",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <span style={{ fontSize: "24px", color: "#2e7d32" }}>
                            &#10003;
                          </span>
                        </td>
                      </tr>
                    </table>

                    <h2
                      style={{
                        margin: "0 0 8px",
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#1a1a1a",
                      }}
                    >
                      Order Confirmed
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        color: "#666666",
                        fontSize: "15px",
                      }}
                    >
                      Thank you for your order. We will notify you when it has been dispatched.
                    </p>
                  </td>
                </tr>

                {/* Order Details */}
                <tr>
                  <td style={{ padding: "0 32px 24px" }}>
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <tr>
                        <td style={{ padding: "18px 20px" }}>
                          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                            <tr>
                              <td width="50%">
                                <p
                                  style={{
                                    margin: "0 0 4px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "#888888",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Order Number
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    color: "#1a1a1a",
                                  }}
                                >
                                  #{order.orderNumber}
                                </p>
                              </td>
                              <td width="50%" align="right">
                                <p
                                  style={{
                                    margin: "0 0 4px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "#888888",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Order Date
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "15px",
                                    color: "#1a1a1a",
                                  }}
                                >
                                  {orderDate}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Order Items */}
                <tr>
                  <td style={{ padding: "0 32px 24px" }}>
                    <h3
                      style={{
                        margin: "0 0 14px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#1a1a1a",
                      }}
                    >
                      Items Ordered
                    </h3>
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        borderTop: "1px solid #e0e0e0",
                      }}
                    >
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              padding: "14px 0",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                              <tr>
                                <td style={{ verticalAlign: "top" }}>
                                  <p
                                    style={{
                                      margin: "0 0 4px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#1a1a1a",
                                    }}
                                  >
                                    {item.product?.name || "Product"}
                                  </p>
                                  {item.variant && (
                                    <p
                                      style={{
                                        margin: "0 0 2px",
                                        fontSize: "13px",
                                        color: "#666666",
                                      }}
                                    >
                                      {item.variant.name}
                                    </p>
                                  )}
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: "13px",
                                      color: "#888888",
                                    }}
                                  >
                                    Qty: {item.quantity} x £{item.pricePerUnit.toFixed(2)}
                                  </p>
                                </td>
                                <td
                                  align="right"
                                  style={{ verticalAlign: "top" }}
                                >
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#1a1a1a",
                                    }}
                                  >
                                    £{(item.pricePerUnit * item.quantity).toFixed(2)}
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ))}
                    </table>

                    {/* Order Summary */}
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ marginTop: "14px" }}
                    >
                      <tr>
                        <td
                          style={{
                            padding: "6px 0",
                            fontSize: "14px",
                            color: "#666666",
                          }}
                        >
                          Subtotal
                        </td>
                        <td
                          align="right"
                          style={{
                            padding: "6px 0",
                            fontSize: "14px",
                            color: "#1a1a1a",
                          }}
                        >
                          £{order.subtotal.toFixed(2)}
                        </td>
                      </tr>
                      {order.discount > 0 && (
                        <tr>
                          <td
                            style={{
                              padding: "6px 0",
                              fontSize: "14px",
                              color: "#2e7d32",
                            }}
                          >
                            Discount
                          </td>
                          <td
                            align="right"
                            style={{
                              padding: "6px 0",
                              fontSize: "14px",
                              color: "#2e7d32",
                            }}
                          >
                            -£{order.discount.toFixed(2)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          style={{
                            padding: "6px 0",
                            fontSize: "14px",
                            color: "#666666",
                          }}
                        >
                          Shipping
                        </td>
                        <td
                          align="right"
                          style={{
                            padding: "6px 0",
                            fontSize: "14px",
                            color: "#1a1a1a",
                          }}
                        >
                          {order.shipping === 0 ? "FREE" : `£${order.shipping.toFixed(2)}`}
                        </td>
                      </tr>
                      {(order as any).vatAmount && (order as any).vatAmount > 0 && (
                        <tr>
                          <td
                            style={{
                              padding: "6px 0",
                              fontSize: "14px",
                              color: "#666666",
                            }}
                          >
                            VAT (20%)
                          </td>
                          <td
                            align="right"
                            style={{
                              padding: "6px 0",
                              fontSize: "14px",
                              color: "#1a1a1a",
                            }}
                          >
                            £{((order as any).vatAmount).toFixed(2)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          style={{
                            padding: "14px 0 0",
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#1a1a1a",
                            borderTop: "2px solid #e0e0e0",
                          }}
                        >
                          Total
                        </td>
                        <td
                          align="right"
                          style={{
                            padding: "14px 0 0",
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#1a1a1a",
                            borderTop: "2px solid #e0e0e0",
                          }}
                        >
                          £{order.total.toFixed(2)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Shipping Address */}
                <tr>
                  <td style={{ padding: "0 32px 24px" }}>
                    <h3
                      style={{
                        margin: "0 0 14px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#1a1a1a",
                      }}
                    >
                      Delivery Address
                    </h3>
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <tr>
                        <td style={{ padding: "18px 20px" }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "14px",
                              color: "#333333",
                              lineHeight: "1.6",
                            }}
                          >
                            <strong>{order.shippingAddress.fullName}</strong>
                            <br />
                            {order.shippingAddress.address}
                            {(() => {
                              const addr2 =
                                (order.shippingAddress as unknown as Record<string, unknown>)?.address2 ||
                                (order.shippingAddress as unknown as Record<string, unknown>)?.address_line_2;
                              return addr2 ? (
                                <>
                                  <br />
                                  {String(addr2)}
                                </>
                              ) : null;
                            })()}
                            <br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            <br />
                            {order.shippingAddress.country}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* CTA Button */}
                <tr>
                  <td style={{ padding: "0 32px 32px" }}>
                    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                      <tr>
                        <td align="center">
                          <a
                            href={`https://ecodailysupplies.com/account/orders/${order.id}`}
                            style={{
                              display: "inline-block",
                              backgroundColor: "#1a1a1a",
                              color: "#ffffff",
                              padding: "14px 28px",
                              textDecoration: "none",
                              borderRadius: "6px",
                              fontWeight: "bold",
                              fontSize: "14px",
                            }}
                          >
                            View Order Details
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "28px 32px",
                      textAlign: "center",
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontSize: "13px",
                        color: "#666666",
                      }}
                    >
                      Questions about your order? Contact us at{" "}
                      <a
                        href="mailto:sales@ecodailysupplies.com"
                        style={{
                          color: "#1a1a1a",
                          textDecoration: "underline",
                        }}
                      >
                        sales@ecodailysupplies.com
                      </a>
                    </p>
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontSize: "12px",
                        color: "#888888",
                      }}
                    >
                      Free UK delivery on orders over £50
                    </p>
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontSize: "12px",
                        color: "#888888",
                        lineHeight: "1.5",
                      }}
                    >
                      <strong>Eco Daily Supplies Ltd</strong>
                      <br />
                      Unit CW10, Challenge Way, Blackburn, BB1 5QF
                      <br />
                      United Kingdom | Company No. 16187854
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        color: "#aaaaaa",
                      }}
                    >
                      © {new Date().getFullYear()} Eco Daily Supplies Ltd. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default OrderConfirmationEmail;

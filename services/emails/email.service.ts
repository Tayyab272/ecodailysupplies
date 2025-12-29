/**
 * Email Service
 *
 * Centralized service for sending transactional emails using Resend.
 * Optimized for deliverability with proper headers and templates.
 */

import { render } from "@react-email/render";
import React from "react";
import {
  getResendClient,
  EMAIL_CONFIG,
  getEmailRecipient,
  isResendConfigured,
} from "@/lib/resend/config";
import { OrderConfirmationEmail } from "@/lib/emails/order-confirmation";
import { ContactFormEmail } from "@/lib/emails/contact-form";
import type { Order } from "@/types/cart";

// Get email domain for admin email
const getEmailDomain = (): string => {
  if (process.env.RESEND_EMAIL_DOMAIN) {
    return process.env.RESEND_EMAIL_DOMAIN;
  }
  return "ecodailysupplies.com";
};

const emailDomain = getEmailDomain();

// Company footer for all emails (important for spam prevention)
const companyFooter = `
  <p style="margin: 0 0 8px; font-size: 12px; color: #888888; line-height: 1.5;">
    <strong>Eco Daily Supplies Ltd</strong><br>
    Unit CW10, Challenge Way, Blackburn, BB1 5QF<br>
    United Kingdom | Company No. 16187854
  </p>
`;

/**
 * Send order confirmation email
 *
 * Sends order confirmation to customer and notification to admin
 */
export async function sendOrderConfirmationEmail(
  order: Order,
  customerEmail: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!isResendConfigured()) {
      console.warn(
        "Resend is not configured. Skipping email send. Set RESEND_API_KEY in .env.local"
      );
      return {
        success: false,
        error: "Resend not configured",
      };
    }

    const resend = getResendClient();

    // Render email template to HTML string
    const emailHtml = await render(
      React.createElement(OrderConfirmationEmail, {
        order,
        customerEmail,
      }),
      {
        pretty: false,
      }
    );

    if (typeof emailHtml !== "string" || !emailHtml) {
      throw new Error("Failed to render email template: HTML is not a string");
    }

    const adminEmail = `info@${emailDomain}`;

    // Send email to customer with reply-to header
    const customerResult = await resend.emails.send({
      from: EMAIL_CONFIG.from.orders,
      to: customerEmail,
      replyTo: EMAIL_CONFIG.replyTo.orders,
      subject: EMAIL_CONFIG.subjects.orderConfirmation(order.orderNumber),
      html: emailHtml,
    });

    if (customerResult.error) {
      console.error(
        "Failed to send order confirmation email to customer:",
        customerResult.error
      );
    }

    // Admin notification email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light">
        <title>New Order #${order.orderNumber}</title>
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5; margin: 0; padding: 0;">
        <!-- Preheader -->
        <div style="display: none; font-size: 1px; color: #f5f5f5; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">
          New order #${order.orderNumber} received. Total: £${order.total.toFixed(2)} from ${customerEmail}.
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 8px; overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background-color: #1a1a1a; padding: 28px 32px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: bold; letter-spacing: 1px;">Eco Daily Supplies</h1>
                    <p style="margin: 6px 0 0; color: #cccccc; font-size: 13px;">Admin Notification</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 32px;">
                    <!-- Badge -->
                    <span style="display: inline-block; background-color: #e8f5e9; color: #2e7d32; font-size: 12px; font-weight: bold; text-transform: uppercase; padding: 6px 12px; border-radius: 4px; margin-bottom: 20px;">New Order</span>

                    <h2 style="margin: 16px 0 8px; font-size: 22px; font-weight: bold; color: #1a1a1a;">Order #${order.orderNumber}</h2>
                    <p style="margin: 0 0 24px; color: #666666; font-size: 15px;">Payment confirmed - £${order.total.toFixed(2)}</p>

                    <!-- Order Info -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <p style="margin: 0 0 4px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Customer</p>
                          <p style="margin: 0 0 14px; font-size: 14px; color: #1a1a1a;">${customerEmail}</p>
                          <p style="margin: 0 0 4px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Date</p>
                          <p style="margin: 0; font-size: 14px; color: #1a1a1a;">${new Date(order.createdAt).toLocaleString("en-GB")}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Items -->
                    <h3 style="margin: 0 0 14px; font-size: 14px; font-weight: bold; color: #1a1a1a;">Items (${order.items.length})</h3>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #e0e0e0; margin-bottom: 20px;">
                      ${order.items
                        .map(
                          (item) => `
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                            <p style="margin: 0 0 2px; font-size: 14px; font-weight: bold; color: #1a1a1a;">${item.product?.name || "Product"}</p>
                            ${item.variant ? `<p style="margin: 0 0 2px; font-size: 13px; color: #666666;">${item.variant.name}</p>` : ""}
                            <p style="margin: 0; font-size: 13px; color: #888888;">Qty: ${item.quantity} x £${item.pricePerUnit.toFixed(2)}</p>
                          </td>
                          <td align="right" style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top;">
                            <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1a1a1a;">£${(item.pricePerUnit * item.quantity).toFixed(2)}</p>
                          </td>
                        </tr>
                      `
                        )
                        .join("")}
                    </table>

                    <!-- Shipping -->
                    <h3 style="margin: 0 0 14px; font-size: 14px; font-weight: bold; color: #1a1a1a;">Delivery Address</h3>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6;">
                            <strong>${order.shippingAddress.fullName}</strong><br>
                            ${order.shippingAddress.address}<br>
                            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                            ${order.shippingAddress.country}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="https://ecodailysupplies.com/admin?tab=orders" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">View in Dashboard</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f5f5f5; padding: 24px 32px; text-align: center; border-top: 1px solid #e0e0e0;">
                    ${companyFooter}
                    <p style="margin: 0; font-size: 11px; color: #aaaaaa;">This is an automated notification.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const adminResult = await resend.emails.send({
      from: EMAIL_CONFIG.from.orders,
      to: adminEmail,
      replyTo: customerEmail,
      subject: `New Order #${order.orderNumber} - £${order.total.toFixed(2)}`,
      html: adminEmailHtml,
      bcc: EMAIL_CONFIG.bcc.orders,
    });

    if (adminResult.error) {
      console.error(
        "Failed to send order notification email to admin:",
        adminResult.error
      );
      if (!customerResult.error) {
        return {
          success: true,
          messageId: customerResult.data?.id,
        };
      }
    }

    if (customerResult.error && adminResult.error) {
      return {
        success: false,
        error:
          customerResult.error.message ||
          adminResult.error.message ||
          "Failed to send emails",
      };
    }

    return {
      success: true,
      messageId: customerResult.data?.id || adminResult.data?.id,
    };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send contact form submission email
 */
export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!isResendConfigured()) {
      console.warn(
        "Resend is not configured. Skipping email send. Set RESEND_API_KEY in .env.local"
      );
      return {
        success: false,
        error: "Resend not configured",
      };
    }

    const resend = getResendClient();

    const emailHtml = await render(
      React.createElement(ContactFormEmail, {
        ...data,
        submittedAt: new Date(),
      }),
      {
        pretty: false,
      }
    );

    if (typeof emailHtml !== "string" || !emailHtml) {
      throw new Error(
        "Failed to render contact form email template: HTML is not a string"
      );
    }

    const toEmail =
      EMAIL_CONFIG.defaults.testEmail || EMAIL_CONFIG.replyTo.support;

    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from.support,
      to: toEmail,
      replyTo: data.email,
      subject: EMAIL_CONFIG.subjects.contactFormSubmission,
      html: emailHtml,
      bcc: EMAIL_CONFIG.bcc.contact,
    });

    if (result.error) {
      console.error("Failed to send contact form email:", result.error);
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send order shipped notification
 */
export async function sendOrderShippedEmail(
  order: Order,
  customerEmail: string,
  trackingNumber: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!isResendConfigured()) {
      console.warn("Resend is not configured. Skipping email send.");
      return {
        success: false,
        error: "Resend not configured",
      };
    }

    const resend = getResendClient();

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light">
        <title>Your Order #${order.orderNumber} Has Been Dispatched</title>
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5; margin: 0; padding: 0;">
        <!-- Preheader -->
        <div style="display: none; font-size: 1px; color: #f5f5f5; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">
          Great news! Your order #${order.orderNumber} is on its way. Track your shipment with tracking number: ${trackingNumber}.
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 8px; overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background-color: #1a1a1a; padding: 28px 32px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: bold; letter-spacing: 1px;">Eco Daily Supplies</h1>
                    <p style="margin: 6px 0 0; color: #cccccc; font-size: 13px;">Sustainable Packaging Solutions</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 32px; text-align: center;">
                    <!-- Icon -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 20px;">
                      <tr>
                        <td style="width: 56px; height: 56px; background-color: #e8f5e9; border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="font-size: 24px;">&#128666;</span>
                        </td>
                      </tr>
                    </table>

                    <h2 style="margin: 0 0 8px; font-size: 22px; font-weight: bold; color: #1a1a1a;">Your Order is On Its Way</h2>
                    <p style="margin: 0 0 24px; color: #666666; font-size: 15px;">Order #${order.orderNumber} has been dispatched</p>

                    <!-- Tracking Info -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 20px; text-align: center;">
                          <p style="margin: 0 0 4px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Tracking Number</p>
                          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1a1a1a; font-family: monospace;">${trackingNumber}</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 24px; color: #666666; font-size: 14px;">You can track your package using the tracking number above with your carrier.</p>

                    <!-- CTA -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="https://ecodailysupplies.com/account/orders/${order.id}" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">View Order Details</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f5f5f5; padding: 28px 32px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="margin: 0 0 10px; font-size: 13px; color: #666666;">
                      Questions? Contact us at <a href="mailto:info@ecodailysupplies.com" style="color: #1a1a1a; text-decoration: underline;">info@ecodailysupplies.com</a>
                    </p>
                    ${companyFooter}
                    <p style="margin: 0; font-size: 11px; color: #aaaaaa;">
                      © ${new Date().getFullYear()} Eco Daily Supplies Ltd. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from.orders,
      to: getEmailRecipient(customerEmail),
      replyTo: EMAIL_CONFIG.replyTo.orders,
      subject: EMAIL_CONFIG.subjects.orderShipped(order.orderNumber),
      html: emailHtml,
    });

    if (result.error) {
      console.error("Failed to send order shipped email:", result.error);
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error("Error sending order shipped email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send B2B request notification email
 */
export async function sendB2BRequestEmail(request: {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productsInterested: string;
  estimatedQuantity: string;
  createdAt: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!isResendConfigured()) {
      console.warn(
        "Resend is not configured. Skipping email send. Set RESEND_API_KEY in .env.local"
      );
      return {
        success: false,
        error: "Resend not configured",
      };
    }

    const resend = getResendClient();

    const toEmail =
      EMAIL_CONFIG.defaults.testEmail || EMAIL_CONFIG.replyTo.support;

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light">
        <title>New B2B Request from ${request.companyName}</title>
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5; margin: 0; padding: 0;">
        <!-- Preheader -->
        <div style="display: none; font-size: 1px; color: #f5f5f5; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">
          New wholesale inquiry from ${request.companyName}. Contact: ${request.contactName} (${request.email}).
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 8px; overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background-color: #1a1a1a; padding: 28px 32px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: bold; letter-spacing: 1px;">Eco Daily Supplies</h1>
                    <p style="margin: 6px 0 0; color: #cccccc; font-size: 13px;">Admin Notification</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 32px;">
                    <!-- Badge -->
                    <span style="display: inline-block; background-color: #dbeafe; color: #1d4ed8; font-size: 12px; font-weight: bold; text-transform: uppercase; padding: 6px 12px; border-radius: 4px; margin-bottom: 20px;">B2B Request</span>

                    <h2 style="margin: 16px 0 8px; font-size: 22px; font-weight: bold; color: #1a1a1a;">Wholesale Enquiry</h2>
                    <p style="margin: 0 0 24px; color: #666666; font-size: 15px;">New B2B bulk order request from ${request.companyName}</p>

                    <!-- Company Info -->
                    <h3 style="margin: 0 0 14px; font-size: 14px; font-weight: bold; color: #1a1a1a;">Company Details</h3>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                <p style="margin: 0 0 2px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Company</p>
                                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1a1a1a;">${request.companyName}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                <p style="margin: 0 0 2px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Contact Name</p>
                                <p style="margin: 0; font-size: 14px; color: #1a1a1a;">${request.contactName}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                <p style="margin: 0 0 2px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Email</p>
                                <p style="margin: 0; font-size: 14px;"><a href="mailto:${request.email}" style="color: #2e7d32; text-decoration: none;">${request.email}</a></p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0 0 2px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Phone</p>
                                <p style="margin: 0; font-size: 14px;"><a href="tel:${request.phone}" style="color: #2e7d32; text-decoration: none;">${request.phone}</a></p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Request Details -->
                    <h3 style="margin: 0 0 14px; font-size: 14px; font-weight: bold; color: #1a1a1a;">Request Details</h3>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                <p style="margin: 0 0 2px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Products Interested</p>
                                <p style="margin: 0; font-size: 14px; color: #1a1a1a;">${request.productsInterested}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                <p style="margin: 0 0 2px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Estimated Quantity</p>
                                <p style="margin: 0; font-size: 14px; color: #1a1a1a;">${request.estimatedQuantity}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0 0 2px; font-size: 12px; font-weight: bold; color: #888888; text-transform: uppercase;">Submitted</p>
                                <p style="margin: 0; font-size: 14px; color: #1a1a1a;">${new Date(request.createdAt).toLocaleString("en-GB")}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="https://ecodailysupplies.com/admin?tab=b2b-requests" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">View in Dashboard</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f5f5f5; padding: 24px 32px; text-align: center; border-top: 1px solid #e0e0e0;">
                    ${companyFooter}
                    <p style="margin: 0; font-size: 11px; color: #aaaaaa;">This is an automated notification.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from.support,
      to: toEmail,
      replyTo: request.email,
      subject: `New B2B Enquiry from ${request.companyName}`,
      html: emailHtml,
      bcc: EMAIL_CONFIG.bcc.contact,
    });

    if (result.error) {
      console.error("Failed to send B2B request email:", result.error);
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error("Error sending B2B request email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Test email configuration
 */
export async function sendTestEmail(
  toEmail: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!isResendConfigured()) {
      return {
        success: false,
        error: "Resend not configured. Set RESEND_API_KEY in .env.local",
      };
    }

    const resend = getResendClient();

    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from.noreply,
      to: toEmail,
      replyTo: EMAIL_CONFIG.replyTo.support,
      subject: "Eco Daily Supplies - Test Email",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light">
          <title>Test Email</title>
        </head>
        <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5; margin: 0; padding: 0;">
          <!-- Preheader -->
          <div style="display: none; font-size: 1px; color: #f5f5f5; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">
            Your Eco Daily Supplies email configuration is working correctly.
          </div>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 32px 16px;">
            <tr>
              <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="background-color: #1a1a1a; padding: 28px 32px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: bold; letter-spacing: 1px;">Eco Daily Supplies</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 32px; text-align: center;">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 20px;">
                        <tr>
                          <td style="width: 56px; height: 56px; background-color: #e8f5e9; border-radius: 50%; text-align: center; vertical-align: middle;">
                            <span style="font-size: 24px; color: #2e7d32;">&#10003;</span>
                          </td>
                        </tr>
                      </table>
                      <h2 style="margin: 0 0 8px; font-size: 22px; font-weight: bold; color: #1a1a1a;">Test Email Successful</h2>
                      <p style="margin: 0 0 20px; color: #666666; font-size: 15px;">Your email configuration is working correctly.</p>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0;">
                        <tr>
                          <td style="padding: 18px 20px;">
                            <p style="margin: 0 0 6px; font-size: 13px; color: #666666;"><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
                            <p style="margin: 0; font-size: 13px; color: #666666;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f5f5f5; padding: 24px 32px; text-align: center; border-top: 1px solid #e0e0e0;">
                      ${companyFooter}
                      <p style="margin: 0; font-size: 11px; color: #aaaaaa;">This is a test notification.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (result.error) {
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

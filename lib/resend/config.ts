/**
 * Resend Configuration
 *
 * This file configures the Resend email service for sending transactional emails.
 *
 * Usage:
 * - Import { resend } for server-side email sending
 * - Import EMAIL_CONFIG for email addresses and settings
 */

import { Resend } from "resend";

/**
 * Initialize Resend client
 *
 * IMPORTANT: This uses lazy initialization to prevent build-time errors.
 * The API key is only accessed when emails are actually sent (runtime).
 */
let resendInstance: Resend | null = null;

export const getResendClient = (): Resend => {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Missing RESEND_API_KEY environment variable. Please add it to .env.local"
      );
    }

    resendInstance = new Resend(apiKey);
  }

  return resendInstance;
};

/**
 * Get the email domain from environment or use default
 * This allows easy configuration via environment variables
 */
const getEmailDomain = (): string => {
  // Allow override via environment variable
  if (process.env.RESEND_EMAIL_DOMAIN) {
    return process.env.RESEND_EMAIL_DOMAIN;
  }
  // Default to verified domain
  return "ecodailysupplies.co.uk";
};

const emailDomain = getEmailDomain();
const isProduction = process.env.NODE_ENV === "production";
// Use verified domain if explicitly set or in production
const useVerifiedDomain = isProduction || !!process.env.RESEND_EMAIL_DOMAIN;

/**
 * Email Configuration
 *
 * Central configuration for all email-related settings
 * Uses verified domain when available (production or RESEND_EMAIL_DOMAIN is set)
 */
export const EMAIL_CONFIG = {
  // From addresses
  from: {
    orders: useVerifiedDomain
      ? `EcoDailySupplies Orders <sales@${emailDomain}>`
      : "EcoDailySupplies Orders <onboarding@resend.dev>",
    support: useVerifiedDomain
      ? `EcoDailySupplies Support <info@${emailDomain}>`
      : "EcoDailySupplies Support <onboarding@resend.dev>",
    noreply: useVerifiedDomain
      ? `EcoDailySupplies <noreply@${emailDomain}>`
      : "EcoDailySupplies <onboarding@resend.dev>",
  },

  // Reply-to addresses
  replyTo: {
    support: useVerifiedDomain
      ? `info@${emailDomain}`
      : process.env.RESEND_TEST_EMAIL || "testveot@gmail.com",
  },

  // BCC addresses for internal tracking (optional)
  bcc: {
    orders: process.env.RESEND_BCC_ORDERS || undefined,
    contact: process.env.RESEND_BCC_CONTACT || undefined,
  },

  // Email subjects
  subjects: {
    orderConfirmation: (orderNumber: string) =>
      `Order Confirmation - #${orderNumber}`,
    orderShipped: (orderNumber: string) =>
      `Your Order Has Shipped - #${orderNumber}`,
    orderDelivered: (orderNumber: string) =>
      `Your Order Has Been Delivered - #${orderNumber}`,
    contactFormSubmission: "New Contact Form Submission",
    passwordReset: "Reset Your Password",
    welcome: "Welcome to EcoDailySupplies",
  },

  // Default settings
  defaults: {
    // For development, send all emails to this address
    testMode: process.env.NODE_ENV !== "production",
    testEmail: process.env.RESEND_TEST_EMAIL || undefined,
  },
} as const;

/**
 * Helper function to get the correct "to" address based on environment
 *
 * In development, emails are sent to a test address instead of real users
 * In production, emails are sent to actual recipients
 */
export function getEmailRecipient(email: string): string {
  if (EMAIL_CONFIG.defaults.testMode && EMAIL_CONFIG.defaults.testEmail) {
    console.log(
      `[DEV MODE] Email would be sent to: ${email}, redirecting to: ${EMAIL_CONFIG.defaults.testEmail}`
    );
    return EMAIL_CONFIG.defaults.testEmail;
  }

  return email;
}

/**
 * Helper to check if Resend is properly configured
 */
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

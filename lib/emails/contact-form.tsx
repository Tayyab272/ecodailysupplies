/**
 * Contact Form Email Template
 *
 * Sent to the support team when someone submits the contact form.
 * Optimized for deliverability with proper structure and company details.
 */

import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  submittedAt: Date;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  company,
  phone,
  message,
  submittedAt,
}) => {
  const formattedDate = submittedAt.toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const preheaderText = `New contact form submission from ${name}${company ? ` (${company})` : ""}.`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <title>{`New Contact Form Enquiry from ${name}`}</title>
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
        {/* Preheader text */}
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
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
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
                      Contact Form Notification
                    </p>
                  </td>
                </tr>

                {/* Main Content */}
                <tr>
                  <td style={{ padding: "32px" }}>
                    {/* Alert Badge */}
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ marginBottom: "24px" }}
                    >
                      <tr>
                        <td>
                          <span
                            style={{
                              display: "inline-block",
                              backgroundColor: "#fff3cd",
                              color: "#856404",
                              fontSize: "12px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              padding: "6px 12px",
                              borderRadius: "4px",
                            }}
                          >
                            New Enquiry
                          </span>
                        </td>
                        <td align="right">
                          <p
                            style={{
                              margin: 0,
                              fontSize: "13px",
                              color: "#888888",
                            }}
                          >
                            {formattedDate}
                          </p>
                        </td>
                      </tr>
                    </table>

                    {/* Contact Details */}
                    <h2
                      style={{
                        margin: "0 0 16px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#1a1a1a",
                      }}
                    >
                      Contact Information
                    </h2>

                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                        marginBottom: "24px",
                      }}
                    >
                      <tr>
                        <td style={{ padding: "18px 20px" }}>
                          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                            {/* Name */}
                            <tr>
                              <td
                                style={{
                                  padding: "10px 0",
                                  borderBottom: "1px solid #e0e0e0",
                                }}
                              >
                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                  <tr>
                                    <td
                                      width="100"
                                      style={{
                                        fontSize: "13px",
                                        color: "#888888",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Name
                                    </td>
                                    <td
                                      style={{
                                        fontSize: "14px",
                                        color: "#1a1a1a",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {name}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            {/* Email */}
                            <tr>
                              <td
                                style={{
                                  padding: "10px 0",
                                  borderBottom: company || phone ? "1px solid #e0e0e0" : "none",
                                }}
                              >
                                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                  <tr>
                                    <td
                                      width="100"
                                      style={{
                                        fontSize: "13px",
                                        color: "#888888",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Email
                                    </td>
                                    <td>
                                      <a
                                        href={`mailto:${email}`}
                                        style={{
                                          fontSize: "14px",
                                          color: "#2e7d32",
                                          textDecoration: "none",
                                        }}
                                      >
                                        {email}
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            {/* Company */}
                            {company && (
                              <tr>
                                <td
                                  style={{
                                    padding: "10px 0",
                                    borderBottom: phone ? "1px solid #e0e0e0" : "none",
                                  }}
                                >
                                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                    <tr>
                                      <td
                                        width="100"
                                        style={{
                                          fontSize: "13px",
                                          color: "#888888",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Company
                                      </td>
                                      <td
                                        style={{
                                          fontSize: "14px",
                                          color: "#1a1a1a",
                                        }}
                                      >
                                        {company}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            )}

                            {/* Phone */}
                            {phone && (
                              <tr>
                                <td style={{ padding: "10px 0" }}>
                                  <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                                    <tr>
                                      <td
                                        width="100"
                                        style={{
                                          fontSize: "13px",
                                          color: "#888888",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Phone
                                      </td>
                                      <td>
                                        <a
                                          href={`tel:${phone}`}
                                          style={{
                                            fontSize: "14px",
                                            color: "#2e7d32",
                                            textDecoration: "none",
                                          }}
                                        >
                                          {phone}
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </table>
                        </td>
                      </tr>
                    </table>

                    {/* Message */}
                    <h2
                      style={{
                        margin: "0 0 16px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#1a1a1a",
                      }}
                    >
                      Message
                    </h2>

                    <table
                      role="presentation"
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                        marginBottom: "24px",
                      }}
                    >
                      <tr>
                        <td style={{ padding: "20px" }}>
                          <p
                            style={{
                              margin: 0,
                              whiteSpace: "pre-wrap",
                              color: "#333333",
                              fontSize: "14px",
                              lineHeight: "1.7",
                            }}
                          >
                            {message}
                          </p>
                        </td>
                      </tr>
                    </table>

                    {/* Reply Button */}
                    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                      <tr>
                        <td align="center">
                          <a
                            href={`mailto:${email}?subject=Re: Your Enquiry to Eco Daily Supplies`}
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
                            Reply to {name.split(" ")[0]}
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
                      padding: "24px 32px",
                      textAlign: "center",
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 8px",
                        fontSize: "12px",
                        color: "#888888",
                      }}
                    >
                      This is an automated notification from the Eco Daily Supplies contact form.
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#888888",
                      }}
                    >
                      <strong>Eco Daily Supplies Ltd</strong> | Unit CW10, Challenge Way, Blackburn, BB1 5QF
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

export default ContactFormEmail;

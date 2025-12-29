import { Breadcrumbs } from "@/components/common";
import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

export const metadata: Metadata = {
  title: "Privacy Policy | EcoDailySupplies UK",
  description:
    "Read the EcoDailySupplies privacy policy. Learn how we protect your data, handle cookies, and comply with UK GDPR. Your privacy matters to us.",
  openGraph: {
    title: "Privacy Policy | EcoDailySupplies UK",
    description: "Learn how EcoDailySupplies protects your personal data and complies with UK privacy regulations.",
    url: `${siteUrl}/privacy`,
    siteName: "EcoDailySupplies",
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

type Purpose = {
  id: string;
  title: string;
  data: string[];
  basis: string;
  retention: string;
};

type Processor = {
  name: string;
  country: string;
  purpose: string;
};

const WEBSITE_URL = "https://ecodailysupplies.com";
const LAST_UPDATED = "July 24, 2024";

const PURPOSES: Purpose[] = [
  {
    id: "contact",
    title: "1.1 Contact - Through phone, mail, email and/or webforms",
    data: [
      "A first and last name",
      "Account name or alias",
      "A home or other physical address, including street name and name of a city or town",
      "An email address",
      "A telephone number",
      "IP Address",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
      "Geolocation data",
      "Date of birth",
      "Commercial information, including records of personal property, products or services purchased, obtained, or considered",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
  {
    id: "payments",
    title: "1.2 Payments",
    data: [
      "A first and last name",
      "Account name or alias",
      "A home or other physical address, including street name and name of a city or town",
      "An email address",
      "IP Address",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
      "Geolocation data",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
  {
    id: "registering-an-account",
    title: "1.3 Registering an account",
    data: [
      "A first and last name",
      "Account name or alias",
      "An email address",
      "A telephone number",
      "IP Address",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
      "Geolocation data",
      "A home or other physical address, including street name and name of a city or town",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
  {
    id: "newsletters",
    title: "1.4 Newsletters",
    data: [
      "A first and last name",
      "Account name or alias",
      "A home or other physical address, including street name and name of a city or town",
      "An email address",
      "A telephone number",
      "IP Address",
      "Geolocation data",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
  {
    id: "support-services-products",
    title:
      "1.5 To support services or products that a customer wants to buy or has purchased",
    data: [
      "A first and last name",
      "Account name or alias",
      "A home or other physical address, including street name and name of a city or town",
      "An email address",
      "IP Address",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
      "Geolocation data",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
  {
    id: "legal-obligations",
    title: "1.6 To be able to comply with legal obligations",
    data: [
      "A first and last name",
      "A home or other physical address, including street name and name of a city or town",
      "Account name or alias",
      "IP Address",
      "An email address",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
      "Geolocation data",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
  {
    id: "statistics",
    title: "1.7 Compiling and analyzing statistics for website improvement.",
    data: [
      "A first and last name",
      "Account name or alias",
      "A home or other physical address, including street name and name of a city or town",
      "An email address",
      "IP Address",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
      "Geolocation data",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
  {
    id: "personalized-products-services",
    title: "1.8 To be able to offer personalized products and services",
    data: [
      "A first and last name",
      "Account name or alias",
      "An email address",
      "A home or other physical address, including street name and name of a city or town",
      "IP Address",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
      "Geolocation data",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
  {
    id: "deliveries",
    title: "1.9 Deliveries",
    data: [
      "A first and last name",
      "Account name or alias",
      "A home or other physical address, including street name and name of a city or town",
      "An email address",
      "IP Address",
      "Internet activity information, including, but not limited to, browsing history, search history, and information regarding a consumer's interaction with an Internet Web site, application, or advertisement",
      "Geolocation data",
    ],
    basis: "Upon the provision of consent.",
    retention:
      "Upon termination of the service we retain this data for the following period: 6 Years.",
  },
];

const PROCESSORS: Processor[] = [
  { name: "Evri", country: "UK", purpose: "Deliveries" },
];

const toc = [
  { id: "intro", label: "Overview" },
  {
    id: "purpose-data-retention",
    label: "1. Purpose, data and retention period",
  },
  { id: "sharing", label: "2. Sharing with other parties" },
  { id: "cookies", label: "3. Cookies" },
  { id: "disclosure-practices", label: "4. Disclosure practices" },
  { id: "security", label: "5. Security" },
  { id: "third-party-websites", label: "6. Third-party websites" },
  { id: "amendments", label: "7. Amendments" },
  { id: "access-modify", label: "8. Accessing and modifying your data" },
  { id: "complaints", label: "9. Submitting a complaint" },
  { id: "children", label: "10. Children" },
  { id: "contact", label: "11. Contact details" },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-grey-300 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-5">
          <Breadcrumbs
            items={[{ label: "Privacy Policy", href: "/privacy" }]}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-10 sm:py-12">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-grey-300 bg-white p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                On this page
              </div>
              <nav className="mt-4 space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div>
            <div className="mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
                Privacy
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Privacy statement
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl">
                This privacy statement was last updated on {LAST_UPDATED} and
                applies to citizens and legal permanent residents of the United
                Kingdom.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <section
                id="intro"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  Overview
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    In this privacy statement, we explain what we do with the
                    data we obtain about you via {WEBSITE_URL}. We recommend you
                    carefully read this statement. In our processing we comply
                    with the requirements of privacy legislation. That means,
                    among other things, that:
                  </p>
                  <ul className="ml-5 list-disc space-y-2">
                    <li>
                      we clearly state the purposes for which we process
                      personal data. We do this by means of this privacy
                      statement;
                    </li>
                    <li>
                      we aim to limit our collection of personal data to only
                      the personal data required for legitimate purposes;
                    </li>
                    <li>
                      we first request your explicit consent to process your
                      personal data in cases requiring your consent;
                    </li>
                    <li>
                      we take appropriate security measures to protect your
                      personal data and also require this from parties that
                      process personal data on our behalf;
                    </li>
                    <li>
                      we respect your right to access your personal data or have
                      it corrected or deleted, at your request.
                    </li>
                  </ul>
                  <p>
                    If you have any questions, or want to know exactly what data
                    we keep of you, please contact us.
                  </p>
                </div>
              </section>

              <section
                id="purpose-data-retention"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  1. Purpose, data and retention period
                </h2>
                <div className="space-y-6 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    We may collect or receive personal information for a number
                    of purposes connected with our business operations which may
                    include the following:
                  </p>

                  {PURPOSES.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-xl border border-grey-300 bg-gray-50 p-5"
                    >
                      <h3 className="text-base font-bold text-gray-900">
                        {p.title}
                      </h3>

                      <div className="mt-3 space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            For this purpose we use the following data:
                          </p>
                          <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-700">
                            {p.data.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            The basis on which we may process these data is:
                          </p>
                          <p className="mt-1 text-sm text-gray-700">
                            {p.basis}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Retention period
                          </p>
                          <p className="mt-1 text-sm text-gray-700">
                            {p.retention}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="sharing"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  2. Sharing with other parties
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    We only share or disclose this data to processors for the
                    following purposes:
                  </p>
                  <div className="mt-2 overflow-x-auto rounded-xl border border-grey-300 bg-white">
                    <table className="min-w-full">
                      <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                        <tr>
                          <th className="border-b border-grey-300 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                            Name
                          </th>
                          <th className="border-b border-grey-300 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                            Country
                          </th>
                          <th className="border-b border-grey-300 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                            Purpose
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {PROCESSORS.map((proc) => (
                          <tr
                            key={proc.name}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {proc.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {proc.country}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {proc.purpose}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section
                id="cookies"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  3. Cookies
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    Our website uses cookies. For more information about
                    cookies, please refer to our Cookie Policy.
                  </p>
                </div>
              </section>

              <section
                id="disclosure-practices"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  4. Disclosure practices
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    We disclose personal information if we are required by law
                    or by a court order, in response to a law enforcement
                    agency, to the extent permitted under other provisions of
                    law, to provide information, or for an investigation on a
                    matter related to public safety.
                  </p>
                  <p>
                    If our website or organisation is taken over, sold, or
                    involved in a merger or acquisition, your details may be
                    disclosed to our advisers and any prospective purchasers and
                    will be passed on to the new owners.
                  </p>
                  <p>
                    We have concluded a data processing agreement with Google.
                  </p>
                </div>
              </section>

              <section
                id="security"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  5. Security
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    We are committed to the security of personal data. We take
                    appropriate security measures to limit abuse of and
                    unauthorised access to personal data. This ensures that only
                    the necessary persons have access to your data, that access
                    to the data is protected, and that our security measures are
                    regularly reviewed.
                  </p>
                </div>
              </section>

              <section
                id="third-party-websites"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  6. Third-party websites
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    This privacy statement does not apply to third-party
                    websites connected by links on our website. We cannot
                    guarantee that these third parties handle your personal data
                    in a reliable or secure manner. We recommend you read the
                    privacy statements of these websites prior to making use of
                    these websites.
                  </p>
                </div>
              </section>

              <section
                id="amendments"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  7. Amendments to this privacy statement
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    We reserve the right to make amendments to this privacy
                    statement. It is recommended that you consult this privacy
                    statement regularly in order to be aware of any changes. In
                    addition, we will actively inform you wherever possible.
                  </p>
                </div>
              </section>

              <section
                id="access-modify"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  8. Accessing and modifying your data
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    If you have any questions or want to know which personal
                    data we have about you, please contact us. You can contact
                    us by using the information below. You have the following
                    rights:
                  </p>
                  <ul className="ml-5 list-disc space-y-2">
                    <li>
                      You have the right to know why your personal data is
                      needed, what will happen to it, and how long it will be
                      retained for.
                    </li>
                    <li>
                      Right of access: You have the right to access your
                      personal data that is known to us.
                    </li>
                    <li>
                      Right to rectification: you have the right to supplement,
                      correct, have deleted or blocked your personal data
                      whenever you wish.
                    </li>
                    <li>
                      If you give us your consent to process your data, you have
                      the right to revoke that consent and to have your personal
                      data deleted.
                    </li>
                    <li>
                      Right to transfer your data: you have the right to request
                      all your personal data from the controller and transfer it
                      in its entirety to another controller.
                    </li>
                    <li>
                      Right to object: you may object to the processing of your
                      data. We comply with this, unless there are justified
                      grounds for processing.
                    </li>
                  </ul>
                  <p>
                    Please make sure to always clearly state who you are, so
                    that we can be certain that we do not modify or delete any
                    data of the wrong person.
                  </p>
                </div>
              </section>

              <section
                id="complaints"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  9. Submitting a complaint
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    If you are not satisfied with the way in which we handle (a
                    complaint about) the processing of your personal data, you
                    have the right to submit a complaint to the Information
                    Commissioner&apos;s Office:
                  </p>
                  <div className="mt-2 rounded-xl border border-grey-300 bg-gray-50 p-5">
                    <p className="text-sm font-semibold text-gray-900">
                      Wycliffe House
                    </p>
                    <p className="text-sm text-gray-700">Water Lane</p>
                    <p className="text-sm text-gray-700">Wilmslow</p>
                    <p className="text-sm text-gray-700">Cheshire</p>
                    <p className="text-sm text-gray-700">SK9 5AF</p>
                  </div>
                </div>
              </section>

              <section
                id="children"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  10. Children
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>
                    Our website is not designed to attract children and it is
                    not our intent to collect personal data from children under
                    the age of consent in their country of residence. We
                    therefore request that children under the age of consent do
                    not submit any personal data to us.
                  </p>
                </div>
              </section>

              <section
                id="contact"
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-grey-300"
              >
                <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  11. Contact details
                </h2>
                <div className="space-y-3 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p className="font-semibold text-gray-900">
                    Eco Daily Supplies Ltd
                  </p>
                  <p>
                    Unit Cw10 Challenge Way Entrance, Ik Business Park,
                    Blackburn, England, BB1 5QF
                  </p>
                  <p>United Kingdom</p>
                  <p>
                    Website:{" "}
                    <span className="font-medium text-gray-900">
                      {WEBSITE_URL}
                    </span>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:sales@ecodailysupplies.com"
                      className="text-primary underline hover:text-primary/80 font-medium"
                    >
                      sales@ecodailysupplies.com
                    </a>
                  </p>
                  <p>
                    Phone number:{" "}
                    <a
                      href="tel:07397057703"
                      className="text-primary underline hover:text-primary/80 font-medium"
                    >
                      07397057703
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

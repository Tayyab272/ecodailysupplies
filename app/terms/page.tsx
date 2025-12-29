import { Breadcrumbs } from "@/components/common";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.co.uk";

export const metadata: Metadata = {
  title: "Terms & Conditions | EcoDailySupplies UK",
  description:
    "Read the EcoDailySupplies terms and conditions. Learn about ordering, delivery, returns, and your rights when shopping for packaging supplies in the UK.",
  openGraph: {
    title: "Terms & Conditions | EcoDailySupplies UK",
    description: "Terms and conditions for ordering packaging supplies from EcoDailySupplies UK.",
    url: `${siteUrl}/terms`,
    siteName: "EcoDailySupplies",
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

type TermsSection = {
  id: string;
  number: number;
  title: string;
  content: ReactNode;
};

const SECTIONS: TermsSection[] = [
  {
    id: "introduction",
    number: 1,
    title: "Introduction",
    content: (
      <>
        <p>
          These Terms and conditions apply to this website and to the
          transactions related to our products and services. You may be bound by
          additional contracts related to your relationship with us or any
          products or services that you receive from us. If any provisions of
          the additional contracts conflict with any provisions of these Terms,
          the provisions of these additional contracts will control and prevail.
        </p>
      </>
    ),
  },
  {
    id: "binding",
    number: 2,
    title: "Binding",
    content: (
      <>
        <p>
          By registering with, accessing, or otherwise using this website, you
          hereby agree to be bound by these Terms and conditions set forth
          below. The mere use of this website implies the knowledge and
          acceptance of these Terms and conditions. In some particular cases, we
          can also ask you to explicitly agree.
        </p>
      </>
    ),
  },
  {
    id: "electronic-communication",
    number: 3,
    title: "Electronic communication",
    content: (
      <>
        <p>
          By using this website or communicating with us by electronic means,
          you agree and acknowledge that we may communicate with you
          electronically on our website or by sending an email to you, and you
          agree that all agreements, notices, disclosures, and other
          communications that we provide to you electronically satisfy any legal
          requirement, including but not limited to the requirement that such
          communications should be in writing.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: 4,
    title: "Intellectual property",
    content: (
      <>
        <p>
          We or our licensors own and control all of the copyright and other
          intellectual property rights in the website and the data, information,
          and other resources displayed by or accessible within the website.
        </p>
        <h3 className="pt-2 text-base font-bold text-gray-900">
          4.1 All the rights are reserved
        </h3>
        <p>
          Unless specific content dictates otherwise, you are not granted a
          license or any other right under Copyright, Trademark, Patent, or
          other Intellectual Property Rights. This means that you will not use,
          copy, reproduce, perform, display, distribute, embed into any
          electronic medium, alter, reverse engineer, decompile, transfer,
          download, transmit, monetize, sell, market, or commercialize any
          resources on this website in any form, without our prior written
          permission, except and only insofar as otherwise stipulated in
          regulations of mandatory law (such as the right to quote).
        </p>
      </>
    ),
  },
  {
    id: "newsletter",
    number: 5,
    title: "Newsletter",
    content: (
      <>
        <p>
          Notwithstanding the foregoing, you may forward our newsletter in the
          electronic form to others who may be interested in visiting our
          website.
        </p>
      </>
    ),
  },
  {
    id: "third-party-property",
    number: 6,
    title: "Third-party property",
    content: (
      <>
        <p>
          Our website may include hyperlinks or other references to other
          party&apos;s websites. We do not monitor or review the content of
          other party&apos;s websites which are linked to from this website.
          Products or services offered by other websites shall be subject to the
          applicable Terms and Conditions of those third parties. Opinions
          expressed or material appearing on those websites are not necessarily
          shared or endorsed by us.
        </p>
        <p>
          We will not be responsible for any privacy practices or content of
          these sites. You bear all risks associated with the use of these
          websites and any related third-party services. We will not accept any
          responsibility for any loss or damage in whatever manner, however
          caused, resulting from your disclosure to third parties of personal
          information.
        </p>
      </>
    ),
  },
  {
    id: "responsible-use",
    number: 7,
    title: "Responsible use",
    content: (
      <>
        <p>
          By visiting our website, you agree to use it only for the purposes
          intended and as permitted by these Terms, any additional contracts
          with us, and applicable laws, regulations, and generally accepted
          online practices and industry guidelines. You must not use our website
          or services to use, publish or distribute any material which consists
          of (or is linked to) malicious computer software; use data collected
          from our website for any direct marketing activity, or conduct any
          systematic or automated data collection activities on or in relation
          to our website.
        </p>
        <p>
          Engaging in any activity that causes, or may cause, damage to the
          website or that interferes with the performance, availability, or
          accessibility of the website is strictly prohibited.
        </p>
      </>
    ),
  },
  {
    id: "registration",
    number: 8,
    title: "Registration",
    content: (
      <>
        <p>
          You may register for an account with our website. During this process,
          you may be required to choose a password. You are responsible for
          maintaining the confidentiality of passwords and account information
          and agree not to share your passwords, account information, or secured
          access to our website or services with any other person. You must not
          allow any other person to use your account to access the website
          because you are responsible for all activities that occur through the
          use of your passwords or accounts. You must notify us immediately if
          you become aware of any disclosure of your password.
        </p>
        <p>
          After account termination, you will not attempt to register a new
          account without our permission.
        </p>
      </>
    ),
  },
  {
    id: "refund-and-return-policy",
    number: 9,
    title: "Refund and Return policy",
    content: (
      <>
        <h3 className="pt-2 text-base font-bold text-gray-900">
          9.1 Right of withdrawal
        </h3>
        <p>
          You have the right to withdraw from this contract within 30 days
          without giving any reason.
        </p>
        <p>
          The withdrawal period will expire after 30 days from the day on which
          you acquire, or a third-party other than the carrier and indicated by
          you acquires, physical possession of the goods.
        </p>
        <p>
          To exercise the right of withdrawal, you must inform us of your
          decision to withdraw from this contract by an unequivocal statement
          (for example a letter sent by post, fax, or email). Our contact
          details can be found below. You may use the attached model withdrawal
          form, but it is not obligatory.
        </p>
        <p>
          If you use this option, we will communicate to you an acknowledgement
          of receipt of such a withdrawal on a durable medium (for example by
          email) without delay.
        </p>
        <p>
          To meet the withdrawal deadline, it is sufficient for you to send your
          communication concerning your exercise of the right of withdrawal
          before the withdrawal period has expired.
        </p>

        <h3 className="pt-2 text-base font-bold text-gray-900">
          9.2 Effects of withdrawal
        </h3>
        <p>
          If you withdraw from this contract, we shall reimburse you all
          payments received from you, including the costs of delivery (with the
          exception of the supplementary costs resulting from your choice of a
          type of delivery other than the least expensive type of standard
          delivery offered by us), without undue delay and in any event not
          later than 14 days from the day on which we are informed about your
          decision to withdraw from this contract. We will carry out such
          reimbursement using the same means of payment as you used for the
          initial transaction unless you have expressly agreed otherwise; in any
          event, you will not incur any fees as a result of such reimbursement.
        </p>
        <p>We will collect the goods.</p>
        <p>You will have to bear the direct cost of returning the goods.</p>
        <p>
          You are only liable for any diminished value of the goods resulting
          from the handling other than what is necessary to establish the
          nature, characteristics, and functioning of the goods.
        </p>
        <p>
          Please note that there are some legal exceptions to the right to
          withdraw, and some items can therefore not be returned or exchanged.
          We will let you know if this applies in your particular case.
        </p>
        <p>
          For details, please see our{" "}
          <Link
            href="/returns-policy"
            className="text-primary underline hover:text-primary/80 font-medium"
          >
            Returns Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "content-posted-by-you",
    number: 10,
    title: "Content posted by you",
    content: (
      <>
        <p>
          We may provide various open communication tools on our website, such
          as blog comments, blog posts, forums, message boards, ratings and
          reviews, and various social media services. It might not be feasible
          for us to screen or monitor all content that you or others may share
          or submit on or through our website. However, we reserve the right to
          review the content and to monitor all use of and activity on our
          website, and remove or reject any content in our sole discretion. By
          posting information or otherwise using any open communication tools as
          mentioned, you agree that your content will comply with these Terms
          and Conditions and must not be illegal or unlawful or infringe any
          person&apos;s legal rights.
        </p>
      </>
    ),
  },
  {
    id: "idea-submission",
    number: 11,
    title: "Idea submission",
    content: (
      <>
        <p>
          Do not submit any ideas, inventions, works of authorship, or other
          information that can be considered your own intellectual property that
          you would like to present to us unless we have first signed an
          agreement regarding the intellectual property or a non-disclosure
          agreement. If you disclose it to us absent such written agreement, you
          grant to us a worldwide, irrevocable, non-exclusive, royalty-free
          license to use, reproduce, store, adapt, publish, translate and
          distribute your content in any existing or future media.
        </p>
      </>
    ),
  },
  {
    id: "termination-of-use",
    number: 12,
    title: "Termination of use",
    content: (
      <>
        <p>
          We may, in our sole discretion, at any time modify or discontinue
          access to, temporarily or permanently, the website or any Service
          thereon. You agree that we will not be liable to you or any third
          party for any such modification, suspension or discontinuance of your
          access to, or use of, the website or any content that you may have
          shared on the website. You will not be entitled to any compensation or
          other payment, even if certain features, settings, and/or any Content
          you have contributed or have come to rely on, are permanently lost.
          You must not circumvent or bypass, or attempt to circumvent or bypass,
          any access restriction measures on our website.
        </p>
      </>
    ),
  },
  {
    id: "warranties-and-liability",
    number: 13,
    title: "Warranties and liability",
    content: (
      <>
        <p>
          Nothing in this section will limit or exclude any warranty implied by
          law that it would be unlawful to limit or to exclude. This website and
          all content on the website are provided on an &quot;as is&quot; and
          &quot;as available&quot; basis and may include inaccuracies or
          typographical errors. We expressly disclaim all warranties of any
          kind, whether express or implied, as to the availability, accuracy, or
          completeness of the Content. We make no warranty that:
        </p>
        <ul className="ml-5 list-disc space-y-2 text-gray-600">
          <li>
            this website or our products or services will meet your
            requirements;
          </li>
          <li>
            this website will be available on an uninterrupted, timely, secure,
            or error-free basis;
          </li>
          <li>
            the quality of any product or service purchased or obtained by you
            through this website will meet your expectations.
          </li>
        </ul>
        <p>
          Nothing on this website constitutes or is meant to constitute, legal,
          financial or medical advice of any kind. If you require advice you
          should consult an appropriate professional.
        </p>
        <p>
          The following provisions of this section will apply to the maximum
          extent permitted by applicable law and will not limit or exclude our
          liability in respect of any matter which it would be unlawful or
          illegal for us to limit or to exclude our liability. In no event will
          we be liable for any direct or indirect damages (including any damages
          for loss of profits or revenue, loss or corruption of data, software
          or database, or loss of or harm to property or data) incurred by you
          or any third party, arising from your access to, or use of, our
          website.
        </p>
        <p>
          Except to the extent any additional contract expressly states
          otherwise, our maximum liability to you for all damages arising out of
          or related to the website or any products and services marketed or
          sold through the website, regardless of the form of legal action that
          imposes liability (whether in contract, equity, negligence, intended
          conduct, tort or otherwise) will be limited to the total price that
          you paid to us to purchase such products or services or use the
          website. Such limit will apply in the aggregate to all of your claims,
          actions and causes of action of every kind and nature.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    number: 14,
    title: "Privacy",
    content: (
      <>
        <p>
          To access our website and/or services, you may be required to provide
          certain information about yourself as part of the registration
          process. You agree that any information you provide will always be
          accurate, correct, and up to date.
        </p>
        <p>
          We take your personal data seriously and are committed to protecting
          your privacy. We will not use your email address for unsolicited mail.
          Any emails sent by us to you will only be in connection with the
          provision of agreed products or services.
        </p>
        <p>
          We have developed a policy to address any privacy concerns you may
          have. For more information, please see our{" "}
          <Link
            href="/privacy"
            className="text-primary underline hover:text-primary/80 font-medium"
          >
            Privacy Statement
          </Link>{" "}
          and our{" "}
          <Link
            href="/privacy#cookies"
            className="text-primary underline hover:text-primary/80 font-medium"
          >
            Cookie Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "export-restrictions-legal-compliance",
    number: 15,
    title: "Export restrictions / Legal compliance",
    content: (
      <>
        <p>
          Access to the website from territories or countries where the Content
          or purchase of the products or Services sold on the website is illegal
          is prohibited. You may not use this website in violation of export
          laws and regulations of United Kingdom.
        </p>
      </>
    ),
  },
  {
    id: "assignment",
    number: 16,
    title: "Assignment",
    content: (
      <>
        <p>
          You may not assign, transfer or sub-contract any of your rights and/or
          obligations under these Terms and conditions, in whole or in part, to
          any third party without our prior written consent. Any purported
          assignment in violation of this Section will be null and void.
        </p>
      </>
    ),
  },
  {
    id: "breaches-of-these-terms-and-conditions",
    number: 17,
    title: "Breaches of these Terms and conditions",
    content: (
      <>
        <p>
          Without prejudice to our other rights under these Terms and
          Conditions, if you breach these Terms and Conditions in any way, we
          may take such action as we deem appropriate to deal with the breach,
          including temporarily or permanently suspending your access to the
          website, contacting your internet service provider to request that
          they block your access to the website, and/or commence legal action
          against you.
        </p>
      </>
    ),
  },
  {
    id: "force-majeure",
    number: 18,
    title: "Force majeure",
    content: (
      <>
        <p>
          Except for obligations to pay money hereunder, no delay, failure or
          omission by either party to carry out or observe any of its
          obligations hereunder will be deemed to be a breach of these Terms and
          conditions if and for as long as such delay, failure or omission
          arises from any cause beyond the reasonable control of that party.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    number: 19,
    title: "Indemnification",
    content: (
      <>
        <p>
          You agree to indemnify, defend and hold us harmless, from and against
          any and all claims, liabilities, damages, losses and expenses,
          relating to your violation of these Terms and conditions, and
          applicable laws, including intellectual property rights and privacy
          rights. You will promptly reimburse us for our damages, losses, costs
          and expenses relating to or arising out of such claims.
        </p>
      </>
    ),
  },
  {
    id: "waiver",
    number: 20,
    title: "Waiver",
    content: (
      <>
        <p>
          Failure to enforce any of the provisions set out in these Terms and
          Conditions and any Agreement, or failure to exercise any option to
          terminate, shall not be construed as waiver of such provisions and
          shall not affect the validity of these Terms and Conditions or of any
          Agreement or any part thereof, or the right thereafter to enforce each
          and every provision.
        </p>
      </>
    ),
  },
  {
    id: "language",
    number: 21,
    title: "Language",
    content: (
      <>
        <p>
          These Terms and Conditions will be interpreted and construed
          exclusively in English. All notices and correspondence will be written
          exclusively in that language.
        </p>
      </>
    ),
  },
  {
    id: "entire-agreement",
    number: 22,
    title: "Entire agreement",
    content: (
      <>
        <p>
          These Terms and Conditions, together with our privacy statement and
          cookie policy, constitute the entire agreement between you and Eco
          Daily Supplies Ltd in relation to your use of this website.
        </p>
      </>
    ),
  },
  {
    id: "updating-of-these-terms-and-conditions",
    number: 23,
    title: "Updating of these Terms and conditions",
    content: (
      <>
        <p>
          We may update these Terms and Conditions from time to time. It is your
          obligation to periodically check these Terms and Conditions for
          changes or updates. The date provided at the beginning of these Terms
          and Conditions is the latest revision date. Changes to these Terms and
          Conditions will become effective upon such changes being posted to
          this website. Your continued use of this website following the posting
          of changes or updates will be considered notice of your acceptance to
          abide by and be bound by these Terms and Conditions.
        </p>
      </>
    ),
  },
  {
    id: "choice-of-law-and-jurisdiction",
    number: 24,
    title: "Choice of Law and Jurisdiction",
    content: (
      <>
        <p>
          These Terms and Conditions shall be governed by the laws of United
          Kingdom. Any disputes relating to these Terms and Conditions shall be
          subject to the jurisdiction of the courts of United Kingdom. If any
          part or provision of these Terms and Conditions is found by a court or
          other authority to be invalid and/or unenforceable under applicable
          law, such part or provision will be modified, deleted and/or enforced
          to the maximum extent permissible so as to give effect to the intent
          of these Terms and Conditions. The other provisions will not be
          affected.
        </p>
      </>
    ),
  },
  {
    id: "contact-information",
    number: 25,
    title: "Contact information",
    content: (
      <>
        <p>This website is owned and operated by Eco Daily Supplies Ltd.</p>
        <p>
          You may contact us regarding these Terms and Conditions by writing or
          emailing us at the following address:{" "}
          <a
            href="mailto:sales@ecodailysupplies.co.uk"
            className="text-primary underline hover:text-primary/80 font-medium"
          >
            sales@ecodailysupplies.co.uk
          </a>
        </p>
        <p>
          Unit Cw10 Challenge Way Entrance, Ik Business Park, Blackburn,
          England, BB1 5QF
        </p>
      </>
    ),
  },
];

const toc = SECTIONS.map((s) => ({
  id: s.id,
  label: `${s.number}. ${s.title}`,
}));

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-5">
          <Breadcrumbs
            items={[{ label: "Terms & Conditions", href: "/terms" }]}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-10 sm:py-12">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
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
                Legal
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Terms &amp; conditions
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
                The Terms and Conditions were last updated on July 24, 2024
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200"
                >
                  <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                    <span className="text-gray-400 mr-2">
                      {section.number}.
                    </span>
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                    {section.content}
                  </div>
                </section>
              ))}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Need help?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      If you have questions about these Terms, contact our team.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="rounded-full bg-gray-900 hover:bg-black"
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2"
                    >
                      Contact us
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

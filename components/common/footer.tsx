import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
} from "lucide-react";

/**
 * Footer Component - SEO Optimized
 * Contains important internal links for SEO crawling
 * Includes local business information for local SEO
 * Semantic HTML with proper heading hierarchy
 */
export function Footer() {
  return (
    <footer
      className="bg-black text-white pt-24 pb-12 border-t border-zinc-900"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 pr-12">
            <Link href="/" className="inline-block mb-6" title="EcoDailySupplies - Home">
              <Image
                src="/logo.webp"
                alt="EcoDailySupplies - UK's Leading Eco-Friendly Packaging Supplier"
                width={160}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-zinc-400 leading-relaxed mb-8">
              EcoDailySupplies is the UK&apos;s trusted supplier of eco-friendly packaging.
              We provide sustainable bubble wrap, recyclable cardboard boxes, and
              biodegradable packing materials with free delivery over £50 and
              next-day shipping across Britain.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink
                href="#"
                icon={<Instagram className="h-5 w-5" />}
                aria-label="Follow EcoDailySupplies on Instagram"
              />
              <SocialLink
                href="#"
                icon={<Facebook className="h-5 w-5" />}
                aria-label="Follow EcoDailySupplies on Facebook"
              />
              <SocialLink
                href="#"
                icon={<Twitter className="h-5 w-5" />}
                aria-label="Follow EcoDailySupplies on Twitter"
              />
              <SocialLink
                href="#"
                icon={<Linkedin className="h-5 w-5" />}
                aria-label="Follow EcoDailySupplies on LinkedIn"
              />
            </div>
          </div>

          {/* Links Columns - SEO Internal Links */}
          <nav className="lg:col-span-2" aria-label="Shop navigation">
            <h4 className="font-bold mb-6 text-lg">Shop Packaging</h4>
            <ul className="space-y-4">
              <FooterLink href="/products" title="Browse all packaging supplies UK">All Products</FooterLink>
              <FooterLink href="/categories" title="Shop by packaging category">Categories</FooterLink>
              <FooterLink href="/products?sort=best-selling" title="Best selling packaging supplies">
                Best Sellers
              </FooterLink>
              <FooterLink href="/products?sort=newest" title="New packaging products">New Arrivals</FooterLink>
              <FooterLink href="/b2b-request" title="Wholesale packaging UK">
                Wholesale Orders
              </FooterLink>
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Company navigation">
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="/about" title="About EcoDailySupplies">About Us</FooterLink>
              <FooterLink href="/contact" title="Contact our UK team">Contact</FooterLink>
              <FooterLink href="/faq" title="Frequently asked questions">FAQs</FooterLink>
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Support navigation">
            <h4 className="font-bold mb-6 text-lg">Customer Support</h4>
            <ul className="space-y-4">
              <FooterLink href="/returns-policy" title="Returns and refund policy">Returns Policy</FooterLink>
              <FooterLink href="/privacy" title="Privacy policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms" title="Terms of service">Terms of Service</FooterLink>
            </ul>
          </nav>

          {/* Contact Column - Local SEO */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-lg">Contact UK</h4>
            <address className="not-italic">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-zinc-400">
                  <Phone className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <a
                    href="tel:+447397057703"
                    className="hover:text-white transition-colors"
                    title="Call EcoDailySupplies"
                  >
                    07397 057703
                  </a>
                </li>
                <li className="flex items-start gap-3 text-zinc-400">
                  <Mail className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <a
                    href="mailto:sales@ecodailysupplies.co.uk"
                    className="hover:text-white transition-colors"
                    title="Email EcoDailySupplies"
                  >
                    sales@ecodailysupplies.co.uk
                  </a>
                </li>
                <li className="flex items-start gap-3 text-zinc-400">
                  <MapPin className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    EcoDailySupplies Ltd
                    <br />
                    Unit CW10, Challenge Way
                    <br />
                    Blackburn, Lancashire
                    <br />
                    BB1 5QF, United Kingdom
                  </span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} EcoDailySupplies Ltd. UK Company. All rights reserved.
            <span className="block md:inline md:ml-2">
              Eco-friendly packaging supplies delivered across the United Kingdom.
            </span>
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
              title="Privacy Policy"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors" title="Terms of Service">
              Terms
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-white transition-colors"
              title="Sitemap"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  title,
}: {
  href: string;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-zinc-400 hover:text-white transition-colors py-1 inline-block"
        title={title}
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all duration-300"
    >
      {icon}
    </a>
  );
}

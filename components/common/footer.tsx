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

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 pr-12">
            <Link href="/" className="inline-block mb-6">
              {/* <div className="h-10 w-40 bg-zinc-800 rounded animate-pulse" />  */}

              <Image
                src="/logo.webp" // User might need a white logo variant
                alt="Bubble Wrap Shop"
                width={160}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Your trusted partner for premium packaging solutions. We blend
              durability with aesthetics to ensure your products arrive safely
              and in style.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} />
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-lg">Shop</h4>
            <ul className="space-y-4">
              <FooterLink href="/products">All Products</FooterLink>
              <FooterLink href="/categories">Categories</FooterLink>
              <FooterLink href="/products?sort=best-selling">
                Best Sellers
              </FooterLink>
              <FooterLink href="/products?sort=newest">New Arrivals</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              {/* <FooterLink href="/sustainability">Sustainability</FooterLink> */}
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-4">
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/faq">FAQs</FooterLink>
              <FooterLink href="/shipping">Shipping Info</FooterLink>
              <FooterLink href="/returns-policy">Returns Policy</FooterLink>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400">
                <Phone className="h-5 w-5 shrink-0 mt-0.5" />
                <span>01254 916167</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-400">
                <Mail className="h-5 w-5 shrink-0 mt-0.5" />
                <span>sales@bubblewrapshop.co.uk</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>
                  Unit BR16
                  <br />
                  Blakewater Road,
                  <br />
                  Blackburn, BB1 5QF
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} Bubble Wrap Shop. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookies
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
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-zinc-400 hover:text-white transition-colors py-1 inline-block"
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

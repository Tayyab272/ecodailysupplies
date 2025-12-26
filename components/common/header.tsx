"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  Package,
  Settings,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { MiniCart } from "@/components/cart/mini-cart";
import { useCartStore } from "@/lib/stores/cart-store";
import { useAuth } from "@/components/auth/auth-provider";
import Image from "next/image";
import { Category } from "@/types/category";
import { cn } from "@/lib/utils";

interface HeaderProps {
  categories?: Category[];
}

const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Packaging Solutions",
    slug: "packaging",
    image:
      "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Eco Materials",
    slug: "eco-materials",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Protective Packaging",
    slug: "protective",
  },
  {
    id: "4",
    name: "Shipping Supplies",
    slug: "shipping",
  },
];

export function Header({ categories = MOCK_CATEGORIES }: HeaderProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { getItemCount } = useCartStore();
  const { user, isAuthenticated, signOut, loading: authLoading } = useAuth();
  const cartItemCount = getItemCount();
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current);
      }
    };
  }, []);

  // Removed automatic refresh - the auth provider handles all state management
  // This prevents issues when switching tabs or when components remount
  // The auth provider's onAuthStateChange and getInitialSession handle everything

  const handleSignOut = useCallback(async () => {
    const result = await signOut();
    if (result.success) {
      // Redirect to home page after successful signout
      router.push("/");
    }
  }, [signOut, router]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      }
    },
    [searchQuery, router]
  );

  const handleMegaMenuEnter = useCallback(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(true);
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const handleMegaMenuLeave = useCallback(() => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
      setActiveCategory(null);
    }, 150);
  }, []);

  return (
    <>
      {/* Premium Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-300",
          isScrolled
            ? "bg-white/90 shadow-sm border-b border-gray-200"
            : "bg-white/70 border-b border-gray-200/60"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
          <div className="flex h-16 lg:h-[72px] items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="shrink-0 cursor-pointer group relative">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 lg:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              <div
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                className="relative h-[72px] flex items-center"
              >
                <button
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5",
                    isMegaMenuOpen
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Products
                  <svg
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isMegaMenuOpen && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              {/* <Link
                href="/sustainability"
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-300"
              >
                Sustainability
              </Link> */}
              <Link
                href="/b2b-request"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Wholesale
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden lg:block">
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-gray-900"
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-72 rounded-full bg-gray-100/80 border border-transparent py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition-all duration-200"
                  />
                </div>
              </form>

              <div className="h-6 w-px bg-gray-200 hidden lg:block" />

              {/* Account */}
              {authLoading && !user ? (
                <div className="hidden lg:block">
                  <div className="p-2 text-gray-400 rounded-full bg-gray-50">
                    <User className="h-5 w-5" strokeWidth={2} />
                  </div>
                </div>
              ) : isAuthenticated && user ? (
                <div className="hidden lg:block relative group">
                  <button className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200">
                    <User className="h-5 w-5" strokeWidth={2} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right overflow-hidden">
                    {/* Profile header */}
                    <div className="p-3 bg-white border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
                          {user?.fullName?.[0] || "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {user?.fullName || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="p-2">
                      {user?.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-white bg-gray-900 hover:bg-black transition-colors"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                            <ShieldCheck className="h-4 w-4" />
                          </span>
                          Admin Dashboard
                        </Link>
                      )}

                      <div
                        className={cn(
                          "mt-1",
                          user?.role === "admin" &&
                            "pt-2 border-t border-gray-200"
                        )}
                      >
                        <Link
                          href="/account"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                            <Settings className="h-4 w-4" />
                          </span>
                          Account
                        </Link>
                        <Link
                          href="/account?tab=orders"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                            <Package className="h-4 w-4" />
                          </span>
                          Orders
                        </Link>
                        <Link
                          href="/account?tab=addresses"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                            <MapPin className="h-4 w-4" />
                          </span>
                          Addresses
                        </Link>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-2 bg-white">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-700">
                          <LogOut className="h-4 w-4" />
                        </span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : !authLoading ? (
                <Link
                  href="/auth/login"
                  className="hidden lg:block px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-gray-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign In
                </Link>
              ) : null}

              {/* Cart */}
              <MiniCart>
                <button className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-full transition-all duration-300 group">
                  <ShoppingBag
                    className="h-5 w-5 group-hover:scale-105 transition-transform"
                    strokeWidth={2}
                  />
                  {mounted && cartItemCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </span>
                  )}
                </button>
              </MiniCart>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 lg:hidden text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={2} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Premium Mega Menu */}
        {isMegaMenuOpen && (
          <div
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
            className="hidden lg:block absolute left-0 right-0 top-full border-t border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-200"
          >
            <div className="container mx-auto px-6 lg:px-8 max-w-[1600px]">
              <div className="flex py-6 min-h-[360px]">
                {/* Category Sidebar */}
                <div className="w-60 border-r border-gray-200 pr-5">
                  <div className="flex items-center justify-between px-3 mb-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Categories
                    </h3>
                    <Link
                      href="/products"
                      onClick={handleMegaMenuLeave}
                      className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 cursor-pointer text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-between group",
                          activeCategory?.id === category.id
                            ? "bg-primary/10 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        {category.name}
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full transition-opacity",
                            activeCategory?.id === category.id
                              ? "bg-primary opacity-100"
                              : "bg-gray-300 opacity-0 group-hover:opacity-100"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 pl-6 pr-2 flex gap-8">
                  {activeCategory ? (
                    <>
                      <div className="flex-1 py-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                          {activeCategory.name}
                        </h2>
                        {activeCategory.description && (
                          <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-lg">
                            {activeCategory.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/products?category=${activeCategory.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-black transition-all duration-200 group"
                            onClick={handleMegaMenuLeave}
                          >
                            Shop
                            <svg
                              className="w-4 h-4 transition-transform group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>

                      {/* Featured Image */}
                      {activeCategory.image && (
                        <div className="w-72 py-4">
                          <Link
                            href={`/products?category=${activeCategory.slug}`}
                            className="block group cursor-pointer relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-100 border border-gray-200"
                            onClick={handleMegaMenuLeave}
                          >
                            <Image
                              src={activeCategory.image}
                              alt={activeCategory.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="320px"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                            <div className="absolute left-4 right-4 bottom-4">
                              <div className="text-white">
                                <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                                  Featured
                                </div>
                                <div className="mt-1 text-lg font-semibold tracking-tight">
                                  {activeCategory.name}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                      Select a category to view details
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-900" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-xl bg-gray-50 border-transparent py-3 pl-10 pr-4 text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                  />
                </div>
              </form>

              <nav className="space-y-2">
                <Link
                  href="/products"
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                <div className="pl-4 space-y-1 border-l-2 border-gray-100 ml-4 my-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.slug}`}
                      className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/b2b-request"
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Wholesale
                </Link>
                {/* <Link
                  href="/sustainability"
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sustainability
                </Link> */}
                <Link
                  href="/about"
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              {isAuthenticated && user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary font-bold">
                      {user.fullName?.[0] || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.fullName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/account"
                      className="flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 p-2.5 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 p-2.5 text-sm font-medium text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  ShoppingCart,
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

  const { getItemCount } = useCartStore();
  const { user, isAuthenticated, signOut, loading: authLoading } = useAuth();
  const cartItemCount = getItemCount();
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
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
        window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      }
    },
    [searchQuery]
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
      {/* Premium Minimalist Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-primary transition-all duration-300">
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0 cursor-pointer group relative">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={120}
                height={40}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <div
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                className="relative h-20 flex items-center"
              >
                <button
                  className={`text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${isMegaMenuOpen ? "text-primary" : "text-gray-600 hover:text-primary"
                    }`}
                >
                  Products
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-300"
              >
                B2B Request
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-300"
              >
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden lg:block">
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary"
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-64 rounded-full bg-gray-100 border-transparent py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300"
                  />
                </div>
              </form>

              <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

              {/* Account */}
              {authLoading && !user ? (
                <div className="hidden lg:block">
                  <div className="p-2 text-gray-400 rounded-full bg-gray-50">
                    <User className="h-5 w-5" strokeWidth={2} />
                  </div>
                </div>
              ) : isAuthenticated && user ? (
                <div className="hidden lg:block relative group">
                  <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-full transition-all duration-300">
                    <User className="h-5 w-5" strokeWidth={2} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                    <div className="p-4 border-b border-gray-50">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <div className="p-2">
                      {user?.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-black transition-colors mb-1"
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Account Settings
                      </Link>
                      <Link
                        href="/account?tab=orders"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <Package className="h-4 w-4" />
                        Orders
                      </Link>
                      <Link
                        href="/account?tab=addresses"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                        Addresses
                      </Link>
                    </div>
                    <div className="border-t border-gray-50 p-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
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
                  <ShoppingCart
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
            className="hidden lg:block absolute left-0 right-0 top-full border-t border-gray-100 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-300"
          >
            <div className="container mx-auto px-6">
              <div className="flex py-8 min-h-[400px]">
                {/* Category Sidebar */}
                <div className="w-64 border-r border-gray-100 pr-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category)}
                        className={`w-full text-left px-4 py-3 cursor-pointer text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-between group ${activeCategory?.id === category.id
                            ? "bg-gray-50 text-primary"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                      >
                        {category.name}
                        {activeCategory?.id === category.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 px-12 flex gap-12">
                  {activeCategory ? (
                    <>
                      <div className="flex-1 py-4">
                        <h2 className="text-2xl font-light text-gray-900 mb-4">
                          {activeCategory.name}
                        </h2>
                        {activeCategory.description && (
                          <p className="text-gray-500 mb-8 leading-relaxed max-w-md">
                            {activeCategory.description}
                          </p>
                        )}
                        <Link
                          href={`/products?category=${activeCategory.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-gray-800 hover:shadow-lg transition-all duration-300 group"
                          onClick={handleMegaMenuLeave}
                        >
                          Shop Collection
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

                      {/* Featured Image */}
                      {activeCategory.image && (
                        <div className="w-80 py-4">
                          <Link
                            href={`/products?category=${activeCategory.slug}`}
                            className="block group cursor-pointer relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100"
                            onClick={handleMegaMenuLeave}
                          >
                            <Image
                              src={activeCategory.image}
                              alt={activeCategory.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="320px"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
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
                  B2B Request
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

"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cart-store";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Loader2,
  MapPin,
  CreditCard,
  Plus,
  Check,
  Leaf,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from "lucide-react";
import {
  getSavedAddresses,
  type SavedAddress as SavedAddressType,
} from "@/services/users/user.service";
import { fetchWithRetry } from "@/lib/utils/retry";
import { ShippingSelector } from "@/components/checkout/shipping-selector";
import { OrderSummaryWithVAT } from "@/components/cart/order-summary-with-vat";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

type SavedAddress = SavedAddressType;

function CheckoutPageContent() {
  const router = useRouter();
  const {
    items,
    getCartSummaryWithShipping,
    selectedShippingId,
    setShippingMethod,
  } = useCartStore();
  const { user } = useAuth();

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addressesLoadedRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);

  const [shippingForm, setShippingForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "GB",
    phone: "",
  });

  // Guest email for checkout
  const [guestEmail, setGuestEmail] = useState("");

  const summary = getCartSummaryWithShipping();

  useEffect(() => {
    addressesLoadedRef.current = false;
    lastUserIdRef.current = null;
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  // REMOVED: No longer redirect guests to login
  // Guests can now checkout without an account

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;

    async function loadAddresses() {
      const userId = user?.id;

      // If no user (guest), skip loading addresses
      if (!userId) {
        setIsLoadingAddresses(false);
        addressesLoadedRef.current = true;
        setUseNewAddress(true); // Auto-use new address form for guests
        return;
      }

      if (addressesLoadedRef.current && lastUserIdRef.current === userId) {
        return;
      }

      timeoutId = setTimeout(() => {
        if (!isCancelled) {
          setIsLoadingAddresses(false);
          addressesLoadedRef.current = true;
        }
      }, 5000);

      setIsLoadingAddresses(true);
      lastUserIdRef.current = userId;

      try {
        const addresses = await getSavedAddresses(userId);

        if (isCancelled) return;
        setSavedAddresses(addresses);

        const defaultAddr = addresses.find((a) => a.is_default);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
        } else if (addresses.length === 0) {
          setUseNewAddress(true);
        }
      } catch {
        if (!isCancelled) {
          setSavedAddresses([]);
          setUseNewAddress(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingAddresses(false);
          addressesLoadedRef.current = true;
        }
        clearTimeout(timeoutId);
      }
    }

    loadAddresses();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [user?.id]);

  async function handleCheckout() {
    setError(null);
    setIsLoading(true);

    try {
      // Validate guest email if not logged in
      if (!user?.id) {
        if (!guestEmail || !guestEmail.includes("@")) {
          throw new Error("Please enter a valid email address");
        }
      }

      let shippingAddress;

      if (user?.id && selectedAddressId && !useNewAddress) {
        const selectedAddr = savedAddresses.find(
          (a) => a.id === selectedAddressId
        );
        if (!selectedAddr) {
          throw new Error("Selected address not found");
        }

        shippingAddress = {
          fullName: `${selectedAddr.first_name} ${selectedAddr.last_name}`,
          address: selectedAddr.address_line_1,
          address2: selectedAddr.address_line_2 || "",
          city: selectedAddr.city,
          state: selectedAddr.state,
          zipCode: selectedAddr.postal_code,
          country: selectedAddr.country,
          phone: selectedAddr.phone || "",
        };
      } else if (useNewAddress || !user?.id) {
        if (
          !shippingForm.first_name ||
          !shippingForm.last_name ||
          !shippingForm.address_line_1 ||
          !shippingForm.city ||
          !shippingForm.state ||
          !shippingForm.postal_code
        ) {
          throw new Error("Please fill in all required shipping fields");
        }

        shippingAddress = {
          fullName: `${shippingForm.first_name} ${shippingForm.last_name}`,
          address: shippingForm.address_line_1,
          address2: shippingForm.address_line_2 || "",
          city: shippingForm.city,
          state: shippingForm.state,
          zipCode: shippingForm.postal_code,
          country: shippingForm.country,
          phone: shippingForm.phone || "",
        };
      } else {
        throw new Error("Please select or enter a shipping address");
      }

      // Use guest email or user email
      const checkoutEmail = user?.email || guestEmail;

      const response = await fetchWithRetry("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          shippingAddress,
          shippingMethodId: selectedShippingId,
          shippingCost: summary.shippingCost,
          vatAmount: summary.vatAmount,
          subtotal: summary.subtotal,
          total: summary.total,
          email: checkoutEmail, // Add email for guest orders
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <Link href="/cart" className="mb-4 inline-block">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
              Back to Cart
            </Button>
          </Link>

          {/* Page Header - Compact */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-1">
                Checkout
              </h1>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span>SSL Encrypted • 100% Secure</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column - Shipping & Billing */}
            <div className="lg:col-span-8 space-y-6">
              {/* Shipping Address Section */}
              <Card className="p-5 md:p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
                <div className="mb-5 pb-4 border-b border-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <MapPin
                        className="h-5 w-5 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Step 1
                      </span>
                      <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                        Shipping Address
                      </h2>
                    </div>
                  </div>
                </div>

                {isLoadingAddresses ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-3 text-sm font-medium text-gray-600">
                      Loading addresses...
                    </p>
                  </div>
                ) : user?.id && savedAddresses.length > 0 && !useNewAddress ? (
                  <>
                    <RadioGroup
                      value={selectedAddressId || ""}
                      onValueChange={setSelectedAddressId}
                      className="space-y-3"
                    >
                      {savedAddresses.map((address) => (
                        <div
                          key={address.id}
                          className="flex items-start space-x-3 rounded-lg border border-gray-300 p-4 transition-all hover:border-primary/50 hover:shadow-sm bg-white cursor-pointer"
                        >
                          <RadioGroupItem
                            value={address.id}
                            id={address.id}
                            className="mt-1"
                          />
                          <Label
                            htmlFor={address.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <span className="font-semibold text-gray-900">
                                {address.first_name} {address.last_name}
                              </span>
                              {address.is_default && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary border border-primary/20">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 leading-relaxed">
                              {address.address_line_1}
                              {address.address_line_2 && (
                                <>, {address.address_line_2}</>
                              )}
                              <br />
                              {address.city}, {address.state}{" "}
                              {address.postal_code}
                              <br />
                              {address.country}
                              {address.phone && (
                                <>
                                  <br />
                                  {address.phone}
                                </>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <Button
                      type="button"
                      variant="outline"
                      className="mt-6 w-full border-2 border-gray-300 hover:bg-gray-50 hover:border-primary/50 hover:border-2 font-semibold transition-all duration-200 rounded-xl h-12"
                      onClick={() => setUseNewAddress(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Use a New Address
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Guest Email Section */}
                    {!user?.id && (
                      <div className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-300">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                            <span className="text-primary text-base">📧</span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-900">
                            Guest Checkout
                          </h3>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="guest_email"
                            className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                          >
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="guest_email"
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                            className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                          />
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                          <ShieldCheck className="h-3 w-3 text-primary shrink-0" />
                          <span>
                            Have an account?{" "}
                            <Link
                              href="/auth/login?redirect=/checkout"
                              className="text-primary hover:text-primary/80 font-semibold transition-colors underline"
                            >
                              Sign in
                            </Link>
                          </span>
                        </div>
                      </div>
                    )}

                    {user?.id && savedAddresses.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="mb-4 w-full border border-gray-300 hover:bg-gray-50 hover:border-primary/50 font-medium transition-all duration-200 rounded-lg h-10 text-sm"
                        onClick={() => setUseNewAddress(false)}
                      >
                        <Check className="mr-2 h-3 w-3" />
                        Use Saved Address
                      </Button>
                    )}

                    {/* New Address Form - Compact */}
                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            htmlFor="first_name"
                            className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                          >
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="first_name"
                            value={shippingForm.first_name}
                            onChange={(e) =>
                              setShippingForm({
                                ...shippingForm,
                                first_name: e.target.value,
                              })
                            }
                            className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="last_name"
                            className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                          >
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="last_name"
                            value={shippingForm.last_name}
                            onChange={(e) =>
                              setShippingForm({
                                ...shippingForm,
                                last_name: e.target.value,
                              })
                            }
                            className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                        >
                          Company (Optional)
                        </Label>
                        <Input
                          id="company"
                          value={shippingForm.company}
                          onChange={(e) =>
                            setShippingForm({
                              ...shippingForm,
                              company: e.target.value,
                            })
                          }
                          className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="address_line_1"
                          className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                        >
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="address_line_1"
                          value={shippingForm.address_line_1}
                          onChange={(e) =>
                            setShippingForm({
                              ...shippingForm,
                              address_line_1: e.target.value,
                            })
                          }
                          placeholder="Street address"
                          className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="address_line_2"
                          className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                        >
                          Apartment, suite, etc. (Optional)
                        </Label>
                        <Input
                          id="address_line_2"
                          value={shippingForm.address_line_2}
                          onChange={(e) =>
                            setShippingForm({
                              ...shippingForm,
                              address_line_2: e.target.value,
                            })
                          }
                          className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                        />
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label
                            htmlFor="city"
                            className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                          >
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            value={shippingForm.city}
                            onChange={(e) =>
                              setShippingForm({
                                ...shippingForm,
                                city: e.target.value,
                              })
                            }
                            className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="state"
                            className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                          >
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="state"
                            value={shippingForm.state}
                            onChange={(e) =>
                              setShippingForm({
                                ...shippingForm,
                                state: e.target.value,
                              })
                            }
                            className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="postal_code"
                            className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                          >
                            ZIP Code <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="postal_code"
                            value={shippingForm.postal_code}
                            onChange={(e) =>
                              setShippingForm({
                                ...shippingForm,
                                postal_code: e.target.value,
                              })
                            }
                            className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-xs font-bold text-gray-900 uppercase tracking-wider"
                        >
                          Phone (Optional)
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingForm.phone}
                          onChange={(e) =>
                            setShippingForm({
                              ...shippingForm,
                              phone: e.target.value,
                            })
                          }
                          className="h-11 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary transition-all text-sm"
                        />
                      </div>
                    </div>
                  </>
                )}
              </Card>

              {/* Billing Note */}
              <Card className="p-4 bg-gray-50 rounded-lg border border-gray-300">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                    <CreditCard
                      className="h-4 w-4 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">
                      Billing Address
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Your billing address will be collected securely on the
                      next page during payment processing.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Order Summary & Shipping */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Shipping Method Selection - Moved here for visibility */}
                <Card className="p-5 bg-white rounded-lg border border-gray-300 shadow-sm">
                  <div className="mb-4 pb-4 border-b border-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <Truck
                          className="h-5 w-5 text-primary"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Step 2
                        </span>
                        <h3 className="text-base font-bold text-gray-900 tracking-tight">
                          Shipping Method
                        </h3>
                      </div>
                    </div>
                  </div>

                  <ShippingSelector
                    selectedShippingId={selectedShippingId}
                    onShippingChange={setShippingMethod}
                  />
                </Card>

                {/* Order Summary */}
                <Card className="p-5 bg-white rounded-lg border border-gray-300 shadow-sm">
                  {/* Cart Items */}
                  <div className="mb-5 pb-4 border-b border-gray-300">
                    <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wider">
                      Order Summary
                    </h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 p-3 rounded-lg border border-gray-300 hover:border-primary/30 hover:shadow-sm transition-all bg-white"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-xs text-gray-900">
                              {item.product.name}
                            </p>
                            {item.variant && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.variant.name}
                              </p>
                            )}
                            <p className="text-xs text-primary font-medium mt-1">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-gray-900">
                            £{(item.pricePerUnit * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary with VAT */}
                  <OrderSummaryWithVAT summary={summary} showTitle={false} />

                  {/* Eco Badge */}
                  <div className="mt-5 p-3 bg-gray-50 rounded-lg border border-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                        <Leaf className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Eco-Friendly Packaging Included
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 rounded-lg bg-red-50 border border-red-300 p-3 text-xs text-red-800 font-semibold">
                      {error}
                    </div>
                  )}

                  <Button
                    className="mt-5 w-full h-12 bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Continue to Payment
                      </>
                    )}
                  </Button>

                  <p className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                    Secure checkout powered by Stripe
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ErrorBoundary
      title="Checkout Error"
      description="We encountered an error while loading the checkout page. Please try again or return to your cart."
      showBackButton
      backUrl="/cart"
      showHomeButton
    >
      <CheckoutPageContent />
    </ErrorBoundary>
  );
}

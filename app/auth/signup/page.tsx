/**
 * Sign Up Page
 * User registration and account creation interface
 */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    company: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName || undefined,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
      });

      if (result.success) {
        setError("");
        // Redirect to verify email page with user's email
        router.replace(
          `/auth/verify-email?email=${encodeURIComponent(formData.email)}`
        );
      } else {
        setError(result.error || "Failed to create account");
        setIsSubmitting(false);
      }
    } catch {
      setError("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block mb-8 group">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-sm text-gray-600">
                Already registered?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert className="border-red-300 bg-red-50">
                  <AlertDescription className="text-sm text-red-800 font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Grid Layout for Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    disabled={isSubmitting || loading}
                    className="h-12 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 transition-all"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Email address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting || loading}
                    className="h-12 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 transition-all"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Phone Number{" "}
                    <span className="text-gray-500 font-normal normal-case">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting || loading}
                    className="h-12 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 transition-all"
                  />
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="company"
                    className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Company{" "}
                    <span className="text-gray-500 font-normal normal-case">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company"
                    disabled={isSubmitting || loading}
                    className="h-12 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 transition-all"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create password"
                      disabled={isSubmitting || loading}
                      className="h-12 border border-gray-300 bg-white pr-10 focus-visible:ring-primary focus-visible:ring-2 transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting || loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" strokeWidth={2} />
                      ) : (
                        <Eye className="h-5 w-5" strokeWidth={2} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      disabled={isSubmitting || loading}
                      className="h-12 border border-gray-300 bg-white pr-10 focus-visible:ring-primary focus-visible:ring-2 transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isSubmitting || loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" strokeWidth={2} />
                      ) : (
                        <Eye className="h-5 w-5" strokeWidth={2} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="group h-14 w-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
                disabled={isSubmitting || loading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </>
                )}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

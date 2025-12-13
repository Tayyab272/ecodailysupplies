/**
 * Login Page
 * User authentication and sign-in interface
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

export default function LoginPage() {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const result = await signIn(formData.email, formData.password);
      if (result.success) {
        router.push("/account");
      } else {
        setError(result.error || "Failed to sign in");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
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
                Welcome Back
              </h1>
              <p className="text-sm text-gray-600">
                New here?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Login Form */}
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

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                >
                  Email address
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

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    disabled={isSubmitting || loading}
                    className="h-12 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 transition-all pr-10"
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

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Forgot password?
                </Link>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
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
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

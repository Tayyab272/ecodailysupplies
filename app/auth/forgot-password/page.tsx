"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!email) {
      setError("Please enter your email address");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setSuccess(true);
        setError("");
      } else {
        setError(result.error || "Failed to send reset email");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
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
                  Check Your Email
                </h1>
                <p className="text-sm text-gray-600">
                  Password reset instructions sent
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 md:p-10">
              <Alert className="border-primary/20 bg-primary/5">
                <AlertDescription className="text-sm leading-relaxed text-gray-800 font-medium">
                  We&apos;ve sent password reset instructions to{" "}
                  <strong className="font-semibold text-gray-900">
                    {email}
                  </strong>
                  . Please check your email and follow the link to reset your
                  password.
                </AlertDescription>
              </Alert>

              <div className="space-y-3 mt-6">
                <Button
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="h-12 w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all duration-200 rounded-full"
                >
                  Send another email
                </Button>

                <Link href="/auth/login" className="block">
                  <Button
                    variant="outline"
                    className="h-12 w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all duration-200 rounded-full"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
                    Back to sign in
                  </Button>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                <p>
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setEmail("");
                    }}
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    try again
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
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
                Reset Password
              </h1>
              <p className="text-sm text-gray-600">
                Enter your email for reset instructions
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-300 bg-red-50">
                  <AlertDescription className="text-sm text-red-800 font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

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
                  value={email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting || loading}
                  className="h-12 border border-gray-300 bg-white focus-visible:ring-primary focus-visible:ring-2 transition-all"
                />
              </div>

              <Button
                type="submit"
                className="group h-14 w-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
                disabled={isSubmitting || loading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset instructions
                    <ArrowRight
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" strokeWidth={2} />
                  Back to sign in
                </Link>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

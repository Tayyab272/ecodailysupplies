"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Loader2,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/components/auth/auth-provider";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const { verifyOTP, resendOTP } = useAuth();
  const [otpCode, setOtpCode] = useState("");
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [verifyStatus, setVerifyStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // Only numbers, max 6 digits
    setOtpCode(value);
    setError("");
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!otpCode || otpCode.length !== 6) {
      setError("Please enter a valid 6-digit OTP code");
      return;
    }

    setVerifyStatus("verifying");
    setError("");

    try {
      const result = await verifyOTP(email, otpCode, "signup");

      if (result.success) {
        setVerifyStatus("success");
        // Redirect to signup success page after a brief delay
        setTimeout(() => {
          router.push("/auth/signup-success");
        }, 1500);
      } else {
        setVerifyStatus("error");
        setError(result.error || "Invalid OTP code. Please try again.");
      }
    } catch {
      setVerifyStatus("error");
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    if (!email || countdown > 0) return;

    setResendStatus("sending");
    setError("");

    try {
      const result = await resendOTP(email);

      if (result.success) {
        setResendStatus("sent");
        setCountdown(60); // 60 second cooldown
        setTimeout(() => setResendStatus("idle"), 3000);
      } else {
        setResendStatus("error");
        setError(result.error || "Failed to resend OTP. Please try again.");
        setTimeout(() => setResendStatus("idle"), 3000);
      }
    } catch {
      setResendStatus("error");
      setError("Failed to resend OTP. Please try again.");
      setTimeout(() => setResendStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20">
                <KeyRound className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Verify Your Email
            </h1>
            <p className="text-sm text-gray-600">
              We&apos;ve sent a 6-digit verification code to
            </p>
            {email && (
              <p className="text-primary font-semibold text-base mt-2 break-all">
                {email}
              </p>
            )}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 md:p-10">
            {/* Success Alert */}
            <Alert className="mb-6 border-primary/20 bg-primary/5">
              <CheckCircle className="h-5 w-5 text-primary" />
              <AlertDescription className="text-gray-700 ml-2">
                <strong className="font-semibold">
                  Account created successfully!
                </strong>
                <br />
                <span className="text-sm">
                  Please enter the verification code from your email to activate
                  your account.
                </span>
              </AlertDescription>
            </Alert>

            {/* OTP Input Form */}
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="otp"
                  className="text-sm font-bold text-gray-900 uppercase tracking-wider"
                >
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={otpCode}
                  onChange={handleOtpChange}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-3xl font-bold tracking-[0.5em] h-16 text-gray-900 border-2 border-gray-300 focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary"
                  disabled={
                    verifyStatus === "verifying" || verifyStatus === "success"
                  }
                  autoFocus
                />
                <p className="text-xs text-gray-500 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-300 bg-red-50"
                >
                  <AlertDescription className="text-sm text-red-800 font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {verifyStatus === "success" && (
                <Alert className="border-primary/20 bg-primary/5">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <AlertDescription className="text-gray-700 ml-2">
                    Email verified successfully! Redirecting...
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={
                  verifyStatus === "verifying" ||
                  verifyStatus === "success" ||
                  !otpCode ||
                  otpCode.length !== 6
                }
                className="w-full h-14 bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
                size="lg"
              >
                {verifyStatus === "verifying" ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : verifyStatus === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Verified!
                  </>
                ) : (
                  <>
                    Verify Email
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Resend OTP */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Didn&apos;t receive the code?
                </p>
                <Button
                  onClick={handleResendOTP}
                  disabled={
                    resendStatus === "sending" || countdown > 0 || !email
                  }
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all duration-200 rounded-full h-12"
                >
                  {resendStatus === "sending" ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : resendStatus === "sent" ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Code Sent!
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend in {countdown}s
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend Code
                    </>
                  )}
                </Button>
              </div>

              <Link href="/auth/login" className="block">
                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Back to Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-lg">
              <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 md:p-10">
                <div className="flex justify-center items-center">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
                <p className="text-center text-gray-600 mt-4">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

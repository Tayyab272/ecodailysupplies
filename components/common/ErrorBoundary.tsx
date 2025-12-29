"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

type ErrorBoundaryProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
  onReset?: () => void;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  backUrl?: string;
  title?: string;
  description?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error } as ErrorBoundaryState;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log error for debugging
    console.error("ErrorBoundary caught an error", { error, info });

    // In production, you could send this to an error tracking service if needed
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI - aligned with EcoDailySupplies theme
      return (
        <div className="min-h-[500px] flex items-center justify-center py-16 px-4 bg-gray-50">
          <div className="mx-auto max-w-lg w-full">
            {/* Error Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-200 text-center">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                  <AlertTriangle
                    className="w-8 h-8 text-primary"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-600 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                <Package className="h-3.5 w-3.5" strokeWidth={2.5} />
                Error
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
                {this.props.title || "Something went wrong"}
              </h2>

              {/* Error Message */}
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                {this.props.description ||
                  this.state.error?.message ||
                  "An unexpected error occurred. Please try again or refresh the page."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={this.handleReset}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white hover:bg-black px-6 py-3 text-sm font-semibold transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4" strokeWidth={2.5} />
                  Try Again
                </Button>

                <div className="flex gap-3">
                  {this.props.showBackButton && this.props.backUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 text-sm font-semibold transition-all duration-300"
                    >
                      <Link href={this.props.backUrl}>
                        <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
                        Go Back
                      </Link>
                    </Button>
                  )}

                  {this.props.showHomeButton && (
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 text-sm font-semibold transition-all duration-300"
                    >
                      <Link href="/">
                        <Home className="w-4 h-4" strokeWidth={2.5} />
                        Go Home
                      </Link>
                    </Button>
                  )}

                  {!this.props.showBackButton && !this.props.showHomeButton && (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 text-sm font-semibold transition-all duration-300"
                      >
                        <Link href="/">
                          <Home className="w-4 h-4" strokeWidth={2.5} />
                          Home
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 text-sm font-semibold transition-all duration-300"
                      >
                        <RefreshCw className="w-4 h-4" strokeWidth={2.5} />
                        Refresh
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Help Link */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="text-gray-900 font-semibold hover:underline"
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

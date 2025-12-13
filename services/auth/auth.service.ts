/**
 * Authentication Service
 * Handles all authentication-related operations using Supabase Auth
 * Reference: Architecture.md Section 4.3
 */

import { createClient } from "@/lib/supabase/client";

// Type for user profile from database
type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  company: string | null;
  avatar_url: string | null;
  role: "customer" | "admin";
  created_at: string;
  updated_at: string;
};

// Types for authentication
export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  company?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface VerifyOTPData {
  email: string;
  token: string;
  type?: "signup" | "email" | "recovery";
}

export interface UpdateProfileData {
  fullName?: string;
  phone?: string;
  company?: string;
  avatarUrl?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  company?: string;
  avatarUrl?: string;
  role?: "customer" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
  message?: string;
}

/**
 * Sign up a new user
 * Creates a new user account and profile
 */
export async function signUp(data: SignUpData): Promise<AuthResult> {
  try {
    const supabase = createClient();

    // Debug: Log which Supabase project we're using
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    console.log("Signing up with Supabase URL:", supabaseUrl);

    // Sign up the user with OTP verification (no email link)
    // Important: emailRedirectTo is not set - we're using OTP codes only
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName || "",
          phone: data.phone || "",
          company: data.company || "",
        },
        // Explicitly disable email redirect - we only want OTP
        emailRedirectTo: undefined,
      },
    });

    console.log("SignUp response:", {
      hasUser: !!authData?.user,
      userId: authData?.user?.id,
      hasSession: !!authData?.session,
      error: authError?.message,
    });

    if (authError) {
      console.error("SignUp error:", authError);
      return {
        success: false,
        error: authError.message,
      };
    }

    if (!authData.user) {
      console.error("No user returned from signUp");
      return {
        success: false,
        error: "Failed to create user account",
      };
    }

    // Check if user was already confirmed (existing user)
    if (authData.user.email_confirmed_at) {
      console.log("User email already confirmed - this is an existing user");
    }

    // Create user profile using API route (bypasses RLS)
    // Add timeout to prevent hanging
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch("/api/auth/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authData.user.id,
          email: authData.user.email,
          fullName: data.fullName,
          phone: data.phone,
          company: data.company,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(
          "Profile creation API returned non-OK status:",
          response.status,
          errorData
        );
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.warn("Profile creation timed out - continuing anyway");
      } else {
        console.error("Error calling create-profile API:", error);
      }
      // Continue anyway - profile will be created after email verification
    }

    // Note: We don't fetch the profile here because:
    // 1. User is not authenticated yet (unconfirmed), so RLS will block the query
    // 2. Profile will be accessible after email verification
    // 3. We'll return user data from authData instead

    // Explicitly send OTP for email verification
    // signUp() may send a confirmation link instead of OTP depending on Supabase config
    // We use resend() with type "signup" to ensure an OTP code is sent
    try {
      console.log("Sending OTP code for email verification...");
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: data.email,
      });

      if (resendError) {
        console.warn("Failed to send OTP:", resendError.message);
        // Don't fail signup - Supabase might have already sent an OTP
      } else {
        console.log("OTP sent successfully");
      }
    } catch (otpError) {
      console.warn("Error sending OTP:", otpError);
      // Continue anyway - try to proceed with signup
    }

    // Build user object from signup data
    // We don't fetch profile here because user is unconfirmed and RLS will block it
    // Profile will be available after email verification
    const userResult: AuthUser = {
      id: authData.user.id,
      email: authData.user.email!,
      fullName: data.fullName,
      phone: data.phone,
      company: data.company,
      role: "customer" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Note: supabase.auth.signUp() automatically sends OTP when email verification is enabled
    // No need to call resend() here as it would invalidate the first OTP
    // The resendOTP() function is available for manual resend requests

    // Return success - auth account is created
    return {
      success: true,
      user: userResult,
      message:
        "Account created successfully. Please check your email for the verification code.",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Sign in an existing user
 * Authenticates user and returns user data
 */
export async function signIn(data: SignInData): Promise<AuthResult> {
  try {
    const supabase = createClient();

    // Sign in the user
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (authError) {
      return {
        success: false,
        error: authError.message,
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: "Failed to sign in",
      };
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      return {
        success: false,
        error: "Failed to fetch user profile",
      };
    }

    const typedProfile = profile as UserProfile;

    return {
      success: true,
      user: {
        id: typedProfile.id,
        email: typedProfile.email,
        fullName: typedProfile.full_name || undefined,
        phone: typedProfile.phone || undefined,
        company: typedProfile.company || undefined,
        avatarUrl: typedProfile.avatar_url || undefined,
        role: typedProfile.role || "customer",
        createdAt: typedProfile.created_at,
        updatedAt: typedProfile.updated_at,
      },
      message: "Signed in successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Sign out the current user
 * Clears the user session
 */
export async function signOut(): Promise<AuthResult> {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Reset password for a user
 * Sends password reset email
 */
export async function resetPassword(
  data: ResetPasswordData
): Promise<AuthResult> {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/auth/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Password reset email sent. Please check your email.",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Verify OTP code for email confirmation
 * Verifies the OTP code sent to user's email
 */
export async function verifyOTP(data: VerifyOTPData): Promise<AuthResult> {
  try {
    const supabase = createClient();

    // Debug: Log Supabase URL to verify we're using the correct project
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    console.log(
      "Verifying OTP with Supabase URL:",
      supabaseUrl?.substring(0, 30) + "..."
    );
    console.log("Email:", data.email);
    console.log("Token length:", data.token.length);
    console.log("Type:", data.type || "signup");

    // Verify OTP - try multiple approaches
    // Supabase can be finicky with OTP types, so we try multiple methods
    let authData: {
      user: {
        id: string;
        email?: string;
        user_metadata?: Record<string, unknown>;
      } | null;
      session: unknown;
    } | null = null;
    let verifyError: { message?: string } | null = null;
    let lastError: { message?: string } | null = null;

    // Method 1: Try with "email" type first (most reliable for OTP verification)
    console.log("Attempting OTP verification (email type)...");
    let result = await supabase.auth.verifyOtp({
      email: data.email,
      token: data.token,
      type: "email",
    });

    if (!result.error && result.data) {
      authData = result.data;
      console.log("OTP verified successfully (email type)");
    } else {
      lastError = result.error;
      console.log(
        "Email type failed, trying signup type...",
        lastError?.message
      );

      // Method 2: Try "signup" type
      result = await supabase.auth.verifyOtp({
        email: data.email,
        token: data.token,
        type: "signup",
      });

      if (!result.error && result.data) {
        authData = result.data;
        verifyError = null;
        console.log("OTP verified successfully (signup type)");
      } else {
        lastError = result.error || lastError;
        console.log(
          "Signup type failed, trying recovery type...",
          lastError?.message
        );

        // Method 3: Try "recovery" type as last resort (unlikely but possible)
        result = await supabase.auth.verifyOtp({
          email: data.email,
          token: data.token,
          type: "recovery",
        });

        if (!result.error && result.data) {
          authData = result.data;
          verifyError = null;
          console.log("OTP verified successfully (recovery type)");
        } else {
          verifyError = result.error || lastError;
          console.error("All OTP verification methods failed:", {
            email: lastError?.message,
            signup: lastError?.message,
            recovery: result.error?.message,
          });
        }
      }
    }

    if (verifyError) {
      return {
        success: false,
        error: verifyError.message || "Token has expired or is invalid",
      };
    }

    if (!authData || !authData.user) {
      return {
        success: false,
        error: "Failed to verify OTP - no user data returned",
      };
    }

    // Ensure profile exists after verification (user is now authenticated)
    // Try to create profile if it doesn't exist
    if (authData?.user) {
      try {
        await fetch("/api/auth/create-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: authData.user.id,
            email: authData.user.email,
            fullName: authData.user.user_metadata?.full_name || null,
            phone: authData.user.user_metadata?.phone || null,
            company: authData.user.user_metadata?.company || null,
          }),
        });

        // Wait a moment for profile creation to complete
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.warn("Error ensuring profile exists:", error);
        // Continue anyway - profile might already exist
      }
    }

    // Fetch user profile after verification (user is now authenticated, RLS should allow)
    let profile = null;
    let profileError = null;

    // Try to fetch profile with retry
    for (let i = 0; i < 3; i++) {
      const { data: fetchedProfile, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (fetchedProfile) {
        profile = fetchedProfile;
        break;
      }

      profileError = fetchError;

      // Wait before retry
      if (i < 2) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    const typedProfile = profile as UserProfile | null;

    // If profile fetch failed, log but don't fail verification
    if (profileError && profileError.code !== "PGRST116") {
      console.warn("Profile not found after OTP verification:", profileError);
    }

    return {
      success: true,
      user: typedProfile
        ? {
            id: typedProfile.id,
            email: typedProfile.email,
            fullName: typedProfile.full_name || undefined,
            phone: typedProfile.phone || undefined,
            company: typedProfile.company || undefined,
            avatarUrl: typedProfile.avatar_url || undefined,
            role: typedProfile.role || "customer",
            createdAt: typedProfile.created_at,
            updatedAt: typedProfile.updated_at,
          }
        : {
            id: authData.user.id,
            email: authData.user.email!,
            fullName:
              typeof authData.user.user_metadata?.full_name === "string"
                ? authData.user.user_metadata.full_name
                : undefined,
            phone:
              typeof authData.user.user_metadata?.phone === "string"
                ? authData.user.user_metadata.phone
                : undefined,
            company:
              typeof authData.user.user_metadata?.company === "string"
                ? authData.user.user_metadata.company
                : undefined,
            role: "customer" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
      message: "Email verified successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Resend OTP code to user's email
 * Resends the OTP code for email verification
 */
export async function resendOTP(email: string): Promise<AuthResult> {
  try {
    const supabase = createClient();

    // Resend OTP for signup
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: "OTP code sent. Please check your email.",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Update user password
 * Updates the password for the current user
 */
export async function updatePassword(newPassword: string): Promise<AuthResult> {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Update user profile
 * Updates the user's profile information
 */
export async function updateProfile(
  data: UpdateProfileData
): Promise<AuthResult> {
  try {
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    // Update profile in database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile, error: profileError } = await (supabase as any)
      .from("users")
      .update({
        full_name: data.fullName,
        phone: data.phone,
        company: data.company,
        avatar_url: data.avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (profileError) {
      return {
        success: false,
        error: profileError.message,
      };
    }

    const typedProfile = profile as UserProfile;

    return {
      success: true,
      user: {
        id: typedProfile.id,
        email: typedProfile.email,
        fullName: typedProfile.full_name || undefined,
        phone: typedProfile.phone || undefined,
        company: typedProfile.company || undefined,
        avatarUrl: typedProfile.avatar_url || undefined,
        role: typedProfile.role || "customer",
        createdAt: typedProfile.created_at,
        updatedAt: typedProfile.updated_at,
      },
      message: "Profile updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Get current user
 * Returns the current authenticated user
 */
export async function getCurrentUser(): Promise<AuthResult> {
  try {
    const supabase = createClient();

    // Get current user from auth
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return {
        success: false,
        error: "Failed to fetch user profile",
      };
    }

    const typedProfile = profile as UserProfile;

    return {
      success: true,
      user: {
        id: typedProfile.id,
        email: typedProfile.email,
        fullName: typedProfile.full_name || undefined,
        phone: typedProfile.phone || undefined,
        company: typedProfile.company || undefined,
        avatarUrl: typedProfile.avatar_url || undefined,
        role: typedProfile.role || "customer",
        createdAt: typedProfile.created_at,
        updatedAt: typedProfile.updated_at,
      },
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Check if user is authenticated
 * Returns true if user is logged in
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const result = await getCurrentUser();
    return result.success;
  } catch {
    return false;
  }
}

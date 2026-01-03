import { useStorageState } from "@/hooks/useStorageState";
import React, { PropsWithChildren } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped in a <SessionProvider />");
  }
  return value;
}

// Alias for backward compatibility
export const useSession = useAuth;

export function SessionProvider(props: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async ({
    email,
    password,
  }: SignInFormData): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      if (!data.token) {
        throw new Error("Please sign in again");
      }

      setSession(data.token);

      return {
        success: true,
        message: data.message || "Signed in successfully",
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      console.error("Sign In Error:", error);
      throw error;
    }
  };

  const signUp = async ({
    fullName,
    email,
    password,
    country,
    investmentGoals,
    riskTolerance,
    preferredIndustry,
  }: SignUpFormData): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      if (!data.token) {
        throw new Error("No authentication token received");
      }

      setSession(data.token);

      return {
        success: true,
        message: data.message || "Signed up successfully",
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      console.error("Sign Up Error:", error);
      throw error;
    }
  };

  const getCurrentUser = async (): Promise<Partial<AuthResponse>> => {
    try {
      if (!session) {
        throw new Error("No authentication token found. Please sign in!");
      }

      const response = await fetch(`${API_URL}/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user");
      }

      return {
        success: true,
        message: data.message || "User fetched successfully",
        user: data.user,
      };
    } catch (error) {
      console.error("Get Current User Error:", error);
      throw error;
    }
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        getCurrentUser,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

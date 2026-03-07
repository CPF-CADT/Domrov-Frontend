"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/common";
import PrimaryButton from "@/components/ui/PrimaryButton";
import GoogleOAuthButton from "@/components/login/GoogleOAuthButton";
import GitHubOAuthButton from "@/components/login/GitHubOAuthButton";

/**
 * LoginForm - Login form component with API integration.
 * Authenticates user credentials and redirects to dashboard on success.
 */
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        email,
        password,
      };

      const res = await fetch("https://api.domrov.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Login failed. Please check your credentials."
        );
      }

      const data = await res.json();
      
      // Validate response has required access_token
      if (!data.access_token) {
        throw new Error("Invalid response from server. Missing authentication token.");
      }

      // Store token
      localStorage.setItem("authToken", data.access_token);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email/Password Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Continue"}
          </PrimaryButton>
          <p className="text-xs text-slate-500 text-center">
            Sign in with your email and password to access your account.
          </p>
        </div>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">Or continue with</span>
        </div>
      </div>

      {/* OAuth Buttons */}
      <div className="space-y-3">
        <GoogleOAuthButton />
        <GitHubOAuthButton />
      </div>
    </div>
  );
}
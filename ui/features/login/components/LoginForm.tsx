"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/ui/components/forms";
import PrimaryButton from "@/ui/design-system/primitives/PrimaryButton";
import GoogleOAuthButton from "@/ui/features/login/components/GoogleOAuthButton";
import GitHubOAuthButton from "@/ui/features/login/components/GitHubOAuthButton";

/**
 * LoginForm - Mock login form component.
 * Redirects to dashboard on submit (no actual authentication).
 */
export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
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
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          required
          placeholder="••••••••"
        />

        <div className="space-y-3">
          <PrimaryButton type="submit">Continue</PrimaryButton>
          <p className="text-xs text-slate-500 text-center">
            After submitting, you will be taken to the dashboard mock.
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

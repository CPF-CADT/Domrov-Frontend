"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/common";
import PrimaryButton from "@/components/ui/PrimaryButton";

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
  );
}

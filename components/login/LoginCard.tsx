import Link from "next/link";
import { Badge } from "@/components/common";
import LoginForm from "@/components/login/LoginForm";

/**
 * LoginCard - Container card for the login form.
 * Displays mock login notice and link to skip to pricing.
 */
export default function LoginCard() {
  return (
    <div className="max-w-xl mx-auto bg-white border border-slate-200 shadow-xl rounded-2xl p-10">
      <div className="text-center mb-8 space-y-2">
        <Badge label="MOCK LOGIN" variant="primary" />
        <h1 className="text-3xl font-black text-primary">Sign in to Domrov</h1>
        <p className="text-slate-600 text-sm">
          This screen is a demo only. No authentication or data is stored.
        </p>
      </div>

      <LoginForm />

      <div className="mt-8 text-center text-sm text-slate-600">
        <Link
          href="/pricing"
          className="text-primary font-semibold hover:underline"
        >
          Skip to pricing
        </Link>
      </div>
    </div>
  );
}

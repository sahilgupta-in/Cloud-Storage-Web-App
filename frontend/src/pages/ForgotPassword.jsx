import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cloud,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) return;

    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Cloud size={28} />
          </div>

          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-slate-900">
                Forgot your password?
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Enter your email and we'll send you a
                password reset link.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 size={26} />
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Check your email
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                If an account exists for{" "}
                <strong>{email}</strong>, you'll receive
                reset instructions.
              </p>
            </>
          )}
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                required
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
              Send Reset Link
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <Link
            to="/login"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        )}

        {!submitted && (
          <Link
            to="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        )}
      </div>
    </div>
  );
}
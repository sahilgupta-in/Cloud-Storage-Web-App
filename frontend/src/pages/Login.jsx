import { useState } from "react";
import { ArrowRight, Cloud, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          <Cloud size={28} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to access your cloud storage.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          icon={Mail}
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign In"}

          {!submitting && <ArrowRight size={18} />}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

function Input({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          required
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden flex-1 bg-slate-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <Cloud size={21} />
          </div>

          <span className="text-lg font-bold">CloudBox</span>
        </div>

        <div className="max-w-lg">
          <p className="text-4xl font-bold leading-tight text-white">
            Your files.
            <br />
            Anywhere you go.
          </p>

          <p className="mt-5 text-slate-400">
            Securely store, organize and access your files from anywhere.
          </p>
        </div>

        <p className="text-sm text-slate-500">© 2026 CloudBox</p>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-[520px] lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

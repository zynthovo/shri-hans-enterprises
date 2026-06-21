"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.get("username"),
          password: form.get("password"),
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Login failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-24">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-[0_10px_40px_rgba(0,25,70,0.12)]"
      >
        <h1 className="mb-1 text-2xl font-bold text-heading">Admin Login</h1>
        <p className="mb-6 text-sm text-muted">
          Sign in to view form submissions.
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <label className="mb-1 block text-sm font-medium text-heading">
          Username
        </label>
        <input
          name="username"
          autoComplete="username"
          required
          className="mb-4 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />

        <label className="mb-1 block text-sm font-medium text-heading">
          Password
        </label>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mb-6 w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

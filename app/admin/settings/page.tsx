import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { SettingsForm } from "../SettingsForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Site Settings",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const settings = await getSettings();

  return (
    <main className="min-h-screen bg-background px-4 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-heading sm:text-3xl">
              Site Settings
            </h1>
            <p className="mt-1 text-sm text-muted">
              Update contact details and social media links shown across the
              site.
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-heading transition hover:border-brand hover:text-brand"
          >
            ← Submissions
          </Link>
        </div>

        <SettingsForm initial={settings} />
      </div>
    </main>
  );
}

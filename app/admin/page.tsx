import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSubmissions } from "@/lib/submissions";
import { LogoutButton } from "./LogoutButton";

// Never cache; always re-check session and re-read submissions.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Submissions",
  robots: { index: false, follow: false },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const submissions = await getSubmissions();

  return (
    <main className="min-h-screen bg-background px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-heading sm:text-3xl">
              Form Submissions
            </h1>
            <p className="mt-1 text-sm text-muted">
              {submissions.length}{" "}
              {submissions.length === 1 ? "submission" : "submissions"} ·
              signed in as {session.u}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/settings"
              className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-heading transition hover:border-brand hover:text-brand"
            >
              Site settings
            </Link>
            <LogoutButton />
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface p-10 text-center text-muted">
            No submissions yet. They’ll appear here as visitors use the contact
            and quote forms.
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl border border-line bg-surface p-6 shadow-[0_6px_20px_rgba(0,25,70,0.05)]"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                    {s.type}
                  </span>
                  <time className="text-xs text-muted">
                    {formatDate(s.createdAt)}
                  </time>
                </div>
                <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[140px_1fr]">
                  {Object.entries(s.fields).map(([key, value]) => (
                    <div key={key} className="contents">
                      <dt className="text-sm font-semibold capitalize text-heading">
                        {key}
                      </dt>
                      <dd className="whitespace-pre-wrap break-words text-sm text-muted">
                        {key === "email" ? (
                          <a
                            href={`mailto:${value}`}
                            className="text-brand hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

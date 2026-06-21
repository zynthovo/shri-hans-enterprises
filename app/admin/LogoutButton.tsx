"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const onClick = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-heading transition hover:border-brand hover:text-brand"
    >
      Log out
    </button>
  );
}

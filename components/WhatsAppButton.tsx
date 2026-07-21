// Floating "Chat on WhatsApp" button shown on every page.
const DEFAULT_MESSAGE =
  "Hi Shri Hans! I'd like a quote for a fabrication / laser cutting job.";

export function WhatsAppButton({
  phone = "919876543210",
  message = DEFAULT_MESSAGE,
  label = "Chat on WhatsApp",
}: {
  phone?: string;
  message?: string;
  label?: string;
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition hover:scale-110"
    >
      <i className="fa-brands fa-whatsapp text-3xl" />
      <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-lg bg-[#075E54] px-3 py-1.5 text-sm font-medium opacity-0 shadow-lg transition group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}

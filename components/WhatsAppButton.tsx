// Floating "Chat on WhatsApp" button shown on every page.
const MESSAGE = "Hi Zynthovo! I'd like to know more about your services.";

export function WhatsAppButton({ phone = "918948972625" }: { phone?: string }) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
      className="group fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition hover:scale-110"
    >
      <i className="fa-brands fa-whatsapp text-3xl" />
      <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-lg bg-[#075E54] px-3 py-1.5 text-sm font-medium opacity-0 shadow-lg transition group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}

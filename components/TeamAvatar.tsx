"use client";

// Event handlers (onError) can't be passed as props from a Server Component,
// so the photo-with-fallback bit of Team.tsx (an async Server Component) is
// split out into this small Client Component.
export function TeamAvatar({
  photo,
  name,
  initials,
}: {
  photo: string;
  name: string;
  initials: string;
}) {
  return (
    <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand to-brand-dark text-2xl font-bold text-black">
      <span className="absolute inset-0 flex items-center justify-center">
        {initials}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

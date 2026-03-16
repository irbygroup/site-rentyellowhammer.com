"use client";

import { PHONE_NUMBER } from "@/lib/venues";
import { trackEvent } from "@/lib/analytics";

export function FloatingCallButton() {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      onClick={() =>
        trackEvent("call_clicked", { location: "floating_button" })
      }
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg transition-transform hover:scale-110 md:hidden"
      aria-label="Call us"
    >
      <svg
        className="h-6 w-6 text-dark-bg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    </a>
  );
}

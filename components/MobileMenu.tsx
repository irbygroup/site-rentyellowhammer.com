"use client";

import { useState } from "react";
import Link from "next/link";
import { PHONE_NUMBER, PHONE_DISPLAY } from "@/lib/venues";

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1.5 p-2"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`block h-0.5 w-6 bg-gray-dark transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-dark transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-dark transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 bg-white shadow-lg">
          <div className="flex flex-col px-4 py-4">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-gray-100 py-3 font-heading text-sm font-semibold uppercase tracking-wider text-gray-dark transition-colors hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-gray-100 py-3 font-heading text-sm font-semibold uppercase tracking-wider text-gray-dark transition-colors hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="mt-4 rounded-full bg-gold py-3 text-center font-bold text-dark-bg"
            >
              Call Us Today {PHONE_DISPLAY}
            </a>
            <a
              href="https://www.facebook.com/rentyellowhammer"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 py-2 text-center text-sm text-gray-dark hover:text-gold"
            >
              Follow us on Facebook
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

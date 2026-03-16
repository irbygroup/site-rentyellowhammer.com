import Link from "next/link";
import Image from "next/image";
import { PHONE_NUMBER, PHONE_DISPLAY } from "@/lib/venues";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courtyard-on-dauphin/", label: "Courtyard on Dauphin" },
  { href: "/hallet-irby-house/", label: "Hallett-Irby House" },
  { href: "/oak-and-fountain/", label: "Oak & Fountain" },
  { href: "/short-term-rental-suites/", label: "Short Term Rental Suites" },
  {
    href: "https://yellowhammerhospitality.applytojob.com/apply",
    label: "Careers",
    external: true,
  },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      {/* Top bar: Logo left, CTA + Facebook right */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logos/yh-logo-website.jpg"
            alt="Yellowhammer Hospitality"
            width={220}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-dark-bg transition-colors hover:bg-gold-dark"
          >
            Call Us Today {PHONE_DISPLAY}
          </a>
          <a
            href="https://www.facebook.com/rentyellowhammer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-dark transition-colors hover:text-gold"
            aria-label="Facebook"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>

        <MobileMenu links={navLinks} />
      </div>

      {/* Nav links row */}
      <nav className="hidden border-t border-gray-200 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 py-3">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xs font-semibold uppercase tracking-wider text-gray-dark transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-xs font-semibold uppercase tracking-wider text-gray-dark transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}

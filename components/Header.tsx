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
    <header className="sticky top-0 z-50 bg-dark-bg shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logos/yh-logo-website.jpg"
            alt="Yellowhammer Hospitality"
            width={180}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <a
          href={`tel:${PHONE_NUMBER}`}
          className="hidden rounded-full bg-gold px-5 py-2 text-sm font-bold text-dark-bg transition-colors hover:bg-gold-dark lg:inline-block"
        >
          {PHONE_DISPLAY}
        </a>

        <MobileMenu links={navLinks} />
      </nav>
    </header>
  );
}

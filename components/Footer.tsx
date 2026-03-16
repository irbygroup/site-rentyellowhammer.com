import Link from "next/link";
import Image from "next/image";
import { venues, PHONE_NUMBER, PHONE_DISPLAY, EMAIL } from "@/lib/venues";

export function Footer() {
  return (
    <footer className="bg-dark-bg text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {venues.map((venue) => (
            <div key={venue.slug} className="text-center">
              <Link href={`/${venue.slug}/`}>
                <Image
                  src={venue.logoSrc}
                  alt={venue.name}
                  width={200}
                  height={80}
                  className="mx-auto mb-3 h-16 w-auto"
                />
              </Link>
              <p className="text-sm text-gray-300">{venue.address}</p>
              <p className="text-sm text-gray-300">{venue.city}</p>
              <Link
                href={`/${venue.slug}/`}
                className="mt-2 inline-block text-sm text-gold hover:text-gold-dark"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="text-gold hover:text-gold-dark"
            >
              {PHONE_DISPLAY}
            </a>
            <span className="text-white/30">|</span>
            <a
              href={`mailto:${EMAIL}`}
              className="text-gold hover:text-gold-dark"
            >
              {EMAIL}
            </a>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            <Link href="/privacy-policy/" className="hover:text-gold">
              Privacy Policy
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/terms-of-use/" className="hover:text-gold">
              Terms of Use
            </Link>
            <span className="text-white/30">|</span>
            <a
              href="https://www.facebook.com/rentyellowhammer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              Facebook
            </a>
          </div>

          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Yellowhammer Hospitality. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

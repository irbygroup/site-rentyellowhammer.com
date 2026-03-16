import Image from "next/image";
import Link from "next/link";
import { Venue, PHONE_NUMBER, PHONE_DISPLAY } from "@/lib/venues";
import { VenueAccordion } from "./VenueAccordion";

interface VenuePageProps {
  venue: Venue;
}

function VenueJsonLd({ venue }: { venue: Venue }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventVenue"],
    name: venue.name,
    description: venue.shortDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.address,
      addressLocality: venue.city.split(",")[0].trim(),
      addressRegion: "AL",
      postalCode: venue.city.split(" ").pop(),
      addressCountry: "US",
    },
    telephone: PHONE_NUMBER,
    email: venue.email,
    url: `https://rentyellowhammer.com/${venue.slug}/`,
    image: `https://rentyellowhammer.com${venue.heroImageSrc}`,
    parentOrganization: {
      "@type": "Organization",
      name: "Yellowhammer Hospitality",
      url: "https://rentyellowhammer.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function VenuePage({ venue }: VenuePageProps) {
  return (
    <>
      <VenueJsonLd venue={venue} />

      {/* 1. Hero with venue logo */}
      <section className="relative flex min-h-[60vh] items-center justify-center text-white">
        <Image
          src={venue.heroImageSrc}
          alt={venue.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Image
            src={venue.logoSrc}
            alt={`${venue.name} logo`}
            width={250}
            height={100}
            className="mx-auto mb-6 h-20 w-auto"
            priority
          />
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Welcome to {venue.name}
          </h1>
        </div>
      </section>

      {/* 2. CTA Bar — Gold */}
      <section className="bg-gold py-4 text-center">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex items-center gap-2 font-heading text-lg font-bold text-dark-text transition-colors hover:text-dark-bg"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Us Today {PHONE_DISPLAY}
        </a>
      </section>

      {/* 3. Virtual Tour / Schedule Visit CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {venue.virtualTourUrl && (
              <a
                href={venue.virtualTourUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-dark-bg px-8 py-3 font-bold text-white transition-colors hover:bg-gray-dark"
              >
                See The Space
              </a>
            )}
            <Link
              href="/getting-started/"
              className="rounded-full border-2 border-dark-bg px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-dark-bg hover:text-white"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Tagline + Intro Text */}
      <section className="mx-auto max-w-3xl px-4 pb-16 text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold text-dark-text">
          {venue.tagline}
        </h2>
        {venue.description.map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed text-gray-dark">
            {p}
          </p>
        ))}
      </section>

      {/* 5. Three-column Features */}
      <section className="bg-gray-light py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-dark-text">
            What Makes {venue.name} Perfect For...
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {venue.services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-lg bg-white p-6 shadow-md"
              >
                <h3 className="mb-3 font-heading text-xl font-bold text-dark-text">
                  {svc.title}?
                </h3>
                <p className="text-sm leading-relaxed text-gray-dark">
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Buttons Row */}
      <section className="bg-dark-bg py-12 text-center text-white">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="rounded-full bg-gold px-6 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
          >
            Call Us Today {PHONE_DISPLAY}
          </a>
          {venue.virtualTourUrl && (
            <a
              href={venue.virtualTourUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-gold px-6 py-3 font-bold text-gold transition-colors hover:bg-gold hover:text-dark-bg"
            >
              See The Space
            </a>
          )}
          <Link
            href={`/${venue.gallerySlug}/`}
            className="rounded-full border-2 border-white/50 px-6 py-3 font-bold text-white transition-colors hover:border-gold hover:text-gold"
          >
            View the Gallery
          </Link>
        </div>
      </section>

      {/* 7. Collage Image — Explore Your Options */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="mb-8 font-heading text-3xl font-bold text-dark-text">
            Explore Your Options
          </h2>
          <Image
            src={venue.collageImageSrc}
            alt={`${venue.name} - Explore Your Options`}
            width={1200}
            height={600}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* 8. Accordion Tabs */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <VenueAccordion tabs={venue.tabs} />
      </section>

      {/* 9. Testimonials */}
      {venue.testimonials.length > 0 && (
        <section className="bg-gray-light py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-dark-text">
              What Our Clients Have Said About Us...
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {venue.testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="rounded-lg bg-white p-6 shadow-md"
                >
                  <p className="mb-3 italic text-gray-dark">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <cite className="text-sm font-bold text-dark-text">
                    — {t.name}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Final CTA */}
      <section className="bg-dark-bg py-16 text-center text-white">
        <h2 className="mb-4 font-heading text-3xl font-bold">
          Ready to find out more about {venue.name}?
        </h2>
        <p className="mb-8 text-gray-300">
          Contact us today to schedule a tour or learn more.
        </p>
        <Link
          href="/contact/"
          className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}

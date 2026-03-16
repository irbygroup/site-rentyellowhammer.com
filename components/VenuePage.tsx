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

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-dark-bg text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 to-dark-bg/90" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Image
            src={venue.logoSrc}
            alt={`${venue.name} logo`}
            width={250}
            height={100}
            className="mx-auto mb-6 h-20 w-auto"
            priority
          />
          <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
            Welcome to {venue.name}
          </h1>
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
              href="/getting-started/"
              className="rounded-full border-2 border-white/50 px-6 py-3 font-bold text-white transition-colors hover:border-gold hover:text-gold"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome / Tagline */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold text-dark-bg">
          {venue.tagline}
        </h2>
        {venue.description.map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed text-gray-dark">
            {p}
          </p>
        ))}
      </section>

      {/* Services */}
      <section className="bg-gray-light py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-dark-bg">
            What Makes {venue.name} Perfect For...
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {venue.services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-lg bg-white p-6 shadow-md"
              >
                <h3 className="mb-3 font-heading text-xl font-bold text-dark-bg">
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

      {/* CTAs */}
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

      {/* Accordion Tabs */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-8 text-center font-heading text-3xl font-bold text-dark-bg">
          Explore Your Options
        </h2>
        <VenueAccordion tabs={venue.tabs} />
      </section>

      {/* Testimonials */}
      {venue.testimonials.length > 0 && (
        <section className="bg-gray-light py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-dark-bg">
              What Our Clients Say
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
                  <cite className="text-sm font-bold text-dark-bg">
                    — {t.name}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-dark-bg-alt py-16 text-center text-white">
        <h2 className="mb-4 font-heading text-3xl font-bold">
          Ready to Get Started?
        </h2>
        <p className="mb-8 text-gray-300">
          Contact us today to schedule a tour or learn more about {venue.name}.
        </p>
        <Link
          href={`/getting-started/?venue=${venue.slug === "courtyard-on-dauphin" ? "courtyard" : venue.slug === "oak-and-fountain" ? "oak-fountain" : "hallett-irby"}`}
          className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}

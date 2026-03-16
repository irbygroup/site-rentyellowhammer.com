import Link from "next/link";
import { VenueCard } from "@/components/VenueCard";
import { venues, companyHistory, PHONE_DISPLAY, PHONE_NUMBER } from "@/lib/venues";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center bg-dark-bg text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 to-dark-bg/95" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Immerse Yourself in Genuine{" "}
            <span className="text-gold">Southern Hospitality</span> in Mobile,
            Alabama
          </h1>
          <p className="mb-8 text-lg text-gray-300 md:text-xl">
            Distinctive event venues and overnight accommodations in one of the
            oldest cities in America.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/getting-started/"
              className="rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
            >
              Get Started
            </Link>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="rounded-full border-2 border-gold px-8 py-3 font-bold text-gold transition-colors hover:bg-gold hover:text-dark-bg"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard
              key={venue.slug}
              name={venue.name}
              slug={venue.slug}
              address={venue.address}
              city={venue.city}
              description={venue.shortDescription}
              imageSrc={venue.heroImageSrc}
              logoSrc={venue.logoSrc}
            />
          ))}
        </div>
      </section>

      {/* Book a Tour CTA */}
      <section className="bg-dark-bg-alt py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            Book Your Private Tour Today!
          </h2>
          <p className="mb-8 text-gray-300">
            Looking to turn your vision into reality for your next gathering or
            celebration? Look no further! Our dedicated Event Specialist is here
            to make your dreams come true. Whether it&apos;s a crucial business
            meeting, a lively party, a memorable event, or a fairy-tale wedding,
            we&apos;re ready to tailor an experience just for you.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/getting-started/"
              className="rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
            >
              Get Started
            </Link>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="rounded-full border-2 border-gold px-8 py-3 font-bold text-gold transition-colors hover:bg-gold hover:text-dark-bg"
            >
              Call to Book a Tour
            </a>
          </div>
        </div>
      </section>

      {/* STR Callout */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold text-dark-bg">
          Short Term Rental Suites
        </h2>
        <p className="mb-8 text-gray-dark">
          Interested in an Airbnb? We have suites located throughout Mobile
          County, AL. Click below to book your stay!
        </p>
        <a
          href="https://irbyrents.bookeddirectly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
        >
          Book Here
        </a>
      </section>

      {/* Company History */}
      <section className="bg-gray-light py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-6 font-heading text-3xl font-bold text-dark-bg">
            Our History
          </h2>
          <p className="leading-relaxed text-gray-dark">{companyHistory}</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-dark-bg py-12 text-center text-white">
        <p className="text-gray-300">
          For General Tours and to Book an Event email{" "}
          <a
            href="mailto:info@rentyellowhammer.com"
            className="text-gold hover:text-gold-dark"
          >
            info@rentyellowhammer.com
          </a>
        </p>
        <p className="mt-2 text-gray-300">
          or call us at{" "}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="text-gold hover:text-gold-dark"
          >
            Tel: {PHONE_DISPLAY}
          </a>
        </p>
      </section>
    </>
  );
}

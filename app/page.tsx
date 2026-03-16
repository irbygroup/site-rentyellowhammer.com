import Image from "next/image";
import Link from "next/link";
import { venues, companyHistory, PHONE_DISPLAY, PHONE_NUMBER, EMAIL } from "@/lib/venues";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-dark-bg text-white">
        <Image
          src="/images/courtyard/cyd-gate-03A.png"
          alt="Yellowhammer Hospitality venue"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Immerse Yourself in Genuine Southern Hospitality in Mobile, Alabama
          </h1>
        </div>
      </section>

      {/* 2. Venue Cards — Dark bg with trellis pattern */}
      <section className="trellis-pattern bg-dark-bg py-16 text-white">
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          {/* White YH logo */}
          <div className="mb-10 text-center">
            <Image
              src="/images/logos/logo-footer-white-02.png"
              alt="Yellowhammer Hospitality"
              width={200}
              height={80}
              className="mx-auto h-16 w-auto"
            />
          </div>

          {/* 3 white venue logos */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-8">
            <Image
              src="/images/logos/footer-courtyard.png"
              alt="The Courtyard on Dauphin"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
            <Image
              src="/images/logos/YH-WEB-Oak-Fountain-Logo-H-Wh.png"
              alt="Oak & Fountain"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
            <Image
              src="/images/logos/footer-hallett-irby.png"
              alt="The Hallett-Irby House"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </div>

          {/* 3 venue photo cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                venue: venues[0],
                image: "/images/courtyard/cyd-gate-03A.png",
              },
              {
                venue: venues[1],
                image: "/images/oak-fountain/DSC05924-1-e1707524447102.png",
              },
              {
                venue: venues[2],
                image: "/images/hallett-irby/HI-Exterior-Front.png",
              },
            ].map(({ venue, image }) => (
              <Link
                key={venue.slug}
                href={`/${venue.slug}/`}
                className="group block"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={venue.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mb-1 font-heading text-xl font-bold">
                  {venue.name}
                </h3>
                <p className="mb-2 text-sm text-gray-400">
                  {venue.address}, {venue.city}
                </p>
                <p className="text-sm leading-relaxed text-gray-300">
                  {venue.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Book Your Private Tour Today! — White bg */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-dark-text">
            Book Your Private Tour Today!
          </h2>
          <p className="mb-8 leading-relaxed text-gray-dark">
            Looking to turn your vision into reality for your next gathering or
            celebration? Look no further! Our dedicated Event Specialist is here
            to make your dreams come true. Whether it&apos;s a crucial business
            meeting, a lively party, a memorable event, or a fairy-tale wedding,
            we&apos;re ready to tailor an experience just for you.
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center gap-2 rounded-full bg-dark-bg px-8 py-3 font-bold text-white transition-colors hover:bg-gray-dark"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call to Book a Tour
          </a>
        </div>
      </section>

      {/* 4. Schedule a Tour Today! — Yellow bg */}
      <section className="bg-gold py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-dark-text">
            Schedule a tour Today!
          </h2>
          <p className="mb-8 text-dark-text">
            Ready to see our venues in person? Get started with scheduling your visit.
          </p>
          <Link
            href="/getting-started/"
            className="inline-block rounded-full border-2 border-dark-text px-8 py-3 font-bold text-dark-text transition-colors hover:bg-dark-text hover:text-white"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* 5. Airbnb Section — White bg */}
      <section className="py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 md:flex-row md:justify-center">
          <div className="text-center md:text-left">
            <h2 className="mb-2 font-heading text-3xl font-bold text-dark-text">
              Interested in an airbnb?
            </h2>
            <p className="mb-4 text-gray-dark">
              We have suites located throughout Mobile County, AL. Click below to book your stay!
            </p>
            <a
              href="https://rentyellowhammer.bookeddirectly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
            >
              BOOK HERE
            </a>
          </div>
        </div>
      </section>

      {/* 6. Our History — Yellow bg */}
      <section className="bg-gold py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-6 font-heading text-3xl font-bold text-dark-text">
            Our History
          </h2>
          <p className="leading-relaxed text-dark-text">{companyHistory}</p>
        </div>
      </section>

      {/* 7. Contact Information — Yellow bg (continuation) */}
      <section className="bg-gold pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 font-heading text-2xl font-bold text-dark-text">
            Contact Information
          </h2>
          <p className="mb-2 text-dark-text">
            For General Tours and to Book an Event email{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-bold underline"
            >
              {EMAIL}
            </a>
          </p>
          <p className="mb-8 text-dark-text">
            or call us at{" "}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="font-bold underline"
            >
              Tel: {PHONE_DISPLAY}
            </a>
          </p>

          {/* Google Maps embed */}
          <div className="overflow-hidden rounded-lg">
            <iframe
              src="https://maps.google.com/maps?q=751+Dauphin+St,+Mobile,+AL+36602&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="Yellowhammer Hospitality Location"
              className="h-[350px] w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

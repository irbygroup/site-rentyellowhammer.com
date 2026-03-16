import type { Metadata } from "next";
import { venues, PHONE_NUMBER, PHONE_DISPLAY } from "@/lib/venues";

export const metadata: Metadata = {
  title: "Short Term Rental Suites | Yellowhammer Hospitality",
  description:
    "Book short-term rental suites throughout Mobile County, AL. Comfortable accommodations at The Courtyard on Dauphin, Oak & Fountain, and The Hallett-Irby House.",
};

export default function ShortTermRentalPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-bg py-16 text-center text-white">
        <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
          Short Term Rental Suites
        </h1>
        <p className="mx-auto max-w-2xl text-gray-300">
          We have suites located throughout Mobile County, AL. Contact us for
          more information or book directly below.
        </p>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
        >
          Call Us Today {PHONE_DISPLAY}
        </a>
      </section>

      {/* Venue Address Cards */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {venues.map((venue) => (
            <div
              key={venue.slug}
              className="rounded-lg bg-white p-6 text-center shadow-md"
            >
              <h3 className="mb-2 font-heading text-xl font-bold text-dark-text">
                {venue.name}
              </h3>
              <p className="text-sm text-gray-medium">
                {venue.address}
                <br />
                {venue.city}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BookedDirectly Iframe */}
      <section className="bg-gray-light py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-dark-text">
            Book Your Stay
          </h2>
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <iframe
              src="https://irbyrents.bookeddirectly.com/g/listings"
              title="Book a rental suite"
              className="h-[900px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

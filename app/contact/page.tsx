import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { venues, PHONE_NUMBER, PHONE_DISPLAY, EMAIL } from "@/lib/venues";

export const metadata: Metadata = {
  title: "Contact Us | Yellowhammer Hospitality",
  description:
    "Contact Yellowhammer Hospitality for event venue inquiries in Mobile, AL. Schedule a tour of The Courtyard on Dauphin, Oak & Fountain, or The Hallett-Irby House.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-bg py-16 text-center text-white">
        <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto max-w-xl text-gray-300">
          We&apos;re Glad You&apos;re Here, We&apos;d Love To Chat.
        </p>
      </section>

      {/* Contact Content */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Info */}
          <div>
            <h2 className="mb-4 font-heading text-2xl font-bold text-dark-bg">
              We have a place and a space that you&apos;ll love!
            </h2>
            <p className="mb-4 leading-relaxed text-gray-dark">
              Mobile is one of the oldest cities in the country and the best
              place to experience authentic Southern hospitality during your next
              social or business event. Our properties offer more than 200,000
              square feet of space to be used for hosting social gatherings, team
              building retreats, conferences and weddings to name a few.
            </p>
            <p className="mb-6 leading-relaxed text-gray-dark">
              Between our historic venues such as the Hallett-Irby House, to
              spacious rolling hills and quiet peaceful atmosphere of Oak and
              Fountain there&apos;s a venue to suit every event planner&apos;s
              needs. Send us a message today and our sales team will be ready to
              assist you with the next steps.
            </p>

            <div className="mb-6 rounded-lg bg-gray-light p-6">
              <h3 className="mb-2 font-heading text-lg font-bold text-dark-bg">
                Our Location
              </h3>
              <p className="text-gray-dark">
                751 Dauphin Street
                <br />
                Mobile, AL 36602
              </p>
              <p className="mt-2">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="text-gold hover:text-gold-dark"
                >
                  Tel: {PHONE_DISPLAY}
                </a>
              </p>
              <p className="mt-1">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-gold hover:text-gold-dark"
                >
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-lg bg-gray-light p-8">
            <h3 className="mb-6 font-heading text-xl font-bold text-dark-bg">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="bg-gray-light py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-dark-bg">
            Our Brands
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {venues.map((venue) => (
              <Link
                key={venue.slug}
                href={`/${venue.slug}/`}
                className="rounded-lg bg-white p-5 text-center shadow-md transition-transform hover:-translate-y-1"
              >
                <h3 className="mb-1 font-heading text-lg font-bold text-dark-bg">
                  {venue.name}
                </h3>
                <p className="text-sm text-gray-medium">
                  {venue.address}
                  <br />
                  {venue.city}
                </p>
              </Link>
            ))}
            <div className="rounded-lg bg-white p-5 text-center shadow-md">
              <h3 className="mb-1 font-heading text-lg font-bold text-dark-bg">
                Short Term Rental Suites
              </h3>
              <p className="text-sm text-gray-medium">
                Suites located throughout Mobile County, AL.{" "}
                <Link href="/contact/" className="text-gold hover:text-gold-dark">
                  Contact Us
                </Link>{" "}
                for more information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

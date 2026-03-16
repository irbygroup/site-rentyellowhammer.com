import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { venues, companyAbout, teamMembers } from "@/lib/venues";

export const metadata: Metadata = {
  title: "About Us | Yellowhammer Hospitality",
  description:
    "Learn about Yellowhammer Hospitality, our team, and our distinctive event venues in Mobile, Alabama. Over a decade of creating exceptional experiences.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-bg py-16 text-center text-white">
        <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
          Get To Know Us!
        </h1>
        <p className="mx-auto max-w-xl text-gray-300">
          We&apos;re a friendly team, committed to the very best.
        </p>
      </section>

      {/* About */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="mb-8 leading-relaxed text-gray-dark">{companyAbout}</p>
        <Link
          href="/getting-started/"
          className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
        >
          Book a Virtual Tour!
        </Link>
      </section>

      {/* Team */}
      <section className="bg-gray-light py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-dark-bg">
            Team
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-lg bg-white text-center shadow-md"
              >
                <div className="relative h-64">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-dark-bg">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gold">
                    {member.title}
                  </p>
                  <p className="text-sm text-gray-dark">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Overview + CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-dark-bg">
            Let&apos;s Start Talking About Your Event
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {venues.map((venue) => (
              <Link
                key={venue.slug}
                href={`/${venue.slug}/`}
                className="rounded-lg bg-gray-light p-5 text-center transition-transform hover:-translate-y-1"
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
          </div>
        </div>
      </section>
    </>
  );
}

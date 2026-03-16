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

      {/* Team */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-dark-text">
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
                  <h3 className="font-heading text-xl font-bold text-dark-text">
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

      {/* About */}
      <section className="bg-gray-light py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="mb-8 leading-relaxed text-gray-dark">{companyAbout}</p>
          <Link
            href="/contact/"
            className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
          >
            Book a Virtual Tour!
          </Link>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-dark-text">
            Let&apos;s Start Talking About Your Event
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {venues.map((venue) => (
              <Link
                key={venue.slug}
                href={`/${venue.slug}/`}
                className="group relative block overflow-hidden rounded-lg shadow-md transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={venue.heroImageSrc}
                    alt={venue.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="mb-1 font-heading text-lg font-bold">
                      {venue.name}
                    </h3>
                    <p className="text-sm">
                      {venue.address}, {venue.city}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

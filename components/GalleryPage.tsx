"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gallery } from "./Gallery";
import { Venue, PHONE_NUMBER, PHONE_DISPLAY } from "@/lib/venues";
import { trackEvent } from "@/lib/analytics";

interface GalleryPageProps {
  venue: Venue;
}

export function GalleryPage({ venue }: GalleryPageProps) {
  useEffect(() => {
    trackEvent("gallery_viewed", { venue: venue.slug });
  }, [venue.slug]);

  return (
    <>
      {/* Header */}
      <section className="bg-dark-bg py-12 text-center text-white">
        <Image
          src={venue.logoSrc}
          alt={`${venue.name} logo`}
          width={200}
          height={80}
          className="mx-auto mb-4 h-16 w-auto"
        />
        <h1 className="font-heading text-3xl font-bold md:text-4xl">
          {venue.name} Gallery
        </h1>
        <p className="mt-2 text-gray-300">
          {venue.address}, {venue.city}
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Gallery images={venue.galleryImages} />
      </section>

      {/* Floor Plan */}
      {venue.floorPlanSrc && (
        <section className="bg-gray-light py-12">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-6 font-heading text-2xl font-bold text-dark-bg">
              Floor Plan
            </h2>
            <Image
              src={venue.floorPlanSrc}
              alt={`${venue.name} floor plan`}
              width={800}
              height={600}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Testimonials */}
      {venue.testimonials.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-dark-bg">
              What Our Clients Say
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {venue.testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="rounded-lg bg-gray-light p-6"
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

      {/* CTA */}
      <section className="bg-dark-bg py-12 text-center text-white">
        <h2 className="mb-4 font-heading text-2xl font-bold">
          Interested in {venue.name}?
        </h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={`/${venue.slug}/`}
            className="rounded-full bg-gold px-6 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark"
          >
            Learn More
          </Link>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="rounded-full border-2 border-gold px-6 py-3 font-bold text-gold transition-colors hover:bg-gold hover:text-dark-bg"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </>
  );
}

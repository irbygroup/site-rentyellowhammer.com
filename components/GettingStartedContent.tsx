"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";

function GettingStartedForm() {
  const searchParams = useSearchParams();
  const defaultVenue = searchParams.get("venue") || "";

  return (
    <div className="rounded-lg bg-gray-light p-8">
      <ContactForm defaultVenue={defaultVenue} />
    </div>
  );
}

export function GettingStartedContent() {
  return (
    <>
      <section className="bg-dark-bg py-16 text-center text-white">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">
          Getting Started
        </h1>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-light" />}>
          <GettingStartedForm />
        </Suspense>
      </section>
    </>
  );
}

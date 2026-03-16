"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

interface ContactFormProps {
  defaultVenue?: string;
}

const venueOptions = [
  { value: "", label: "Select a venue..." },
  { value: "courtyard", label: "The Courtyard on Dauphin" },
  { value: "oak-fountain", label: "Oak & Fountain" },
  { value: "hallett-irby", label: "The Hallett-Irby House" },
  { value: "general", label: "General Inquiry" },
];

const eventTypeOptions = [
  { value: "", label: "Select event type..." },
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate Event" },
  { value: "party", label: "Party / Celebration" },
  { value: "reunion", label: "Reunion / Retreat" },
  { value: "meeting", label: "Meeting" },
  { value: "other", label: "Other" },
];

export function ContactForm({ defaultVenue }: ContactFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    venue: defaultVenue || "",
    eventType: "",
    eventDetail: "",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const turnstileRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    const interval = setInterval(() => {
      if (window.turnstile && !turnstileRef.current) {
        turnstileRef.current = window.turnstile.render(
          "#turnstile-container",
          {
            sitekey: siteKey,
            callback: (token: string) => setTurnstileToken(token),
            "refresh-expired": "auto",
          },
        );
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const params = new URLSearchParams(window.location.search);

    try {
      const resp = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          turnstileToken,
          sourcePage: window.location.pathname,
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
        }),
      });

      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      trackEvent("form_submitted", {
        venue: form.venue,
        event_type: form.eventType,
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
      if (turnstileRef.current && window.turnstile) {
        window.turnstile.reset(turnstileRef.current);
      }
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg bg-green-50 p-8 text-center">
        <h3 className="mb-2 font-heading text-2xl font-bold text-green-800">
          Thank You!
        </h3>
        <p className="text-green-700">
          We&apos;ve received your inquiry and will be in touch soon. Our team
          typically responds within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-1 block text-sm font-medium text-gray-dark"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={form.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-1 block text-sm font-medium text-gray-dark"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={form.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-dark"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-gray-dark"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="venue"
            className="mb-1 block text-sm font-medium text-gray-dark"
          >
            Venue *
          </label>
          <select
            id="venue"
            name="venue"
            required
            value={form.venue}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          >
            {venueOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="eventType"
            className="mb-1 block text-sm font-medium text-gray-dark"
          >
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            value={form.eventType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          >
            {eventTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {form.eventType === "other" && (
        <div>
          <label
            htmlFor="eventDetail"
            className="mb-1 block text-sm font-medium text-gray-dark"
          >
            Please describe your event
          </label>
          <input
            type="text"
            id="eventDetail"
            name="eventDetail"
            value={form.eventDetail}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-gray-dark"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <div id="turnstile-container" />

      {status === "error" && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-gold px-8 py-3 font-bold text-dark-bg transition-colors hover:bg-gold-dark disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

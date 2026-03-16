import type { Metadata } from "next";
import { Montserrat, Hind } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCallButton } from "@/components/FloatingCallButton";
import { ChatwootWidget } from "@/components/ChatwootWidget";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const hind = Hind({
  variable: "--font-hind",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yellowhammer Hospitality | Event Venues in Mobile, AL",
    template: "%s | Yellowhammer Hospitality",
  },
  description:
    "Distinctive event venues and overnight accommodations in Mobile, Alabama. Weddings, corporate events, reunions, and short-term rentals at The Courtyard on Dauphin, Oak & Fountain, and The Hallett-Irby House.",
  metadataBase: new URL("https://rentyellowhammer.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Yellowhammer Hospitality",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`${montserrat.variable} ${hind.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
        <ChatwootWidget />
        <AnalyticsScripts />
      </body>
    </html>
  );
}

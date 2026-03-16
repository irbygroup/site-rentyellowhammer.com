import type { Metadata } from "next";
import { VenuePage } from "@/components/VenuePage";
import { getVenueBySlug } from "@/lib/venues";

const venue = getVenueBySlug("courtyard-on-dauphin")!;

export const metadata: Metadata = {
  title: "The Courtyard on Dauphin | Event Venue in Downtown Mobile, AL",
  description:
    "The Courtyard on Dauphin is an exquisite event venue in downtown Mobile, AL. Perfect for weddings, corporate events, and special occasions with dedicated off-street parking.",
  openGraph: {
    title: "The Courtyard on Dauphin",
    description: venue.shortDescription,
  },
};

export default function CourtyardPage() {
  return <VenuePage venue={venue} />;
}

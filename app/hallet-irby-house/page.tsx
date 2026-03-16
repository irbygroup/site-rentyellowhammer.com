import type { Metadata } from "next";
import { VenuePage } from "@/components/VenuePage";
import { getVenueBySlug } from "@/lib/venues";

const venue = getVenueBySlug("hallet-irby-house")!;

export const metadata: Metadata = {
  title: "The Hallett-Irby House | Historic Venue in Mobile, AL",
  description:
    "Built in 1859, The Hallett-Irby House is a historic venue on Government Street in Mobile, AL. Perfect for weddings, social events, and intimate gatherings.",
  openGraph: {
    title: "The Hallett-Irby House",
    description: venue.shortDescription,
  },
};

export default function HallettIrbyPage() {
  return <VenuePage venue={venue} />;
}

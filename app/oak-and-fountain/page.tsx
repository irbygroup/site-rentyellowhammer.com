import type { Metadata } from "next";
import { VenuePage } from "@/components/VenuePage";
import { getVenueBySlug } from "@/lib/venues";

const venue = getVenueBySlug("oak-and-fountain")!;

export const metadata: Metadata = {
  title: "Oak & Fountain | Event Venue in Grand Bay, AL",
  description:
    "Oak & Fountain is a stunning countryside venue in Grand Bay, AL. Perfect for weddings, corporate retreats, and reunions with 19 on-site rental suites.",
  openGraph: {
    title: "Oak & Fountain",
    description: venue.shortDescription,
  },
};

export default function OakAndFountainPage() {
  return <VenuePage venue={venue} />;
}

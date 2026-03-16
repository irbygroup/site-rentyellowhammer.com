import type { Metadata } from "next";
import { GalleryPage } from "@/components/GalleryPage";
import { getVenueBySlug } from "@/lib/venues";

const venue = getVenueBySlug("courtyard-on-dauphin")!;

export const metadata: Metadata = {
  title: "Courtyard on Dauphin Gallery | Photos of Our Downtown Mobile Venue",
  description:
    "Browse photos of The Courtyard on Dauphin, an exquisite event venue in downtown Mobile, AL. View our elegant spaces, courtyard, and event setups.",
};

export default function CourtyardGalleryPage() {
  return <GalleryPage venue={venue} />;
}

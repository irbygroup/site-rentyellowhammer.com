import type { Metadata } from "next";
import { GalleryPage } from "@/components/GalleryPage";
import { getVenueBySlug } from "@/lib/venues";

const venue = getVenueBySlug("oak-and-fountain")!;

export const metadata: Metadata = {
  title: "Oak & Fountain Gallery | Photos of Our Grand Bay, AL Venue",
  description:
    "Browse photos of Oak & Fountain, a stunning countryside venue in Grand Bay, AL. View our scenic grounds, rental suites, and event spaces.",
};

export default function OakFountainGalleryPage() {
  return <GalleryPage venue={venue} />;
}

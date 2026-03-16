import type { Metadata } from "next";
import { GalleryPage } from "@/components/GalleryPage";
import { getVenueBySlug } from "@/lib/venues";

const venue = getVenueBySlug("hallet-irby-house")!;

export const metadata: Metadata = {
  title: "Hallett-Irby House Gallery | Photos of Our Historic Mobile Venue",
  description:
    "Browse photos of The Hallett-Irby House, a historic venue on Government Street in Mobile, AL. View our courtyard, carriage house, and elegant interiors.",
};

export default function HallettIrbyGalleryPage() {
  return <GalleryPage venue={venue} />;
}

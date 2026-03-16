import type { Metadata } from "next";
import { GettingStartedContent } from "@/components/GettingStartedContent";

export const metadata: Metadata = {
  title: "Getting Started | Book Your Event",
  description:
    "Get started with Yellowhammer Hospitality. Fill out our inquiry form and our Event Specialist will contact you to schedule a tour and discuss your event.",
};

export default function GettingStartedPage() {
  return <GettingStartedContent />;
}

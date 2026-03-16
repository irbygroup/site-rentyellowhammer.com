"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
}

export function Gallery({ images }: GalleryProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    import("glightbox").then((mod) => {
      const GLightbox = mod.default;
      GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
      });
    });
  }, []);

  if (images.length === 0) {
    return (
      <p className="py-12 text-center text-gray-medium">
        Gallery images coming soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img, i) => (
        <a
          key={i}
          href={img.src}
          className="glightbox group relative block overflow-hidden rounded-lg"
          data-gallery="venue-gallery"
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}

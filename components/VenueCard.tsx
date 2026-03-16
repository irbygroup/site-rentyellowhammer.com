import Image from "next/image";
import Link from "next/link";

interface VenueCardProps {
  name: string;
  slug: string;
  address: string;
  city: string;
  description: string;
  imageSrc: string;
  logoSrc: string;
}

export function VenueCard({
  name,
  slug,
  address,
  city,
  description,
  imageSrc,
  logoSrc,
}: VenueCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:-translate-y-1">
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Image
            src={logoSrc}
            alt={`${name} logo`}
            width={120}
            height={48}
            className="h-10 w-auto"
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-1 font-heading text-xl font-bold text-dark-bg">
          {name}
        </h3>
        <p className="mb-3 text-sm text-gray-medium">
          {address}, {city}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-gray-dark">
          {description}
        </p>
        <Link
          href={`/${slug}/`}
          className="inline-block rounded-full bg-gold px-6 py-2 text-sm font-bold text-dark-bg transition-colors hover:bg-gold-dark"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

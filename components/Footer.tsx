import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1b1b1b" }} className="py-8 text-center">
      <div className="mb-3">
        <Link href="/privacy-policy/" className="text-sm text-gold hover:text-gold-dark">
          Privacy Policy
        </Link>
        <span className="mx-2 text-sm text-gray-500">&amp;</span>
        <Link href="/terms-of-use/" className="text-sm text-gold hover:text-gold-dark">
          Terms of Use
        </Link>
      </div>
      <p className="text-sm text-gray-500">
        Copyright 2026 - Yellowhammer Hospitality
      </p>
    </footer>
  );
}

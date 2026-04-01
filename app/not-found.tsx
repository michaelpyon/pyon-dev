import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function NotFound() {
  return (
    <>
      <ThemeToggle />
      <main id="main-content" className="px-6 pt-24 pb-20 max-w-5xl mx-auto">
        <h1
          className="font-display text-4xl sm:text-5xl text-text tracking-tight mb-4"
          style={{ letterSpacing: "-1.5px" }}
        >
          Page not found
        </h1>
        <p className="text-text-muted text-sm mb-8">
          Nothing here. Probably a typo.
        </p>
        <Link
          href="/"
          className="text-xs tracking-wide text-text-muted hover:text-text transition-colors duration-200"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          &larr; Back to home
        </Link>
      </main>
    </>
  );
}

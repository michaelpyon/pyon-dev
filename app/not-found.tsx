import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function NotFound() {
  return (
    <>
      <ThemeToggle />
      <main id="main-content" className="px-6 pt-32 pb-24 max-w-5xl mx-auto sm:pt-40">
        <h1
          className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-text leading-[0.92] mb-5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Page not found
        </h1>
        <p className="text-text-muted text-sm sm:text-base mb-10">
          Nothing here. Probably a typo.
        </p>
        <Link
          href="/"
          className="text-xs tracking-wide text-accent hover:text-accent-hover transition-colors duration-200"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          &larr; Back to home
        </Link>
      </main>
    </>
  );
}

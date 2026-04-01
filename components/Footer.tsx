"use client";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/michaelpyon",
    ariaLabel: "Michael Pyon on LinkedIn",
  },
  {
    label: "GitHub",
    href: "https://github.com/michaelpyon",
    ariaLabel: "Michael Pyon on GitHub",
  },
  {
    label: "X",
    href: "https://x.com/michaelpyon",
    ariaLabel: "Michael Pyon on X",
  },
];

export function Footer() {
  return (
    <footer className="bg-surface">
      {/* Editorial CTA */}
      <div className="flex flex-col items-center text-center py-24 px-8">
        <div className="max-w-3xl">
          <h2
            className="text-4xl md:text-6xl font-display italic mb-8"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ready to build something that lasts?
          </h2>
          <a
            href="mailto:michaelpyon@gmail.com"
            className="text-2xl md:text-4xl font-light border-b border-text-subtle pb-2 hover:text-accent hover:border-accent transition-all duration-300"
          >
            michaelpyon@gmail.com
          </a>
        </div>

        {/* Social links */}
        <div className="flex space-x-8 pt-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="text-text-muted hover:underline decoration-2 underline-offset-4 tracking-tight"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-12 flex flex-col items-center">
          <p className="text-text-subtle text-sm tracking-tight">
            2026 Michael Pyon. Brooklyn, NY.
          </p>
        </div>
      </div>
    </footer>
  );
}

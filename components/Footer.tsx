"use client";

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/michaelpyon",
    ariaLabel: "Michael Pyon on X",
  },
  {
    label: "GitHub",
    href: "https://github.com/michaelpyon",
    ariaLabel: "Michael Pyon on GitHub",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/michaelpyon",
    ariaLabel: "Michael Pyon on LinkedIn",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Contact CTA */}
      <div className="py-20 sm:py-24 px-6 max-w-screen-2xl mx-auto text-center">
        <h2
          className="font-display italic text-3xl sm:text-4xl lg:text-5xl text-text mb-5"
          style={{ letterSpacing: "-0.02em" }}
        >
          Let&apos;s build something.
        </h2>
        <p className="text-text-muted text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
          Looking for someone who ships constantly and thinks deeply? Reach out.
        </p>
        <a
          href="mailto:michaelpyon@gmail.com"
          className="inline-block text-xs uppercase tracking-[0.15em] font-medium text-accent hover:text-bg hover:bg-accent border border-accent px-7 py-3.5 rounded-full transition-all duration-300"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          michaelpyon@gmail.com
        </a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center py-8 px-6 max-w-screen-2xl mx-auto gap-5">
          <span
            className="text-[10px] uppercase tracking-[0.15em] text-text-subtle"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            2026 Brooklyn, NY
          </span>
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-[10px] uppercase tracking-[0.15em] text-text-subtle hover:text-accent transition-colors duration-200"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:michaelpyon@gmail.com"
              className="text-[10px] uppercase tracking-[0.15em] text-text-subtle hover:text-accent transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

const links = [
  {
    label: "X",
    href: "https://x.com/michaelpyon",
    ariaLabel: "Michael Pyon on X",
  },
  { label: "GitHub", href: "https://github.com/michaelpyon" },
  { label: "LinkedIn", href: "https://linkedin.com/in/michaelpyon" },
  { label: "Email", href: "mailto:michaelpyon@gmail.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Contact CTA */}
      <div className="py-16 px-6 max-w-screen-2xl mx-auto text-center">
        <h2
          className="font-display italic text-3xl sm:text-4xl text-text mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          Let's talk
        </h2>
        <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
          Building something interesting? Looking for someone who ships
          constantly and thinks deeply? Reach out.
        </p>
        <a
          href="mailto:michaelpyon@gmail.com"
          className="inline-block font-label text-xs uppercase tracking-[0.15em] font-medium text-accent hover:text-text transition-colors duration-200 border border-accent hover:border-text px-6 py-3"
        >
          michaelpyon@gmail.com
        </a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 max-w-screen-2xl mx-auto gap-4">
          <span className="font-label text-[10px] uppercase tracking-widest font-medium text-text">
            2026 Brooklyn, NY
          </span>
          <div className="flex flex-wrap justify-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                aria-label={link.ariaLabel}
                className="font-label text-[10px] uppercase tracking-widest font-medium text-text-subtle hover:text-accent focus-visible:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

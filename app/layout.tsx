import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://michaelpyon.com"),
  title: {
    default: "Michael Pyon | Builder's Record",
    template: "%s | Michael Pyon",
  },
  description:
    "Michael Pyon builds tools that make data legible. 43 projects across finance, NYC, music, and games.",
  openGraph: {
    type: "website",
    siteName: "Michael Pyon",
    locale: "en_US",
    url: "https://michaelpyon.com",
    title: "Michael Pyon | Builder's Record",
    description:
      "Michael Pyon builds tools that make data legible. 43 projects across finance, NYC, music, and games.",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Pyon | Builder's Record",
    description:
      "Michael Pyon builds tools that make data legible. 43 projects across finance, NYC, music, and games.",
    images: ["/og.png"],
    site: "@michaelpyon",
    creator: "@michaelpyon",
  },
  robots: "index,follow",
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "theme-color": "#fbf9f4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Work+Sans:wght@300;400;500;600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Michael Pyon",
              url: "https://michaelpyon.com/",
              sameAs: [
                "https://x.com/michaelpyon",
                "https://github.com/michaelpyon",
                "https://linkedin.com/in/michaelpyon",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-text focus:text-bg focus:text-sm focus:font-medium"
            >
              Skip to content
            </a>
            <CustomCursor />
            <div className="min-h-dvh bg-bg">
              {children}
              <Footer />
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

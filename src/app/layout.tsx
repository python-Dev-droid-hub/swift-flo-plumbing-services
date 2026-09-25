import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { COLORS, SITE } from "@/lib/constants";
import { absoluteUrl, getSiteUrl, SEO } from "@/lib/seo";
import "./globals.css";

/**
 * Display: Fraunces — soft serif for headlines and index numbers.
 * Body: Outfit — geometric, readable UI and body text.
 */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SEO.title,
    template: `%s · ${SITE.shortName}`,
  },
  description: SEO.description,
  applicationName: SITE.name,
  category: SEO.category,
  keywords: [...SEO.keywords],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SEO.locale,
    url: absoluteUrl("/"),
    siteName: SITE.name,
    title: SEO.title,
    description: SEO.description,
    images: [
      {
        url: SEO.ogImagePath,
        width: 480,
        height: 480,
        alt: SEO.ogImageAlt,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: SEO.twitterCard,
    title: SEO.title,
    description: SEO.description,
    images: [
      {
        url: SEO.ogImagePath,
        alt: SEO.ogImageAlt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      {
        url: SITE.logoMark,
        sizes: "112x112",
        type: "image/webp",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: COLORS.bgLight },
    { media: "(prefers-color-scheme: dark)", color: COLORS.brandPrimary },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full overflow-x-clip antialiased`}
    >
      <body
        className="flex min-h-full flex-col overflow-x-clip bg-bg-light font-sans text-text-primary"
        suppressHydrationWarning
      >
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-border-accent focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-text-primary focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
          >
            Skip to main content
          </a>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

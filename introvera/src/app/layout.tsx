import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Load fonts with variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Enhanced SEO + Social Metadata
export const metadata: Metadata = {
  title: "Introvera | Custom Software Development Company",
  description:
    "Introvera is a modern software development company building scalable web, mobile, and backend solutions for startups and enterprises.",
  keywords: [
    "software development", "web development", "mobile app development",
    "custom software", "tech company", "Next.js", "Introvera"
  ],
  metadataBase: new URL("https://introvera.com"),
  openGraph: {
    title: "Introvera | Custom Software Development Company",
    description:
      "We help businesses thrive with modern, scalable web and mobile solutions.",
    url: "https://introvera.com",
    siteName: "Introvera",
    images: [
      {
        url: "/logo.png", // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Introvera Team Working on Software Project",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Introvera",
    description:
      "Custom software development solutions for startups and businesses.",
    images: ["https://introvera.com/og-image.jpg"], // Replace with real image
    creator: "@introvera", // Optional
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://introvera.com" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

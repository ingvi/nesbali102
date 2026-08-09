import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Providers } from "./providers";
import { property } from "@/content/property";
import "./globals.css";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(property.meta.siteUrl),
  title: property.meta.title,
  description: property.meta.description,
  openGraph: {
    title: property.meta.title,
    description: property.meta.description,
    type: "website",
    images: [property.hero.src],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Newsreader } from "next/font/google";
import { Providers } from "../providers";
import { LangProvider } from "@/components/LangContext";
import { property } from "@/content/property";
import { DEFAULT_LANG, LANGS, isLang, type Lang } from "@/lib/i18n";
import "../globals.css";

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

/** Only /is and /en exist; anything else is a 404 rather than a live page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const share = {
    url: property.meta.shareImage,
    width: 1200,
    height: 630,
    alt: property.meta.shareImageAlt[lang],
  };

  return {
    metadataBase: new URL(property.meta.siteUrl),
    title: property.meta.title[lang],
    description: property.meta.description[lang],
    alternates: {
      canonical: `/${lang}`,
      // Both listings describe the same property, so each points at the other.
      // x-default tells Google which to serve when it cannot tell the language
      // a searcher wants — Icelandic, since the house is in Iceland.
      languages: {
        ...Object.fromEntries(LANGS.map((code) => [code, `/${code}`])),
        "x-default": `/${DEFAULT_LANG}`,
      },
    },
    openGraph: {
      title: property.meta.title[lang],
      description: property.meta.description[lang],
      url: `/${lang}`,
      siteName: property.name,
      locale: lang === "is" ? "is_IS" : "en_GB",
      alternateLocale: lang === "is" ? ["en_GB"] : ["is_IS"],
      type: "website",
      images: [share],
    },
    twitter: {
      // Without this the link renders as a thumbnail beside text rather than
      // the full-width photograph.
      card: "summary_large_image",
      title: property.meta.title[lang],
      description: property.meta.description[lang],
      images: [share],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Providers>
          <LangProvider lang={lang as Lang}>{children}</LangProvider>
        </Providers>
      </body>
    </html>
  );
}

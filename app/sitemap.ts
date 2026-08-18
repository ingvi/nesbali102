import type { MetadataRoute } from "next";
import { property } from "@/content/property";
import { LANGS } from "@/lib/i18n";

/**
 * Two URLs, one per language, each declaring the other as an alternate. Small
 * enough to be pointless on its own — its value is that it gives Search Console
 * something to submit, which is the fastest way to get a brand-new page crawled
 * rather than waiting to be discovered.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = property.meta.siteUrl;

  return LANGS.map((lang) => ({
    url: `${base}/${lang}`,
    changeFrequency: "weekly" as const,
    priority: lang === "is" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(LANGS.map((code) => [code, `${base}/${code}`])),
    },
  }));
}

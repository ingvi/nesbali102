import type { MetadataRoute } from "next";
import { property } from "@/content/property";

/**
 * Everything is allowed, assistant crawlers included.
 *
 * The named entries below are redundant — `*: allow /` already covers them — but
 * they are written out on purpose, because "should an AI be allowed to read this
 * listing" is a decision worth recording rather than leaving to a default. For a
 * house that is actively for sale the answer is plainly yes: being quotable by
 * something a buyer is asking for help is the entire point.
 *
 * To reverse it later, move a crawler into `disallow`. Note that Google-Extended
 * governs whether Gemini and AI Overviews may use the page; it does not affect
 * ordinary Google Search ranking either way.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${property.meta.siteUrl}/sitemap.xml`,
    host: property.meta.siteUrl,
  };
}

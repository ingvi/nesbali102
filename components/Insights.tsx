"use client";

import { useEffect } from "react";
import { Analytics, track } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Lang } from "@/lib/i18n";

/**
 * Visit tracking, via Vercel Web Analytics.
 *
 * Chosen over Google Analytics deliberately: it sets no cookies and stores no
 * client identifier, so the page needs no consent banner — which matters for a
 * listing whose whole job is to be opened and read, not negotiated with.
 *
 * Pageviews arrive on their own. What the events below add is the part actually
 * worth knowing when you are selling a house: not how many people looked, but
 * how many got as far as reaching for the phone.
 *
 * The listener is delegated from the document rather than wired into each link,
 * so a phone number or listing link added later is counted without anyone
 * remembering to instrument it.
 */
export function Insights({ lang }: { lang: Lang }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        track("call", { lang });
      } else if (href.startsWith("mailto:")) {
        track("email", { lang });
      } else if (href.includes("betristofan.is")) {
        track("agency-listing", { lang });
      } else if (href.includes("openstreetmap.org") || href.includes("google.com/maps")) {
        track("map", { lang });
      } else if (href.includes("hms.is")) {
        track("registry", { lang });
      }
    };

    // Capture phase, so a click still counts if something stops propagation.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [lang]);

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

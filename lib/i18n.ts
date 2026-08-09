export const LANGS = ["is", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "is";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** A string that exists in both languages. */
export type L = Record<Lang, string>;

/** Picks the right side of a bilingual value. */
export function t<T>(value: Record<Lang, T>, lang: Lang): T {
  return value[lang];
}

/** What the other language is called, for the switch in the header. */
export const langLabel: Record<Lang, string> = {
  is: "ÍS",
  en: "EN",
};

/**
 * Chrome — every string the page shows that is not part of the listing itself.
 * The listing content lives in content/property.ts.
 */
export const ui = {
  is: {
    navPhotos: "Myndir",
    navFacts: "Upplýsingar",
    navLocation: "Staðsetning",
    navEnquiry: "Fyrirspurn",

    seeImages: "Sjá myndir",
    seeAllImages: "Sjá allar myndir",
    propertyEnquiry: "Fyrirspurn um eignina",

    highlights: "Helstu atriði",
    facts: "Upplýsingar úr fasteignaskrá",
    shortcuts: "Flýtileiðir",
    floorPlans: "Teikningar",
    mapOfArea: "Kort af svæðinu",
    openInMaps: "Opna í kortum",

    formName: "Nafn",
    formPhone: "Sími",
    formEmail: "Netfang",
    formMessage: "Skilaboð",
    formMessagePlaceholder: "Er eitthvað sem þig langar að vita fyrir skoðun?",
    formViewing: "Ég vil bóka skoðun",
    formSend: "Senda",
    formAddress: "Heimilisfang",
    formSent:
      "Póstforritið þitt ætti að hafa opnast með skilaboðunum tilbúnum. Ef ekkert gerðist, sendu þá póst beint á",

    lightboxClose: "Loka",
    lightboxPrev: "Fyrri",
    lightboxNext: "Næsta",
    lightboxOpen: "Opna mynd",

    /** Sits under the facts table, since the numbers come from a public register. */
    registrySource: "Heimild: Fasteignaskrá HMS",
  },

  en: {
    navPhotos: "Photos",
    navFacts: "Facts",
    navLocation: "Location",
    navEnquiry: "Enquiry",

    seeImages: "See images",
    seeAllImages: "See all images",
    propertyEnquiry: "Property enquiry",

    highlights: "Highlights",
    facts: "Property register",
    shortcuts: "Shortcuts",
    floorPlans: "Floor plans",
    mapOfArea: "Map of the area",
    openInMaps: "Open in maps",

    formName: "Name",
    formPhone: "Phone",
    formEmail: "Email",
    formMessage: "Message",
    formMessagePlaceholder: "Anything you would like to know before a viewing?",
    formViewing: "I would like to book a viewing",
    formSend: "Send",
    formAddress: "Address",
    formSent:
      "Your mail app should have opened with the message ready to send. If nothing happened, write directly to",

    lightboxClose: "Close",
    lightboxPrev: "Prev",
    lightboxNext: "Next",
    lightboxOpen: "Open image",

    registrySource: "Source: HMS property register",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)["is"];

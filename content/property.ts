/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE ONLY.
 *  Everything the visitor sees on the listing comes from here.
 *  Replace the placeholder values marked TODO with your real details, and drop
 *  your photos into /public/images (keep the same file names, or update them).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type GalleryImage = {
  src: string;
  alt: string;
  /** "full" = edge to edge, "half" = half width aligned right, "inset" = centered 3/4 */
  width: "full" | "half" | "inset";
};

export const property = {
  /** Shown in the browser tab and in link previews. */
  meta: {
    title: "Nesbali 102, Seltjarnarnes — 214 m² | For sale",
    description:
      "A light-filled family house on the Seltjarnarnes peninsula, moments from the shoreline. Privately for sale.",
    /** Absolute URL once deployed, used for social share images. */
    siteUrl: "https://nesbali102.vercel.app",
  },

  /** The big serif line under the hero. The second half renders in italic. */
  name: "Nesbali 102",
  area: "Seltjarnarnes",

  /** The four lines beside the title. Keep them short. */
  keyFacts: ["4 Bedrooms", "2 Bathrooms", "214 m²", "159.000.000 kr."],

  hero: {
    src: "/images/hero.svg",
    alt: "Living room at Nesbali 102 with afternoon light across the floor",
  },

  /** The opening paragraph, set slightly larger. TODO: write your own. */
  lead: "This is a house built around the light — a rare thing on a peninsula where the weather changes by the hour and the sea is never more than a few minutes away on foot.",

  /** Body paragraphs. Add or remove freely. TODO: write your own. */
  description: [
    "Nesbali sits on the quiet western edge of Seltjarnarnes, a short walk from Bakkatjörn and the lighthouse at Grótta. The house was built in 1987 and thoughtfully renovated in 2019, when the ground floor was opened up into a single connected space for cooking, eating and sitting together.",
    "Oak floors run throughout. The kitchen was custom made in Reykjavík, with a solid birch worktop and integrated Miele appliances. Wide sliding doors open onto a sheltered south-facing deck, which catches the sun from late morning until the evening.",
    "Upstairs there are four bedrooms, three of them facing west toward Snæfellsjökull on a clear day. The principal bedroom has its own bathroom and a walk-in wardrobe. Underfloor geothermal heating runs through the whole house, as it does across most of Iceland — it means the place is warm and inexpensive to keep that way.",
    "The garden is mature and low maintenance, mostly lawn with birch and rowan along the northern boundary. There is a double garage with internal access, and generous storage in the utility room off the entrance hall.",
  ],

  /** Short, factual, one line each. */
  highlights: [
    "Renovated in 2019",
    "South-facing deck",
    "Geothermal underfloor heating",
    "Custom Icelandic kitchen",
    "Sea views to the west",
    "Double garage",
  ],

  /** The table under "Facts". Add rows as needed. */
  facts: [
    { label: "Status", value: "For sale" },
    { label: "Property Type", value: "Detached house" },
    { label: "Area", value: "Seltjarnarnes" },
    { label: "Price", value: "159.000.000 kr." },
    { label: "Rooms", value: "6 Rooms, 4 Bedrooms" },
    { label: "Bathrooms", value: "2 Bathrooms" },
    { label: "Size", value: "214 m²" },
    { label: "Plot", value: "612 m²" },
    { label: "Built", value: "1987, renovated 2019" },
    { label: "Property number", value: "TODO — fasteignanúmer" },
  ],

  /** Who the buyer talks to. This is you. TODO: your real details. */
  contact: {
    role: "Sold privately by the owner",
    name: "Ingvi Guðmundsson",
    phone: "+354 000 0000",
    phoneHref: "tel:+3540000000",
    email: "nesbali102@example.com",
    address: "Nesbali 102, 170 Seltjarnarnes",
  },

  /** Viewings, offers, or anything else worth saying near the form. */
  viewing:
    "Viewings by appointment, most easily on weekday evenings and Sunday afternoons. Send a note below and I will come back to you the same day.",

  /**
   * The scrolling photo sequence. Order matters.
   * "full" and "half" alternate on the original — keep some rhythm to it.
   */
  gallery: [
    { src: "/images/01.svg", alt: "Kitchen and dining area", width: "full" },
    { src: "/images/02.svg", alt: "Living room toward the deck", width: "half" },
    { src: "/images/03.svg", alt: "Hallway and stair", width: "full" },
    { src: "/images/04.svg", alt: "Principal bedroom", width: "inset" },
    { src: "/images/05.svg", alt: "Bathroom", width: "half" },
    { src: "/images/06.svg", alt: "Deck and garden, looking south", width: "full" },
    { src: "/images/07.svg", alt: "Second bedroom", width: "inset" },
    { src: "/images/08.svg", alt: "The house from the street", width: "full" },
  ] satisfies GalleryImage[],

  floorPlans: [
    { src: "/images/plan-ground.svg", alt: "Ground floor plan", label: "Ground floor" },
    { src: "/images/plan-upper.svg", alt: "Upper floor plan", label: "Upper floor" },
  ],

  /** Used for the "Map of the area" link. */
  map: {
    label: "Nesbali 102, 170 Seltjarnarnes",
    href: "https://www.google.com/maps/search/?api=1&query=Nesbali+102,+170+Seltjarnarnes,+Iceland",
    embedSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-22.045%2C64.150%2C-22.010%2C64.165&layer=mapnik&marker=64.1575%2C-22.0285",
  },

  /** Closing section under the form. */
  closing: {
    heading: "Come and see it in person.",
    body: "Photographs only get you so far with a house like this. The light moves through it differently in the morning than it does at six in the evening, and the sea is close enough that you hear it on a rough day. If any of this sounds like the place you have been looking for, get in touch and come round.",
    cta: { label: "Send an enquiry", href: "#enquiry" },
    image: { src: "/images/closing.svg", alt: "Evening light on the western shore" },
  },
} as const;

export type Property = typeof property;

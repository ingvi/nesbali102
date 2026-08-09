import type { L, Lang } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE ONLY.
 *  Everything the visitor sees comes from here, in both Icelandic and English.
 *
 *  Values marked  ✓ HMS  come from the public property register entry F2068040
 *  (hms.is/fasteignaskra/117492/1024775/2068040) and are correct as recorded.
 *  Values marked  TODO   are placeholders that must be replaced before this is
 *  shown to a buyer — the register does not record them.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** A list of strings that exists in both languages. */
type LList = Record<Lang, readonly string[]>;

export type GalleryImage = {
  src: string;
  alt: L;
  /** "full" = edge to edge, "half" = half width aligned right, "inset" = centred */
  width: "full" | "half" | "inset";
};

export type Fact = { label: L; value: L };
export type FloorPlan = { src: string; alt: L; label: L };

/** ✓ HMS — the official register entry. These are facts, not marketing. */
const registry = {
  propertyNumber: "F2068040",
  landNumber: "L117492",
  marking: "100101",
  municipality: "Seltjarnarnesbær",
  postcode: "170",
  /** Register classification: "Íbúð á hæð". */
  type: { is: "Íbúð á hæð", en: "Flat on a floor" } as L,
  size: "279 m²",
  builtYear: "1982",
  buildStage: "B4",
  assessmentStage: "7",
  assessment2026: "182.950.000 kr.",
  assessmentNextYear: "188.300.000 kr.",
  fireInsurance: "141.300.000 kr.",
  fireInsuranceRevalued: "25.03.1988",
  plotSize: "5.600 m²",
  plotAssessment: "510.000.000 kr.",
};

/**
 * The four lines beside the title.
 * TODO — the register holds no room counts. Fill in the first two, and the price.
 */
const keyFacts: LList = {
  is: ["TODO svefnherbergi", "TODO baðherbergi", registry.size, "Verð: TODO"],
  en: ["TODO bedrooms", "TODO bathrooms", registry.size, "Price: TODO"],
};

/** TODO — your own opening line. This one only states what the register holds. */
const lead: L = {
  is: "Rúmgóð 279 fermetra eign við Nesbala, vestast á Seltjarnarnesi — í nokkurra mínútna göngufæri frá Bakkatjörn og Gróttu.",
  en: "A generous 279 m² home on Nesbali, at the western edge of Seltjarnarnes — a few minutes on foot from Bakkatjörn and the Grótta lighthouse.",
};

/**
 * TODO — replace with your own description. What is written here is deliberately
 * limited to what the register confirms; nothing about the rooms, the condition
 * or any renovation has been assumed.
 */
const description: LList = {
  is: [
    "Eignin er skráð sem íbúð á hæð, byggð árið 1982, 279 fermetrar að stærð. Hún stendur á sameiginlegri lóð sem er 5.600 fermetrar.",
    "Nesbali liggur vestast á Seltjarnarnesi, þar sem byggðin endar og útivistarsvæðið tekur við. Gangan út á Gróttu tekur nokkrar mínútur, sundlaugin og Mýrarhúsaskóli eru í næsta nágrenni og stutt er inn í bæ.",
    "TODO — hér skrifar þú um eignina sjálfa: herbergjaskipan, endurbætur, eldhúsið, útsýnið, hvernig birtan fer um húsið yfir daginn.",
  ],
  en: [
    "The property is registered as a flat on a floor, built in 1982, measuring 279 m². It sits on a shared plot of 5,600 m².",
    "Nesbali runs along the western edge of Seltjarnarnes, where the houses stop and the shoreline path begins. Grótta is a few minutes' walk away, the pool and the local school are close by, and central Reykjavík is a short drive.",
    "TODO — write about the house itself here: the layout, any renovation, the kitchen, the views, the way the light moves through it over the course of a day.",
  ],
};

/** Drawn from the register so nothing here is invented. TODO — add your own. */
const highlights: LList = {
  is: [
    "279 m² að stærð",
    "Byggingarár 1982",
    "Sameiginleg lóð, 5.600 m²",
    "Vestast á Seltjarnarnesi",
    "Stutt í Gróttu og Bakkatjörn",
    "TODO — bættu við þínum atriðum",
  ],
  en: [
    "279 m² in total",
    "Built in 1982",
    "Shared plot of 5,600 m²",
    "Western edge of Seltjarnarnes",
    "Minutes from Grótta and Bakkatjörn",
    "TODO — add your own points here",
  ],
};

/** ✓ HMS — straight from the register, both columns localised. */
const facts: readonly Fact[] = [
  { label: { is: "Staða", en: "Status" }, value: { is: "Til sölu", en: "For sale" } },
  { label: { is: "Tegund", en: "Property type" }, value: registry.type },
  {
    label: { is: "Staðfang", en: "Address" },
    value: { is: "Nesbali 102", en: "Nesbali 102" },
  },
  {
    label: { is: "Sveitarfélag", en: "Municipality" },
    value: { is: registry.municipality, en: registry.municipality },
  },
  {
    label: { is: "Póstnúmer", en: "Postcode" },
    value: { is: registry.postcode, en: registry.postcode },
  },
  {
    label: { is: "Stærð", en: "Size" },
    value: { is: registry.size, en: registry.size },
  },
  {
    label: { is: "Byggingarár", en: "Year built" },
    value: { is: registry.builtYear, en: registry.builtYear },
  },
  {
    label: { is: "Fasteignamat 2026", en: "Assessed value 2026" },
    value: { is: registry.assessment2026, en: registry.assessment2026 },
  },
  {
    label: { is: "Fasteignamat næsta árs", en: "Assessed value, next year" },
    value: { is: registry.assessmentNextYear, en: registry.assessmentNextYear },
  },
  {
    label: { is: "Brunabótamat", en: "Fire insurance value" },
    value: { is: registry.fireInsurance, en: registry.fireInsurance },
  },
  {
    label: { is: "Heildarstærð lóðar", en: "Total plot size" },
    value: { is: registry.plotSize, en: registry.plotSize },
  },
  {
    label: { is: "Fasteignanúmer", en: "Property number" },
    value: { is: registry.propertyNumber, en: registry.propertyNumber },
  },
  {
    label: { is: "Landeignanúmer", en: "Land number" },
    value: { is: registry.landNumber, en: registry.landNumber },
  },
  {
    label: { is: "Merking", en: "Unit marking" },
    value: { is: registry.marking, en: registry.marking },
  },
  {
    label: { is: "Byggingarstig / matsstig", en: "Build stage / assessment stage" },
    value: {
      is: `${registry.buildStage} / ${registry.assessmentStage}`,
      en: `${registry.buildStage} / ${registry.assessmentStage}`,
    },
  },
];

const gallery: GalleryImage[] = [
  {
    src: "/images/01.svg",
    alt: { is: "Eldhús og borðstofa", en: "Kitchen and dining area" },
    width: "full",
  },
  { src: "/images/02.svg", alt: { is: "Stofa", en: "Living room" }, width: "half" },
  {
    src: "/images/03.svg",
    alt: { is: "Forstofa og stigi", en: "Hallway and stair" },
    width: "full",
  },
  {
    src: "/images/04.svg",
    alt: { is: "Hjónaherbergi", en: "Principal bedroom" },
    width: "inset",
  },
  { src: "/images/05.svg", alt: { is: "Baðherbergi", en: "Bathroom" }, width: "half" },
  {
    src: "/images/06.svg",
    alt: { is: "Verönd og garður", en: "Deck and garden" },
    width: "full",
  },
  { src: "/images/07.svg", alt: { is: "Svefnherbergi", en: "Bedroom" }, width: "inset" },
  {
    src: "/images/08.svg",
    alt: { is: "Húsið frá götu", en: "The house from the street" },
    width: "full",
  },
];

const floorPlans: readonly FloorPlan[] = [
  {
    src: "/images/plan-ground.svg",
    alt: { is: "Grunnmynd, neðri hæð", en: "Ground floor plan" },
    label: { is: "Neðri hæð", en: "Ground floor" },
  },
  {
    src: "/images/plan-upper.svg",
    alt: { is: "Grunnmynd, efri hæð", en: "Upper floor plan" },
    label: { is: "Efri hæð", en: "Upper floor" },
  },
];

export const property = {
  registry,
  keyFacts,
  lead,
  description,
  highlights,
  facts,
  gallery,
  floorPlans,

  name: "Nesbali 102",
  area: { is: "Seltjarnarnes", en: "Seltjarnarnes" } as L,

  meta: {
    title: {
      is: "Nesbali 102, Seltjarnarnes — 279 m² | Til sölu",
      en: "Nesbali 102, Seltjarnarnes — 279 m² | For sale",
    } as L,
    description: {
      is: "279 m² eign við Nesbala, vestast á Seltjarnarnesi. Seld beint af eiganda.",
      en: "A 279 m² home on Nesbali, at the western edge of Seltjarnarnes. Sold privately by the owner.",
    } as L,
    /** TODO — set this to the real domain once deployed, so link previews resolve. */
    siteUrl: "https://nesbali102.vercel.app",
  },

  hero: {
    src: "/images/hero.svg",
    alt: {
      is: "Stofan á Nesbala 102 í síðdegisbirtu",
      en: "The living room at Nesbali 102 in afternoon light",
    } as L,
  },

  /** TODO — your real details. */
  contact: {
    role: { is: "Selt beint af eiganda", en: "Sold privately by the owner" } as L,
    name: "Ingvi Guðmundsson",
    phone: "TODO +354 000 0000",
    phoneHref: "tel:+3540000000",
    email: "nesbali102@example.com",
    address: {
      is: "Nesbali 102, 170 Seltjarnarnes",
      en: "Nesbali 102, 170 Seltjarnarnes, Iceland",
    } as L,
  },

  viewing: {
    is: "Skoðanir eftir samkomulagi, oftast auðveldast á virkum kvöldum og sunnudagseftirmiðdögum. Sendu línu hér að neðan og ég svara samdægurs.",
    en: "Viewings by appointment, most easily on weekday evenings and Sunday afternoons. Send a note below and I will come back to you the same day.",
  } as L,

  map: {
    label: {
      is: "Nesbali 102, 170 Seltjarnarnes",
      en: "Nesbali 102, 170 Seltjarnarnes, Iceland",
    } as L,
    href: "https://www.google.com/maps/search/?api=1&query=Nesbali+102,+170+Seltjarnarnes,+Iceland",
    embedSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-22.0400%2C64.1520%2C-22.0080%2C64.1650&layer=mapnik&marker=64.1585%2C-22.0240",
    /** The public register entry — buyers in Iceland will look for it. */
    registryHref: "https://hms.is/fasteignaskra/117492/1024775/2068040",
    registryLabel: { is: "Fasteignaskrá HMS", en: "HMS property register" } as L,
  },

  closing: {
    heading: {
      is: "Komdu og sjáðu hana sjálf.",
      en: "Come and see it in person.",
    } as L,
    body: {
      is: "Myndir segja bara hálfa söguna um svona eign. Birtan fer öðruvísi um hana að morgni en klukkan sex á kvöldin, og sjórinn er nógu nálægt til að heyrast þegar hvessir. Ef þetta hljómar eins og staðurinn sem þú hefur verið að leita að, hafðu samband og komdu í heimsókn.",
      en: "Photographs only get you so far with a home like this. The light moves through it differently in the morning than it does at six in the evening, and the sea is close enough that you hear it on a rough day. If this sounds like the place you have been looking for, get in touch and come round.",
    } as L,
    cta: {
      label: { is: "Senda fyrirspurn", en: "Send an enquiry" } as L,
      href: "#enquiry",
    },
    image: {
      src: "/images/closing.svg",
      alt: { is: "Kvöldbirta við ströndina", en: "Evening light on the shore" } as L,
    },
  },
};

export type Property = typeof property;

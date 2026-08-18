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
    "Nesbali liggur vestast á Seltjarnarnesi, þar sem byggðin endar og útivistarsvæðið tekur við. Gangan út á Gróttu tekur nokkrar mínútur, sundlaugin og Mýrarhúsaskóli eru í næsta nágrenni og stutt er inn í bæ.",
    "TODO — hér skrifar þú um eignina sjálfa: herbergjaskipan, endurbætur, eldhúsið, útsýnið, hvernig birtan fer um húsið yfir daginn. Ekki endurtaka tölurnar úr töflunni hér til hliðar; skrifaðu um það sem talan segir ekki.",
  ],
  en: [
    "Nesbali runs along the western edge of Seltjarnarnes, where the houses stop and the shoreline path begins. Grótta is a few minutes' walk away, the pool and the local school are close by, and central Reykjavík is a short drive.",
    "TODO — write about the house itself here: the layout, any renovation, the kitchen, the views, the way the light moves through it over the course of a day. Do not restate the numbers from the table alongside; write the part the numbers cannot say.",
  ],
};

/**
 * These are set large in the serif, directly opposite the facts table — so they
 * must not repeat it. Size, year and plot belong in the table; what goes here
 * is what a number cannot carry. Keep each one to a single line.
 */
const highlights: LList = {
  is: [
    "Vestast á Seltjarnarnesi",
    "Stutt í Gróttu og Bakkatjörn",
    "TODO — helsti kostur",
    "TODO — annar kostur",
    "TODO — þriðji kostur",
  ],
  en: [
    "Western edge of Seltjarnarnes",
    "Minutes from Grótta and Bakkatjörn",
    "TODO — best feature",
    "TODO — second feature",
    "TODO — third feature",
  ],
};

/**
 * ✓ HMS — the rows a buyer actually reads, in the order they want them.
 * Address and postcode are deliberately absent: they are already in the title
 * and the contact block, and repeating them costs the table its authority.
 */
const facts: readonly Fact[] = [
  { label: { is: "Staða", en: "Status" }, value: { is: "Til sölu", en: "For sale" } },
  { label: { is: "Tegund", en: "Property type" }, value: registry.type },
  {
    label: { is: "Stærð", en: "Size" },
    value: { is: registry.size, en: registry.size },
  },
  {
    label: { is: "Byggingarár", en: "Year built" },
    value: { is: registry.builtYear, en: registry.builtYear },
  },
  {
    label: { is: "Lóð", en: "Plot" },
    value: {
      is: `${registry.plotSize}, sameiginleg`,
      en: `${registry.plotSize}, shared`,
    },
  },
  {
    label: { is: "Sveitarfélag", en: "Municipality" },
    value: { is: registry.municipality, en: registry.municipality },
  },
  {
    label: { is: "Fasteignamat 2026", en: "Assessed value 2026" },
    value: { is: registry.assessment2026, en: registry.assessment2026 },
  },
  {
    label: { is: "Brunabótamat", en: "Fire insurance value" },
    value: { is: registry.fireInsurance, en: registry.fireInsurance },
  },
];

/**
 * ✓ HMS — the identifiers. Real, and a buyer in Iceland will want them, but
 * they are reference material rather than reading, so they sit in a quieter
 * group below a rule.
 */
const registration: readonly Fact[] = [
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
  {
    label: { is: "Fasteignamat næsta árs", en: "Assessed value, next year" },
    value: { is: registry.assessmentNextYear, en: registry.assessmentNextYear },
  },
];

/**
 * The photographs, in the order you would walk the house: arrive, sit down,
 * cook, eat, go up, sleep, then step outside and lift off. The `width` values
 * alternate to give the scroll its rhythm — see the note in the README.
 *
 * All sixteen are 2000×1334; next/image resizes and re-encodes per device.
 */
const gallery: GalleryImage[] = [
  {
    src: "/images/01-entrance.jpg",
    alt: {
      is: "Forstofa með rauðum útihurðum og stiga upp á hæðina",
      en: "Entrance hall with the red front doors and the stair up",
    },
    width: "full",
  },
  {
    src: "/images/02-living-sofa.jpg",
    alt: {
      is: "Stofa með djúpum sófa og stórum plöntum undir hallandi timburþaki",
      en: "Living room with a deep sofa and tall plants under the pitched timber ceiling",
    },
    width: "half",
  },
  {
    src: "/images/03-living-fireplace.jpg",
    alt: {
      is: "Stofan frá arninum",
      en: "The living room seen from the fireplace",
    },
    width: "full",
  },
  {
    src: "/images/04-kitchen.jpg",
    alt: {
      is: "Eldhúsið og útsýnið inn í borðstofuna",
      en: "The kitchen, looking through to the dining room",
    },
    width: "inset",
  },
  {
    src: "/images/05-kitchen-range.jpg",
    alt: {
      is: "Eldavélin og viðarborðplatan við gluggann",
      en: "The range and the wooden worktop by the window",
    },
    width: "half",
  },
  {
    src: "/images/06-dining.jpg",
    alt: {
      is: "Borðstofan með pappírsljósunum",
      en: "The dining room under the paper pendants",
    },
    width: "full",
  },
  {
    src: "/images/07-landing.jpg",
    alt: {
      is: "Efri hæðin opnast yfir borðstofuna",
      en: "The upper floor opening over the dining room",
    },
    width: "inset",
  },
  {
    src: "/images/08-bedroom-principal.jpg",
    alt: {
      is: "Hjónaherbergið undir súðinni",
      en: "The principal bedroom under the eaves",
    },
    width: "full",
  },
  {
    src: "/images/09-bathroom.jpg",
    alt: {
      is: "Baðherbergið með terrazzo-flísum og fíkustré",
      en: "The bathroom, terrazzo floor and a fig tree",
    },
    width: "half",
  },
  {
    src: "/images/10-bedroom.jpg",
    alt: {
      is: "Svefnherbergi með glugga út í garðinn",
      en: "A bedroom looking out over the garden",
    },
    width: "inset",
  },
  {
    src: "/images/11-balcony.jpg",
    alt: {
      is: "Svalirnar og útsýnið yfir hverfið",
      en: "The balcony and the view over the neighbourhood",
    },
    width: "full",
  },
  {
    src: "/images/12-garden.jpg",
    alt: {
      is: "Verönd og garður með hengirúmi",
      en: "The deck and garden, with a hammock",
    },
    width: "full",
  },
  {
    src: "/images/13-street.jpg",
    alt: {
      is: "Húsið frá götunni",
      en: "The house from the street",
    },
    width: "half",
  },
  {
    src: "/images/14-aerial.jpg",
    alt: {
      is: "Seltjarnarnes úr lofti, með Esjuna í fjarska",
      en: "Seltjarnarnes from the air, with Esja beyond",
    },
    width: "full",
  },
];

/**
 * TODO — no drawings were supplied with the photographs. Add them here and the
 * section reappears on its own; while this is empty it renders nothing, and the
 * shortcut to it is hidden.
 */
const floorPlans: readonly FloorPlan[] = [];

export const property = {
  registry,
  keyFacts,
  lead,
  description,
  highlights,
  facts,
  registration,
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
    src: "/images/hero.jpg",
    alt: {
      is: "Borðstofan á Nesbala 102, stiginn og garðurinn fyrir utan",
      en: "The dining room at Nesbali 102, the stair, and the garden beyond",
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
    /**
     * TODO — the marker is placed from the street's rough position, not from a
     * surveyed point. Drop a pin on openstreetmap.org, copy the lat/lon out of
     * the URL, and replace both the bbox centre and the marker below.
     */
    embedSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-22.0330%2C64.1520%2C-22.0090%2C64.1630&layer=mapnik&marker=64.1571%2C-22.0212",
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
      src: "/images/closing.jpg",
      alt: {
        is: "Ströndin við Seltjarnarnes úr lofti",
        en: "The Seltjarnarnes shoreline from the air",
      } as L,
    },
  },
};

export type Property = typeof property;

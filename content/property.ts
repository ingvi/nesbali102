import type { L, Lang } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE ONLY.
 *  Everything the visitor sees comes from here, in both Icelandic and English.
 *
 *  Sources, so every figure can be traced:
 *    ✓ HMS   the public property register, entry F2068040
 *            hms.is/fasteignaskra/117492/1024775/2068040
 *    ✓ BS    the listing with Betri Stofan fasteignasala, entry 914330
 *            betristofan.is/soluskra/eign/914330
 *
 *  The prose below is written for this page. It is not lifted from the agency
 *  listing — only the facts are shared, and the two descriptions should stay
 *  independent so neither reads as a copy of the other.
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

/** ✓ HMS — the official register entry. */
const registry = {
  propertyNumber: "F2068040",
  landNumber: "L117492",
  marking: "100101",
  municipality: "Seltjarnarnesbær",
  postcode: "170",
  /** How the register classifies the unit, which is not how it is marketed. */
  registeredType: { is: "Íbúð á hæð", en: "Flat on a floor" } as L,
  size: "279 m²",
  builtYear: "1982",
  buildStage: "B4",
  assessmentStage: "7",
  assessment2026: "182.950.000 kr.",
  assessmentNextYear: "188.300.000 kr.",
  fireInsurance: "141.300.000 kr.",
  plotSize: "5.600 m²",
};

/**
 * The coordinates of the building, from OpenStreetMap way 198812068. Used by
 * both the map embed and the structured data.
 */
const geo = { latitude: 64.15508, longitude: -22.00667 };

/**
 * ✓ BS — what the property actually is, and what is being asked for it.
 * The `*Value` fields are the same figures as plain numbers, for the structured
 * data: search engines and answer engines cannot read "208.500.000 kr.".
 */
const listing = {
  askingPrice: { is: "208.500.000 kr.", en: "208,500,000 kr." } as L,
  type: { is: "Raðhús á pöllum", en: "Split-level terraced house" } as L,
  rooms: "7",
  bedrooms: "5",
  bathrooms: "2",
  livingRooms: "2",
  garage: { is: "Innbyggður, 20,5 m²", en: "Built in, 20.5 m²" } as L,
  entrance: { is: "Sér", en: "Private" } as L,

  priceValue: 208_500_000,
  priceCurrency: "ISK",
  sizeValue: 279,
  roomsValue: 7,
  bedroomsValue: 5,
  bathroomsValue: 2,
  builtYearValue: 1982,
};

/** The four lines beside the title. */
const keyFacts: LList = {
  is: ["5 svefnherbergi", "2 baðherbergi", registry.size, listing.askingPrice.is],
  en: ["5 bedrooms", "2 bathrooms", registry.size, listing.askingPrice.en],
};

const lead: L = {
  is: "Raðhús á pöllum í rólegum botnlanga vestast á Seltjarnarnesi, þar sem gatan endar og fjaran tekur við. Aukin lofthæð, stórir gluggar og arinn í neðri stofu.",
  en: "A split-level terraced house in a quiet cul-de-sac at the western end of Seltjarnarnes, where the road stops and the shore begins. Raised ceilings, large windows, and a fireplace in the lower living room.",
};

const description: LList = {
  is: [
    "Húsið er á þremur pöllum. Á aðalhæð er forstofa og eitt samfellt rými þar sem eldhús, borðstofa og stofa liggja saman; þremur tröppum neðar er setustofan með arninum og útgengi í garðinn. Á efri palli eru þrjú svefnherbergi og baðherbergi, út frá opnu holi með þakglugga sem hefur verið nýtt sem vinnuaðstaða. Á neðri palli eru tvö svefnherbergi til viðbótar, snyrting, þvottahús, geymsla og rúmgott tómstundarrými — og þar er innangengt í bílskúrinn.",
    "Eldhús og baðherbergi hafa verið endurnýjuð: gegnheil eik á borðplötum, Smeg gaseldavél, og á baðinu terrazzo-flísar, svífandi innrétting með tvöföldum vaski og walk-in sturta undir þakglugga. Rafmagn og neysluvatnslagnir hafa verið endurnýjuð í öllu húsinu, og á hellulögðu bílaplani fyrir þrjá bíla er hleðslustöð fyrir rafbíl.",
    "Suðurgarðurinn bak við húsið er afgirtur og skjólsæll, með viðarverönd og nýlegri grasþöku. Í göngufæri eru leikskóli og grunnskóli, sundlaug Seltjarnarness, íþróttasvæði Gróttu, níu holu golfvöllur og Eiðistorg — og ströndin út á Gróttu með Faxaflóa fyrir framan.",
  ],
  en: [
    "The house sits on three levels. The main floor holds the entrance and one continuous room where kitchen, dining and living space run together; three steps down is the sitting room, with the fireplace and a door out to the garden. The upper level has three bedrooms and a bathroom off an open hall with a skylight, currently used as a workspace. The lower level has two more bedrooms, a WC, laundry, storage and a generous hobby room — and connects straight through into the garage.",
    "The kitchen and bathrooms have been rebuilt: solid oak worktops, a Smeg gas range, and in the bathroom terrazzo floors, a floating vanity with a double basin, and a walk-in shower under a skylight. The wiring and water pipes have been renewed throughout the house, and the paved drive, which takes three cars, has an EV charger on it.",
    "The south-facing garden behind the house is fenced and sheltered, with a timber deck and newly laid turf. Within walking distance: the preschool and primary school, the Seltjarnarnes pool, Grótta's sports grounds, a nine-hole golf course, and the shops at Eiðistorg — along with the shoreline path out to Grótta, with the whole of Faxaflói in front of you.",
  ],
};

/**
 * Set large in the serif, directly opposite the facts table — so they must not
 * repeat it. Size, year, price and room counts belong in the table; what goes
 * here is what a number cannot carry. One line each.
 */
const highlights: LList = {
  is: [
    "Mikið endurnýjað",
    "Arinn í neðri stofu",
    "Aukin lofthæð og þakgluggar",
    "Afgirtur suðurgarður",
    "Hleðslustöð og stæði fyrir þrjá bíla",
    "Botnlangi, fjaran í göngufæri",
  ],
  en: [
    "Extensively renovated",
    "Fireplace in the lower living room",
    "Raised ceilings and skylights",
    "Fenced, south-facing garden",
    "EV charger, parking for three",
    "Quiet cul-de-sac, shore on foot",
  ],
};

/** ✓ BS and ✓ HMS — the rows a buyer reads, in the order they want them. */
const facts: readonly Fact[] = [
  { label: { is: "Staða", en: "Status" }, value: { is: "Til sölu", en: "For sale" } },
  { label: { is: "Ásett verð", en: "Asking price" }, value: listing.askingPrice },
  { label: { is: "Tegund", en: "Property type" }, value: listing.type },
  {
    label: { is: "Stærð", en: "Size" },
    value: { is: registry.size, en: registry.size },
  },
  {
    label: { is: "Herbergi", en: "Rooms" },
    value: { is: listing.rooms, en: listing.rooms },
  },
  {
    label: { is: "Svefnherbergi", en: "Bedrooms" },
    value: { is: listing.bedrooms, en: listing.bedrooms },
  },
  {
    label: { is: "Baðherbergi", en: "Bathrooms" },
    value: { is: listing.bathrooms, en: listing.bathrooms },
  },
  {
    label: { is: "Stofur", en: "Living rooms" },
    value: { is: listing.livingRooms, en: listing.livingRooms },
  },
  { label: { is: "Bílskúr", en: "Garage" }, value: listing.garage },
  {
    label: { is: "Byggingarár", en: "Year built" },
    value: { is: registry.builtYear, en: registry.builtYear },
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
 * ✓ HMS — the identifiers, plus the register's own classification, which reads
 * differently from how the house is marketed. Reference material rather than
 * reading, so it sits in a quieter group below a rule.
 */
const registration: readonly Fact[] = [
  { label: { is: "Skráð tegund", en: "Registered as" }, value: registry.registeredType },
  { label: { is: "Inngangur", en: "Entrance" }, value: listing.entrance },
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
 * All are 2000×1334; next/image resizes and re-encodes per device.
 */
const gallery: GalleryImage[] = [
  {
    src: "/images/01-entrance.jpg",
    alt: {
      is: "Forstofa með rauðum útihurðum og stiga upp á efri pall",
      en: "Entrance hall with the red front doors and the stair to the upper level",
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
      is: "Setustofan með arninum, þremur tröppum neðar en borðstofan",
      en: "The sitting room with the fireplace, three steps below the dining room",
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
      is: "Smeg gaseldavélin og eikarborðplatan við gluggann",
      en: "The Smeg gas range and the oak worktop by the window",
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
      is: "Holið á efri palli, með vinnuaðstöðu undir þakglugganum",
      en: "The upper hall, with the workspace under the skylight",
    },
    width: "inset",
  },
  {
    src: "/images/08-bedroom-principal.jpg",
    alt: {
      is: "Hjónaherbergið á efri palli",
      en: "The principal bedroom on the upper level",
    },
    width: "full",
  },
  {
    src: "/images/09-bathroom.jpg",
    alt: {
      is: "Baðherbergið: terrazzo-flísar, tvöfaldur vaskur og þakgluggi",
      en: "The bathroom: terrazzo floor, double basin and a skylight",
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
      is: "Svalirnar út af hjónaherberginu",
      en: "The balcony off the principal bedroom",
    },
    width: "full",
  },
  {
    src: "/images/12-garden.jpg",
    alt: {
      is: "Afgirtur suðurgarður með viðarverönd",
      en: "The fenced south-facing garden and its timber deck",
    },
    width: "full",
  },
  {
    src: "/images/13-street.jpg",
    alt: { is: "Húsið frá botnlanganum", en: "The house from the cul-de-sac" },
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
 * TODO — the söluyfirlit on the agency listing has the drawings. Add them here
 * and the section reappears on its own; while this is empty it renders nothing,
 * and the shortcut to it stays hidden.
 */
const floorPlans: readonly FloorPlan[] = [];

export const property = {
  registry,
  listing,
  geo,
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
      is: "Nesbali 102, Seltjarnarnes — raðhús til sölu, 279 m²",
      en: "Nesbali 102, Seltjarnarnes — house for sale, 279 m²",
    } as L,
    description: {
      is: "Mikið endurnýjað 279 m² raðhús á pöllum með innbyggðum bílskúr, vestast á Seltjarnarnesi. Fimm svefnherbergi, tvær stofur, afgirtur suðurgarður.",
      en: "An extensively renovated 279 m² split-level terraced house with a built-in garage at the western end of Seltjarnarnes. Five bedrooms, two living rooms, a fenced south-facing garden.",
    } as L,
    siteUrl: "https://nesbali102.vercel.app",
    /** 1200×630, the size Facebook, LinkedIn, Slack, iMessage and X all crop to. */
    shareImage: "/images/og.jpg",
    shareImageAlt: {
      is: "Borðstofan á Nesbala 102",
      en: "The dining room at Nesbali 102",
    } as L,
  },

  hero: {
    src: "/images/hero.jpg",
    alt: {
      is: "Borðstofan á Nesbala 102, stiginn og garðurinn fyrir utan",
      en: "The dining room at Nesbali 102, the stair, and the garden beyond",
    } as L,
  },

  /** ✓ BS — the listing agent. Enquiries go to him, not to the owner. */
  contact: {
    role: {
      is: "Löggiltur fasteignasali · Betri Stofan",
      en: "Licensed estate agent · Betri Stofan",
    } as L,
    name: "Hreiðar Levý Guðmundsson",
    phone: "661 6021",
    phoneHref: "tel:+3546616021",
    email: "hreidar@betristofan.is",
    photo: "/images/agent.jpg",
    photoAlt: {
      is: "Hreiðar Levý Guðmundsson, löggiltur fasteignasali",
      en: "Hreiðar Levý Guðmundsson, licensed estate agent",
    } as L,
    address: {
      is: "Nesbali 102, 170 Seltjarnarnes",
      en: "Nesbali 102, 170 Seltjarnarnes, Iceland",
    } as L,
  },

  viewing: {
    is: "Skoðun er bókuð hjá Hreiðari Levý, löggiltum fasteignasala. Hringdu, sendu póst, eða sendu fyrirspurn í gegnum söluskrána — allt kemur á sama stað.",
    en: "Viewings are booked with Hreiðar Levý, licensed estate agent. Call, write, or send an enquiry through the listing — all three reach the same place.",
  } as L,

  map: {
    label: {
      is: "Nesbali 102, 170 Seltjarnarnes",
      en: "Nesbali 102, 170 Seltjarnarnes, Iceland",
    } as L,
    href: "https://www.google.com/maps/search/?api=1&query=Nesbali+102,+170+Seltjarnarnes,+Iceland",
    /**
     * The building itself, from OpenStreetMap way 198812068 — which records
     * Nesbali 102 as a terrace, agreeing with the agency listing rather than
     * with the register's "íbúð á hæð". OpenStreetMap widens the box to fit the
     * frame, so this is deliberately tighter than the view you get — about 900 m
     * across, which lands close enough to read the street names.
     */
    embedSrc: `https://www.openstreetmap.org/export/embed.html?bbox=-22.0157%2C64.1522%2C-21.9977%2C64.1580&layer=mapnik&marker=${geo.latitude}%2C${geo.longitude}`,
    registryHref: "https://hms.is/fasteignaskra/117492/1024775/2068040",
    registryLabel: { is: "Fasteignaskrá HMS", en: "HMS property register" } as L,
  },

  /**
   * The formal listing. This page is the owners' own presentation of the house;
   * the agency's page is the record of sale. Linking it keeps the difference
   * plain, so nobody mistakes this for Betri Stofan's own listing.
   */
  official: {
    href: "https://betristofan.is/soluskra/eign/914330",
    label: { is: "Söluskrá Betri Stofan", en: "Listing at Betri Stofan" } as L,
    enquireLabel: {
      is: "Fyrirspurn hjá Betri Stofan",
      en: "Enquire via Betri Stofan",
    } as L,
    enquireNote: {
      is: "Opnast á söluskrá Betri Stofan, þar sem fyrirspurnin fer beint til fasteignasalans.",
      en: "Opens the Betri Stofan listing, where the enquiry goes straight to the agent.",
    } as L,
    note: {
      is: "Þessi síða er sett upp af eigendum til að sýna eignina. Eignin er í sölu hjá Betri Stofan fasteignasölu, þar sem söluyfirlit og formleg söluskrá eru.",
      en: "This page was put together by the owners to show the house. The sale itself is handled by Betri Stofan fasteignasala, where the formal listing and the sales prospectus are.",
    } as L,
  },

  closing: {
    heading: {
      is: "Komdu og sjáðu það sjálf.",
      en: "Come and see it in person.",
    } as L,
    body: {
      is: "Myndir segja bara hálfa söguna um svona hús. Birtan fer öðruvísi um það að morgni en klukkan sex á kvöldin, og sjórinn er nógu nálægt til að heyrast þegar hvessir. Ef þetta hljómar eins og staðurinn sem þú hefur verið að leita að, bókaðu skoðun og komdu í heimsókn.",
      en: "Photographs only get you so far with a house like this. The light moves through it differently in the morning than it does at six in the evening, and the sea is close enough that you hear it on a rough day. If this sounds like the place you have been looking for, book a viewing and come round.",
    } as L,
    cta: {
      label: { is: "Bóka skoðun", en: "Book a viewing" } as L,
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

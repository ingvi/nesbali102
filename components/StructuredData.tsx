import { property } from "@/content/property";
import { LANGS, type Lang } from "@/lib/i18n";

/**
 * Schema.org JSON-LD for the listing.
 *
 * This is the only part of the page written for machines rather than people, and
 * it is what lets a search engine — or an assistant answering a question — state
 * the price, the size and the room counts without having to infer them from
 * prose. Every value here is the same one shown on the page; the numbers are
 * repeated in plain form because "208.500.000 kr." is not a parseable price.
 *
 * `RealEstateListing` describes the page; `about` describes the building; the
 * `Offer` carries the price and names the agency as the seller, which keeps the
 * relationship explicit for anything reading this rather than the page.
 */
export function StructuredData({ lang }: { lang: Lang }) {
  const { listing, registry, geo, meta, contact, official } = property;
  const base = meta.siteUrl;

  const graph = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${base}/${lang}#listing`,
    url: `${base}/${lang}`,
    name: meta.title[lang],
    description: meta.description[lang],
    inLanguage: lang === "is" ? "is-IS" : "en",
    image: [
      `${base}${meta.shareImage}`,
      ...property.gallery.slice(0, 6).map((image) => `${base}${image.src}`),
    ],
    // Both language versions describe one property.
    sameAs: [...LANGS.filter((code) => code !== lang).map((code) => `${base}/${code}`), official.href],

    about: {
      "@type": "House",
      name: `${property.name}, ${property.area[lang]}`,
      numberOfRooms: listing.roomsValue,
      numberOfBedrooms: listing.bedroomsValue,
      numberOfBathroomsTotal: listing.bathroomsValue,
      yearBuilt: listing.builtYearValue,
      floorSize: {
        "@type": "QuantitativeValue",
        value: listing.sizeValue,
        // UN/CEFACT code for square metre.
        unitCode: "MTK",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: property.name,
        postalCode: registry.postcode,
        addressLocality: "Seltjarnarnes",
        addressRegion: "Höfuðborgarsvæðið",
        addressCountry: "IS",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    },

    offers: {
      "@type": "Offer",
      price: listing.priceValue,
      priceCurrency: listing.priceCurrency,
      availability: "https://schema.org/InStock",
      url: official.href,
      seller: {
        "@type": "RealEstateAgent",
        name: "Betri Stofan fasteignasala",
        url: "https://betristofan.is",
        employee: {
          "@type": "Person",
          name: contact.name,
          jobTitle: contact.role[lang],
          telephone: "+354 661 6021",
          email: contact.email,
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // The object is built from our own content, so there is nothing to escape.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

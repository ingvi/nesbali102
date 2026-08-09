"use client";

import { useState } from "react";
import { styled } from "baseui";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Gallery } from "./Gallery";
import { FloorPlans } from "./FloorPlans";
import { Location } from "./Location";
import { Enquiry } from "./Enquiry";
import { Closing } from "./Closing";
import { Lightbox } from "./Lightbox";
import { Section } from "./Primitives";
import { palette } from "@/app/theme";

const Page = styled("main", {
  backgroundColor: palette.chalk,
  minHeight: "100dvh",
});

export function Listing() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <Page>
      <Nav />
      <Hero onOpenGallery={() => setLightboxIndex(0)} />

      <Section>
        <Intro onOpenGallery={() => setLightboxIndex(0)} />
      </Section>

      <Gallery onOpen={setLightboxIndex} />

      <Section>
        <FloorPlans />
      </Section>

      <Section $tight>
        <Location />
      </Section>

      <Enquiry />
      <Closing />

      <Lightbox
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </Page>
  );
}

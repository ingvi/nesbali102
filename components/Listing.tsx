"use client";

import { styled } from "baseui";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Gallery } from "./Gallery";
import { FloorPlans } from "./FloorPlans";
import { Location } from "./Location";
import { Enquiry } from "./Enquiry";
import { Closing } from "./Closing";
import { BackToTop } from "./BackToTop";
import { Section } from "./Primitives";
import { palette } from "@/app/theme";

const Page = styled("main", {
  backgroundColor: palette.chalk,
  minHeight: "100dvh",
});

export function Listing() {
  return (
    <Page>
      <Nav />
      <Hero />

      <Section>
        <Intro />
      </Section>

      <Gallery />

      <Section>
        <FloorPlans />
      </Section>

      <Section $tight>
        <Location />
      </Section>

      <Enquiry />
      <Closing />

      <BackToTop />
    </Page>
  );
}

"use client";

import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";
import { property } from "@/content/property";
import { OutlineButton } from "./Primitives";

const HeroFrame = styled("div", {
  position: "relative",
  width: "100%",
  // The title bar below grows with its content on mobile and is a fixed 90px
  // from lg up; the image takes whatever is left of the first screen.
  height: "calc(100dvh - 168px)",
  overflow: "hidden",
  backgroundColor: palette.sand,
  [layout.lg]: { height: "calc(100dvh - 90px)" },
});

const HeroImage = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

/** A short scrim so the white nav stays legible on a bright photo. */
const Scrim = styled("div", {
  position: "absolute",
  inset: "0 0 auto 0",
  height: "140px",
  background: "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))",
  pointerEvents: "none",
});

const TitleBar = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "14px",
  minHeight: "168px",
  paddingTop: "18px",
  paddingBottom: "22px",
  paddingLeft: layout.gutter,
  paddingRight: layout.gutter,
  [layout.lg]: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: "0px",
    height: "90px",
    gap: "0",
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: layout.gutterLg,
    paddingRight: layout.gutterLg,
  },
});

const TitleHalf = styled("div", {
  display: "flex",
  alignItems: "center",
  [layout.lg]: { flexBasis: "50%", flexGrow: 0, flexShrink: 0 },
});

const FactsHalf = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  [layout.lg]: { flexBasis: "50%", flexGrow: 0, flexShrink: 0 },
});

const Title = styled("h1", {
  fontFamily: type.serif,
  fontWeight: 400,
  fontSize: "clamp(28px, 3.6vw, 44px)",
  lineHeight: 1.12,
  letterSpacing: "-0.012em",
  margin: 0,
  color: palette.ink,
});

const Area = styled("em", {
  fontStyle: "italic",
});

/** Four short facts stacked in a tight column, exactly as on the original. */
const FactList = styled("ul", {
  ...type.eyebrow,
  textTransform: "none",
  letterSpacing: "0",
  fontSize: "13px",
  lineHeight: 1.4,
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  columnGap: "18px",
  [layout.lg]: { fontSize: "14px", gridTemplateColumns: "1fr", columnGap: "0" },
});

export function Hero({ onOpenGallery }: { onOpenGallery: () => void }) {
  return (
    <div id="top">
      <HeroFrame>
        <HeroImage src={property.hero.src} alt={property.hero.alt} />
        <Scrim />
      </HeroFrame>

      <TitleBar>
        <TitleHalf>
          <Title>
            {property.name}, <Area>{property.area}</Area>
          </Title>
        </TitleHalf>

        <FactsHalf>
          <FactList>
            {property.keyFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </FactList>
          <OutlineButton type="button" onClick={onOpenGallery}>
            See images
          </OutlineButton>
        </FactsHalf>
      </TitleBar>
    </div>
  );
}

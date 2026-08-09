"use client";

import { styled } from "baseui";
import { layout, palette } from "@/app/theme";
import { property } from "@/content/property";
import type { GalleryImage } from "@/content/property";
import { useLang } from "./LangContext";

/**
 * The photo sequence is the spine of the page: full-bleed frames interrupted by
 * narrower ones so the eye keeps moving. The images are not interactive — this
 * stack *is* the gallery, and "See images" simply scrolls here.
 */
const Frame = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginBottom: "4px",
});

const Figure = styled<"figure", { $width: GalleryImage["width"] }>(
  "figure",
  ({ $width }) => ({
    display: "block",
    padding: 0,
    margin: 0,
    width: "100%",
    [layout.lg]: {
      width:
        $width === "full" ? "100%" : $width === "half" ? "calc(42% + 24px)" : "72%",
      marginLeft: $width === "half" ? "auto" : undefined,
      marginRight: $width === "half" ? "0" : undefined,
    },
  }),
);

const Img = styled("img", {
  width: "100%",
  height: "auto",
  backgroundColor: palette.sand,
});

export function Gallery() {
  const { x } = useLang();

  return (
    <div id="photos" style={{ scrollMarginTop: "0px" }}>
      {property.gallery.map((image, index) => (
        <Frame key={image.src}>
          <Figure $width={image.width}>
            <Img src={image.src} alt={x(image.alt)} loading={index < 2 ? "eager" : "lazy"} />
          </Figure>
        </Frame>
      ))}
    </div>
  );
}

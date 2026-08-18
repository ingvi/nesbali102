"use client";

import Image from "next/image";
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
    backgroundColor: palette.sand,
    [layout.lg]: {
      width:
        $width === "full" ? "100%" : $width === "half" ? "calc(42% + 24px)" : "72%",
      marginLeft: $width === "half" ? "auto" : undefined,
      marginRight: $width === "half" ? "0" : undefined,
    },
  }),
);

/**
 * What each frame actually occupies, so next/image can pick a sensible file
 * rather than shipping the 2000px master to a phone.
 */
const sizesFor: Record<GalleryImage["width"], string> = {
  full: "100vw",
  half: "(min-width: 1024px) 45vw, 100vw",
  inset: "(min-width: 1024px) 72vw, 100vw",
};

export function Gallery() {
  const { x } = useLang();

  return (
    <div id="photos">
      {property.gallery.map((image, index) => (
        <Frame key={image.src}>
          <Figure $width={image.width}>
            <Image
              src={image.src}
              alt={x(image.alt)}
              width={2000}
              height={1334}
              sizes={sizesFor[image.width]}
              // The first frame is usually in view the moment the scroll lands.
              loading={index === 0 ? "eager" : "lazy"}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Figure>
        </Frame>
      ))}
    </div>
  );
}

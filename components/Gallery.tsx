"use client";

import { styled } from "baseui";
import { layout, palette } from "@/app/theme";
import { property } from "@/content/property";
import type { GalleryImage } from "@/content/property";

/**
 * The photo sequence is the spine of the page: full-bleed frames interrupted by
 * narrower ones so the eye keeps moving. Every frame opens the lightbox.
 */
const Frame = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginBottom: "4px",
});

const Figure = styled<"button", { $width: GalleryImage["width"] }>(
  "button",
  ({ $width }) => ({
    display: "block",
    padding: 0,
    margin: 0,
    border: "none",
    background: "none",
    cursor: "zoom-in",
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
  transitionProperty: "opacity",
  transitionDuration: "300ms",
  ":hover": { opacity: 0.92 },
});

export function Gallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <div id="photos" style={{ scrollMarginTop: "72px" }}>
      {property.gallery.map((image, index) => (
        <Frame key={image.src}>
          <Figure
            $width={image.width}
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`Open image: ${image.alt}`}
          >
            <Img src={image.src} alt={image.alt} loading={index < 2 ? "eager" : "lazy"} />
          </Figure>
        </Frame>
      ))}
    </div>
  );
}

"use client";

import { styled } from "baseui";
import { palette, type } from "@/app/theme";
import { property } from "@/content/property";
import { Cell, Eyebrow, Grid, OutlineAction, TextLink } from "./Primitives";
import { useLang } from "./LangContext";

const MapFrame = styled("div", {
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  border: `1px solid ${palette.rule}`,
  backgroundColor: palette.sand,
  overflow: "hidden",
});

const MapEmbed = styled("iframe", {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  border: "none",
  // The map is a background element; the link below is the real affordance.
  filter: "grayscale(1) contrast(0.95)",
});

const Meta = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  marginTop: "20px",
});

const Address = styled("p", {
  margin: 0,
  fontSize: type.size.small,
  color: palette.inkMuted,
});

export function Location() {
  const { t, x } = useLang();

  return (
    <Grid>
      <Cell $span={12} $spanLg={10} $startLg={2}>
        <div id="location" style={{ scrollMarginTop: "88px" }}>
          <Eyebrow>{t("mapOfArea")}</Eyebrow>
          <MapFrame>
            <MapEmbed
              src={property.map.embedSrc}
              title={`${t("mapOfArea")} — ${x(property.map.label)}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapFrame>
          <Meta>
            <Address>
              {x(property.map.label)} ·{" "}
              <TextLink href={property.map.registryHref} target="_blank" rel="noreferrer">
                {x(property.map.registryLabel)}
              </TextLink>
            </Address>
            <OutlineAction href={property.map.href} target="_blank" rel="noreferrer">
              {t("openInMaps")}
            </OutlineAction>
          </Meta>
        </div>
      </Cell>
    </Grid>
  );
}

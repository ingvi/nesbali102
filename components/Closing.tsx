"use client";

import Image from "next/image";
import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";
import { property } from "@/content/property";
import { Cell, Grid, OutlineAction } from "./Primitives";
import { useLang } from "./LangContext";

const Panel = styled("div", {
  backgroundColor: palette.sand,
  paddingTop: "56px",
  paddingBottom: "56px",
  [layout.lg]: {
    paddingTop: "0",
    paddingBottom: "0",
    minHeight: "75svh",
    display: "flex",
    alignItems: "stretch",
  },
});

const Inner = styled("div", {
  width: "100%",
});

const Column = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  paddingTop: "0",
  paddingBottom: "0",
  [layout.lg]: { paddingTop: "24px", paddingBottom: "24px", minHeight: "75svh" },
});

const Heading = styled("h2", {
  fontFamily: type.serif,
  fontWeight: 400,
  fontSize: type.size.displayLarge,
  lineHeight: 1.15,
  letterSpacing: "-0.24px",
  margin: "0 0 32px 0",
  flexGrow: 1,
});

const Body = styled("p", {
  fontSize: type.size.body,
  lineHeight: 1.4,
  maxWidth: "56ch",
  margin: "0 0 24px 0",
});

const Media = styled("div", {
  display: "none",
  [layout.lg]: { display: "block", height: "100%", paddingTop: "24px", paddingBottom: "24px" },
});

const PhotoFrame = styled("div", {
  position: "relative",
  width: "100%",
  height: "100%",
  minHeight: "320px",
  overflow: "hidden",
  backgroundColor: palette.sand,
});

const Footer = styled("footer", {
  backgroundColor: palette.sand,
  paddingLeft: layout.gutter,
  paddingRight: layout.gutter,
  paddingTop: "24px",
  paddingBottom: "32px",
  borderTop: `1px solid ${palette.rule}`,
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "space-between",
  ...type.eyebrow,
  color: palette.inkMuted,
  [layout.lg]: { paddingLeft: layout.gutterLg, paddingRight: layout.gutterLg },
});

export function Closing() {
  const { x } = useLang();

  return (
    <>
      <Panel>
        <Inner>
          <Grid>
            <Cell $span={12} $spanLg={5} $startLg={2}>
              <Column>
                <Heading>{x(property.closing.heading)}</Heading>
                <div>
                  <Body>{x(property.closing.body)}</Body>
                  <OutlineAction href={property.closing.cta.href}>
                    {x(property.closing.cta.label)}
                  </OutlineAction>
                </div>
              </Column>
            </Cell>
            <Cell $span={12} $spanLg={5} $startLg={8}>
              <Media>
                <PhotoFrame>
                  <Image
                    src={property.closing.image.src}
                    alt={x(property.closing.image.alt)}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </PhotoFrame>
              </Media>
            </Cell>
          </Grid>
        </Inner>
      </Panel>

      <Footer>
        <span>{x(property.contact.address)}</span>
        <span>{x(property.contact.role)}</span>
      </Footer>
    </>
  );
}

"use client";

import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";
import { property } from "@/content/property";
import {
  Cell,
  Eyebrow,
  EyebrowText,
  EyebrowTight,
  Grid,
  OutlineAction,
  OutlineButton,
  TextLink,
} from "./Primitives";

const Lead = styled("p", {
  fontFamily: type.serif,
  fontSize: "clamp(22px, 2vw, 27px)",
  lineHeight: 1.34,
  letterSpacing: "-0.008em",
  margin: "0 0 28px 0",
  [layout.lg]: { margin: "0 0 32px 0" },
});

const Body = styled("p", {
  fontFamily: type.sans,
  fontSize: "16px",
  lineHeight: 1.55,
  margin: "0 0 20px 0",
  maxWidth: "62ch",
  ":last-child": { marginBottom: 0 },
});

const ContactName = styled("p", {
  fontFamily: type.serif,
  fontSize: "24px",
  lineHeight: 1.2,
  margin: "0 0 10px 0",
});

const ContactRow = styled("p", {
  fontFamily: type.sans,
  fontSize: "14px",
  lineHeight: 1.5,
  margin: 0,
  color: palette.inkMuted,
});

const ContactCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0",
  paddingTop: "20px",
  borderTop: `1px solid ${palette.rule}`,
  marginBottom: "48px",
  [layout.lg]: { marginBottom: 0 },
});

const ButtonSpacer = styled("div", {
  marginTop: "24px",
  width: "100%",
  [layout.lg]: { width: "auto", minWidth: "220px" },
});

const HighlightList = styled("ul", {
  listStyle: "none",
  margin: 0,
  padding: 0,
});

const HighlightItem = styled("li", {
  fontFamily: type.sans,
  fontSize: "15px",
  lineHeight: 1.4,
  paddingTop: "12px",
  paddingBottom: "12px",
  borderBottom: `1px solid ${palette.rule}`,
  ":first-child": { borderTop: `1px solid ${palette.rule}` },
});

const FactTable = styled("dl", {
  margin: 0,
  padding: 0,
  borderTop: `1px solid ${palette.rule}`,
});

const FactRow = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  paddingTop: "12px",
  paddingBottom: "12px",
  borderBottom: `1px solid ${palette.rule}`,
});

const FactLabel = styled("dt", {
  fontFamily: type.sans,
  fontSize: "15px",
  margin: 0,
  color: palette.inkMuted,
});

const FactValue = styled("dd", {
  fontFamily: type.sans,
  fontSize: "15px",
  margin: 0,
});

const Shortcuts = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  marginTop: "28px",
});

/** Separates the description row from the highlights/facts row. */
const BlockGap = styled("div", {
  height: "56px",
  [layout.lg]: { height: "96px" },
});

/** Keeps stacked cells apart on mobile; on desktop they sit side by side. */
const StackGap = styled("div", {
  marginBottom: "56px",
  [layout.lg]: { marginBottom: "0px" },
});

export function Intro({ onOpenGallery }: { onOpenGallery: () => void }) {
  return (
    <>
      <Grid>
        <Cell $span={12} $spanLg={4} $startLg={2} $orderLg={0}>
          <ContactCard>
            <EyebrowText>{property.contact.role}</EyebrowText>
            <ContactName>{property.contact.name}</ContactName>
            <ContactRow>
              <TextLink href={property.contact.phoneHref}>{property.contact.phone}</TextLink>
            </ContactRow>
            <ContactRow>
              <TextLink href={`mailto:${property.contact.email}`}>
                {property.contact.email}
              </TextLink>
            </ContactRow>
            <ButtonSpacer>
              <OutlineAction href="#enquiry" $block>
                Property enquiry
              </OutlineAction>
            </ButtonSpacer>
          </ContactCard>
        </Cell>

        <Cell $span={12} $spanLg={6} $startLg={7} $orderLg={1}>
          <Lead>{property.lead}</Lead>
          {property.description.map((paragraph) => (
            <Body key={paragraph.slice(0, 40)}>{paragraph}</Body>
          ))}
        </Cell>
      </Grid>

      <BlockGap />

      <Grid>
        <Cell $span={12} $spanLg={4} $startLg={2}>
          <StackGap>
            <Eyebrow>Highlights</Eyebrow>
            <HighlightList>
              {property.highlights.map((item) => (
                <HighlightItem key={item}>{item}</HighlightItem>
              ))}
            </HighlightList>
            <Shortcuts>
              <OutlineButton type="button" onClick={onOpenGallery}>
                See all images
              </OutlineButton>
            </Shortcuts>
          </StackGap>
        </Cell>

        <Cell $span={12} $spanLg={4} $startLg={7}>
          <div id="facts" style={{ scrollMarginTop: "88px" }}>
            <Eyebrow>Facts</Eyebrow>
            <FactTable>
              {property.facts.map((fact) => (
                <FactRow key={fact.label}>
                  <FactLabel>{fact.label}</FactLabel>
                  <FactValue>{fact.value}</FactValue>
                </FactRow>
              ))}
            </FactTable>
            <Shortcuts>
              <EyebrowTight>Shortcuts</EyebrowTight>
              <TextLink href="#location">Map of the area</TextLink>
              <TextLink href="#enquiry">Property enquiry</TextLink>
              <TextLink href="#floor-plans">Floor plans</TextLink>
            </Shortcuts>
          </div>
        </Cell>
      </Grid>
    </>
  );
}

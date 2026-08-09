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
  TextLink,
} from "./Primitives";
import { useLang } from "./LangContext";

/**
 * The reference runs its whole description at one size and indents the first
 * paragraph rather than setting a larger lead — so this is Body plus an indent.
 */
const Lead = styled("p", {
  fontFamily: type.sans,
  fontSize: type.size.body,
  lineHeight: 1.4,
  margin: "0 0 16px 0",
  maxWidth: "62ch",
  [layout.lg]: { textIndent: "3em" },
});

const Body = styled("p", {
  fontFamily: type.sans,
  fontSize: type.size.body,
  lineHeight: 1.4,
  margin: "0 0 16px 0",
  maxWidth: "62ch",
  ":last-child": { marginBottom: 0 },
});

const ContactName = styled("p", {
  fontFamily: type.serif,
  fontSize: "20px",
  lineHeight: 1.2,
  margin: "0 0 8px 0",
});

const ContactRow = styled("p", {
  fontFamily: type.sans,
  fontSize: type.size.small,
  lineHeight: 1.4,
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
  fontSize: type.size.body,
  lineHeight: 1.4,
  paddingTop: "10px",
  paddingBottom: "10px",
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
  paddingTop: "10px",
  paddingBottom: "10px",
  borderBottom: `1px solid ${palette.rule}`,
});

const FactLabel = styled("dt", {
  fontFamily: type.sans,
  fontSize: type.size.small,
  lineHeight: 1.35,
  margin: 0,
  color: palette.inkMuted,
});

const FactValue = styled("dd", {
  fontFamily: type.sans,
  fontSize: type.size.small,
  lineHeight: 1.35,
  margin: 0,
});

const Shortcuts = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "8px",
  marginTop: "24px",
  fontSize: type.size.small,
});

/** Credits the register the figures above come from. */
const Source = styled("p", {
  fontFamily: type.sans,
  fontSize: type.size.small,
  color: palette.inkMuted,
  margin: "12px 0 0 0",
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

export function Intro() {
  const { t, x } = useLang();

  return (
    <>
      <Grid>
        <Cell $span={12} $spanLg={4} $startLg={2} $orderLg={0}>
          <ContactCard>
            <EyebrowText>{x(property.contact.role)}</EyebrowText>
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
                {t("propertyEnquiry")}
              </OutlineAction>
            </ButtonSpacer>
          </ContactCard>
        </Cell>

        <Cell $span={12} $spanLg={6} $startLg={7} $orderLg={1}>
          <Lead>{x(property.lead)}</Lead>
          {x(property.description).map((paragraph) => (
            <Body key={paragraph.slice(0, 40)}>{paragraph}</Body>
          ))}
        </Cell>
      </Grid>

      <BlockGap />

      <Grid>
        <Cell $span={12} $spanLg={4} $startLg={2}>
          <StackGap>
            <Eyebrow>{t("highlights")}</Eyebrow>
            <HighlightList>
              {x(property.highlights).map((item) => (
                <HighlightItem key={item}>{item}</HighlightItem>
              ))}
            </HighlightList>
            <Shortcuts>
              <OutlineAction href="#photos">{t("seeAllImages")}</OutlineAction>
            </Shortcuts>
          </StackGap>
        </Cell>

        <Cell $span={12} $spanLg={4} $startLg={7}>
          <div id="facts" style={{ scrollMarginTop: "88px" }}>
            <Eyebrow>{t("facts")}</Eyebrow>
            <FactTable>
              {property.facts.map((fact) => (
                <FactRow key={fact.label.en}>
                  <FactLabel>{x(fact.label)}</FactLabel>
                  <FactValue>{x(fact.value)}</FactValue>
                </FactRow>
              ))}
            </FactTable>
            <Source>
              <TextLink href={property.map.registryHref} target="_blank" rel="noreferrer">
                {t("registrySource")}
              </TextLink>
            </Source>
            <Shortcuts>
              <EyebrowTight>{t("shortcuts")}</EyebrowTight>
              <TextLink href="#location">{t("mapOfArea")}</TextLink>
              <TextLink href="#enquiry">{t("propertyEnquiry")}</TextLink>
              <TextLink href="#floor-plans">{t("floorPlans")}</TextLink>
            </Shortcuts>
          </div>
        </Cell>
      </Grid>
    </>
  );
}

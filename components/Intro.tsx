"use client";

import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";
import { property, type Fact } from "@/content/property";
import {
  Block,
  BlockBody,
  BlockLabel,
  Cell,
  Grid,
  OutlineAction,
  Rule,
  TextLink,
} from "./Primitives";
import { useLang } from "./LangContext";

/**
 * The description reads as one block at one size, with the opening paragraph
 * indented — the reference sets no separate lead, and a larger opener would
 * compete with the property name a few centimetres above it.
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

/* ── The seller ───────────────────────────────────────────────────────── */

const Contact = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: "48px",
  [layout.lg]: { marginBottom: 0 },
});

const Role = styled("p", {
  ...type.label,
  color: palette.inkMuted,
  margin: "0 0 14px 0",
});

const ContactLine = styled("p", {
  fontFamily: type.sans,
  fontSize: type.size.small,
  lineHeight: 1.5,
  margin: 0,
});

const ButtonSpacer = styled("div", {
  marginTop: "24px",
  width: "100%",
  [layout.lg]: { width: "auto", minWidth: "200px" },
});

/* ── Highlights ───────────────────────────────────────────────────────── */

/**
 * The one place on the page where the serif does something other than a
 * heading. Set large and unruled, the list reads as the property's own claims
 * rather than as more table.
 */
const HighlightLine = styled("p", {
  fontFamily: type.serif,
  fontSize: "clamp(20px, 2.2vw, 26px)",
  lineHeight: 1.2,
  letterSpacing: "-0.24px",
  // Just enough to keep a wrapped line from reading as two separate points.
  margin: "0 0 4px 0",
});

/* ── Facts ────────────────────────────────────────────────────────────── */

const FactList = styled("dl", {
  margin: 0,
  padding: 0,
});

/** Label two columns, value three — no rules, 8px apart, as the reference has it. */
const FactRow = styled("div", {
  display: "grid",
  gridTemplateColumns: "2fr 3fr",
  columnGap: "16px",
  marginBottom: "8px",
  [layout.lg]: { columnGap: layout.columnGapLg },
});

const FactLabel = styled("dt", {
  fontFamily: type.sans,
  fontSize: type.size.small,
  lineHeight: 1.4,
  margin: 0,
  color: palette.inkMuted,
});

const FactValue = styled("dd", {
  fontFamily: type.sans,
  fontSize: type.size.small,
  lineHeight: 1.4,
  margin: 0,
});

const RuleSpacer = styled("div", {
  marginTop: "20px",
  marginBottom: "20px",
});

const Source = styled("p", {
  fontFamily: type.sans,
  fontSize: type.size.small,
  lineHeight: 1.4,
  color: palette.inkMuted,
  margin: "16px 0 0 0",
});

const Shortcuts = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "6px",
  fontSize: type.size.small,
});

/* ── Spacing between the bands ────────────────────────────────────────── */

const BlockGap = styled("div", {
  height: "48px",
  [layout.lg]: { height: "72px" },
});

const StackGap = styled("div", {
  marginBottom: "48px",
  [layout.lg]: { marginBottom: 0 },
});

const BlockSpacer = styled("div", {
  height: "40px",
});

function Rows({ rows }: { rows: readonly Fact[] }) {
  const { x } = useLang();
  return (
    <FactList>
      {rows.map((fact) => (
        <FactRow key={fact.label.en}>
          <FactLabel>{x(fact.label)}</FactLabel>
          <FactValue>{x(fact.value)}</FactValue>
        </FactRow>
      ))}
    </FactList>
  );
}

export function Intro() {
  const { t, x } = useLang();

  return (
    <>
      <Grid>
        <Cell $span={12} $spanLg={4} $startLg={2} $orderLg={0}>
          <Contact>
            <Role>{x(property.contact.role)}</Role>
            <ContactLine>{property.contact.name}</ContactLine>
            <ContactLine>
              <TextLink href={property.contact.phoneHref}>{property.contact.phone}</TextLink>
            </ContactLine>
            <ContactLine>
              <TextLink href={`mailto:${property.contact.email}`}>
                {property.contact.email}
              </TextLink>
            </ContactLine>
            <ButtonSpacer>
              <OutlineAction href="#enquiry" $block>
                {t("propertyEnquiry")}
              </OutlineAction>
            </ButtonSpacer>
          </Contact>
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
        <Cell $span={12} $spanLg={5} $startLg={2}>
          <StackGap>
            <Block>
              <BlockLabel>{t("highlights")}</BlockLabel>
              <BlockBody>
                {x(property.highlights).map((item) => (
                  <HighlightLine key={item}>{item}</HighlightLine>
                ))}
                <BlockSpacer />
                <OutlineAction href="#photos">{t("seeAllImages")}</OutlineAction>
              </BlockBody>
            </Block>
          </StackGap>
        </Cell>

        <Cell $span={12} $spanLg={5} $startLg={7}>
          <div id="facts" style={{ scrollMarginTop: "88px" }}>
            <Block>
              <BlockLabel>{t("facts")}</BlockLabel>
              <BlockBody>
                <Rows rows={property.facts} />

                <RuleSpacer>
                  <Rule />
                </RuleSpacer>

                <Rows rows={property.registration} />

                <Source>
                  <TextLink href={property.map.registryHref} target="_blank" rel="noreferrer">
                    {t("registrySource")}
                  </TextLink>
                </Source>
              </BlockBody>
            </Block>

            <BlockSpacer />

            <Block>
              <BlockLabel>{t("shortcuts")}</BlockLabel>
              <BlockBody>
                <Shortcuts>
                  <TextLink href="#location">{t("mapOfArea")}</TextLink>
                  {property.floorPlans.length > 0 ? (
                    <TextLink href="#floor-plans">{t("floorPlans")}</TextLink>
                  ) : null}
                  <TextLink href="#enquiry">{t("propertyEnquiry")}</TextLink>
                </Shortcuts>
              </BlockBody>
            </Block>
          </div>
        </Cell>
      </Grid>
    </>
  );
}

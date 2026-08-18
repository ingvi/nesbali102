"use client";

import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";
import { property } from "@/content/property";
import { Cell, Grid, OutlineAction } from "./Primitives";
import { useLang } from "./LangContext";

/**
 * This section used to hold a form that built a `mailto:` link. It was removed
 * deliberately. It could not tell whether the handoff to the visitor's mail app
 * had worked, so it reported success either way; and an enquiry arriving as a
 * plain email sits outside whatever process the agency actually uses to follow
 * leads up. Calling, writing, or going through the agency's own form are all
 * better routes, so those are what this offers.
 */
const Panel = styled("div", {
  backgroundColor: palette.chalk,
  paddingTop: "56px",
  paddingBottom: "56px",
  [layout.lg]: { paddingTop: "96px", paddingBottom: "96px" },
});

const Heading = styled("h2", {
  fontFamily: type.serif,
  fontWeight: 400,
  fontSize: type.size.display,
  lineHeight: 1.15,
  letterSpacing: "-0.24px",
  margin: "0 0 24px 0",
});

const Intro = styled("p", {
  margin: 0,
  fontSize: type.size.body,
  lineHeight: 1.4,
  maxWidth: "56ch",
});

const Details = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  marginTop: "40px",
  [layout.lg]: { marginTop: 0, justifyContent: "flex-end", height: "100%" },
});

const DetailLabel = styled("span", {
  ...type.label,
  color: palette.inkMuted,
  display: "block",
  marginBottom: "2px",
});

const DetailValue = styled("span", {
  fontSize: type.size.small,
});

/* ── The two things a buyer actually does ─────────────────────────────── */

const Routes = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: "40px",
  [layout.lg]: { marginTop: 0 },
});

/**
 * The phone number and the address are the page's call to action, so they are
 * set at heading size rather than buried in body copy — and both are live, so a
 * phone dials and a laptop opens a message.
 */
const BigLink = styled("a", {
  fontFamily: type.serif,
  fontWeight: 400,
  fontSize: "clamp(20px, 2.2vw, 26px)",
  lineHeight: 1.25,
  letterSpacing: "-0.24px",
  color: palette.ink,
  textDecoration: "none",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "transparent",
  transitionProperty: "border-color",
  transitionDuration: "200ms",
  ":hover": { borderBottomColor: palette.ink },
});

const RouteRow = styled("div", {
  marginBottom: "14px",
});

const ButtonSpacer = styled("div", {
  marginTop: "18px",
});

/** Sets expectations before the click: this one leaves for the agency's site. */
const ButtonNote = styled("p", {
  fontSize: type.size.small,
  lineHeight: 1.4,
  color: palette.inkMuted,
  margin: "12px 0 0 0",
  maxWidth: "44ch",
});

export function Enquiry() {
  const { t, x } = useLang();

  return (
    <Panel>
      <div id="enquiry" style={{ scrollMarginTop: "88px" }}>
        <Grid>
          <Cell $span={12} $spanLg={5} $startLg={2}>
            <Heading>
              {t("propertyEnquiry")}
              <br />
              {property.name}
            </Heading>
          </Cell>
          <Cell $span={12} $spanLg={4} $startLg={8}>
            <Intro>{x(property.viewing)}</Intro>
          </Cell>
        </Grid>

        <Grid>
          <Cell $span={12} $spanLg={4} $startLg={2} $order={1} $orderLg={0}>
            <Details>
              <div>
                <DetailLabel>{t("formAddress")}</DetailLabel>
                <DetailValue>{x(property.contact.address)}</DetailValue>
              </div>
              <div>
                <DetailLabel>{t("agent")}</DetailLabel>
                <DetailValue>
                  {property.contact.name} · {x(property.contact.role)}
                </DetailValue>
              </div>
            </Details>
          </Cell>

          <Cell $span={12} $spanLg={5} $startLg={7} $order={0} $orderLg={1}>
            <Routes>
              <RouteRow>
                <DetailLabel>{t("formPhone")}</DetailLabel>
                <BigLink href={property.contact.phoneHref}>{property.contact.phone}</BigLink>
              </RouteRow>
              <RouteRow>
                <DetailLabel>{t("formEmail")}</DetailLabel>
                <BigLink href={`mailto:${property.contact.email}`}>
                  {property.contact.email}
                </BigLink>
              </RouteRow>
              <ButtonSpacer>
                <OutlineAction
                  href={property.official.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {x(property.official.enquireLabel)}
                </OutlineAction>
                <ButtonNote>{x(property.official.enquireNote)}</ButtonNote>
              </ButtonSpacer>
            </Routes>
          </Cell>
        </Grid>
      </div>
    </Panel>
  );
}

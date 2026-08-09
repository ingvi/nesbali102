"use client";

import { useEffect, useState } from "react";
import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";
import { property } from "@/content/property";
import { LANGS, langLabel } from "@/lib/i18n";
import { useLang } from "./LangContext";

const Bar = styled<"header", { $solid: boolean }>("header", ({ $solid }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  paddingLeft: layout.gutter,
  paddingRight: layout.gutter,
  height: "56px",
  color: $solid ? palette.ink : palette.white,
  backgroundColor: $solid ? palette.chalk : "transparent",
  borderBottom: `1px solid ${$solid ? palette.rule : "transparent"}`,
  transitionProperty: "background-color, color, border-color",
  transitionDuration: "300ms",
  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  [layout.lg]: {
    paddingLeft: layout.gutterLg,
    paddingRight: layout.gutterLg,
    height: "64px",
  },
}));

const Wordmark = styled("a", {
  ...type.eyebrow,
  fontSize: "13px",
  letterSpacing: "0.14em",
  fontWeight: 500,
  textDecoration: "none",
  color: "inherit",
  whiteSpace: "nowrap",
});

const Links = styled("nav", {
  display: "none",
  alignItems: "center",
  gap: "28px",
  [layout.md]: { display: "flex" },
});

const NavLink = styled("a", {
  ...type.eyebrow,
  textDecoration: "none",
  color: "inherit",
  opacity: 0.85,
  transitionProperty: "opacity",
  transitionDuration: "200ms",
  ":hover": { opacity: 1 },
});

const Right = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "18px",
});

/** ÍS · EN — the switch loads the same listing in the other language. */
const LangSwitch = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const LangItem = styled<"a", { $active: boolean }>("a", ({ $active }) => ({
  ...type.eyebrow,
  textDecoration: "none",
  color: "inherit",
  opacity: $active ? 1 : 0.5,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: $active ? "currentColor" : "transparent",
  paddingBottom: "2px",
  transitionProperty: "opacity",
  transitionDuration: "200ms",
  ":hover": { opacity: 1 },
}));

export function Nav() {
  const { lang, t } = useLang();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    // The hero fills the viewport minus the title bar; flip once we clear it.
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("navPhotos"), href: "#photos" },
    { label: t("navFacts"), href: "#facts" },
    { label: t("navLocation"), href: "#location" },
    { label: t("navEnquiry"), href: "#enquiry" },
  ];

  return (
    <Bar $solid={solid}>
      <Wordmark href="#top">{property.name}</Wordmark>

      <Right>
        <Links>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </Links>

        <LangSwitch>
          {LANGS.map((code) => (
            <LangItem key={code} href={`/${code}`} hrefLang={code} $active={code === lang}>
              {langLabel[code]}
            </LangItem>
          ))}
        </LangSwitch>
      </Right>
    </Bar>
  );
}

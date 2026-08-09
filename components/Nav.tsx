"use client";

import { useEffect, useState } from "react";
import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";
import { property } from "@/content/property";

const Bar = styled<"header", { $solid: boolean }>("header", ({ $solid }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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

/** On narrow screens the nav collapses to a single call-to-action. */
const MobileAction = styled("a", {
  ...type.eyebrow,
  textDecoration: "none",
  color: "inherit",
  [layout.md]: { display: "none" },
});

const links = [
  { label: "Photos", href: "#photos" },
  { label: "Facts", href: "#facts" },
  { label: "Location", href: "#location" },
  { label: "Enquiry", href: "#enquiry" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    // The hero fills the viewport minus the title bar; flip once we clear it.
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Bar $solid={solid}>
      <Wordmark href="#top">{property.name}</Wordmark>
      <Links>
        {links.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </Links>
      <MobileAction href="#enquiry">Enquiry</MobileAction>
    </Bar>
  );
}

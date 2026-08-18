"use client";

import { useEffect, useState } from "react";
import { styled } from "baseui";
import { palette } from "@/app/theme";
import { useLang } from "./LangContext";

/**
 * Modelled on the reference's control: a 40px charcoal square tucked against
 * the bottom edge at 12% from the right, open at the bottom so it reads as
 * something rising out of the page rather than a floating pill. It slides down
 * out of view rather than fading, and the chevron nudges on hover — that
 * animation lives in globals.css, since Styletron cannot express a descendant
 * selector like `:hover svg`.
 */
const Button = styled<"button", { $visible: boolean }>("button", ({ $visible }) => ({
  position: "fixed",
  right: "12%",
  bottom: 0,
  zIndex: 30,
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: "6px",
  paddingLeft: "8px",
  paddingRight: "8px",
  paddingBottom: 0,
  border: `1px solid ${palette.ink}`,
  borderBottom: "none",
  backgroundColor: palette.ink,
  color: palette.white,
  cursor: "pointer",
  transform: $visible ? "translateY(0)" : "translateY(100%)",
  pointerEvents: $visible ? "auto" : "none",
  transitionProperty: "transform",
  transitionDuration: "300ms",
  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
}));

/** Visually hidden, but read out — the button has no visible text. */
const SrOnly = styled("span", {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
});

const label = { is: "Efst á síðuna", en: "To top" };

export function BackToTop() {
  const { x } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      className="to-top"
      $visible={visible}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
      <SrOnly>{x(label)}</SrOnly>
    </Button>
  );
}

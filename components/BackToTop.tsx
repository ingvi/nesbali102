"use client";

import { useEffect, useState } from "react";
import { styled } from "baseui";
import { palette } from "@/app/theme";
import { useLang } from "./LangContext";

const Button = styled<"button", { $visible: boolean }>("button", ({ $visible }) => ({
  position: "fixed",
  right: "16px",
  bottom: "16px",
  zIndex: 30,
  width: "44px",
  height: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${palette.rule}`,
  backgroundColor: palette.chalk,
  color: palette.ink,
  cursor: "pointer",
  opacity: $visible ? 1 : 0,
  transform: $visible ? "translateY(0)" : "translateY(8px)",
  pointerEvents: $visible ? "auto" : "none",
  transitionProperty: "opacity, transform",
  transitionDuration: "300ms",
  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  "@media screen and (min-width: 1024px)": { right: "24px", bottom: "24px" },
}));

const label = { is: "Efst á síðuna", en: "Back to top" };

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
      $visible={visible}
      type="button"
      aria-label={x(label)}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path
          d="M1 9L7 3L13 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="square"
        />
      </svg>
    </Button>
  );
}

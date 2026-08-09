"use client";

import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";

/**
 * The whole page runs on one 12-column grid with a hairline gap on desktop and
 * a normal gutter on mobile — the same rhythm the reference listing uses.
 */
export const Grid = styled<"div", { $noMargin?: boolean }>(
  "div",
  ({ $noMargin }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: layout.columnGap,
    rowGap: "0px",
    marginLeft: $noMargin ? "0px" : layout.gutter,
    marginRight: $noMargin ? "0px" : layout.gutter,
    [layout.lg]: {
      columnGap: layout.columnGapLg,
      marginLeft: $noMargin ? "0px" : layout.gutterLg,
      marginRight: $noMargin ? "0px" : layout.gutterLg,
    },
  }),
);

type CellProps = {
  /** Columns to span below the lg breakpoint. Defaults to the full 12. */
  $span?: number;
  /** Columns to span from lg up. */
  $spanLg?: number;
  /** 1-indexed start column from lg up. */
  $startLg?: number;
  /** Reorders the cell on mobile without touching the desktop order. */
  $order?: number;
  $orderLg?: number;
};

export const Cell = styled<"div", CellProps>(
  "div",
  ({ $span = 12, $spanLg, $startLg, $order, $orderLg }) => ({
    gridColumn: `span ${$span} / span ${$span}`,
    ...($order !== undefined ? { order: $order } : {}),
    [layout.lg]: {
      ...($spanLg ? { gridColumn: `span ${$spanLg} / span ${$spanLg}` } : {}),
      ...($startLg ? { gridColumnStart: $startLg } : {}),
      ...($orderLg !== undefined ? { order: $orderLg } : {}),
    },
  }),
);

/** Vertical rhythm between the major bands of the page. */
export const Section = styled<"section", { $tight?: boolean; $sand?: boolean }>(
  "section",
  ({ $tight, $sand }) => ({
    backgroundColor: $sand ? palette.sand : "transparent",
    paddingTop: $tight ? "40px" : "64px",
    paddingBottom: $tight ? "40px" : "64px",
    [layout.lg]: {
      paddingTop: $tight ? "56px" : "112px",
      paddingBottom: $tight ? "56px" : "112px",
    },
  }),
);

/** The small uppercase label that sits above every block of content. */
const eyebrowStyle = {
  ...type.eyebrow,
  margin: "0 0 20px 0",
  color: palette.ink,
  fontWeight: 400,
} as const;

export const Eyebrow = styled("h2", eyebrowStyle);

/**
 * Styletron types `$as` to the original tag, so the variants that need a
 * different element get their own component rather than a runtime `as` prop.
 */
export const EyebrowText = styled("p", eyebrowStyle);
export const EyebrowTight = styled("p", { ...eyebrowStyle, marginBottom: "0px" });

export const Rule = styled<"hr", { $strong?: boolean }>("hr", ({ $strong }) => ({
  border: "none",
  borderTop: `1px solid ${$strong ? palette.ruleStrong : palette.rule}`,
  margin: "0",
  width: "100%",
}));

/**
 * The bordered pill used for "See images", "Property enquiry" and so on. It
 * appears as both a link and a button, hence the two exports off one style.
 */
const outlineStyle = ({ $block }: { $block?: boolean }) => ({
  ...type.eyebrow,
  display: $block ? "flex" : "inline-flex",
  width: $block ? "100%" : "auto",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 22px",
  border: `1px solid ${palette.ruleStrong}`,
  backgroundColor: "transparent",
  color: palette.ink,
  textDecoration: "none",
  cursor: "pointer",
  whiteSpace: "nowrap" as const,
  transitionProperty: "background-color, color, border-color",
  transitionDuration: "200ms",
  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  ":hover": {
    backgroundColor: palette.ink,
    borderColor: palette.ink,
    color: palette.chalk,
  },
});

export const OutlineAction = styled<"a", { $block?: boolean }>("a", outlineStyle);
export const OutlineButton = styled<"button", { $block?: boolean }>("button", outlineStyle);

/** A quiet inline link with the underline offset far enough to read well. */
export const TextLink = styled("a", {
  color: palette.ink,
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  textDecorationColor: palette.ruleStrong,
  transitionProperty: "text-decoration-color",
  transitionDuration: "200ms",
  ":hover": { textDecorationColor: palette.ink },
});

export const Muted = styled("span", {
  color: palette.inkMuted,
});

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

/**
 * Every block on the page is named from a narrow column to its left rather than
 * by a heading above it. That one device is most of the layout's character: it
 * keeps the labels out of the reading line and lets the content start clean.
 *
 *   <Block>
 *     <BlockLabel>Highlights</BlockLabel>
 *     <BlockBody>…</BlockBody>
 *   </Block>
 */
export const Block = styled("div", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  rowGap: "12px",
  [layout.lg]: {
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    columnGap: layout.columnGapLg,
    rowGap: "0px",
  },
});

const blockLabelStyle = {
  ...type.label,
  margin: 0,
  color: palette.ink,
  [layout.lg]: { gridColumn: "span 1 / span 1" },
} as const;

export const BlockLabel = styled("h2", blockLabelStyle);

/** Styletron types `$as` to the original tag, so a `<p>` variant is its own export. */
export const BlockLabelText = styled("p", blockLabelStyle);

export const BlockBody = styled("div", {
  [layout.lg]: { gridColumn: "span 4 / span 4" },
});

export const Rule = styled<"hr", { $strong?: boolean }>("hr", ({ $strong }) => ({
  border: "none",
  borderTop: `1px solid ${$strong ? palette.ruleStrong : palette.rule}`,
  margin: "0",
  width: "100%",
}));

/** The bordered pill used for "See images", "Property enquiry" and so on. */
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

import { createLightTheme } from "baseui";
import type { Font } from "baseui/themes";

/**
 * The palette is lifted from the editorial property-listing look: a warm chalk
 * page, a slightly deeper sand for the closing panel, and near-black ink.
 * Everything else is a transparency of the ink so it always sits correctly on
 * either background.
 */
export const palette = {
  chalk: "#F1F0EA",
  sand: "#E4E1D6",
  ink: "#211F1A",
  inkMuted: "rgba(33, 31, 26, 0.62)",
  rule: "rgba(33, 31, 26, 0.16)",
  ruleStrong: "rgba(33, 31, 26, 0.32)",
  white: "#FFFFFF",
} as const;

const sans = "var(--font-sans), Arial, Helvetica, sans-serif";
const serif = "var(--font-serif), 'Times New Roman', Times, serif";

/**
 * Base Web carries ~50 typography tokens. Rather than restate each one, sweep
 * the whole scale onto our sans and then hand the Display sizes to the serif —
 * that is the only split the design actually makes.
 */
const sansTokens = [
  "font100", "font150", "font200", "font250", "font300", "font350",
  "font400", "font450", "font550", "font650", "font750", "font850",
  "font950", "font1050", "font1150", "font1250", "font1350", "font1450",
  "ParagraphXSmall", "ParagraphSmall", "ParagraphMedium", "ParagraphLarge",
  "LabelXSmall", "LabelSmall", "LabelMedium", "LabelLarge",
  "HeadingXSmall", "HeadingSmall", "HeadingMedium", "HeadingLarge",
  "HeadingXLarge", "HeadingXXLarge",
] as const;

const serifTokens = [
  "DisplayXSmall", "DisplaySmall", "DisplayMedium", "DisplayLarge",
] as const;

const typography: Record<string, Partial<Font>> = {};
for (const token of sansTokens) typography[token] = { fontFamily: sans };
for (const token of serifTokens) typography[token] = { fontFamily: serif, fontWeight: 400 };

export const theme = createLightTheme({
  colors: {
    primary: palette.ink,
    primaryA: palette.ink,
    primaryB: palette.chalk,
    accent: palette.ink,

    backgroundPrimary: palette.chalk,
    backgroundSecondary: palette.sand,
    contentPrimary: palette.ink,
    contentSecondary: palette.inkMuted,
    contentTertiary: palette.inkMuted,
    borderOpaque: palette.rule,
    borderSelected: palette.ink,

    // Inputs sit flush on the page rather than in a filled well.
    inputFill: "transparent",
    inputFillActive: "transparent",
    inputFillError: "transparent",
    inputFillDisabled: "transparent",
    inputBorder: palette.rule,
    inputPlaceholder: palette.inkMuted,
    inputTextDisabled: palette.inkMuted,

    buttonPrimaryFill: palette.ink,
    buttonPrimaryText: palette.chalk,
    buttonPrimaryHover: "#000000",
    buttonPrimaryActive: "#000000",
    buttonSecondaryFill: "transparent",
    buttonSecondaryText: palette.ink,

    tickFillSelected: palette.ink,
    tickFillSelectedHover: "#000000",
    tickBorder: palette.ruleStrong,
  },

  typography,

  borders: {
    // Nothing on this page is rounded.
    useRoundedCorners: false,
    buttonBorderRadius: "0px",
    buttonBorderRadiusMini: "0px",
    inputBorderRadius: "0px",
    inputBorderRadiusMini: "0px",
    popoverBorderRadius: "0px",
    surfaceBorderRadius: "0px",
    checkboxBorderRadius: "0px",
    tagBorderRadius: "0px",
  },
});

/** Reused directly in styletron style objects that sit outside Base Web components. */
export const type = {
  serif,
  sans,
  /** The small uppercase treatment used on buttons, labels and eyebrow text. */
  eyebrow: {
    fontFamily: sans,
    fontSize: "12px",
    lineHeight: 1.2,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
} as const;

/** Layout constants that keep every section on the same 12-column rhythm. */
export const layout = {
  gutter: "16px",
  gutterLg: "24px",
  columnGap: "16px",
  columnGapLg: "4px",
  /** Base Web ships a mobile-first media query set; these mirror the original site. */
  lg: "@media screen and (min-width: 1024px)",
  md: "@media screen and (min-width: 768px)",
} as const;

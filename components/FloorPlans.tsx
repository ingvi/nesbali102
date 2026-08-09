"use client";

import { styled } from "baseui";
import { layout, palette } from "@/app/theme";
import { property } from "@/content/property";
import { Cell, Eyebrow, Grid } from "./Primitives";
import { useLang } from "./LangContext";
import type { L } from "@/lib/i18n";

const PlanFigure = styled("figure", {
  margin: 0,
  border: `1px solid ${palette.rule}`,
  backgroundColor: palette.white,
});

const PlanImage = styled("img", {
  width: "100%",
  height: "auto",
});

const PlanCaption = styled("figcaption", {
  fontSize: "13px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: palette.inkMuted,
  padding: "12px 16px",
  borderTop: `1px solid ${palette.rule}`,
});

const Stack = styled("div", {
  display: "grid",
  gap: "16px",
  [layout.lg]: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "4px" },
});

export function FloorPlans() {
  const { t, x } = useLang();
  const plans: ReadonlyArray<{ src: string; alt: L; label: L }> = property.floorPlans;
  if (plans.length === 0) return null;

  return (
    <Grid>
      <Cell $span={12} $spanLg={10} $startLg={2}>
        <div id="floor-plans" style={{ scrollMarginTop: "88px" }}>
          <Eyebrow>{t("floorPlans")}</Eyebrow>
          <Stack>
            {plans.map((plan) => (
              <PlanFigure key={plan.src}>
                <PlanImage src={plan.src} alt={x(plan.alt)} loading="lazy" />
                <PlanCaption>{x(plan.label)}</PlanCaption>
              </PlanFigure>
            ))}
          </Stack>
        </div>
      </Cell>
    </Grid>
  );
}

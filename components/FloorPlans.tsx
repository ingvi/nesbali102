"use client";

import Image from "next/image";
import { styled } from "baseui";
import { layout, palette, type } from "@/app/theme";
import { property } from "@/content/property";
import { Block, BlockBody, BlockLabel, Cell, Grid } from "./Primitives";
import { useLang } from "./LangContext";
import type { L } from "@/lib/i18n";

const PlanFigure = styled("figure", {
  margin: 0,
});



const PlanCaption = styled("figcaption", {
  ...type.label,
  color: palette.inkMuted,
  marginTop: "10px",
});

const Stack = styled("div", {
  display: "grid",
  gap: "24px",
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
          <Block>
            <BlockLabel>{t("floorPlans")}</BlockLabel>
            <BlockBody>
              <Stack>
                {plans.map((plan) => (
                  <PlanFigure key={plan.src}>
                    <Image
                      src={plan.src}
                      alt={x(plan.alt)}
                      width={2000}
                      height={1334}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        backgroundColor: palette.white,
                      }}
                    />
                    <PlanCaption>{x(plan.label)}</PlanCaption>
                  </PlanFigure>
                ))}
              </Stack>
            </BlockBody>
          </Block>
        </div>
      </Cell>
    </Grid>
  );
}

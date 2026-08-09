"use client";

import { useCallback, useEffect } from "react";
import { styled } from "baseui";
import { Modal, ROLE, SIZE } from "baseui/modal";
import { palette, type } from "@/app/theme";
import { property } from "@/content/property";

const Stage = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100dvh",
  backgroundColor: palette.chalk,
});

const StageImage = styled("div", {
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 0,
  padding: "56px 16px 8px",
  "@media screen and (min-width: 1024px)": { padding: "72px 72px 8px" },
});

const Photo = styled("img", {
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
  objectFit: "contain",
});

const Bar = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "16px",
  borderTop: `1px solid ${palette.rule}`,
  "@media screen and (min-width: 1024px)": { padding: "16px 24px" },
});

const Caption = styled("p", {
  ...type.eyebrow,
  margin: 0,
  color: palette.inkMuted,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Counter = styled("span", {
  ...type.eyebrow,
  color: palette.inkMuted,
  whiteSpace: "nowrap",
});

const Controls = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
});

const Ghost = styled("button", {
  ...type.eyebrow,
  border: `1px solid ${palette.ruleStrong}`,
  backgroundColor: "transparent",
  color: palette.ink,
  padding: "10px 16px",
  cursor: "pointer",
  transitionProperty: "background-color, color",
  transitionDuration: "200ms",
  ":hover": { backgroundColor: palette.ink, color: palette.chalk },
});

const Close = styled("button", {
  ...type.eyebrow,
  position: "absolute",
  top: "12px",
  right: "12px",
  zIndex: 2,
  border: "none",
  background: "none",
  color: palette.ink,
  cursor: "pointer",
  padding: "8px",
  "@media screen and (min-width: 1024px)": { top: "16px", right: "20px" },
});

type LightboxProps = {
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({ index, onChange, onClose }: LightboxProps) {
  const total = property.gallery.length;
  const isOpen = index !== null;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + total) % total);
    },
    [index, onChange, total],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step]);

  const image = index === null ? null : property.gallery[index];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={SIZE.full}
      role={ROLE.dialog}
      overrides={{
        Root: { style: { zIndex: 60 } },
        Dialog: {
          style: {
            backgroundColor: palette.chalk,
            borderRadius: 0,
            margin: 0,
            width: "100vw",
            maxWidth: "100vw",
            height: "100dvh",
          },
        },
        Close: { style: { display: "none" } },
      }}
    >
      {image ? (
        <Stage>
          <Close type="button" onClick={onClose} aria-label="Close images">
            Close
          </Close>
          <StageImage>
            <Photo src={image.src} alt={image.alt} />
          </StageImage>
          <Bar>
            <Caption>{image.alt}</Caption>
            <Controls>
              <Counter>
                {(index ?? 0) + 1} / {total}
              </Counter>
              <Ghost type="button" onClick={() => step(-1)} aria-label="Previous image">
                Prev
              </Ghost>
              <Ghost type="button" onClick={() => step(1)} aria-label="Next image">
                Next
              </Ghost>
            </Controls>
          </Bar>
        </Stage>
      ) : null}
    </Modal>
  );
}

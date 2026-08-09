"use client";

import { useState, type FormEvent } from "react";
import { styled } from "baseui";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Button, KIND, SIZE } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { layout, palette, type } from "@/app/theme";
import { property } from "@/content/property";
import { Cell, Grid } from "./Primitives";

const Panel = styled("div", {
  backgroundColor: palette.chalk,
  paddingTop: "56px",
  paddingBottom: "56px",
  [layout.lg]: { paddingTop: "96px", paddingBottom: "96px" },
});

const Heading = styled("h2", {
  fontFamily: type.serif,
  fontWeight: 400,
  fontSize: "clamp(30px, 3.4vw, 46px)",
  lineHeight: 1.12,
  letterSpacing: "-0.012em",
  margin: "0 0 24px 0",
});

const Intro = styled("p", {
  margin: 0,
  fontSize: "16px",
  lineHeight: 1.55,
  maxWidth: "56ch",
});

const Details = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  marginTop: "40px",
  [layout.lg]: { marginTop: 0, justifyContent: "flex-end", height: "100%" },
});

const DetailLabel = styled("span", {
  ...type.eyebrow,
  color: palette.inkMuted,
  display: "block",
  marginBottom: "4px",
});

const DetailValue = styled("span", {
  fontSize: "15px",
});

const Fields = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  marginTop: "40px",
  [layout.lg]: { marginTop: 0 },
});

const Row = styled("div", {
  display: "grid",
  gap: "4px",
  [layout.lg]: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
});

/**
 * Base Web's FormControl renders its label and control as siblings rather than
 * inside a wrapper, so each one needs its own box before it can be laid out.
 */
const Field = styled("div", {
  display: "block",
  minWidth: 0,
});

const Consent = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "20px",
  marginBottom: "28px",
});

const Sent = styled("p", {
  ...type.eyebrow,
  textTransform: "none",
  letterSpacing: "0",
  fontSize: "14px",
  color: palette.inkMuted,
  margin: "16px 0 0 0",
});

/** Base Web inputs default to a filled well; this page wants a single rule. */
const inputOverrides = {
  Root: {
    style: {
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      borderRightWidth: "0px",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: palette.ruleStrong,
      backgroundColor: "transparent",
    },
  },
  Input: {
    style: {
      backgroundColor: "transparent",
      paddingLeft: "0px",
      paddingRight: "0px",
      fontSize: "16px",
      "::placeholder": { color: palette.inkMuted },
    },
  },
  InputContainer: { style: { backgroundColor: "transparent" } },
};

const emptyForm = { name: "", email: "", phone: "", message: "" };

export function Enquiry() {
  const [form, setForm] = useState(emptyForm);
  const [viewing, setViewing] = useState(true);
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof emptyForm) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  /**
   * There is no backend here on purpose: the enquiry opens in the seller's own
   * mail client with everything filled in. Swap this for a POST to an API route
   * if you would rather collect enquiries somewhere else.
   */
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const subject = `Enquiry — ${property.name}, ${property.area}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      viewing ? "Would like to book a viewing: yes" : "",
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${property.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Panel>
      <div id="enquiry" style={{ scrollMarginTop: "88px" }}>
        <Grid>
          <Cell $span={12} $spanLg={5} $startLg={2}>
            <Heading>
              Property enquiry
              <br />
              {property.name}
            </Heading>
          </Cell>
          <Cell $span={12} $spanLg={4} $startLg={8}>
            <Intro>{property.viewing}</Intro>
          </Cell>
        </Grid>

        <form onSubmit={onSubmit}>
          <Grid>
            <Cell $span={12} $spanLg={4} $startLg={2} $order={1} $orderLg={0}>
              <Details>
                <div>
                  <DetailLabel>Address</DetailLabel>
                  <DetailValue>{property.contact.address}</DetailValue>
                </div>
                <div>
                  <DetailLabel>Phone</DetailLabel>
                  <DetailValue>{property.contact.phone}</DetailValue>
                </div>
                <div>
                  <DetailLabel>Email</DetailLabel>
                  <DetailValue>{property.contact.email}</DetailValue>
                </div>
              </Details>
            </Cell>

            <Cell $span={12} $spanLg={5} $startLg={7} $order={0} $orderLg={1}>
              <Fields>
                <Row>
                  <Field>
                    <FormControl label="Name">
                      <Input
                        value={form.name}
                        onChange={set("name")}
                        required
                        name="name"
                        autoComplete="name"
                        overrides={inputOverrides}
                      />
                    </FormControl>
                  </Field>
                  <Field>
                    <FormControl label="Phone">
                      <Input
                        value={form.phone}
                        onChange={set("phone")}
                        name="phone"
                        autoComplete="tel"
                        overrides={inputOverrides}
                      />
                    </FormControl>
                  </Field>
                </Row>

                <Field>
                  <FormControl label="Email">
                    <Input
                      value={form.email}
                      onChange={set("email")}
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      overrides={inputOverrides}
                    />
                  </FormControl>
                </Field>

                <Field>
                  <FormControl label="Message">
                    <Textarea
                      value={form.message}
                      onChange={set("message")}
                      name="message"
                      rows={5}
                      placeholder="Anything you would like to know before a viewing?"
                      overrides={inputOverrides}
                    />
                  </FormControl>
                </Field>

                <Consent>
                  <Checkbox
                    checked={viewing}
                    onChange={(event) => setViewing(event.currentTarget.checked)}
                    labelPlacement={LABEL_PLACEMENT.right}
                  >
                    I would like to book a viewing
                  </Checkbox>
                </Consent>

                <Button
                  type="submit"
                  kind={KIND.primary}
                  size={SIZE.large}
                  overrides={{
                    BaseButton: {
                      style: {
                        ...type.eyebrow,
                        width: "100%",
                        paddingTop: "18px",
                        paddingBottom: "18px",
                      },
                    },
                  }}
                >
                  Send
                </Button>

                {sent ? (
                  <Sent>
                    Your mail app should have opened with the message ready to send. If
                    nothing happened, write to {property.contact.email} directly.
                  </Sent>
                ) : null}
              </Fields>
            </Cell>
          </Grid>
        </form>
      </div>
    </Panel>
  );
}

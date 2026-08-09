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
import { useLang } from "./LangContext";

const Panel = styled("div", {
  backgroundColor: palette.chalk,
  paddingTop: "56px",
  paddingBottom: "56px",
  [layout.lg]: { paddingTop: "96px", paddingBottom: "96px" },
});

const Heading = styled("h2", {
  fontFamily: type.serif,
  fontWeight: 400,
  fontSize: type.size.display,
  lineHeight: 1.15,
  letterSpacing: "-0.24px",
  margin: "0 0 24px 0",
});

const Intro = styled("p", {
  margin: 0,
  fontSize: type.size.body,
  lineHeight: 1.4,
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
  fontSize: type.size.small,
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
  letterSpacing: "-0.24px",
  fontSize: type.size.small,
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
      fontSize: type.size.body,
      "::placeholder": { color: palette.inkMuted },
    },
  },
  InputContainer: { style: { backgroundColor: "transparent" } },
};

const emptyForm = { name: "", email: "", phone: "", message: "" };

export function Enquiry() {
  const { t, x } = useLang();
  const [form, setForm] = useState(emptyForm);
  const [viewing, setViewing] = useState(true);
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof emptyForm) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  /**
   * There is no backend here on purpose: the enquiry opens in the sender's own
   * mail client with everything filled in. Swap this for a POST to an API route
   * if you would rather collect enquiries somewhere else.
   */
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const subject = `${t("propertyEnquiry")} — ${property.name}, ${x(property.area)}`;
    const body = [
      `${t("formName")}: ${form.name}`,
      `${t("formEmail")}: ${form.email}`,
      `${t("formPhone")}: ${form.phone}`,
      viewing ? `${t("formViewing")}: ✓` : "",
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
              {t("propertyEnquiry")}
              <br />
              {property.name}
            </Heading>
          </Cell>
          <Cell $span={12} $spanLg={4} $startLg={8}>
            <Intro>{x(property.viewing)}</Intro>
          </Cell>
        </Grid>

        <form onSubmit={onSubmit}>
          <Grid>
            <Cell $span={12} $spanLg={4} $startLg={2} $order={1} $orderLg={0}>
              <Details>
                <div>
                  <DetailLabel>{t("formAddress")}</DetailLabel>
                  <DetailValue>{x(property.contact.address)}</DetailValue>
                </div>
                <div>
                  <DetailLabel>{t("formPhone")}</DetailLabel>
                  <DetailValue>{property.contact.phone}</DetailValue>
                </div>
                <div>
                  <DetailLabel>{t("formEmail")}</DetailLabel>
                  <DetailValue>{property.contact.email}</DetailValue>
                </div>
              </Details>
            </Cell>

            <Cell $span={12} $spanLg={5} $startLg={7} $order={0} $orderLg={1}>
              <Fields>
                <Row>
                  <Field>
                    <FormControl label={t("formName")}>
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
                    <FormControl label={t("formPhone")}>
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
                  <FormControl label={t("formEmail")}>
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
                  <FormControl label={t("formMessage")}>
                    <Textarea
                      value={form.message}
                      onChange={set("message")}
                      name="message"
                      rows={5}
                      placeholder={t("formMessagePlaceholder")}
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
                    {t("formViewing")}
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
                  {t("formSend")}
                </Button>

                {sent ? (
                  <Sent>
                    {t("formSent")} {property.contact.email}.
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

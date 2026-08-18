# Nesbali 102

A single-page property listing for a private house sale, built in the editorial
style of [Fantastic Frank](https://www.fantasticfrank.com/) — full-bleed
photography, a warm chalk page, a serif display face against a grotesque, and a
12-column grid with a hairline gap.

Icelandic and English, at `/is` and `/en`. The bare domain lands on Icelandic.

Next.js 16 (App Router) · [Base Web](https://baseweb.design/) 18 · Styletron.

## Getting it running

```bash
npm install && npm run dev
```

## Making it yours

Almost everything lives in one file.

| What | Where |
| --- | --- |
| Price, size, rooms, description, highlights, facts, contact details — in both languages | [content/property.ts](content/property.ts) |
| Buttons, labels, nav, form chrome | [lib/i18n.ts](lib/i18n.ts) |
| Photographs and floor plans | `public/images/` |
| Colours, type scale, grid | [app/theme.ts](app/theme.ts) |

Anything bilingual is written as `{ is: "…", en: "…" }`. Both sides are
required, so a missing translation is a type error rather than a page that
quietly falls back to English.

### What is verified and what is not

Values marked `✓ HMS` in `content/property.ts` come from the public register
entry [F2068040](https://hms.is/fasteignaskra/117492/1024775/2068040) — size,
year built, plot, assessed value, fire insurance value, property and land
numbers. Values marked `TODO` are placeholders the register does not hold:
the asking price, room counts, the description, and the contact details.

### Photographs

Sixteen photographs live in `public/images/`, stored as 2000px-wide JPEGs and
served through `next/image`, which resizes and re-encodes them per device — a
phone gets a ~750px WebP, not the 2000px master. Keep that convention when
swapping any of them: one file, 2000px on the long edge, 3:2.

Two things to get right, because the layout leans on them:

- **The hero** is cropped to fill a frame roughly 2:1, so the top and bottom of
  the frame are lost. Leave room around the subject.
- **Gallery images** carry a `width` of `"full"`, `"half"` or `"inset"`. Alternating
  them is what gives the scroll its rhythm — `"half"` sits against the right edge.

There is no lightbox, by design: the scrolling stack *is* the gallery, and
"See images" simply scrolls to it. That is how the reference behaves.

The header sits as dark ink over a light wash at the top of the hero rather than
white over a dark one, so it stays legible on a bright interior — which is what
almost every property photograph is.

### Floor plans

`floorPlans` in `content/property.ts` is empty, so the section and its shortcut
render nothing. Add drawings to the array and both reappear on their own.

### Getting in touch

There is no form, on purpose. The enquiry section offers the agent's phone as a
tap-to-call, his email, and a button through to the agency listing where the
real enquiry form lives.

An earlier version had a form that built a `mailto:` link. Two problems killed
it. It could not tell whether the handoff to the visitor's mail app had
succeeded, so it reported success either way — on a desktop using webmail with
no registered mail handler, the click did nothing and the page said it had
worked. And an enquiry arriving as a plain email sits outside whatever process
the agency uses to follow leads up, so it competed with the channel that works.

If you do want enquiries coming to you rather than to the agent, that needs a
real backend — a Vercel function and something like Resend — not `mailto:`.

### Before you publish

- [x] Real photographs in `public/images/`
- [ ] Every `TODO` in `content/property.ts` replaced — asking price, room counts,
      description, highlights, your phone number and email
- [ ] Floor plans added, or left out on purpose
- [ ] The map marker moved to the real coordinates
- [ ] Both languages read naturally, not as translations of each other
- [ ] `meta.siteUrl` set to the deployed domain, so link previews resolve

## Being found, and looking right when shared

| What | Where |
| --- | --- |
| Titles, descriptions, share image | `meta` in [content/property.ts](content/property.ts) |
| Open Graph, Twitter card, hreflang | [app/[lang]/layout.tsx](app/[lang]/layout.tsx) |
| Schema.org JSON-LD | [components/StructuredData.tsx](components/StructuredData.tsx) |
| Crawler rules | [app/robots.ts](app/robots.ts) |
| Sitemap | [app/sitemap.ts](app/sitemap.ts) |
| Favicon | `app/[lang]/icon.svg`, `app/[lang]/apple-icon.png` |

`public/images/og.jpg` is a 1200×630 crop of the hero — the size Facebook,
LinkedIn, Slack, iMessage and X all crop to. Regenerate it from a new hero with:

```bash
sips -Z 1200 public/images/hero.jpg --out /tmp/w.jpg && sips -c 630 1200 --cropOffset 55 0 /tmp/w.jpg --out public/images/og.jpg
```

The JSON-LD carries the price, size and room counts as plain numbers, because
`208.500.000 kr.` is not a parseable price. Those numbers live beside the
display strings in `content/property.ts` as `priceValue`, `sizeValue` and so on
— change one and change the other.

`robots.ts` allows assistant crawlers (GPTBot, ClaudeBot, PerplexityBot,
Google-Extended) explicitly rather than by omission, so the decision is on the
record. Move one into `disallow` to reverse it.

### What this cannot do

A new page on a `vercel.app` subdomain with no inbound links will not rank for
"raðhús til sölu Seltjarnarnes" — the portals and the agency own those queries,
and a house sells faster than a domain earns authority. What the work above
does buy: the link looks right everywhere it is pasted, anyone searching the
address finds it, and anything that does crawl the page can read the facts
without guessing. A custom domain and a link from the agency listing would
matter more than anything left in the code.

## Deploying

```bash
npx vercel deploy --prod
```

## How it is put together

```
app/
  theme.ts        Base Web theme — palette, type scale, zero border radii
  providers.tsx   Styletron engine, split server/client for SSR
  [lang]/
    layout.tsx    Root layout — fonts, per-language metadata and hreflang
    page.tsx      Renders the listing
lib/i18n.ts       Languages, the chrome dictionary, the `L` type
components/
  LangContext.tsx `t` for chrome strings, `x` for bilingual content
  Primitives.tsx  Grid, Cell, Section, Eyebrow, the outline button
  Hero.tsx        Full-bleed image and the title bar beneath it
  Intro.tsx       Description, contact card, highlights, register facts
  Gallery.tsx     The scrolling photo sequence
  Enquiry.tsx     The form
  Closing.tsx     Closing panel and footer
```

Adding a third language means adding it to `LANGS`, filling in the `ui` block,
and adding the key to every bilingual value — TypeScript will list them all.

The 12-column grid is the load-bearing idea: every section places its content on
the same columns (2–5 on the left, 7–11 on the right), which is what makes the
page feel set rather than assembled.

## A note on the design

The layout, proportions and typographic structure follow Fantastic Frank's
listing pages. None of their photography, copy, fonts or branding is used —
the display face is Newsreader and the text face is Inter, both open source.

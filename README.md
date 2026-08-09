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

The images that ship with the repo are generated placeholders so the layout
reads correctly before the real shoot. Replace them one for one in
`public/images/` — keep the file names and everything picks up automatically, or
change the paths in `content/property.ts`.

Two things to get right, because the layout leans on them:

- **The hero** wants a wide landscape frame (3:2 or wider). It is cropped to
  fill, so leave room around the subject.
- **Gallery images** carry a `width` of `"full"`, `"half"` or `"inset"`. Alternating
  them is what gives the scroll its rhythm — `"half"` sits against the right edge.

There is no lightbox, by design: the scrolling stack *is* the gallery, and
"See images" simply scrolls to it. That is how the reference behaves.

Once the real photographs are in, delete `scripts/make-placeholders.mjs`.

### The enquiry form

It has no backend on purpose. Submitting opens the visitor's own mail client
with everything filled in and addressed to `contact.email`. Nothing is stored,
nothing needs a database, and there is no privacy policy to write.

If you would rather collect enquiries somewhere, replace the `onSubmit` handler
in [components/Enquiry.tsx](components/Enquiry.tsx) with a `fetch` to an API
route.

### Before you publish

- [ ] Real photographs in `public/images/`
- [ ] Every `TODO` in `content/property.ts` replaced — asking price, room counts,
      description, highlights, your phone number and email
- [ ] Both languages read naturally, not as translations of each other
- [ ] `meta.siteUrl` set to the deployed domain, so link previews resolve

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

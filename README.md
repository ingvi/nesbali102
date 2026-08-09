# Nesbali 102

A single-page property listing for a private house sale, built in the editorial
style of [Fantastic Frank](https://www.fantasticfrank.com/) — full-bleed
photography, a warm chalk page, a serif display face against a grotesque, and a
12-column grid with a hairline gap.

Next.js 16 (App Router) · [Base Web](https://baseweb.design/) 18 · Styletron.

## Getting it running

```bash
npm install && npm run dev
```

## Making it yours

Almost everything lives in one file.

| What | Where |
| --- | --- |
| Price, size, rooms, description, highlights, facts, contact details | [content/property.ts](content/property.ts) |
| Photographs and floor plans | `public/images/` |
| Colours, type scale, grid | [app/theme.ts](app/theme.ts) |

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
- [ ] Your phone number, email and the property number in `content/property.ts`
- [ ] The price, size and plot verified against the official records
- [ ] `meta.siteUrl` set to the deployed domain, so link previews resolve

## Deploying

```bash
npx vercel deploy --prod
```

## How it is put together

```
app/
  theme.ts       Base Web theme — palette, type scale, zero border radii
  providers.tsx  Styletron engine, split server/client for SSR
  layout.tsx     Fonts (Newsreader + Inter), metadata
components/
  Primitives.tsx Grid, Cell, Section, Eyebrow, the outline button
  Hero.tsx       Full-bleed image and the title bar beneath it
  Intro.tsx      Description, contact card, highlights, facts
  Gallery.tsx    The scrolling photo sequence
  Lightbox.tsx   Full-screen viewer (arrow keys work)
  Enquiry.tsx    The form
  Closing.tsx    Closing panel and footer
```

The 12-column grid is the load-bearing idea: every section places its content on
the same columns (2–5 on the left, 7–11 on the right), which is what makes the
page feel set rather than assembled.

## A note on the design

The layout, proportions and typographic structure follow Fantastic Frank's
listing pages. None of their photography, copy, fonts or branding is used —
the display face is Newsreader and the text face is Inter, both open source.

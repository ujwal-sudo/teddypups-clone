# TeddyPups U.A.E. — website clone

A rebuild of [puppy.instabizweb.com](https://puppy.instabizweb.com/) (a premium teacup-puppy shop in Dubai), made for the Blutec AI technical round. It recreates the design, layout, responsiveness and interactions of every page of the reference site.

**Live:** _add Vercel URL here_

## Tech stack

| | |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack, Cache Components, React 19) |
| Styling | **Tailwind CSS v4**, plus hand-written component CSS and keyframes in `src/app/globals.css` |
| Fonts | `next/font/google`: Fraunces (display), Figtree (body), Shantell Sans (handwriting) |
| Images | `next/image` (AVIF/WebP), original media served from `public/media` |
| Forms | React `useActionState` + a Next.js **Server Action**, emails sent via the **Resend** HTTP API (no SDK) |
| Hosting | Vercel |

No UI or animation libraries: the illustrations are inline SVG/CSS, and the motion is CSS keyframes plus a small amount of `requestAnimationFrame` and `IntersectionObserver` code.

## Pages

| Route | What's there |
|---|---|
| `/` | One scrolling "morning to night" story: hero with peeking puppies, a scroll-pinned row of doors that open on each puppy, a signpost (showroom vs. import), a WhatsApp chat that fills in as you scroll, passport stamps, a polaroid wall, a starry FAQ, and a house whose door opens |
| `/puppies` | Sketchbook cards with filters (where / breed / boy-or-girl) kept in the URL, e.g. `/puppies?breed=pomeranian` |
| `/puppies/[slug]` | 42 statically generated puppy pages: photo + video gallery, facts, "the way home" steps, enquiry form, previous/next pup |
| `/gone-home` | "Admit one" tickets for puppies that found homes |
| `/happy-families` | A masonry wall of 64 polaroids |
| `/how-it-works` | In Dubai / Imported tab switch, promise stamps, delivery, why choose us |
| `/faq` | Live search over sticky notes pinned to a corkboard (accordion, plus FAQPage JSON-LD) |
| `/contact` | A fill-in-the-blanks letter form that posts like an envelope |

Site-wide pieces:
- **Teddy**, a single mascot dog who follows you through every page. He walks between spots with spring physics, waits at the screen edge and leaves paw prints.
- A paw-print cursor trail.
- A sticky WhatsApp/Call bar on phones.
- An animated full-screen mobile menu.

## Project structure

```
src/
  app/                  routes (one folder per page), layout, global CSS, server action
    actions.ts          sendEnquiry: validation → Resend email
  components/           shared UI (Header, Footer, Follower, Gallery, forms, cards…)
    home/               the eight sections of the home page
  data/                 puppies.json (42 puppies) and families.json (64 photos), extracted from the reference
  lib/                  site constants, filter logic, enquiry validation, FAQ content
public/media/           original photos & videos from the reference site
scripts/selfcheck.ts    assertion tests for filters and form validation (npm test)
docs/ANALYSIS.md        the analysis of the reference site done before building
```

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

```bash
npm test        # filter + enquiry validation self-checks
npm run lint
npm run build   # production build (54 static pages)
```

### Environment variables

| Name | Purpose |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com/api-keys) |
| `ENQUIRY_TO` | Inbox(es) that receive enquiries (comma-separated) |
| `ENQUIRY_FROM` | Optional sender on a verified domain. Without it, Resend's test sender is used, which only delivers to your own Resend account's email |

**Email sending is off in the deployed demo.** Without these variables the forms still validate and show the thank-you message, but no email is sent (demo mode). Set them to turn real sending on, no code change needed.

## Implementation notes

- **Faithful content:** puppy data, gallery order, family photos and copy were extracted from the reference with a script, so every listing matches the original.
- **Scroll-pinned doors:** on desktop the section is `100vh + overflow` tall, with a sticky inner frame. Scroll progress drives a `translate3d` on the door track, and doors swing open (CSS 3D `rotateY`) via `IntersectionObserver`. On phones it falls back to a plain grid.
- **The follower dog** (`components/Follower.tsx`): sections place invisible `<PupSpot />` markers. A `requestAnimationFrame` loop works in page coordinates so the dog never floats against the content. He keeps his spot while it's visible, is clamped to the screen edge otherwise, and walks with a critically damped spring capped at a trotting speed. Paw prints are DOM nodes dropped every 34 px of travel.
- **Forms:** the server re-validates everything. A hidden honeypot field catches bots, input lengths are capped, the email HTML is escaped, and typed values are echoed back on error.
- **Accessibility:** semantic landmarks, a skip link, `aria-pressed` filters, proper tabs, `aria-live` counts, alt text on every photo, and `prefers-reduced-motion` support.
- **Next 16 specifics:** with Cache Components on, `useSearchParams` and `params` are read inside `<Suspense>` boundaries, so navigations stay instant while all pages are prerendered.

## Differences from the reference

- The mascot and all illustrations are my own drawings, not copies.
- Each home section has its own day-to-night gradient, rather than one continuously shifting background.
- Contact details are the reference's demo placeholders.

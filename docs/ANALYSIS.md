# Reference site analysis: puppy.instabizweb.com ("TeddyPups U.A.E.")

## Stack (detected)
- **Next.js (App Router, Turbopack build)**, served behind Cloudflare. Header `x-powered-by: Next.js`.
- **Tailwind CSS v4** (`--color-*`, `--radius-*` theme tokens) plus custom BEM-style classes (`tp-*`, `pup-*`).
- Images go through `next/image` (`/_next/image?url=/media/...&q=85`). Media is served locally from `/media/...`: 129 unique files, 7 of them videos.
- Fonts via `next/font/google`: **Fraunces** (display), **Figtree** (body), **Shantell Sans** (handwritten accents).
- Forms have no `action` attribute, so they most likely use a Next.js **Server Action**. Each form has a honeypot field named `website`.
- SEO: per-page `<title>`, canonical URL, `sitemap.xml`, `robots.txt`, JSON-LD BreadcrumbList on puppy pages, icon and apple-icon.
- Respects `prefers-reduced-motion`. Breakpoints: 640 / 768 / 900 / 1024 / 1100 / 1280 / 1680.

## Design tokens
| Token | Value | Token | Value |
|---|---|---|---|
| cocoa (text/dark) | `#2a170e` | toffee (primary btn) | `#c2622b` |
| cocoa-soft | `#5a3a28` | toffee-deep | `#a24a1a` |
| milk (bg) | `#fffdf8` | toffee-ink | `#8e3f15` |
| honey | `#f2be6b` | honey-soft | `#fbe3b4` |
| blush | `#f9cdbf` | sky / sky-deep | `#bfddf5` / `#2f6e9e` |

- WhatsApp buttons are green (~`#1f7a4d`).
- Easings: `silk` cubic-bezier(.22,1,.36,1), `pounce` (.34,1.56,.64,1), `snap` (.7,0,.2,1).
- Radii: 0.75 / 1 / 1.5rem. Buttons are pills with a dark 3D bottom shadow.
- There are about 45 custom `@keyframes`: the dog mascot (blink, ear twitch, wag, run cycle), doors and house opening, envelope posting, stamps, the plane bob, twinkling stars, sunset and sunrise, and menu in/out.

## Global chrome
- **Header**: fixed, with a scalloped bottom edge. Logo on the left, nav links (Home, Puppies, Happy families, How it works, FAQ, Visit & contact), and a green "WhatsApp us" pill. The active link gets a small paw/dot marker.
- **Mobile**: a "TeddyPups" wordmark plus a "🐾 Menu" pill that opens an animated full-screen menu. A sticky bottom bar holds "WhatsApp us" and "Call" (`--bar-h`).
- **Footer** (night sky with a moon): "Home, at last." with a blurb, a dog in a basket, an Explore link list, a Say hello block (WhatsApp, email, address), Instagram/TikTok/Facebook pills, "© 2026 TeddyPups U.A.E.", and "every puppy is family".
- **Ambient layers**: a cartoon dog mascot follows the scroll (`pup-layer`), and paw-print trails run down the page (`pup-prints`).

## Pages and routes (49 URLs in the sitemap)
### `/` Home: a single scrolling "day to night" story
1. **Hero**: "every puppy is family" handwritten tag, the H1 "Premium teacup puppies in Dubai", two CTAs, and a row of circular puppy photos peeking over a scalloped cushion. On mobile it shows a "peekaboo!" dog instead.
2. **Meet the pups**: the section is pinned and scroll drives it horizontally. A row of arched **doors** opens to reveal each puppy (15 of them, each with an "Available" tag) while the dog walks along the floor. It ends with a "Meet them all" door. On mobile it becomes a 2-column grid of arches.
3. **Two ways to meet your puppy**: a signpost reading "Puppies in Dubai / Imported for you". On the left is a showroom awning with a Dubai skyline. On the right, a plane flies a dotted route from Korea to Dubai. Each side has a CTA.
4. **Your puppy journey**: 3 steps beside a **phone mock-up of a WhatsApp chat**. Messages and photos animate in as you scroll, with an "ooh, photos!" bubble.
5. **Why families trust TeddyPups**: an open **passport** with 4 stamps.
6. **Happy families** (dusk background, brown): a testimonial card and a corkboard of tilted polaroids with captions.
7. **Questions, answered** (night, with stars): 3 FAQs and a "Read all questions" link.
8. **Ready to meet your new best friend?**: a house whose door opens on a puppy, a "welcome home" mat, and CTAs.

### `/puppies`: listing with filters
- "from Teddy's sketchbook" header and a "self-portrait" dog badge.
- Filter panel: **where** (Everywhere / Imported / Korean Teacup), **breed** (5 options), **boy or girl**. State lives in the URL query (`?origin=`, `?breed=`) and buttons use `aria-pressed`. Shows a "N puppies match" count and a Clear filters button.
- Cards: hand-drawn circular frames with an Available tag and a "▶ video" badge.
- Ends with an "Already gone home" strip of 5 puppies that links to `/gone-home`.

### `/puppies/[slug]`: detail page (15 available + 25 gone-home)
- Numbered handwritten sections: (1) "hello, it's me": an image/video gallery with ‹ › and thumbnails, plus a facts table (Breed, Sex, Age, Where) and WhatsApp/enquiry CTAs. (2) "what comes with Max": a checklist card. (3) "the way home": 4 steps connected by a dotted paw line. The text changes between local and imported puppies. (4) "dear TeddyPups…": an enquiry form (name*, phone*, email, area, message, hidden `puppyId`, honeypot).
- Previous/Next pup navigation.

### `/gone-home`
- A ticket booth with the dog. Puppies appear as **"admit one" tickets** (27 of them) showing name, breed, sex, and a stamp reading "TEDDYPUPS" or "DUBAI SHOWROOM".

### `/happy-families`
- "64 moments and counting", a taped testimonial, and a large masonry wall of polaroids (64 photos).

### `/how-it-works`
- Pill-style in-page navigation (1–4).
- A toggle tab between In Dubai and Imported that switches the 4-step flow.
- Puppy promise (passport style), Delivery & collection (4 cards plus a Korea→Dubai route), and Why choose us (4 cards).

### `/faq`
- A search box ("sniff out a question") filters 9 Q&As in real time. Each is a pinned **sticky note on a corkboard** that expands as an accordion. Includes an "Ask your own question" button.

### `/contact`
- A WhatsApp button, phone, and email.
- A **fill-in-the-blanks letter form**: "my name is ___, and you can reach me on ___…" with a puppy dropdown. The submit button is "Post my letter", and an envelope animation plays on send.
- A "Visit us in Downtown Dubai" card with a Google Maps link.

## Notes for the clone
- Content is fully static: 15 available puppies, 25 gone-home, 64 family photos, 9 FAQs. This can live in a typed data file. No CMS is needed.
- Hardest pieces, in priority order: (1) the pinned horizontal door scroll, (2) the scroll-driven WhatsApp chat, (3) the day-to-night background transition and the mascot following the scroll, (4) all the SVG illustrations (doors, signpost, passport, house, tickets, dog mascot).
- Forms: a Server Action with validation and the honeypot. For the demo, submit and then show a success state, plus open a WhatsApp deep link.
- WhatsApp links use `wa.me/919898124987` (the agency's number) and the placeholder phone `+971 50 000 0000`. Keep them as-is.
- Plan: Next.js + Tailwind v4 + `next/font`, CSS keyframes for most motion, and a small amount of scroll JS (or `animation-timeline: view()` where supported) for the pinned sections. Deploy on Vercel.

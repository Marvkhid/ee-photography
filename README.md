# E&E Photography website

Premium, dark, cinematic website for E&E Photography (Onyekachi Ebere).
Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS 4 · GSAP · Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill it in (see "Enquiry form" below).

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: 13 sections from hero to final booking invitation |
| `/gallery` | Gallery: category chips, masonry grid, lightbox, browse-by-category |
| `/gallery/[category]` | One page per category (portraits, weddings, birthdays, graduations, headshots, events) |
| `/services` | Services with enquiry links that pre-select the service |
| `/about` · `/testimonials` · `/contact` | As named |
| `/api/enquiry` | Enquiry form endpoint (server side) |

## The intro curtain reveal

`src/components/intro/`. About 6 seconds: 18 photo tiles fly in and lock into the letters **E & E** (each tile is cut by a canvas-rendered mask of the lettering), hold with the logo, then the two black panels carrying them part like a curtain to reveal the already-rendered homepage.

- Plays once per browser session (`sessionStorage`), has a **Skip intro** button, and can be replayed from the **Replay intro** button in the footer.
- Tiles come from `public/images/intro/tile-01.jpg … tile-18.jpg`.
- Visitors with *reduced motion* get a short fade instead. If anything fails, a failsafe removes the overlay after 14 seconds so the site stays usable.
- To change timing, edit the timeline in `IntroOverlay.tsx` (the `open` label is the moment the curtains start).

## Where to edit things

| I want to… | Edit |
| --- | --- |
| Change phone, email, Instagram, WhatsApp, tagline, nav labels | `src/config/brand.ts` |
| Add or remove a gallery photo | Put the file in `public/images/gallery/<category>/`, then edit `src/data/photos.ts` |
| Add a category | `src/data/categories.ts` (slug list + entry) and `src/data/photos.ts`; add to `SERVICE_SLUGS` to make it bookable |
| Home carousel / projects / FAQ / process steps | `src/data/home.ts` |
| Replace placeholder testimonials | `src/data/testimonials.ts` (see below) |
| Video loops | `public/videos/` (see its README) |
| Colours and fonts | `src/app/globals.css` (`@theme` tokens) |

## Testimonials (important before launch)

The six records in `src/data/testimonials.ts` are **placeholders** and are shown with a visible "Placeholder" tag. Add real ones with `verified: true`, the client's real words and name (and optionally a photo and rating). As soon as one verified testimonial exists, all placeholders disappear automatically. No testimonial, name or rating has been invented.

## Enquiry form

Each submission is delivered **by email (Resend) and by WhatsApp (WhatsApp Business Cloud API)** at the same time, to `photographyee9@gmail.com` and Ebere's number. Either channel can be used alone. WhatsApp setup, the approved template text and the variables are in `WHATSAPP-SETUP.md`.

`POST /api/enquiry` validates the form with Zod (same schema as the browser) and emails it to the studio through [Resend](https://resend.com). Set these on the server (Vercel project settings → Environment Variables):

```
RESEND_API_KEY=...
ENQUIRY_TO_EMAIL=photographyee9@gmail.com
ENQUIRY_FROM_EMAIL="E&E Photography <onboarding@resend.dev>"   # testing only; use your verified domain for launch
```

For testing, `onboarding@resend.dev` works but only delivers to the address the Resend account was registered with. For launch, verify a sending domain in Resend and change `ENQUIRY_FROM_EMAIL`. Never commit keys: put them in `.env.local` (git-ignored) and in Vercel → Settings → Environment Variables. **Until all three are set the form reports that email isn't connected and never shows a success message**; the visitor can use the WhatsApp button, which opens a pre-filled message only when they click it. Success is shown only when the email provider accepted the message. If WhatsApp delivery is not configured, the visitor can instead tap **Send details on WhatsApp** after a successful email send, which opens a message to Ebere's number written like "Good evening Ebere, I am {name}…" followed by every field they filled in (the greeting follows the visitor's local time). WhatsApp opens only when the visitor taps, because browsers cannot send WhatsApp messages on someone's behalf. A hidden honeypot field filters simple bots.

## Deploying to Vercel

1. Push the project to GitHub and import it in Vercel (framework: Next.js, no extra settings).
2. Add `NEXT_PUBLIC_SITE_URL` (your real domain) and the three email variables above.
3. Deploy. The sitemap (`/sitemap.xml`), robots and social-share metadata use `NEXT_PUBLIC_SITE_URL`.

## Architecture notes

- Pages and sections are Server Components. Only interactive parts are client components: header/menu, intro, hero, carousel, gallery filter and lightbox, enquiry form, video loop, tilt.
- Scroll motion is centralised in `PageMotion`: server components just add `data-reveal`, `data-clip`, `data-parallax`, `data-char` or `data-progress` attributes. Everything animates transform and opacity.
- `SafeImage` wraps `next/image`. A missing file shows a dark placeholder in the same box, never a broken icon.
- All data (categories, photos, testimonials, FAQ, videos) is typed and lives in `src/data/`. Pages never hard-code galleries.
- Fonts are self-hosted with `next/font` (no layout shift). Loading states: image skeletons, a navigation progress line, empty states. Analytics (optional) sits behind a consent banner.
- Strict TypeScript (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`), no `any`, no type casts.

## Launch

See `LAUNCH-CHECKLIST.md` (all ten launch items, what is built and what only you can do) and `GOOGLE-BUSINESS.md` (local search).

## Known limits

- Photo files supplied so far are stand-ins from the supplied sample PDF and are lower resolution than ideal. See `ASSET-GUIDE.md`.
- Graduations, Headshots and Events galleries use stand-in portraits until real photographs are supplied.
- Video loops fall back to the poster with a slow zoom until real clips are added.
- The animations and layout were built and type-checked, and every route was tested over HTTP, but they still need a visual pass in real browsers (desktop and phone).

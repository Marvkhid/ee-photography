# Launch checklist

Status of the ten pre- and post-launch items. **Built** = already in the code. **Verified** = how it was checked.
**You** = steps only you (or Ebere) can do.

## Before launch

### 1. SSL and HTTPS security
- **Built:** security headers on every response (HSTS, no-sniff, frame-deny, referrer policy, permissions policy). Secrets
  stay server-side. The enquiry endpoint validates all input and has a honeypot.
- **Verified:** headers confirmed in the production build.
- **You:** deploy on Vercel and add your domain. Vercel issues and renews the SSL certificate automatically and redirects
  http to https. Then open the site once at `https://` to confirm the padlock.

### 2. Cross-browser and mobile responsiveness
- **Built:** mobile-first layouts, mobile menu, safe fallbacks for older browsers (`svh` units, `overflow-x: clip`).
- **Verified:** 7 pages at 320, 375, 768, 1024, 1440 and 1920 px: no horizontal scrolling, no broken images. Tested in
  Chromium only.
- **You:** open the live site on a real iPhone (Safari), an Android phone (Chrome) and a desktop Firefox and Safari. Check
  the intro, menu, gallery and form.

### 3. Contact form validation
- **Built:** one shared rule set for browser and server: name, email, phone (accepts `0801…` and `+234…`), service. Clear
  messages, the first invalid field is focused, honest sending/success/error states, WhatsApp fallback.
- **Verified:** empty, invalid and valid submissions in a real browser; success is never shown unless the server confirms.
- **You:** add the Resend and WhatsApp keys (see README and WHATSAPP-SETUP.md), then submit a real test enquiry.

### 4. Custom loading and empty states
- **Built:** photo skeleton that fades into the photograph, thin progress line during page navigation, "Sending…" on the
  form, empty states for a category with no photos, a filter with no results, and no testimonials, a friendly 404 and error
  pages, a placeholder for any missing image.

### 5. Basic accessibility
- **Built:** skip link, landmarks, one h1 per page, labelled form fields with live error messages, keyboard-operable
  carousel, gallery and lightbox (Escape and arrows), visible focus, reduced-motion support, alt text on every photograph.
- **Verified:** automated axe audit on all pages at desktop and phone sizes: 0 violations. Lighthouse accessibility 100.
- **You:** try one page with only the keyboard (Tab, Enter, Escape). Automated checks cannot judge everything.

## Immediately after launch

### 6. Favicon and Open Graph tags
- **Built:** favicon and apple icon, web manifest, a 1200×630 share image, title, description and canonical on every page.
- **You:** set `NEXT_PUBLIC_SITE_URL` to the real domain, deploy, then paste the homepage into WhatsApp and the Facebook
  Sharing Debugger to confirm the preview.

### 7. XML sitemap
- **Built:** `/sitemap.xml` (all pages and category pages) and `/robots.txt` pointing to it.

### 8. Google Search Console
- **You:** add your domain at search.google.com/search-console and verify it. Easiest: DNS TXT record at your domain
  provider. Or set `GOOGLE_SITE_VERIFICATION` (the meta-tag code) in Vercel and redeploy. Then submit
  `https://your-domain/sitemap.xml`.

### 9. Google Analytics
- **Built:** GA4 behind a consent banner (Accept / Decline) with a "Cookie settings" link in the footer. Nothing loads and
  no banner shows until `NEXT_PUBLIC_GA_ID` is set.
- **You:** create a GA4 property, copy the Measurement ID (`G-XXXXXXXXXX`), add it as `NEXT_PUBLIC_GA_ID` in Vercel and
  redeploy. Consider a short privacy page describing the data the form and analytics collect.

### 10. Broken links and speed check
- **Verified:** crawled every internal link (no broken links), all optimised images load. Lighthouse (simulated slow mobile):
  accessibility, best practices and SEO 100; no layout shift; performance 76–80 on mobile and about 87 on desktop. The
  intro delays the largest-paint measurement on a first visit, so the real-world score is usually higher.
- **You:** after deploying, run PageSpeed Insights on the live URL, and replace the stand-in photographs with properly
  exported originals (see ASSET-GUIDE.md); image quality and size have the biggest effect on speed.

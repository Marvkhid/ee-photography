# Asset guide

Every image the website expects, where it lives and how large it should be. All paths are relative to `public/`.

**How quality works:** the site serves each photo through Next.js image optimisation (AVIF/WebP, responsive sizes, quality 90). It can only be as sharp as the file you supply, so export **originals, not WhatsApp or screenshot copies**, and keep the long edge at 2400 px or more. Never upscale a small file.

**Current files are stand-ins.** They were extracted from the supplied sample PDF (about 1000–2500 px) so the site looks complete from day one. Replace each with the full-resolution original using the same filename. The Graduations, Headshots and Events categories currently use stand-in portraits, so replace them with genuine photographs of those occasions (or remove the category) before launch.

**Adding a photograph:** put the file in the right folder, then add one line in `src/data/photos.ts`. To remove one, delete the line. A missing file never breaks a page: a dark placeholder is shown instead.

| File | Purpose | Recommended | Current size |
| --- | --- | --- | --- |
| `images/brand/logo-white.png` | Logo in header, footer and intro | Transparent PNG (or SVG), at least 1200 px wide | 838×498 |
| `images/intro/tile-01.jpg` | Intro mosaic tile 1 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-02.jpg` | Intro mosaic tile 2 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-03.jpg` | Intro mosaic tile 3 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-04.jpg` | Intro mosaic tile 4 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-05.jpg` | Intro mosaic tile 5 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-06.jpg` | Intro mosaic tile 6 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-07.jpg` | Intro mosaic tile 7 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-08.jpg` | Intro mosaic tile 8 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-09.jpg` | Intro mosaic tile 9 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-10.jpg` | Intro mosaic tile 10 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-11.jpg` | Intro mosaic tile 11 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-12.jpg` | Intro mosaic tile 12 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-13.jpg` | Intro mosaic tile 13 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-14.jpg` | Intro mosaic tile 14 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-15.jpg` | Intro mosaic tile 15 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-16.jpg` | Intro mosaic tile 16 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-17.jpg` | Intro mosaic tile 17 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/intro/tile-18.jpg` | Intro mosaic tile 18 of 18 (cut into the letters E & E) | Landscape crop 3:2 (about 1.55:1), 1200×775 minimum, high contrast, subject kept central | 720×464 |
| `images/hero/hero-left.jpg` | Hero left "doorway" panel | Tall 9:16, 1000×1800, subject in upper two thirds | 934×1400 |
| `images/hero/hero-right.jpg` | Hero right "doorway" panel | Tall 9:16, 1000×1800, subject in upper two thirds | 933×1400 |
| `images/hero/hero-main.jpg` | Main homepage photograph and default social-share image | Landscape 3:2, 2400×1600 (shared as 1200×630) | 1037×1556 |
| `images/about/about-main.jpg` | Photographer portrait: home About preview and About page | Portrait 4:5 or 2:3, 1600×2000 minimum, subject facing into warm light | 1200×1800 |
| `images/about/about-02.jpg` | About page photo strip, left | Portrait 2:3, 1400×2100 | 933×1400 |
| `images/about/about-03.jpg` | About page photo strip, middle; Why E&E image alt source | Portrait 2:3, 1400×2100 | 933×1400 |
| `images/about/about-04.jpg` | About page photo strip, right; Why E&E image | Portrait 2:3, 1400×2100 | 933×1400 |
| `images/featured/featured-01.jpg` | "Moments That Matter" carousel photograph 1 of 7 | Portrait 2:3, 1100×1650 minimum | 733×1100 |
| `images/featured/featured-02.jpg` | "Moments That Matter" carousel photograph 2 of 7 | Portrait 2:3, 1100×1650 minimum | 733×1100 |
| `images/featured/featured-03.jpg` | "Moments That Matter" carousel photograph 3 of 7 | Portrait 2:3, 1100×1650 minimum | 733×1100 |
| `images/featured/featured-04.jpg` | "Moments That Matter" carousel photograph 4 of 7 | Portrait 2:3, 1100×1650 minimum | 734×1100 |
| `images/featured/featured-05.jpg` | "Moments That Matter" carousel photograph 5 of 7 | Portrait 2:3, 1100×1650 minimum | 733×1100 |
| `images/featured/featured-06.jpg` | "Moments That Matter" carousel photograph 6 of 7 | Portrait 2:3, 1100×1650 minimum | 734×1100 |
| `images/featured/featured-07.jpg` | "Moments That Matter" carousel photograph 7 of 7 | Portrait 2:3, 1100×1650 minimum | 733×1100 |
| `images/projects/project-01.jpg` | Featured project cover 1 | Portrait 3:4 or 2:3, 1400×1900 | 933×1400 |
| `images/projects/project-02.jpg` | Featured project cover 2 | Portrait 3:4 or 2:3, 1400×1900 | 933×1400 |
| `images/projects/project-03.jpg` | Featured project cover 3 | Portrait 3:4 or 2:3, 1400×1900 | 1400×933 |
| `images/services/portraits.jpg` | Portraits cover: service cards, category hero, covers | Landscape 3:2 and portrait both crop from it; supply 2400×1600, subject centred | 1067×1600 |
| `images/services/weddings.jpg` | Weddings cover: service cards, category hero, covers | Landscape 3:2 and portrait both crop from it; supply 2400×1600, subject centred | 1037×1556 |
| `images/services/birthdays.jpg` | Birthdays cover: service cards, category hero, covers | Landscape 3:2 and portrait both crop from it; supply 2400×1600, subject centred | 1600×1067 |
| `images/services/graduations.jpg` | Graduations cover: service cards, category hero, covers | Landscape 3:2 and portrait both crop from it; supply 2400×1600, subject centred | 917×1354 |
| `images/services/headshots.jpg` | Headshots cover: service cards, category hero, covers | Landscape 3:2 and portrait both crop from it; supply 2400×1600, subject centred | 1037×1556 |
| `images/services/events.jpg` | Events cover: service cards, category hero, covers | Landscape 3:2 and portrait both crop from it; supply 2400×1600, subject centred | 1067×1600 |
| `images/testimonials/featured.jpg` | Featured testimonial image (replace with the client who gave the quote) | Portrait 4:5, 1400×1750 | 933×1400 |
| `images/contact/contact-01.jpg` | Contact image (reserved) | Landscape 3:2, 1600×1067 | 934×1400 |
| `images/video-posters/interlude.jpg` | Poster still for the "interlude" video loop | Match the video framing, 1920×1080 (or 1080×1350) | 1800×1200 |
| `images/video-posters/story.jpg` | Poster still for the "story" video loop | Match the video framing, 1920×1080 (or 1080×1350) | 1201×1800 |
| `images/video-posters/weddings.jpg` | Poster still for the "weddings" video loop | Match the video framing, 1920×1080 (or 1080×1350) | 1037×1556 |
| `images/video-posters/process.jpg` | Poster still for the "process" video loop | Match the video framing, 1920×1080 (or 1080×1350) | 1095×1642 |
| `images/video-posters/contact.jpg` | Poster still for the "contact" video loop | Match the video framing, 1920×1080 (or 1080×1350) | 1201×1800 |
| `images/gallery/weddings/wedding-01.jpg` | Weddings gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/weddings/wedding-02.jpg` | Weddings gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/weddings/wedding-03.jpg` | Weddings gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1800×1200 |
| `images/gallery/weddings/wedding-04.jpg` | Weddings gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1321×1800 |
| `images/gallery/weddings/wedding-05.jpg` | Weddings gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1191×1800 |
| `images/gallery/portraits/portrait-01.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1200×1800 |
| `images/gallery/portraits/portrait-02.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1200×1800 |
| `images/gallery/portraits/portrait-03.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1201×1800 |
| `images/gallery/portraits/portrait-04.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1200×1800 |
| `images/gallery/portraits/portrait-05.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1090×1602 |
| `images/gallery/portraits/portrait-06.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/portraits/portrait-07.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1095×1592 |
| `images/gallery/portraits/portrait-08.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/portraits/portrait-09.jpg` | Portraits gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/birthdays/birthday-01.jpg` | Birthdays gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1800×1200 |
| `images/gallery/birthdays/birthday-02.jpg` | Birthdays gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/birthdays/birthday-03.jpg` | Birthdays gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/birthdays/birthday-04.jpg` | Birthdays gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1095×1642 |
| `images/gallery/birthdays/birthday-05.jpg` | Birthdays gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1012×1480 |
| `images/gallery/birthdays/birthday-06.jpg` | Birthdays gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1095×1642 |
| `images/gallery/graduations/graduation-01.jpg` | Graduations gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 917×1354 |
| `images/gallery/graduations/graduation-02.jpg` | Graduations gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/headshots/headshot-01.jpg` | Headshots gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/headshots/headshot-02.jpg` | Headshots gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/headshots/headshot-03.jpg` | Headshots gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/events/event-01.jpg` | Events gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1095×1642 |
| `images/gallery/events/event-02.jpg` | Events gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |
| `images/gallery/events/event-03.jpg` | Events gallery photograph | Long edge at least 2400 px, sRGB JPEG quality 85–90; any aspect ratio | 1037×1556 |

## Video loops

See `public/videos/README.md` for the five loop slots (`interlude`, `story`, `weddings`, `process`, `contact`).

## Optional extras

- `images/gallery/food/` exists for a future Food category (add it in `src/data/categories.ts` and `src/data/photos.ts` first).
- Camera/lens photography for a textured contact background is not used yet; if you supply some, add it to `images/contact/` and use it in `src/app/contact/page.tsx`.

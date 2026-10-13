# Local search and Google Business Profile

The website already tells Google who E&E Photography is (structured data in the page: business name, phone, email,
Instagram, the three services, FAQ and breadcrumbs). Showing up in Google Maps and "photographer near me" searches also
needs a **Google Business Profile**, which only the owner can create.

## Do this once (about 30 minutes)

1. Go to business.google.com and sign in with `photographyee9@gmail.com`.
2. **Add the business:** name exactly `E&E Photography` (same as the site).
3. **Business type:** if clients are visited or shot at their locations, choose *service-area business* and list the
   cities served. Only add a street address if clients can really visit it; Google may require verification either way.
4. **Category:** primary `Photographer`; add `Wedding photographer`, `Portrait studio` or similar only if they apply.
5. **Contact details:** phone `+234 901 744 4836`, website = the live site, and the same email.
6. **Verify** with whichever method Google offers (postcard, phone, email or video).
7. **Add real photographs** (the best gallery pictures), a short description and the services list.
8. **Reviews:** after the first real clients, share the profile's review link with them. Genuine Google reviews can later
   replace the placeholder testimonials on the site.

## Keep everything consistent

Name, phone number and website must match exactly on the site, Instagram and the Business Profile.

## Connect the site to the profile

Once the service area is confirmed, add the cities to `serviceArea` in `src/config/brand.ts`, for example
`serviceArea: ['Lagos', 'Abuja']`. They then appear in the site's structured data. Only list places that are genuinely
served; nothing about location has been invented.

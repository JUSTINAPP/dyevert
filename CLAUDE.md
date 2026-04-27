# POSTCODE COLOUR — PROJECT REFERENCE
## dyevert.com

This file contains the full tech stack, credentials summary and project context
for the Postcode Colour website. Save this into the root of the dyevert project folder.

---

## WEBSITE

| Item | Detail |
|------|--------|
| URL | dyevert.com |
| Framework | Next.js 16 + Tailwind CSS |
| Language | TypeScript |
| Hosting | Vercel |
| Repo | github.com/JUSTINAPP/dyevert |
| Local dev | localhost:3456 |
| Local command | npm run dev |

---

## DATABASE

| Item | Detail |
|------|--------|
| Provider | Supabase |
| Project | Shared with organic-tea-dashboard |
| Project ref | bvcmoiimszfrgsnpdats |
| URL | https://bvcmoiimszfrgsnpdats.supabase.co |
| Tables | swatches, kit_requests |

### swatches table columns
- id, postcode, plant_material, plant_part, collection_location
- quantity, season, participant_name, observations
- image_url, hex_colour, submitted_at

### kit_requests table columns
- id, name, address, postcode, email, requested_at, fulfilled

---

## DOMAIN

| Item | Detail |
|------|--------|
| Registrar | GoDaddy |
| A record | 216.198.79.1 (Vercel) |
| CNAME (www) | cname.vercel-dns.com |

---

## EMAIL

| Item | Detail |
|------|--------|
| Kit requests send to | jojofowles@gmail.com |
| SMTP provider | Gmail |
| Auth | Gmail App Password |

---

## ADMIN PANEL

| Item | Detail |
|------|--------|
| URL | dyevert.com/admin |
| Password | dyevert2026 (change before public launch) |
| Function | Upload swatch photos and record card data to Supabase |
| Image storage | Supabase storage bucket: swatches |

---

## ENVIRONMENT VARIABLES
Stored in two places: .env.local (local) and Vercel dashboard (production)

```
NEXT_PUBLIC_SUPABASE_URL=https://bvcmoiimszfrgsnpdats.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=dyevert2026
SMTP_HOST=smtp.gmail.com
SMTP_USER=jojofowles@gmail.com
SMTP_PASS=your-16-char-app-password
```

---

## SITE STRUCTURE

```
src/
  app/
    page.tsx              — Homepage with dot grid hero
    artwork/page.tsx      — Filterable swatch grid
    request-a-kit/page.tsx — Kit request form
    foraging-guide/page.tsx — Foraging guide
    project/page.tsx      — About + Jo's bio
    admin/page.tsx        — Password protected upload panel
    api/request-kit/      — Email API route
  components/
    Nav.tsx               — Shared navigation
    Footer.tsx            — Acknowledgment of country
  lib/
    supabase.ts           — Supabase client
```

---

## SOCIAL

| Platform | Handle |
|----------|--------|
| Instagram | @dyevertlab |
| Instagram | @joannafowles |
| Website | joannafowles.com |

---

## PRINT COLLATERAL

| Document | Format | Notes |
|----------|--------|-------|
| Swatch kit booklet | A4 landscape, 2 sheets | Print duplex, flip short edge, fold |
| Record card | A4 landscape | Two A5 portrait cards, cut down centre |
| Poster | A3 portrait | HTML file, open in Chrome, print to PDF |
| ATW pack | PDF | All documents combined |

---

## PHYSICAL ARCHIVE SYSTEM

When swatches arrive back from participants:
1. Stamp swatch number on fabric using consecutive number stamp
2. Write same number on record card in SWATCH NUMBER field
3. Cut swatch in half
4. Archive half: attach to record card, file by swatch number
5. Wall half: mount on card, label with postcode and swatch number
6. Photograph wall half, name file: swatch-[number]-[postcode].jpg
7. Upload via dyevert.com/admin

---

## PROJECT CONTEXT

Postcode Colour is a collaborative artwork by Joanna Fowles that maps
the hidden colour of place. Participants forage plant material from their
local postcode and use it to dye a fabric swatch. Each returned swatch
is cut to reveal two colour dots. One joins a growing wall of colour.
The other is archived in the Postcode Colour record book.

First shown at Australian Tapestry Workshop during Melbourne Design Week 2026.
Ambition: a nationwide map of colour from every postcode in Australia.

dyevert.com is the broader platform. Postcode Colour is one project within it.
Future URL structure: dyevert.com/postcodecolour

---

*Last updated: Melbourne Design Week 2026*
*Built with Claude — claude.ai*

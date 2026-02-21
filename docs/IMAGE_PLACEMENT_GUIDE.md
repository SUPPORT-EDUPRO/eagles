# Image Placement Guide – Young Eagles Marketing

This document describes where each preschool photo is used and the marketing intent.

## Source

- **Origin:** Photos from `~/Pictures` (WhatsApp exports from the preschool).
- **In project:** Copied to `public/campus/` as `campus-1.jpeg` … `campus-10.jpeg`.

## Placement and intent

| File | Where used | Marketing intent |
|------|------------|------------------|
| **campus-1.jpeg** | Hero background (`ProductionHome.jsx`), Gallery | Inviting hallway with outdoor play; first impression and trust. |
| **campus-2.jpeg** | Gallery | Uniform/branding; professionalism and identity. |
| **campus-3.jpeg** | Gallery | Safe, bright corridors; safety and facilities. |
| **campus-4.jpeg** | Home “Our Campus” + Gallery | Group activity in the hall; learning together and supervision. |
| **campus-5.jpeg** | Home “Our Campus” + Gallery | Learners in uniform; daily life and community. |
| **campus-6.jpeg** | Home “Our Campus” + Gallery | Patio/events; celebrations and social experiences. |
| **campus-7.jpeg** | Gallery | Clean, connected spaces; campus quality. |
| **campus-8–10.jpeg** | Gallery | Extra campus life; depth and authenticity. |

## Pages

- **Home (`ProductionHome.jsx`)**  
  - Hero: `campus-1.jpeg` with blue overlay.  
  - “Our Campus”: three cards using `campus-4`, `campus-6`, `campus-5` with benefit-led captions and a “View full gallery” CTA.

- **Gallery (`Gallery.jsx`)**  
  - All 10 campus images in a grid with real `<img>` tags, captions, and hover overlays for SEO and clarity.

## Swapping or adding images

1. Replace files in `public/campus/` (keep names or update references in `ProductionHome.jsx` and `Gallery.jsx`).
2. To change the hero image, update the `backgroundImage` `url(...)` in the hero section to the desired `campus-N.jpeg`.
3. To change “Our Campus” cards, edit the three `src` and caption blocks in the “Our Campus” section.

## Best practices

- Use descriptive `alt` text (e.g. “Group activity in the hall at Young Eagles”) for accessibility and SEO.
- Keep hero overlay opacity so text stays readable.
- Gallery uses `loading="eager"` for the first 6 images and `loading="lazy"` for the rest for performance.

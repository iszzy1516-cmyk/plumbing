# Plumbing site: design direction

The same clean, Google-product-page style as the Chef A restaurant site, with its own copy, photos and accent colour.

## Colour

| Name | Hex | Use |
| --- | --- | --- |
| Ink | `#1F1F1F` | Headings and running text |
| Soft ink | `#49525A` | Supporting text |
| Water blue | `#0B5C94` | The one action colour. Blue reads as water and as dependable |
| Blue soft | `#E1F0FA` | Second buttons, open FAQ, notices |
| Surface | `#F2F5F7` | Form, FAQ and tiles. The footer is a full field of water blue |

## Type and shape

- Google Sans throughout, in weights 400 and 500.
- Headings from 44 to 96px on the hero, with tight tracking.
- Cards use a 20 to 32px radius, buttons are full pills and fields use 16px.

## Motion

| Moment | Tool | Timing |
| --- | --- | --- |
| Hero text rises in, and the picture in the headline opens like a shutter | CSS | 0.5s to 0.8s, staggered |
| Hero picture grows to full width | GSAP ScrollTrigger, scrubbed | Scroll-linked |
| Headings reveal line by line | GSAP SplitText | 0.7s |
| Tiles, rows and pictures reveal on scroll | CSS scroll-driven animation | Scroll-linked |
| Active pills slide on the home picker, Services and the quote form | Motion layout animation | 0.4s spring |
| Page changes | CSS | 0.35s |
| Smooth scrolling | Lenis, synced to ScrollTrigger | 0.9s |
| Press feedback | CSS | 0.15s, scale 0.97 |

## Differences from the restaurant site

- A call bar is fixed to the bottom of phones and tablets, because someone with a leak wants to ring, not browse.
- There's no gallery, because stock photos on a gallery page would look like the business's own jobs.
- There's no cookie banner, because the site sets no cookies.
- Reviews and accreditations stay hidden until real ones are added to `site.ts`.

## Keeping it from looking AI-made

The owner rejected the first version's templated details, so these stay out:

- Numbered steps or cards. Order is shown by position and by the words.
- A circle or icon logo. The logo is the business name, set in type.
- A small pill or label above a heading.
- Icons on top of cards, tick lists and rows of identical tiles.
- Several pastel tints. Blue, its soft tint and one grey surface do all the work.
- Neon-lit or otherwise artificial-looking stock photos.

The home headline holds a small moving picture of running water, the "What's gone wrong?" picker replaces the carousel, and the phone number is the footer's headline.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui on Radix (fully restyled), Motion, GSAP with ScrollTrigger and SplitText, Lenis, lucide-react. Frontend only, with no backend, database, API or auth.

## Users

Homeowners and tenants in the UK with a plumbing problem, often on a phone and sometimes in a hurry. They want to know whether the business can help, what it'll cost and how to reach it.

## Product Purpose

The website for a UK plumbing business. It exists to turn a visitor into a phone call or a quote request.

## Capabilities and Constraints

- The quote and booking form is one frontend-only component that sends nothing, and it says so when submitted.
- All business details live in `src/config/site/site.ts`. Links without a real destination stay `href="#"` with a TODO comment.
- Undecided: the business name, area, services, phone, email, hours and whether it takes emergency call-outs.

## Brand Commitments

- Voice: plain, practical and a little dry. Written in en-GB.

## Evidence on Hand

- Photographs are free-licence Unsplash stand-ins listed in `CREDITS.md`, and do not show the business.
- No real reviews, accreditations, team, history or prices exist. Never present invented ones as real.
- Gas and boiler work is not offered, because it legally requires Gas Safe registration.

## Product Principles

1. Calling is always one tap away.
2. Be useful even before someone gets in touch, such as the stopcock advice.
3. Make no claim the business hasn't confirmed.
4. Motion never hides content or delays a phone call.

## Accessibility & Inclusion

The site respects reduced-motion settings and works by keyboard. Targets are Lighthouse accessibility 95 or higher.

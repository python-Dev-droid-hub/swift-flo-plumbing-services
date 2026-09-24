# Swift Flo Plumbing Services

Premium marketing site for Swift Flo Plumbing Services — Next.js, React Three Fiber, GSAP, and Lenis.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- React Three Fiber + Three.js + Drei
- GSAP + ScrollTrigger + `@gsap/react`
- Lenis smooth scroll
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
  app/                  # Next.js routes + global styles
  components/
    layout/             # Header, Footer, Container, Section, Providers
    sections/           # Homepage sections (Hero scaffold first)
    three/              # Isolated R3F canvases & scenes
    ui/                 # Buttons, typography, links
    animations/         # Reveal, FadeIn
  lib/
    animations/         # GSAP helpers, easings, reduced-motion
    constants/          # Site copy, navigation
    utils/              # cn() and shared helpers
  hooks/                # Media query, reduced-motion
public/
  models/ textures/ images/
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

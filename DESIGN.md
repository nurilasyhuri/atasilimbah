# DESIGN.md

## Direction
Industrial machinery manufacturer and thermal engineering company profile, directly modeled after the visual rigor, clarity, and conversion flow of mscscaffolding.com:
- Full-bleed dark hero with real equipment photography under an atmospheric gradient vignette.
- High-contrast dual-tone typography: bold white headers paired with vivid industrial orange (`#EA580c` / `#F97316`) accent lines.
- Clean floating glass header with top utility bar (`Workshop: Solo & Klaten · Standar Baku Mutu KLHK` + hotline).
- 3-column image card layout for primary services (`Layanan Utama`) with hover micro-interactions and circular arrow pills.
- 4-step horizontal workflow cards with bold orange numbering (`01`, `02`, `03`, `04`) on soft slate-50 backgrounds.
- High-contrast dark engineering & safety section with regulatory compliance checklist (KLHK P.70/2016, SNI 8455:2017) and technical parameters.
- 2-column physical workshop depot cards (`Solo` & `Klaten`) with map links and contact actions.
- Closing consultation section featuring real lead engineer / technical consultant portrait and direct WhatsApp procurement CTA.
- 4-column industrial dark slate footer with complete company credentials, workshop addresses, and compliance badges.

- Photo style: Authentic workshop fabrication photos, heavy dual-chamber furnaces, refractory brick lining, cyclone ducting, and on-site client installations. No generic 3D stock graphics or unverified mockups.
- Motion profile: Crisp, snappy 150-200ms transitions (`cubic-bezier(0.16, 1, 0.3, 1)`). Full degradation under `prefers-reduced-motion`.
- 3 Won't Do:
  1. No distracting floating chat widgets, popup modals, or spammy button clusters (strictly 1 primary action per section).
  2. No generic AI-slop graphics, glowing radial blobs, or ungrounded claims ("Zero emission", "100% bebas asap").
  3. No competing nested cards or ambiguous navigation menus.

## Tokens

### Colour
- Canvas Dark: `#020617` (Slate-950, hero, safety section, workshop cards, footer)
- Surface Dark Slate: `#0F172A` (Slate-900, elevated cards on dark canvas)
- Brand Accent Orange: `#EA580C` / `#F97316` (Primary action buttons, overlines, highlight headlines)
- Safety Accent Emerald: `#10B981` / `#059669` (Emissions compliance, K3 tags, verified badges)
- Canvas White: `#FFFFFF` (Primary page background for services, documentation, and specs)
- Soft Surface Neutral: `#F8FAFC` (Slate-50, alternating workflow steps and secondary cards)
- Text Dark Slate: `#020617` (Primary high-contrast body text on light surfaces)
- Text Muted Slate: `#64748B` (Secondary metadata, captions on light surfaces)
- Text White: `#FFFFFF` (Headings on dark canvas)
- Text Slate Muted: `#94A3B8` (Descriptions and secondary metadata on dark canvas)
- Border Light: `#E2E8F0` / `#F1F5F9` (Clean tabular borders and dividers on light canvas)
- Border Dark: `#1E293B` / `rgba(255, 255, 255, 0.1)` (Subtle borders on dark canvas)

### Type
- Heading Family: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (Bold industrial typography, dual-tone punchy headlines)
- Body Family: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (Crisp legibility matching mscscaffolding.com)
- Technical Data Family: `'IBM Plex Sans', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` (Precise tabular data, spec sheets, engineering units)
- Scale:
  - Hero H1: clamp(2.25rem, 5vw, 3.5rem)
  - Section H2: clamp(1.75rem, 3.5vw, 2.5rem)
  - Subsection H3: 1.25rem - 1.5rem
  - Body: 1rem (16px) with 1.625 line-height
  - Small / Technical: 0.875rem (14px) / 0.75rem (12px minimum)

### Radius
- Base Container Radius: `1rem` (16px) or `1.5rem` (24px) for cards, matching MSC Scaffolding's `rounded-2xl`.
- Badges & Action Buttons: `rounded-full`.

### Spacing
- Base Unit: 4px / 8px system.
- Section Padding: `py-16` (64px) to `py-24` (96px) on desktop, `py-12` on mobile.
- Section Transitions: Alternating contrast `#020617` (Hero) -> `#FFFFFF` (Layanan) -> `#F8FAFC` (Alur Kerja) -> `#FFFFFF` (Katalog) -> `#020617` (Regulasi & Emisi) -> `#FFFFFF` (Fasilitas & Konsultasi) -> `#020617` (Footer).

### Motion
- Transition duration: 150ms - 200ms.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Reduced Motion: `@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`.

## Allow
allow: first-viewport-words — Industrial B2B landing pages with comprehensive engineering specs and model descriptions need precise context above the fold.
allow: hero-height — Full-bleed industrial equipment hero showcase with technical stats bar.
allow: body-size — High-density tabular technical specs and engineering parameters require compact legible typography for comparison tables.
allow: primary-actions — B2B machinery procurement landing with header quotation request and hero technical consultation.
allow: h1-length — Dual-tone high-impact industrial hero title with primary product line and environmental solution statement.

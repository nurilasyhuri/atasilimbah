# PRD: AtasiLimbah (atasilimbah.com) - Incinerator Manufacturer Website

## Overview
AtasiLimbah is an Indonesian B2B engineering and manufacturing brand for waste incineration systems and thermal waste processing technology. The website atasilimbah.com serves as the official corporate profile, technical product catalog, and qualified B2B lead generation engine. It addresses institutions, commercial facilities, industrial plants, and licensed waste handlers seeking verified, technically sound waste volume reduction and thermal management solutions compliant with Indonesian operational standards.

## Users and current workaround
| Role | Job to be done | Current workaround | Evidence status |
|---|---|---|---|
| Institutional / Commercial Facility Manager (Pesantren, Campus, Hotel, Market) | Solve accumulating unmanaged municipal/organic/dry waste locally without open burning | Waste dumped into illegal open pits, paid offsite hauling with irregular pickups, or unverified open-flame burning | Observed from brief & industry practice |
| Industrial Plant EHS / Operations Lead | Evaluate compliant on-site thermal reduction for non-hazardous industrial solid waste | High transport logistics cost to central waste dumps; unverified incinerator suppliers with zero technical specs | Observed from brief |
| B2B Procurement / Estimator | Assess technical viability, furnace specs, fuel consumption, emission controls, and request quotation (RFQ) | Calling random informal workshop brokers via marketplace with no engineering data or emission control details | Observed from brief |

First-use journey: Landing (Home/Category) -> Evaluate suitability & technical parameters (Dry / Wet / B3 / Custom) -> Review machine specs & engineering principles -> Submit structured RFQ or initiate technical WhatsApp consultation -> Official review & quotation handover.

## Product, Audience, and Market Context
- Scope: Indonesia B2B market (national footprint with workshop & logistics reach).
- Language: Indonesian (Bahasa Indonesia) for all user-facing content, UI, and technical specs; clean professional engineering register.
- Device profile: Mobile-first responsive (procurement/field operators accessing via mobile WhatsApp and tablets) and desktop (detailed spec sheet analysis, PDF downloads, and procurement comparisons).
- Trust & Compliance context: Indonesian environmental and industrial norms. Strict avoidance of unrealistic environmental greenwashing claims ("Zero emission", "100% ramah lingkungan", "tanpa asap sama sekali"); transparent disclosure of fuel requirements, pre-treatment needs (for wet waste), and regulatory boundaries for hazardous (B3) waste.

## Goals
- Establish AtasiLimbah as a credible, specialized Indonesian incinerator manufacturer with transparent technical documentation.
- Enable potential B2B buyers to self-select appropriate incinerator categories (Dry waste, Wet waste with pre-treatment, Specific B3, Custom) based on waste characteristics and volume.
- Generate qualified RFQ (Request for Quotation) leads containing actionable procurement data (waste type, daily volume, location, operation hours).
- Achieve high organic visibility for high-intent Indonesian commercial waste queries ("mesin incinerator", "produsen mesin incinerator", "jual mesin incinerator", "incinerator sampah kering/basah").

## Success measure
- Qualified RFQ lead submission rate >= 3.5% of total product detail page sessions within 60 days of launch.
- 100% compliance with non-slop design invariants: zero fake testimonials, zero unverified claims, zero contact spam.
- Perfect Lighthouse performance score >= 95, SEO score = 100, and 100% passing rate on `dotuiux check` and SEO validation checks (`check-seo.mjs`).

## Non-Goals
- E-commerce cart, online checkout, or instant automated pricing (incinerator systems require engineering evaluation, site assessment, and formal quotations).
- False or exaggerated marketing claims ("Zero Emission", "Bebas polusi 100%", "Semua limbah B3 bisa dibakar").
- Automated public licensing or permitting issuance for B3 waste processing (B3 legal compliance remains the customer's / facility's legal obligation).
- Intrusive floating widgets, WhatsApp popups, or aggressive auto-chat overlays that violate user experience invariants.

## Core features
| Feature | Priority | User benefit | Requirements |
|---|---|---|---|
| Technical Product Catalog | Must | View 4 distinct categories and detailed specification tables for each machine model | REQ-001, REQ-002, REQ-003 |
| Comprehensive B2B RFQ Form | Must | Submit detailed project parameters to receive accurate engineering quotation | REQ-004, REQ-005 |
| Sectoral Solution Guides | Should | Understand specific configurations for institutions, commercial facilities, and industry | REQ-006 |
| Engineering Knowledge Base & FAQ | Should | Educate buyers on combustion stages, emission controls, wet waste pre-treatment, and operational costs | REQ-007, REQ-008 |
| Fabrication & Project Evidence Gallery | Should | Review real workshop documentation, chamber fabrication, and verified deployments | REQ-009 |
| SEO & Structured Metadata Engine | Must | Rank for primary B2B keywords with compliant meta titles (55-70 chars) and descriptions (120-155 chars) | REQ-010, REQ-011 |

## Requirements

### Product & Technical Information
- **REQ-001** (Must, ubiquitous) The system shall present 4 primary incinerator categories: Incinerator Sampah Kering, Incinerator Sampah Basah, Incinerator Limbah B3, and Custom Incinerator System.
  - Acceptance: Given any visitor, When accessing the navigation or product index, Then all 4 distinct categories are accessible with clear functional boundaries.
- **REQ-002** (Must, ubiquitous) The system shall display structured technical specification tables for every machine model detailing nominal capacity, tested capacity, supported waste types, dimensions, construction materials, combustion system, fuel type/consumption, electrical requirements, emission controls, and safety systems.
  - Acceptance: Given a product detail page, When rendered, Then all required specification fields are clearly presented with tabular alignment and units.
- **REQ-003** (Must, state) While displaying Incinerator Limbah B3 or Incinerator Sampah Basah, the system shall display prominent technical prerequisite notices regarding pre-treatment/drying limits (wet waste) and environmental licensing/testing verification requirements (B3 waste).
  - Acceptance: Given a visitor on the B3 or Wet waste page, When inspecting the specifications, Then the official technical boundary disclaimer is explicitly rendered.

### Lead Generation & RFQ
- **REQ-004** (Must, event) When a user submits the Request for Quotation (RFQ) form with valid parameters (full name, institution/company, WhatsApp number, email, project location, machine type, waste type, and volume), the system shall validate the fields, confirm submission to the user, and deliver the structured lead payload.
  - Acceptance: Given valid form inputs, When the user clicks "Kirim Permintaan Penawaran", Then client validation passes, a success confirmation is displayed, and the form resets.
- **REQ-005** (Must, unwanted) If required fields (name, phone, company, waste type, volume) are missing or invalid, then the system shall reject submission, highlight the invalid fields with accessible error messages, and preserve user input.
  - Acceptance: Given an invalid phone format or missing company name, When submitting, Then form submission is prevented and inline error labels are displayed.

### Sector Solutions & Education
- **REQ-006** (Should, ubiquitous) The system shall provide dedicated solution pages for key sectors: Institusi & Pendidikan, Komersial & Kawasan, Industri & Pabrik, and Pengelola Sampah.
- **REQ-007** (Should, ubiquitous) The system shall provide an engineering technology guide explaining primary/secondary combustion chambers, flue gas treatment/scrubbers, ash residue handling, and operational safety.
- **REQ-008** (Should, ubiquitous) The system shall render an FAQ section addressing 7 core procurement questions (in-house production, wet/dry handling, B3 feasibility, capacity sizing, custom fabrication, pricing mechanism, selection steps).
- **REQ-009** (Should, ubiquitous) The system shall display a workshop fabrication and project documentation section using verified, authentic media slots without synthetic claims.

### SEO & Technical Standards
- **REQ-010** (Must, ubiquitous) The system shall render `<title>` tags strictly between 55 and 70 characters including brand suffix (`{Title} - AtasiLimbah`), meta descriptions between 120 and 155 characters ending with a period, `<meta name="author">`, `<meta name="publisher">`, and valid JSON-LD schema (Organization and Product/Article).
  - Acceptance: Given any generated HTML page, When audited by `scripts/check-seo.mjs`, Then all title lengths, meta descriptions, and author tags satisfy the invariant.
- **REQ-011** (Must, ubiquitous) The system shall adhere strictly to zero contact-CTA spam: at most one consultation contact button per page placed after primary content, no floating WhatsApp buttons, no header/hero WhatsApp spam, and plain contact text in the footer.
  - Acceptance: Given any rendered page, When audited by `dotuiux check`, Then `contact-count`, `contact-placement`, and `floating-widget` gates pass with 0 fails.

## Quality Attributes
| Attribute | Target | Enforcing Check |
|---|---|---|
| Performance | Lighthouse Perf >= 95, LCP <= 2.0s | `astro build && npx lighthouse` / Chrome DevTools |
| Accessibility | WCAG 2.1 AA compliant, color contrast >= 4.5:1 (text) and >= 3:1 (UI components) | `dotuiux check` / contrast check |
| SEO Compliance | Title (55-70 chars), Meta Desc (120-155 chars), WebP images with keyword ALT (10-125 chars) | `node scripts/check-seo.mjs` |
| Zero Slop | No sparkles, no floating widgets, no fake testimonials, no inflated pill badges | `dotuiux check` |

## Open questions
- None blocking Phase 1 core build. Real workshop photos and video assets will be linked into `/public/images/` slots; placeholder illustrations remain cleanly labelled as production schematics.

## Stack & Constraints
- Framework: Astro 5 (Static Site Generation / Islands architecture)
- Styling: Tailwind CSS
- Data & Content: Astro Content Collections (Markdown/YAML schemas for products, solutions, articles)
- Deployment Target: Cloudflare Pages / Static CDN
- Icons: Inline Lucide SVG (one stroke weight, `aria-hidden`, `currentColor`)
- Color Palette: Dark Green (`#123F35`), Steel Blue (`#263C48`), Accent Gold (`#D5AD62` on dark / Amber `#D97706` on light for contrast compliance), Soft Background (`#F3F5F2`), Text Dark (`#1E2926`).
- Typography: Plus Jakarta Sans (Headings), Inter (Body), IBM Plex Sans (Technical specs).

## Technical Decisions
- **Decision:** Use Astro 5 with Content Collections and static generation.
  **Why:** Ultra-fast load times, zero client JS bloat for content pages, pristine SEO indexing, optimal Cloudflare Pages static hosting.
  **Consequence:** Forms submit to dedicated endpoints or client mailto/WhatsApp structured payload generator without requiring heavy full-stack server runtimes.
- **Decision:** Strict rejection of floating WhatsApp button in favor of contextual single consultation CTA at the end of product/solution journeys.
  **Why:** Adheres to user global design invariants and passes `dotuiux check` floor gates, maintaining industrial B2B executive credibility.
  **Consequence:** Avoids distracting spam perception, directs serious buyers to structured RFQ or informed WhatsApp handover.

## Milestones
- [ ] Milestone 1 (Foundation): Project scaffold, design tokens, typography, SEO verification harness, and shared layout components.
- [ ] Milestone 2 (Data & Content): Content collections for products (Dry, Wet, B3, Custom), sectoral solutions, and engineering technology articles.
- [ ] Milestone 3 (Core Pages): Homepage (11 sections), Product catalog & detail templates with spec tables, Solutions pages, About Us, Contact & RFQ form.
- [ ] Milestone 4 (Quality & Verification): SEO check (`check-seo.mjs`), `dotuiux check`, WCAG contrast verification, narrow & wide visual audit.
- [ ] Milestone 5 (Handover & Release Readiness): Build verification, Cloudflare Pages configuration, client review.

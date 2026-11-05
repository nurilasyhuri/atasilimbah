# Tasks: AtasiLimbah Incinerator Website

## Rules for the AI
- One task per request. Task state lives in `STATUS.md` and `.delivery/`, not checkboxes.
- Change only `Allowed Paths`. Need something outside them -> stop and ask.
- Respect `AGENTS.md`: YAGNI, native-first, no unrequested abstractions.
- 1 task ≈ 1 commit that passes its own check.

## Pending

### TASK-001: Scaffolding Astro 5 project with Tailwind CSS, Typography, and SEO scripts
- **Requirement:** REQ-010
- **Risk Level:** R1
- **Allowed Paths:** `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `scripts/check-seo.mjs`, `src/styles/global.css`
- **Protected Paths:** None
- **Canonical Contract Owners:** Project infrastructure
- **Accepted Invariants:** Pure Astro 5 static architecture; Tailwind CSS configuration matches brand palette (`#123F35`, `#263C48`, `#D5AD62`, `#F3F5F2`).
- **Depends On:** None
- **Verification:** Done when `npm run build` succeeds and `node scripts/check-seo.mjs` is executable.
- **Reopen Conditions:** Build failure or TypeScript errors.
- **Rollback/Migration State:** Non-destructive scaffold.
- **Non-Scope:** Page layout and content.
- **Escalation Conditions:** Conflicting dependencies or unresolvable build plugin errors.

### TASK-002: Implement Base Layout, SEO Component, Navigation Header, and Company Footer
- **Requirement:** REQ-010 (constraints: REQ-011)
- **Risk Level:** R1
- **Allowed Paths:** `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/SEO.astro`
- **Protected Paths:** None
- **Canonical Contract Owners:** Layout layer
- **Accepted Invariants:** Header contains <= 6 clean menu links; Footer contains contact text and company info; zero floating WhatsApp buttons; title 55-70 chars, meta description 120-155 chars.
- **Depends On:** TASK-001
- **Verification:** Done when BaseLayout renders with valid HTML5 semantics, meta author/publisher tags, and passes header/footer layout structure tests.
- **Reopen Conditions:** Broken navigation or invalid meta tags.
- **Non-Scope:** Content collection data.

### TASK-003: Configure Content Collections for Products, Solutions, and Articles
- **Requirement:** REQ-001
- **Risk Level:** R1
- **Allowed Paths:** `src/content/config.ts`, `src/content/products/*.md`, `src/content/solutions/*.md`, `src/content/articles/*.md`
- **Protected Paths:** None
- **Canonical Contract Owners:** Content schema
- **Accepted Invariants:** Strict Zod schema typing for machine specifications (nominal capacity, tested capacity, waste types, dimensions, fuel, combustion, emissions).
- **Depends On:** TASK-001
- **Verification:** Done when `npx astro check` validates all content markdown files against schemas without schema violation errors.
- **Reopen Conditions:** Zod validation failure on product or solution entries.
- **Non-Scope:** UI rendering.

### TASK-004: Build Homepage with 11 Sections
- **Requirement:** REQ-001 (constraints: REQ-006, REQ-007, REQ-008, REQ-009, REQ-011)
- **Risk Level:** R2
- **Allowed Paths:** `src/pages/index.astro`, `src/components/home/*.astro`
- **Protected Paths:** None
- **Canonical Contract Owners:** Public presentation
- **Accepted Invariants:** Exact 11 sections matching the Master Brief: Hero, Problem statement, 4 Product category cards, Manufacturer advantages, Technology overview, Slashes of Sector solutions, 6-step Production flow, Machine & workshop gallery, Ordering steps, 7 FAQ accordions, and Final consultation CTA. Single consultation CTA at the end of the page.
- **Depends On:** TASK-002, TASK-003
- **Verification:** Done when `npm run build` generates `/index.html` containing all 11 sections with valid HTML and responsive layout.
- **Reopen Conditions:** Missing sections or layout breakage on mobile viewports.
- **Non-Scope:** RFQ form submission logic.

### TASK-005: Build Product Catalog Index and Detail Pages with Technical Specification Tables
- **Requirement:** REQ-002 (constraints: REQ-001, REQ-003)
- **Risk Level:** R2
- **Allowed Paths:** `src/pages/mesin-incinerator/index.astro`, `src/pages/mesin-incinerator/[slug].astro`, `src/components/ProductSpecTable.astro`, `src/components/ProductCard.astro`
- **Protected Paths:** None
- **Canonical Contract Owners:** Product catalog
- **Accepted Invariants:** Structured specification table displaying all technical parameters; prominent regulatory notices on B3 and pre-treatment notices on Wet waste models.
- **Depends On:** TASK-003, TASK-002
- **Verification:** Done when all product detail pages render with complete specification tables and pass static generation tests.
- **Reopen Conditions:** Missing spec fields or unhandled category types.
- **Non-Scope:** Cart or e-commerce transactions.

### TASK-006: Build Category Landing Pages for Dry, Wet, B3, and Custom Systems
- **Requirement:** REQ-001 (constraints: REQ-003)
- **Risk Level:** R1
- **Allowed Paths:** `src/pages/incinerator-sampah-kering.astro`, `src/pages/incinerator-sampah-basah.astro`, `src/pages/incinerator-limbah-b3.astro`, `src/pages/incinerator-custom.astro`
- **Protected Paths:** None
- **Canonical Contract Owners:** Category hubs
- **Accepted Invariants:** Each category page includes dedicated technical guidance, operating parameters, recommended models, and specific CTA.
- **Depends On:** TASK-005
- **Verification:** Done when `/incinerator-sampah-kering`, `/incinerator-sampah-basah`, `/incinerator-limbah-b3`, and `/incinerator-custom` render cleanly with 200 HTTP status during build.
- **Reopen Conditions:** Dead internal links or missing category details.
- **Non-Scope:** External checkout.

### TASK-007: Build Sectoral Solutions Hub and Sector Detail Pages
- **Requirement:** REQ-006
- **Risk Level:** R1
- **Allowed Paths:** `src/pages/solusi-pengolahan-sampah/index.astro`, `src/pages/solusi-sampah-institusi.astro`, `src/pages/solusi-sampah-industri.astro`, `src/pages/solusi-sampah-komersial.astro`
- **Protected Paths:** None
- **Canonical Contract Owners:** Solutions section
- **Accepted Invariants:** Tailored waste analysis and recommended machines for institutions, industry, and commercial facilities.
- **Depends On:** TASK-003, TASK-002
- **Verification:** Done when `/solusi-pengolahan-sampah` and sectoral subpages generate without errors.
- **Reopen Conditions:** Broken routing or missing sector data.
- **Non-Scope:** Custom engineering calculators.

### TASK-008: Build Corporate Information Pages (About Us, Production Process, Technology, Projects, FAQ)
- **Requirement:** REQ-007 (constraints: REQ-008, REQ-009)
- **Risk Level:** R1
- **Allowed Paths:** `src/pages/tentang-kami.astro`, `src/pages/proses-produksi.astro`, `src/pages/teknologi-incinerator.astro`, `src/pages/proyek.astro`, `src/pages/faq.astro`
- **Protected Paths:** None
- **Canonical Contract Owners:** Corporate trust surfaces
- **Accepted Invariants:** Transparent, grounded corporate information without exaggerated claims; factual description of primary/secondary chambers and scrubbers.
- **Depends On:** TASK-002
- **Verification:** Done when all corporate pages build and render with valid headings and clean typography.
- **Reopen Conditions:** Missing core information or inaccurate technical claims.
- **Non-Scope:** Live video streaming.

### TASK-009: Build Structured RFQ and Contact Form with Client Validation
- **Requirement:** REQ-004 (constraints: REQ-005)
- **Risk Level:** R2
- **Allowed Paths:** `src/pages/permintaan-penawaran.astro`, `src/pages/kontak.astro`, `src/components/RfqForm.astro`, `src/components/RfqFormIsland.tsx`
- **Protected Paths:** None
- **Canonical Contract Owners:** Conversion funnel
- **Accepted Invariants:** Captures all 13 fields from the brief; validates required inputs; generates structured WhatsApp consultation payload and confirmation display; honeypot spam protection.
- **Depends On:** TASK-002
- **Verification:** Done when submitting valid inputs triggers confirmation and formatted WhatsApp handover, while invalid inputs display accessible field errors.
- **Reopen Conditions:** Form submit failure or validation bypassing.
- **Non-Scope:** Online payment gateways.

### TASK-010: SEO Verification, Sitemap, Robots.txt, and Automated Audit Harness
- **Requirement:** REQ-010
- **Risk Level:** R1
- **Allowed Paths:** `scripts/check-seo.mjs`, `public/robots.txt`, `astro.config.mjs`
- **Protected Paths:** None
- **Canonical Contract Owners:** SEO engine
- **Accepted Invariants:** Every generated HTML file passes `check-seo.mjs`: title (55-70 chars with ` - ` separator), meta description (120-155 chars ending in period), author/publisher tags, and WebP images with keyword ALT.
- **Depends On:** TASK-004, TASK-005, TASK-006, TASK-007, TASK-008, TASK-009
- **Verification:** Done when `node scripts/check-seo.mjs` completes with exit code 0 across the entire `dist/` directory.
- **Reopen Conditions:** Any SEO invariant violation in build artifacts.
- **Non-Scope:** Off-page backlink tracking.

### TASK-011: UI/UX Quality Gate Verification with dotuiux
- **Requirement:** REQ-011
- **Risk Level:** R1
- **Allowed Paths:** `DESIGN.md`, `design/brief.md`
- **Protected Paths:** None
- **Canonical Contract Owners:** Quality assurance
- **Accepted Invariants:** Zero floating widgets; max 1 contact CTA per page; contrast ratios >= 4.5:1; no AI slop.
- **Depends On:** TASK-010
- **Verification:** Done when `dotuiux check` runs against the built site and reports 0 FAIL gates.
- **Reopen Conditions:** Any failed gate on mobile or desktop viewports.
- **Non-Scope:** User analytics collection.

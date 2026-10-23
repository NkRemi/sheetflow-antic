# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Internal staff at ANTIC (Agence Nationale des Technologies de l'Information et de la
Communication — Cameroon's national ICT agency): finance/planning/program officers who own
long-lived institutional budget-programming workbooks (e.g. "Programmation 2026_2028"), plus
platform administrators who manage accounts and oversight. Not a public or external-client
product — one organization's internal tool. UI is bilingual (French/English).

## Product Purpose

Let ANTIC staff upload, edit, and manage real Excel workbooks entirely in-browser; derive
filtered "child" sheets from one or several parent sheets and keep them in sync as the parent
changes; and generate one-click Word reports from any worksheet — replacing a workflow that
would otherwise mean desktop Excel, manual copy/paste into derived views, and hand-built Word
reports.

## Positioning

Real .xlsx fidelity (formulas, formatting, merges preserved, not reinterpreted) edited
collaboratively in-browser, with two things a plain spreadsheet tool doesn't offer as one
workflow: (1) child sheets derived from a single parent *or combined from multiple parent
sheets*, kept in sync on demand rather than manually rebuilt, and (2) one-click Word report
generation straight from a live worksheet. Excel+email or Google Sheets can't truthfully claim
that combination.

## Operating Context

Single-organization, internal daily-use tool. Real workbooks are large and long-lived (one
observed in testing: 29 sheets, edited over a long period, ~500KB) — editing/saving performance
under that kind of real load has been a recurring, active engineering concern, not a hypothetical
one. Typical session: open a workbook, make cell/structural edits, periodically create or
re-sync a child sheet from one or more parents, convert a sheet to a Word document for
institutional review/reporting. Admins separately manage accounts/oversight via a dedicated
admin area.

## Capabilities and Constraints

- In-browser spreadsheet editing via Univer (formulas, formatting, merges, conditional
  formatting, data validation, autofilter, freeze panes) — Univer owns the live editing surface;
  the backend persists what Univer reports.
- Child-sheet creation from a single parent sheet or combined from multiple parent sheets, via
  filter criteria on the parent(s), with on-demand re-sync.
- One-click conversion of any worksheet to a downloadable Word (.docx) report; a Word Files page
  lists past conversions.
- Workbook/worksheet lifecycle: upload, rename, create/delete/rename sheets.
- Role-gated admin area, separate from the ordinary editing workspace.
- Backend: FastAPI + PostgreSQL + openpyxl. openpyxl has no calculation engine of its own — a
  formula cell's *computed* value can only be sourced from Univer's own live engine at specific
  moments (e.g. at Word-conversion time), not recomputed by the backend itself. This is a real,
  durable technical constraint on how "live values" reach the backend, not an implementation
  detail to redesign around.
- Performance at real-workbook scale (many sheets, heavy formatting, long edit history) is an
  ongoing constraint threaded through the whole system, not just a frontend concern.

## Brand Commitments

ANTIC has a real, existing visual identity — this is a government agency's actual logo, not a
placeholder: `frontend/public/antic_logo.png`, a circular emblem (green-outlined map of
Cameroon, "ANTIC" wordmark in orange/gold, a Cameroon-flag-colored band at the base). Any
redesign should treat this as evidence to work with and respect, not something to redesign away
or treat as a generic logo slot. Specific palette/typography direction is a later (non-init)
design decision, not fixed here.

## Evidence on Hand

- `frontend/public/antic_logo.png` — ANTIC's real logo.
- `frontend/public/login_bg_navy.png` — an existing navy login-background asset (current
  implementation evidence, not a confirmed locked brand color).
- Real production-shaped test data used during development: a genuine multi-sheet budget
  workbook ("Programmation 2026_2028...") with formula-heavy sheets, used to validate editing,
  child-sheet sync, and Word conversion against realistic scale and content, not synthetic
  fixtures.

## Product Principles

1. Trust the real file — never lose or silently reinterpret what's actually in the user's
   .xlsx (formulas, formatting, merges); Univer's live state is the source of truth, the backend
   persists it.
2. Operate, don't persuade — this is a daily-use internal tool staff use to complete real work,
   not a marketing surface. Scanability, consistency, and task speed outrank expressive
   flourish.
3. One workflow, two destinations — the same edited data flows cleanly to both a synced child
   sheet and a formatted Word report, without manual re-entry or reconciliation.
4. Bilingual by default — French and English are both first-class throughout, not one
   translated as an afterthought.
5. Respect institutional identity — ANTIC's own visual identity is real and earned; design work
   should read as belonging to a national agency's internal tool, not a generic SaaS template.

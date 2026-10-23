---
version: 1
slug: "frontend-src-routes-workspacepage-tsx"
primary_target: "frontend/src/routes/WorkspacePage.tsx"
related_targets: []
---

## Direction contract

THESIS: The Workspace page is a working file console for daily use, not a welcome screen — scanability of the file list outranks a hero greeting or upload dropzone. Refuses the generic "big greeting + big upload hero + sparse table" arrangement most admin-panel templates ship by default.

OWN-WORLD: Inherits the established navy sidebar (#02006c) + white content + accent-blue (#2563eb) system already in code — this redesign does not touch that palette (explicit product decision: keep it neutral/corporate, no flag-color reskin). Recognizable via: a slim single-line header, the file list as the dominant full-height element, upload compressed to an inline secondary control next to the list's own section header.

STORY: A staff member logs in and lands directly on their actual work surface — the list of workbooks they manage — with upload available but out of the way, since opening/browsing existing files is the far more frequent action than uploading a new one.

FIRST VIEWPORT: A condensed single-line header (name greeting) sits above a section row combining "Mes classeurs"/"My workbooks" with a compact upload button, and the file table begins within roughly the first 120px of content height rather than ~280px as today.

FORM: Console-first, chosen from grounded structural candidates (console-first, recents-first, dense-operational-table, status-at-a-glance) presented directly to the user; concept-seed's catalog challengers (oscilloscope bench, HyperCard stack, etc.) were declined as a mismatch with the established Operate-mode, brand-neutral world and the user's own prior "keep it neutral/corporate" answer.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

---
type: reference
project: career
created: 2026-07-15
updated: 2026-07-15
tags: [career, portfolio, field-intelligence-app, claude-code, prompt-strategy]
---

# Claude Code Prompt Strategy: Field Intelligence App Fixes

**Target:** `cainmenard.com/field-intelligence`, a Next.js route in the `cainmenard-portfolio` repo, deployed on Vercel. Claude Code (cloud) has repo access and opens a branch/PR per session.
**Source of the fixes:** [[App-Audit_A-Day-of-Field-Intelligence_2026-07-15]] (12-item punch list).
**Do not touch:** the accuracy discipline from [[App-Build-Doc_A-Day-of-Field-Intelligence_2026-07-14]] §6/§6b. Every number stays traceable; no new claims.

---

## Operating conventions

- **Models (your convention):** Opus 4.8 plans, recons, and reviews. Sonnet 5 executes edits. Where a thread needs both, start it on Opus for the plan, then `/model` to Sonnet 5 to build.
- **Thread = branch = PR = Vercel preview.** Each thread below is one Claude Code session on its own branch. Vercel auto-builds a preview URL per branch; review there before merging to main. Nothing hits the live site until you merge.
- **Sequential, not parallel.** Several fixes touch Station 1 and Station 4, so run the threads in order and let each branch start from the updated main after the prior merge. The one exception that is safe to run in parallel is Thread A (the embed is an isolated component).
- **Context handoff.** Thread 0 produces a written repo map and plan. Paste its output into the top of Threads A, B, and C so each execution session has the map without re-reconning.
- **Number gate.** Before merging any PR that changed a figure, send me the diff of the changed numbers and I will check them against the traceability map. This is the one manual gate; keep it.
- **Commit hygiene.** One thread, one focused PR, descriptive title. If a thread balloons, stop and split it rather than letting the session run long (long sessions drift).

**Why split into separate threads instead of one:** independent, revertible units of work; clean per-PR review; and models stay sharp on a bounded task. One mega-thread bloats context, blends unrelated changes into one un-reviewable diff, and makes a bad edit hard to roll back. Keep each thread's full loop (plan or edit, self-check, push) inside that one thread; keep unrelated work out of it.

---

## Thread 0 — Recon & Plan  ·  Opus 4.8  ·  branch: none (read-only)

Goal: map the code so the execution threads are surgical, and confirm the one factual fork (48 vs 147) from the source, not the PDF. No edits.

**Prompt 0.1 (Opus 4.8):**
> Read-only pass, do not edit anything. In the cainmenard-portfolio repo, map the `/field-intelligence` page. Tell me: the file tree for this route and its components; where the five station sections are defined; where the embedded "Project Performance" dashboard component lives and how it gets its dataset (hardcoded array, imported JSON, CSV, or a separate app/iframe); where the dataset project count is set (I see both "48 projects" and a caption saying "147 sample project records" and need to know which is the real source and why they differ); where user-facing copy strings live (inline JSX vs a content file); and where the MANUAL/DIGITAL productivity module and the vendor/training "go deeper" blocks are implemented. Output a short written map plus a recommended sequence for making the changes in [[App-Audit]] punch-list items 1-11 with the least risk of merge conflicts. Do not write code yet.

**Prompt 0.2 (Opus 4.8):**
> Based on that map, confirm which single dataset and project count should be canonical across the page and the embedded tool, and note anywhere else on the page or site (e.g., other cainmenard.com routes) that references a project count so we keep them consistent. Give me the exact files and line ranges Threads A, B, and C will each touch.

Save 0.1 and 0.2 output; it seeds the next threads.

---

## Thread A — The embedded tool  ·  Sonnet 5  ·  branch: `fix/embedded-tool`  ·  punch-list 1, 2, 3

Highest value, mostly isolated to the dashboard component. Paste Thread 0 output first.

**Prompt A.1 (Sonnet 5) — data consistency (item 1, CRITICAL):**
> Using the map from Thread 0, fix the dataset inconsistency on the field-intelligence page: the embedded Project Performance dashboard defaults to 48 projects while the caption reads "147 sample project records." Make them consistent. Before changing anything, show me both values, where each is set, and which is the true committed dataset size, and recommend which number to standardize on. Then apply it and update any dependent totals (revenue, margin, gain rate) so they stay internally correct.

**Prompt A.2 (Sonnet 5) — default view vs thesis (item 3):**
> The embedded dashboard opens on a healthy 17.7% average margin and a 66.7% gain rate, which argues against the "estimating leak" point of Station 4. Change its default view so the first thing a reader sees reinforces the leak (for example default to the Gain/Fade or Cost Analysis tab, or a customer sort that surfaces the losing customer), or if the default must stay, add one line of framing above the embed explaining why the portfolio average looks fine while the projects underneath do not. Keep the copy in Cain's voice: plain, no jargon, no em dashes.

**Prompt A.3 (Sonnet 5) — reskin to one product (item 2, the big one):**
> Reskin the embedded Project Performance dashboard so it reads as part of this page, not a separate app. Match the page's type (serif display headers, the sans body), the copper accent, and the ivory/slate palette; remove or restyle its own tab chrome and "New Data" button so they belong to the parent design. Do not change the underlying data or charts, only the visual shell. Show me a before/after of the component styling.

**Close A (Sonnet 5):**
> Summarize the diff, push the branch, and give me the Vercel preview URL. List every number that changed so I can verify it.

Gate: send me the changed-number list before merge. Then merge `fix/embedded-tool` to main.

---

## Thread B — Copy & accuracy quick wins  ·  Sonnet 5  ·  branch: `fix/copy-accuracy`  ·  punch-list 7, 9, 10, 11, 8(copy)

Low-effort text changes. Start branch from main after A merges.

**Prompt B.1 (Sonnet 5) — hero orientation (item 7):**
> On the field-intelligence page hero, add one quiet orientation line for a cold reader who lands here without context, something that says what this is and who made it in a sentence, without breaking the "Capability Demonstration / A Day of Field Intelligence" opening. Keep it minimal and in Cain's voice.

**Prompt B.2 (Sonnet 5) — role term (item 9):**
> Standardize the field-role noun across the page. Right now Station 1 mixes "crew leader" and "foreman." Pick "foreman" as the primary term (it is the term the vendor-gate line already uses) and make the usage consistent, unless the map shows a deliberate distinction, in which case flag it to me instead of changing it.

**Prompt B.3 (Sonnet 5) — five flows precision (item 10):**
> In Station 2, the copy says "five data flows connect seven systems" as if all are live. The source is five flows with four fully confirmed and the fifth architecturally sound. Change the phrasing to something accurate and more specific, e.g. "five flows, four live," which is both truer and more credible. One-line change.

**Prompt B.4 (Sonnet 5) — macro stat (items 11, 8-copy):**
> The Station 1 productivity stat ("about 0.4% a year since 2000, against about 3% in manufacturing") is the only external macro claim on the page. Add a source on hover or a small footnote, and make sure the framing is consistent with the version on cainmenard.com/ai-evolution (which states it as construction +10% vs manufacturing +90%, 2000-2022). Also add one short caption tying the MANUAL/DIGITAL module to the timecard story around it so the stat does not read as orphaned. Do not restructure the module yet, that is Thread C.

**Close B:** push, preview URL, changed-copy summary. No number gate needed unless B.4 altered a figure. Merge.

---

## Thread C — Structure & interactivity  ·  Opus 4.8 → Sonnet 5  ·  branch: `fix/structure-rebalance`  ·  punch-list 4, 5, 6, 8(interaction)

The judgment-heavy restructure. Do it last so it reorganizes already-corrected content. Start on Opus to plan, switch to Sonnet to build.

**Prompt C.1 (Opus 4.8) — plan only:**
> Read-only. Propose a plan (no code yet) for three restructures on the field-intelligence page, respecting the existing narrative and the "one hero interaction per station" principle from [[App-Build-Doc]] §7b: (1) Station 1 is overloaded, it carries the FedEx replay, MANUAL/DIGITAL, five-methods, vendor gauntlet, and training arc before the reader has committed; propose what stays on the spine and what moves behind "go deeper." (2) Station 4 makes the "averages hide the truth" point three times (scatter, rebuild-the-bid, full embed); propose a sequence that keeps one hero and demotes the rest. (3) The back half (close-the-loop recipe, six mechanism cards) reads as a document; propose converting one static grid into a light interaction. Also decide the fate of the MANUAL/DIGITAL toggle if its purpose is not clear. Give me the plan to approve before any edits.

**[You approve or adjust C.1, then:]**

**Prompt C.2 (`/model` Sonnet 5) — execute Station 1:**
> Implement the approved plan for Station 1: keep [the approved hero beat] on the spine and move the rest behind "go deeper" drawers, preserving all content and numbers. Show me the diff.

**Prompt C.3 (Sonnet 5) — execute Station 4:**
> Implement the approved Station 4 sequence: [approved hero] stays prominent, the others become a framed "step into the real tool" and/or collapsed. Keep every figure intact.

**Prompt C.4 (Sonnet 5) — back-half interaction + toggle:**
> Implement the approved back-half change (convert [the chosen grid] into the light interaction) and the approved decision on the MANUAL/DIGITAL toggle. Keep copy in voice, no em dashes.

**Close C:** push, preview URL, full diff summary, and a list of any numbers that moved. Number gate, then merge.

---

## Thread D — Review & live walkthrough  ·  Opus 4.8  ·  branch: none (read-only), addresses punch-list 12

After A, B, C are merged. This closes the "a PDF cannot show motion/feel" gap in the audit.

**Prompt D.1 (Opus 4.8):**
> Read-only review of the deployed field-intelligence page (main, post-merge). Walk it against [[App-Audit_A-Day-of-Field-Intelligence_2026-07-15]] and confirm each of the 12 items is resolved or consciously deferred. Check that no fix regressed another section, that the embed now reads as one product, that all numbers still match, and that the day-arc, voice, and no-em-dash rules held. Produce a short punch-list v2 of anything remaining, ranked.

Then send me D.1's output and I will do the final traceability check on any numbers it flags.

---

## Sequence at a glance

| Order | Thread | Model | Branch | Items | Gate before merge |
|---|---|---|---|---|---|
| 1 | 0 Recon & Plan | Opus 4.8 | (read-only) | maps 1-11 | none |
| 2 | A Embedded tool | Sonnet 5 | fix/embedded-tool | 1, 2, 3 | number check |
| 3 | B Copy & accuracy | Sonnet 5 | fix/copy-accuracy | 7, 9, 10, 11, 8(copy) | none (unless B.4 moved a figure) |
| 4 | C Structure | Opus 4.8 → Sonnet 5 | fix/structure-rebalance | 4, 5, 6, 8(interaction) | number check |
| 5 | D Review | Opus 4.8 | (read-only) | 12 | final check |

Thread A may run in parallel with B if you want speed (the embed is isolated); C must come after both. D comes last.

## Related
- [[App-Audit_A-Day-of-Field-Intelligence_2026-07-15]]
- [[App-Build-Doc_A-Day-of-Field-Intelligence_2026-07-14]]
- [[Website Update]] (the prior Claude Code model/thread convention this follows)

*v1.0 (2026-07-15): prompt-by-prompt Claude Code plan for the 12 audit fixes, four execution threads plus recon and review, Opus-plans / Sonnet-executes, branch-per-thread with Vercel previews and a number-verification gate.*

---
type: analysis
project: career
created: 2026-07-15
updated: 2026-07-15
tags: [career, portfolio, field-intelligence-app, audit, review]
---

# Audit: A Day of Field Intelligence (current live build)

**Method.** Full text extracted from the exported PDF (`A Day of Field Intelligence | Cain Menard.pdf`, single continuous page, ~11.7K chars) and every quantitative claim cross-checked against the vault traceability sources (Career-Clients F1/F5/F6, Career-Profile-Master §7e-7n, the field-time-capture current-state notes, Case-Study_Jackson-and-Blanc). Audit only; no redesign performed.

**Standing limitation (applies everywhere).** A PDF is a flattened snapshot of a live interactive app. Content, language, narrative, accuracy, terminology, and information hierarchy are fully assessable. Motion, interaction feel, exact color, animation timing, and whitespace are only inferable from labels and layout. Findings that depend on the live experience are marked **[INFERENCE]**; findings from the fixed content are **[OBSERVED]**.

**Build identity note.** This is a different, more advanced build than the v2 HTML in `field-intelligence/app-v2/` (it has a "Capability Demonstration" hero, a MANUAL/DIGITAL productivity module, and the real Project Performance app embedded inline). Assumption: this is the current canonical build and the one to overhaul.

---

## 1. Content

**Current state [OBSERVED].** The five-station arc is complete and content-rich: Station 1 (field capture, FedEx replay, vendor gauntlet, training arc, five-methods, Spanish design constraint), Station 2 (integration/approvals, one-way door, piecework splitter, compliance counter), Station 3 (90% cliff, stopwatch, in-flight crew-rate catch), Station 4 (estimating leak, scatter, three-book repeated shape, seat flip, customer cut, two objection cards, close-the-loop recipe, embedded live tool), Station 5 (Monday docket, six mechanism cards, the agent finale), epilogue and colophon. My-part authorship lines and handoff lines are present on every station.

**Gaps and problems.**
- **The embedded tool shows a different dataset than its own caption [OBSERVED].** The inline Project Performance app defaults to "48 projects, $145.5M, 17.7% avg margin, 66.7% gain rate, net -$1.4M," while the caption directly beneath reads "ships 147 sample project records." Two different project counts in the same eyeful. Cain's entire pitch is data rigor; a numerate viewer notices immediately.
- **Dataset count is inconsistent across his own properties [OBSERVED].** This build shows 48 (embedded) and 147 (caption); cainmenard.com/ai-evolution says "500+ project analysis"; the demo dataset elsewhere is "504 projects / $104.6M." Four different magnitudes for what a viewer reads as "the sample dataset."
- **The embedded tool's sunny default undercuts the thesis at the worst moment [OBSERVED].** The reader arrives at Station 4 to learn margin leaks, and the embedded app opens on 17.7% average margin and a 66.7% gain rate. The one moment the live tool appears, it argues the opposite of the station.
- **No orientation for a cold reader [OBSERVED].** It opens straight into narrative ("BEGIN AT 6:15AM"). Fine for a hiring manager who was sent it with context; a cold business exec landing from a link gets no one-line "what is this, who made it, why should I care."
- **The productivity stat is orphaned [OBSERVED].** "Construction labor productivity has grown about 0.4% a year since 2000, against about 3% in manufacturing" sits inside a MANUAL/DIGITAL module in Station 1 with no visible connection to the timecard story around it.

**Why it's a problem.** The dataset inconsistencies are the highest-stakes content issue in the whole app: the artifact exists to prove rigor, and mismatched counts read as carelessness to exactly the detail-oriented reader it targets. The cold-open and orphaned-stat issues cost comprehension in the first fifteen seconds, where most readers decide whether to continue.

**Severity: CRITICAL** (dataset inconsistency) / **MEDIUM** (orientation, orphaned stat).

**Recommended direction.** Lock one canonical sample dataset and one project count, and make the embedded tool default to a view that reinforces (not contradicts) the leak thesis, or add one line framing why the aggregate looks healthy. Reconcile the number against cainmenard.com so the two properties agree. Consider a single quiet orientation line in the hero.

---

## 2. Language

**Current state [OBSERVED].** Voice is strong, consistent, and on-brand: practitioner-plain, specific, professional project-controls terminology throughout (earned value, composite crew rate, WIP, cost-to-complete, budget-vs-actual, retention). No consulting jargon, no "leverage/unlock/journey," no em dashes. The "my part" lines are appropriately quiet. Handoff lines carry momentum ("The hour posts to a cost code. Now the job has to tell the truth about it.").

**Problems.**
- **Crew leader vs foreman used interchangeably [OBSERVED].** Station 1 opens "A crew leader clocks in" and "A crew leader fills out paper timecards," then the vendor gate says "Will a foreman with wet gloves at 6:15am." To a construction veteran these are not always the same role. Pick one and hold it, or use each deliberately.
- **A few dense "go deeper" blocks read like documentation, not app copy [OBSERVED].** The close-the-loop recipe and mechanism cards are information-dense. Acceptable because collapsed/secondary, but they are the least "playful" copy in the piece.

**Why it's a problem.** The whole credibility play is that a field veteran reads this and nods. Role-term slippage is a small tell that a veteran catches, and this audience is precisely the one that catches it. Low individual cost, but it is the kind of detail the target reader is unusually sensitive to.

**Severity: LOW-MEDIUM.**

**Recommended direction.** Standardize the field-role noun. Leave the dense secondary copy alone (it earns its density by being opt-in), but confirm nothing on the required spine reads like a spec sheet.

---

## 3. Story / Narrative

**Current state [OBSERVED].** This is the strongest dimension. The spine is genuinely coherent: one labor hour, five sets of hands, a loop that closes at a second dawn, with the recurring cast ("the crew leader who logs it," "the payroll clerk who reconciles it," "the PM whose budget absorbs it," "the estimator who should have predicted it," "the owner who prices the next one off it") doing real structural work. The estimating-vs-field "split the bill" frame is a genuine thesis, not a feature list. The closer lands.

**Problems.**
- **Station 1 is overloaded relative to the others [OBSERVED/INFERENCE].** It carries the FedEx replay, the MANUAL/DIGITAL module, the five-methods panel, the vendor gauntlet, the training arc, and the Spanish design constraint. That is arguably more content than Stations 2 and 3 combined, front-loaded before the reader has committed. Risk of fatigue before the arc gets going.
- **The embedded app is a narrative record-scratch [OBSERVED].** Mid-Station-4, the reader drops out of the cinematic day and into a full separate dashboard product (its own header "Project Performance Intelligence," tabs, a "New Data" button). It proves "he ships tools" but breaks the spell precisely at the emotional peak of the data story.

**Why it's a problem.** Narrative momentum is what carries a non-technical exec past the dense parts. A front-loaded Station 1 spends the reader's attention early; the mid-story tool-switch risks ending the guided experience right when it should be climaxing.

**Severity: MEDIUM.**

**Recommended direction.** Rebalance Station 1 by demoting more of it behind "go deeper," keeping only the memory/FedEx beat on the spine. Stage the embedded tool as an explicit, framed "step into the real thing" moment with a way back, rather than an inline drop-in.

---

## 4. Cohesiveness

**Current state [OBSERVED].** The custom-built portions are highly cohesive: consistent pipeline map, repeated my-part/handoff/go-deeper patterns, one type and color system, a continuous day-arc.

**Problem.**
- **The embedded Project Performance app is a visibly different product [OBSERVED].** It carries its own chrome (tabs: Executive Summary / Project Portfolio / Gain-Fade / Cost Analysis / Market Segments; a "New Data" button; its own KPI-card visual language and palette). Dropped inside the editorial day-arc, it reads as bolted on. This is the single clearest "stitched-together" element in the app.

**Why it's a problem.** A hiring manager evaluating product sense will read the seam. The embed is meant to prove capability; if it looks like a different app pasted in, it can read as "he linked someone else's dashboard" rather than "he built this too," undercutting the exact point it exists to make.

**Severity: HIGH.**

**Recommended direction.** Either wrap the embed in a deliberate framed "console" treatment that signals a purposeful mode-switch (bezel, caption, clear enter/exit), or reskin the embedded app's shell to share the parent's type and palette so it reads as one family.

---

## 5. Accuracy (factual / technical / construction-domain)

**Current state [OBSERVED].** The engagement numbers are clean and match source. Verified against the vault: crew rate $61.18 est / $71.46 actual, ~17% hot, margin toward 1.8% on a book bidding ~14 (Jackson & Blanc); 126 projects / $85.9M / 14.28% to 9.82% margin / labor +25%; 367 projects / ~$630M / materials -10.4% / equipment +11.3%; 39 projects / $1.03B / equipment +20.8% / 0.6-pt aggregate fade / -68% to +28% spread; largest customer 5 projects / $190M / $5.7M loss / 48.6% over; K-12 -6.1% vs college +3.6%; ~180 to ~24 hrs/wk (87%) PAGA; 36 overdue / 84 days; 53 tables / 9,724 rows; 3,731-row fact table; 21-factor go/no-go with 69/50 bands; runner-up 41 of 2,060 (2%) vs winner ~30 at 1,000+ all construction; $10-15K to scope piecework. All correct. Client scrub is clean (no RCA, no BU names, no Jackson & Blanc/DN Tanks/RES/Clayco; only Miter and FMI named, both allowed). The 532 projects / ~$1.75B totals reconcile.

**Problems.**
- **48 vs 147 project count [OBSERVED].** Covered in Content; it is also an accuracy defect because both numbers describe the same object on the same screen.
- **"Five data flows connect seven systems" stated as done [OBSERVED].** The source (integration architecture v5.1) says five flows but "four flows fully confirmed," the fifth "architecturally sound." The app presents five as complete. Defensible for a portfolio piece, but a precise interviewer could probe it. Low risk.
- **Productivity stat framing [OBSERVED].** "0.4% a year vs 3%" is internally consistent with his own published "+10% vs +90%, 2000-2022" (annualized), so it is accurate, but it is a different presentation of the same fact than his site uses. Keep the two properties consistent, and it deserves a source on hover given it is the one external macro claim.

**Why it's a problem.** For a data-rigor pitch, a single visible number mismatch is disproportionately damaging. The other two are minor and mostly about defensibility under direct questioning.

**Severity: HIGH** (48 vs 147, overlaps Content-critical) / **LOW** (five-flows, productivity framing).

**Recommended direction.** Resolve the count. Consider a one-word hedge on the flows ("five flows, four live") which is both accurate and more impressive because it is specific. Add a source tooltip to the macro stat.

---

## 6. Engagement

**Current state [INFERENCE from labels + OBSERVED copy].** The concept is engaging: replay buttons, a MANUAL/DIGITAL toggle, "would you sign," "rebuild the bid," docket choices, "ask the agent." The copy has real wit ("one of them travels by FedEx," "Approved does not mean counted," "the crew wasn't slow, the crew was waiting"). The day-arc and copper accent read as premium.

**Problems.**
- **Text density in the back half [OBSERVED].** Station 4's close-the-loop recipe and Station 5's six mechanism cards are read-heavy grids. After an interactive front half, the ending trends toward "well-designed document."
- **Cannot verify the payoff of the interactions from a static export [INFERENCE].** Whether the replays, toggles, and scatter feel satisfying (timing, motion, feedback) is exactly what the PDF cannot show. This is the biggest blind spot in the audit and should be evaluated live before overhaul scope is fixed.

**Why it's a problem.** Engagement decay toward the end means the reader's last impression (mechanism cards, colophon) is the least lively part, when you want them leaving impressed.

**Severity: MEDIUM.**

**Recommended direction.** Convert one or two of the back-half static grids into a light interaction (e.g., the six mechanism cards as a single "pick a decision, see the data cut" selector). Evaluate the live build for interaction feel before committing overhaul scope.

---

## 7. Interactivity

**Current state [INFERENCE].** Interactive, per labels: FedEx REPLAY, MANUAL/DIGITAL toggle, vendor gauntlet constraint flips, RUN THE FUTURE STATE, the 90% cliff REPLAY, OPEN THE 14%, the scatter "would you sign," REBUILD THE BID, the three docket questions, the agent ASK, and the fully-live embedded Project Performance app.

**Problems.**
- **Static that arguably should be interactive [OBSERVED]:** the three-book "repeated shape" table (a strong candidate for a flip/compare interaction), the six mechanism cards (static grid), the customer-cut stats (static, could be the reveal of a sort).
- **Interactive that may be too much, in one place [INFERENCE]:** Station 1 stacks several mechanisms (replay, toggle, gauntlet, training) close together; the MANUAL/DIGITAL toggle's purpose is not self-evident from the surrounding copy.
- **Redundancy risk [OBSERVED]:** the scatter + rebuild-the-bid + the full embedded tool all live in Station 4 and partly make the same point (the average hides the truth; cut the data to see it). Three ways to say one thing in one station.

**Why it's a problem.** Undifferentiated interactivity (everything clicks) tires a reader as much as no interactivity. The goal is one memorable hero action per station; redundant mechanisms dilute that.

**Severity: MEDIUM.**

**Recommended direction.** Assign each station one clear hero interaction and demote the rest. Clarify or cut the MANUAL/DIGITAL toggle. Resolve the Station 4 redundancy by sequencing (teaser scatter → framed real tool) rather than stacking three parallel proofs.

---

## 8. Aesthetics

**Current state [OBSERVED layout + INFERENCE on finish].** Editorial and confident: serif display headers, clear kicker/label system, copper accent used with discipline, a legible pipeline map, the day-arc concept (pre-dawn dark to ivory) as a structural device. Strong type hierarchy in the hero and station headers.

**Problems.**
- **The embedded app's visual language clashes [OBSERVED].** Its KPI cards, tabs, and palette are a different design system (see Cohesiveness).
- **Back-half grids are visually busy [OBSERVED]:** six mechanism cards plus multiple stat clusters in Station 5 crowd the calm the rest of the piece maintains.
- **Cannot judge spacing, motion, or exact palette from the export [INFERENCE].** Whether the day-arc transition is subtle or heavy-handed, and whether whitespace stays generous under real content, needs a live look.

**Why it's a problem.** The app's premium feel is a real differentiator for a "product sense" reader; the one un-styled embed and the crowded ending are the two places that premium feel drops.

**Severity: MEDIUM** (embed clash overlaps Cohesiveness-HIGH) / **LOW** (grid density).

**Recommended direction.** Bring the embed into the family or frame it deliberately; give the back-half grids more air or fewer simultaneous elements. Confirm spacing and motion live.

---

## Prioritized punch list (severity x effort)

Ranked for sequencing. "Effort" is a rough build estimate, not a promise.

| # | Issue | Dimension | Severity | Effort | Priority |
|---|---|---|---|---|---|
| 1 | Embedded tool shows 48 projects while caption says 147; dataset count inconsistent across his properties (48 / 147 / 500+ / 504) | Content, Accuracy | CRITICAL | Low | **Do first** |
| 2 | Embedded app is a visibly different product (own chrome, tabs, palette) = the main "stitched-together" seam | Cohesiveness, Aesthetics | HIGH | Med-High | **Do first** |
| 3 | Embedded tool defaults to a healthy 17.7% margin / 66.7% gain, arguing against the leak thesis at the moment it appears | Content, Narrative | HIGH | Low | **Do first** |
| 4 | Station 1 overloaded; too many mechanisms before the arc commits the reader | Narrative, Interactivity | MEDIUM | Med | High |
| 5 | Station 4 redundancy (scatter + rebuild-bid + full embed all make one point) | Interactivity, Narrative | MEDIUM | Med | High |
| 6 | Back-half static grids (close-the-loop recipe, six mechanism cards) read as document, not app | Engagement, Interactivity, Aesthetics | MEDIUM | Med | High |
| 7 | No cold-reader orientation in the hero | Content | MEDIUM | Low | Medium |
| 8 | MANUAL/DIGITAL toggle + orphaned productivity stat: unclear purpose/connection | Content, Interactivity | MEDIUM | Low | Medium |
| 9 | Crew leader vs foreman terminology slippage | Language | LOW-MED | Low | Medium |
| 10 | "Five flows / seven systems" stated as done vs "four confirmed" in source | Accuracy | LOW | Low | Medium |
| 11 | Productivity stat needs a source tooltip and consistency with cainmenard.com framing | Accuracy, Content | LOW | Low | Low |
| 12 | Live-only evaluation gap: interaction feel, motion, spacing, palette unverified from PDF | Engagement, Aesthetics, Interactivity | (blocker on scoping) | Low | **Do before finalizing overhaul scope** |

**Reading the list.** Items 1-3 all cluster on the embedded tool and are the highest-value, mostly-low-effort wins; the embed is simultaneously the strongest capability proof and the weakest-integrated element, so it is where an overhaul should start. Items 4-6 are the "one hero per station, trim the rest" theme. Item 12 is a process note: walk the live build before locking overhaul scope, because the three dimensions a PDF cannot show (motion, feel, spacing) are exactly the ones most likely to change the priority order.

## Related
- [[App-Build-Doc_A-Day-of-Field-Intelligence_2026-07-14]] (the content spec this build was made from)
- [[Career-Profile-Master]], [[Career-Clients]] (accuracy sources)
- Working files: `Career Search/field-intelligence/` (v2 HTML, traceability map, prompts)

*v1.0 (2026-07-15): audit of the exported PDF build, eight dimensions plus prioritized punch list. Audit only, no changes made. Static-export limitation flagged throughout; live walkthrough recommended before overhaul scope is fixed.*

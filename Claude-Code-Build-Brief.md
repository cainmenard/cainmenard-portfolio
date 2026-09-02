# Claude Code Build Brief — "A Day of Field Intelligence"

This is a content-and-constraints bible plus a prompt sequence. You (Claude Code) own the build: architecture, component design, animation approach, data-viz choices, and a lot of the visual interpretation. What is fixed is the **story**, the **verified numbers**, and the **guardrails**. Everything else is yours to make excellent.

---

## THE MISSION

An interactive single page that lives at **cainmenard.com/field-intelligence**. It follows one labor hour from the jobsite to the income statement, and back around, across five interactive "stations." It is a capability demonstration for a construction-plus-AI career, aimed at hiring managers, executives, and business leaders. The bar, set by a target hiring manager: "send me something you've built that is really useful." A design-literate viewer should think "this is the nicest thing anyone has sent me." A 30-year construction ops or estimating veteran should never think "that's never gonna happen."

It is NOT a resume and NOT a slide deck. It is a built thing that proves the person can build.

## YOUR MANDATE (creative + technical freedom)

- Own the stack decisions within the existing `cainmenard-portfolio` Next.js app. Match or extend its design system. Choose the animation/scroll approach (CSS, Framer Motion, GSAP, canvas, SVG, whatever serves the piece).
- Own the visual language beyond the few fixed brand cues below. Make real data visualizations, not decorated text. Interactions should carry the argument; copy should be minimal.
- Propose your own build plan and component architecture before writing feature code. Sequence it your way.
- Push back on anything in here you think is weaker than an alternative, EXCEPT the guardrails and the verified numbers, which are non-negotiable.

## WHERE IT LIVES

A route at `/field-intelligence` in the `cainmenard-portfolio` repo. It should feel like a full-screen immersive piece (it need not carry the site's main nav), but include a small, tasteful way back to cainmenard.com. Link to it as a featured card in the site's Projects section. Ensure it has its own share/OG metadata (title, description, preview image) so a single link previews well in a text or email.

---

## GLOBAL GUARDRAILS (non-negotiable)

1. **No client or employer names**, ever, except **Miter** (the field-time platform) and **FMI** (the consultancy). Use these scrubbed labels: "a 16-company commercial roofing platform," "a San Diego mechanical contractor," "a national water-infrastructure design-builder," "a utility-scale solar and wind EPC," "a California roofer."
2. **No em dashes** anywhere in copy. Use commas, periods, or parentheses.
3. **Voice:** a construction practitioner who builds software. Short, plain, specific. Tool names and dollar figures over vague claims. No consulting jargon (no "leverage," "unlock," "stakeholder engagement," "workstream," "journey," "game-changer"). Never mock crews, foremen, estimators, or office staff; the copy stays on their side.
4. **Projected vs actual:** the Miter adoption numbers are projections until a Sep 2026 go-live. Stamp them PROJECTED. Never present them as achieved results.
5. **Two data worlds stay visually distinct:** real engagement numbers get one treatment ("field note"); illustrative or sandbox inputs get a clearly different one ("sandbox"). Never blend, or the credibility collapses.
6. **Every claim is cited.** Public/industry stats link to a real source. Engagement numbers carry an honest note ("from a completed-contracts analysis of N projects; client identifiers removed; methodology available on request"), since scrubbed client data cannot be hyperlinked. Build a lightweight citation affordance (hover/tap footnote).
7. **Readability rule (learned the hard way):** if you animate a dark-to-light background across scroll, do NOT interpolate the text color through gray at the same time (both meet as mid-gray and become unreadable). Keep backgrounds clearly dark or clearly light, snap text color by background luminance, and confine any dark-to-light change to a short, fast transition band. Verify WCAG AA on every resting state.
8. **Veteran stress test** on every claim and interaction: no hindsight omniscience ("would have flagged every loss"), no victory laps that aren't in the data, no "real-time" claims (approval cadence is the floor), believable magnitudes left unrounded. Estimators quote materials and predict labor; "quotes hold, predictions lose," never "padding."
9. Spelling: **Cain**, **Miter**.

## DESIGN INTENT (cues, not a spec)

- Editorial and slick, like a premium magazine feature, not a SaaS dashboard and not a hacker terminal. Whitespace is the primary material. One focal idea per screen (squint test).
- A "day arc": the page can open in pre-dawn dark and open into daylight as the hour reaches the office and the books, landing on a warm ivory by the executive readout. This is a storytelling device; make it subliminal, and obey the readability rule.
- Fixed brand cues: copper accent `#B87333` used sparingly so it means something; warm ivory `#FAF8F5` and slate `#1E2A38` for the light end; a serif display face with a clean sans for body and a tabular/mono face for figures. Beyond these, choose.
- Motion: restrained and physical (things settle, not bounce). Respect `prefers-reduced-motion`. Provide a fast "spine" a viewer can complete in about 3 minutes (one hero interaction per station) with optional "go deeper" drawers, and make sure a pure scroller still receives the argument.

---

## THE NARRATIVE (fixed arc)

Persistent progress device across the top or side: `FIELD -> OFFICE -> JOB COST -> PORTFOLIO -> DECISIONS`, which visibly closes into a loop at the end. A recurring cast frames it: the same hour passes through five sets of hands (the crew leader who logs it, the payroll clerk who reconciles it, the PM whose budget absorbs it, the estimator who should have predicted it, the owner who prices the next one off it). One line of scene-setting per station. Each station ends with a one-line handoff to the next.

Add, per station, one quiet "my part" line claiming Cain's actual role (below).

---

## VERIFIED CONTENT + DATA, BY STATION

(Every number below is real and sourced. Use exactly. Render however you think best.)

### Station 1 — FIELD (6:15am). "One hour, twelve businesses, five ways to record it."
My part: sat in the interviews and ran the current-state analysis across 12 businesses; ran the vendor selection; building the training and adoption program now.
- On one 16-company commercial roofing platform, 12 businesses capture a field hour five different ways (GPS self-clock; foreman-entered mobile; paper then keyed; four methods at once; and one business where a part-time person emails hours weekly). Good candidate for the marquee viz: a distribution/board on a manual-to-digital gradient.
- Crews do not self-report. At one business, ~20 foremen key ~1,800 entries a month for 100+ crew. The foreman is the system of record and the single point of failure.
- One $90M business runs four capture methods at once; ~3,100 entries a month across 150 field workers, reconciled by hand. Another re-keys ~150 payroll lines a week.
- The punchline: the most financially mature business on the platform (cleanest financials of the sixteen) batches **paper timecards and FedExes them to corporate every week**. Roughly half of daily timecards need a fix; paper surfaces the error ~2 weeks later; corrections are made in the employee's favor only. (Good animated "shipment tracking" moment.)
- 75%+ of ~800 workers at the largest business speak only Spanish (a go/no-go design constraint, not a localization ticket).
- Industry frame (citeable): construction labor productivity has grown ~0.4%/yr since 2000 vs ~3% in manufacturing. Source: McKinsey Global Institute, "Reinventing construction through a productivity revolution" (2017, updated 2024). Link: https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution
- Go-deeper: the vendor gauntlet. Six field-time platforms, Oct 2025 to Mar 2026, cut to two, then Miter. The twist: BOTH finalists failed piecework (unequal split allocations across cost codes; the runner-up quoted $10-15K just to scope it; the winner could not calculate it either). Solved in the middleware (total dollars / hours = rate per cost code). Construction DNA: runner-up had 41 of 2,060 customers in construction (2%); the winner ~30 customers at 1,000+ employees, all construction. The gate applied in every demo: "will a foreman with wet gloves at 6:15am open this a second time?" Label the choice honestly: selected with broad support, runner-up validated against.
- Go-deeper: the training arc. Pick a rollout: "train everyone" hits 83% completion and fails (5 of 40 proficient). What worked: a named owner per process (seven processes), a monthly trained-versus-proficient matrix, process scorecards, an action plan recut ~9 times over two years. 93% see the problem, ~20% believe the fix. Adoption is instrumented, not surveyed: timecard correction rate (corrections per paychecks processed per week), 90% clean entry in 90 days as the goal. **PROJECTED, go-live Sep 2026.** Program terminology is "Field Trainer Network," never "champions" or "super users."

### Station 2 — OFFICE (8:30am). "The hour has to survive the plumbing."
My part: designed the data flows and the approval routing; five flows, seven systems, one middleware layer.
- Approved does not mean counted. Five data flows connect seven systems through one middleware layer. Before the build, only 2 of 10 integrations were automated; one business re-keys ~150 lines a week; corrections chase every paycheck cycle. The hour dies in re-keying and the approval queue. (Good "click the pipe where it leaks" interaction.)
- The future state runs on one trigger: the minute a timecard is approved, the hour posts to its cost code and budget-versus-actual updates the same day, not at month-end.
- Honest beat: an integration does not fix a bad punch, it delivers the bad punch faster. So the correction workflow and the approval deadline are the real design work (one deadline moved to noon Monday, with a second round for the Tuesday stragglers).
- Go-deeper: the one-way door (corrections happen in the system of record only, because two systems that both accept edits disagree by Friday, and payroll disagreements become wage-and-hour problems). The piecework splitter (middleware rate breakout). The compliance counter: a California roofer, violation detection wired into the timekeeping backend, exposure ~180 hours/week to ~24 (about an 87% cut), surfaced before payroll closes.

### Station 3 — JOB COST (11:30am). "The 90% cliff."
My part: built the job-cost and earned-value dashboards on the client's ERP data; ran the time studies with a clipboard.
- Two forecasts of the same job: the quiet one (flat, flat, flat, then a cliff at ~90% complete) versus the honest weekly reforecast (bends early, lands soft). This is why the close-out process fires at 80% of labor hours consumed, before the cliff.
- Real, in-flight catch: weekly earned-value reporting caught a composite crew rate running $71.46 actual against $61.18 estimated (~17% hot), with projected margin compressing toward 1.8% on a book that bids around 14, while the job was still open.
- Go-deeper: the stopwatch. Field labor time studies coded an 8-hour day into ~43% direct install, ~42% support work, ~14% recoverable lost time. Of the lost time, off-task leads, but material handling (~17%) and missing information from the office or GC (~16%) are right behind, and both are fixable from a desk. "The crew wasn't slow. The crew was waiting." (That ~16% is the software problem the finale pays off.)

### Station 4 — PORTFOLIO (1:00pm). "The estimating leak." (The centerpiece.)
My part: ran the completed-contracts analyses on all three books; built the selectivity model; rebuilt the analytics as the deployed app.
- Frame: estimating says the field blew the labor; the field says the estimate was fantasy. A completed-contracts analysis is the arbitrator. It separates systematic bias from execution noise, and it usually splits the bill.
- Three forensic books, 532 projects, ~$1.75B: (a) a San Diego mechanical contractor, 126 projects / $85.9M, margin 14.28% estimated to 9.82% actual, labor overran 25% ($17.28M bid, $21.60M spent); (b) a national water-infrastructure design-builder, 367 projects / ~$630M, margin gained 4.18 points as a subcontractor and faded 4.85 as a GC (same company, same product), materials came in 10.4% under while equipment ran 11.3% over; (c) a utility-scale solar and wind EPC, 39 projects / $1.03B, aggregate fade a harmless-looking 0.6 points but project outcomes from a 68% fade to a 28% gain, equipment 20.8% over estimate ($22.1M), largest customer five projects / ~$190M revenue / a $5.7M net loss / direct costs 48.6% over.
- The repeated shape (great diverging-bar viz): what you quote (materials, subs) holds or comes under; what you predict (labor, equipment) runs over.
- "Would you sign it?" then scatter reveal (the average hides the business you just bought). Then "rebuild the bid": a simple mechanical bid priced from the book, recalibrated with the measured factors. Three numbers: old bid $324,900 (won the job, below actual cost), calibrated bid $352,400, actual cost $327,500. **These bid figures are sandbox composites built off the real $61.18-to-$71.46 crew-rate factor; label them sandbox.**
- How the loop actually closes (name the real artifacts): join estimate lines to actual cost lines by cost code (a 3,731-row estimate-versus-actual fact table, ~20 projects excluded on documented data-quality logic); segment by customer, delivery method, project type, size; separate bias (repeats across a segment) from noise (one-off); re-blend the composite crew rate to the crews actually fielded; institutionalize with a 21-factor bid go/no-go (69+ bid it, 50-69 needs executive approval, below 50 walk), estimating-to-field turnover checklists, and post-job reviews that feed every closed job back in.
- Two objection cards answered before a veteran can raise them: scope leakage (the fix included change-order discipline; every open change order closes before demobilization) and inflation (escalation explains the level, not the concentration; K-12 work fading 6.1% while college work gained 3.6% in the same years survives the macro story).
- Embed the real, deployed tool: **project-performance-analysis.vercel.app** (React 19 / Vite / Recharts / CSV upload; ships 147 sample project records). Give it 2-3 guided missions (find the losing customer; find the leaking cost category; watch fade by segment). Keep a visible "real deployed tool, sample data" label. Note: the 504-project / $104.6M figures are the app's demo dataset and must never be cited as real client numbers.
- Optional war-story spine for this station ("one job, two instruments"): the weekly earned-value catch (the $61.18 vs $71.46 crew rate) raises a question one job cannot answer; the 126-project book answers it (labor +25%, bias concentrated in specific segments and the largest customer); the fix ran both directions (a units-per-hour production-rate database feeding estimating and earned value, plus field planning discipline); it ends institutionalized (the selectivity model), with no invented victory-lap number.

### Station 5 — DECISIONS (2:00pm) + finale + epilogue + colophon.
My part: ran the adoption program; shipped the agent.
- Monday's docket, three decisions the viewer can now actually make: (1) an invitation to bid from the customer profile that loses money (answer: you rarely fire your biggest customer, you reprice the risk or decline the specific job types where the losses live); (2) industrial work faded 13% across three jobs (answer: the selectivity model's executive-approval band, not a blanket no-bid; it is capacity-aware bidding, the model scores number of bidders and PM availability); (3) labor ran +25% (answer: both raise the rates and fix planning, because the data split the bill).
- What each cut of the data decides (mechanism cards): pricing follows labor risk (a dual-overhead-rate method, heavier markup on self-perform labor, lighter on quoted materials and subs; an FMI method Cain applies, not authored); customer-level cuts drive repricing before exit; the nine-point seat swing prices the GC role; variance concentrated in labor aims the improvement budget at pre-job planning; WIP discipline plus the 80%-of-labor-hours close-out protects end-of-job margin and retention; PM availability is a scored bid factor, so the org chart is a bidding constraint.
- Finale ("then I build the tool"): after the whole pipe, an AI layer sits on top. Deliberately modest claims: grounded on live program data, read-only at the connector, a source link on every answer. Its first backlog report surfaced 36 overdue items on day one, the oldest 84 days past date. The value is trust and retrieval, not oracle answers. (Tie back to the ~16% "waiting on the office" slice from Station 3.)
- Epilogue (6:15am the next morning, rendered lighter than the first dawn): same foreman, new job, a calibrated lookahead, a digital punch, the correction that used to take two weeks now takes a day. The map closes the loop. Closing line, full stop: **"The tool that wins the jobsite is the one the foreman opens twice."**
- Colophon (after the epilogue): "This page is a scale model. The real versions run every day." A 16-company program knowledge base (53 tables, 9,724 rows migrated from Coda into a linked Obsidian vault operated with Claude Code; meetings writing themselves in through a Circleback-to-Vercel-to-GitHub-Actions pipeline). An AI agent grounded on live program data. The deployed analytics app. This page itself was built with Claude Code; the argument for why that build speed matters is at cainmenard.com/ai-evolution. Then contact: Cain Menard, cainmenard.com, cainmenard@gmail.com, (337) 654-2304, github.com/cainmenard.

---

## PROMPT SEQUENCE (paste one at a time)

**Prompt 0 (orient, plan, no code yet):**
> Read `Claude-Code-Build-Brief.md` in full. Then explore this repo (cainmenard-portfolio): the routing, the design system, fonts, existing components, and how the Projects section and the ai-evolution page are built. Do not write feature code yet. Come back with: your proposed technical approach for a `/field-intelligence` route (rendering strategy, animation/scroll library, how you'll structure the five stations and the shared scroll-linked theme, how you'll embed the external project-performance-analysis app, and how you'll keep bundle size sane), and a phased build plan you'd run. Flag anything in the brief you'd do differently. Own the strategy; I'll react.

**Prompt 1 (scaffold + spine):**
> Good. Build the scaffold: the `/field-intelligence` route, the five-station structure plus hero, epilogue, and colophon, the persistent FIELD -> OFFICE -> JOB COST -> PORTFOLIO -> DECISIONS progress device that closes into a loop, and the scroll-linked dark-to-daylight theme. Implement the readability rule from the brief (snap text by background luminance, never fade through gray, fast dark-to-light band, verify AA). Stub the station interactions for now. Match the site's brand cues in the brief. Show me the running spine.

**Prompt 2 (Station 1, Field):**
> Build Station 1 per the brief's verified content. Make the marquee a real visualization of the twelve businesses across five capture methods on a manual-to-digital gradient, and make the FedEx-timecard punchline a genuine animated moment. Add the vendor-gauntlet and training-arc as go-deeper drawers. Minimal copy; the interactions carry it. Wire the citation affordance and the McKinsey source. Own the visual design.

**Prompt 3 (Station 2, Office):**
> Build Station 2. The centerpiece is an interactive pipeline: let the viewer predict where the approved hour dies, reveal the two real leaks, then animate the single-trigger future state. Keep the honest "delivers the bad punch faster" beat. Add the one-way-door, piecework-splitter, and compliance-counter drawers. Your call on the diagram and motion.

**Prompt 4 (Station 3, Job Cost):**
> Build Station 3. Make the 90% cliff a clear, high-contrast chart the viewer triggers (quiet forecast vs honest reforecast, with the 80%-of-labor-hours marker). Add the stopwatch time-study as a viz (43/42/14, then the find-the-cause reveal). Tie the ~16% "waiting on the office" to the finale.

**Prompt 5 (Station 4, Portfolio, the centerpiece):**
> Build Station 4, the strongest station. The estimating-leak arc: would-you-sign, the scatter reveal, the three-book diverging-bar chart showing the repeated shape, the seat flip, the customer cut, the two objection cards, and the rebuild-the-bid payoff (label the bid figures sandbox). Then embed the live project-performance-analysis.vercel.app with 2-3 guided missions and a persistent "real tool, sample data" label. Optionally structure it around the "one job, two instruments" war story. This one deserves your best work.

**Prompt 6 (Station 5 + finale + epilogue + colophon):**
> Build Station 5 (Monday's docket as interactive decisions, then the mechanism cards), the agent finale (modest, trust-and-retrieval framing), the epilogue that closes the loop with the second dawn and the closing line, and the colophon. Land the day-arc at warm ivory here.

**Prompt 7 (polish pass):**
> Full polish pass: motion refinement (settle, don't bounce; respect prefers-reduced-motion), responsive down to phone with the mobile fallbacks the content implies, accessibility (focus states, alt text, AA contrast on every resting state), the citation system across all stations, and the share/OG metadata. Add a small "back to cainmenard.com" affordance. Add lightweight privacy-sane interaction instrumentation (station reached, hero completed, drawers opened) I can later point at Plausible.

**Prompt 8 (ship):**
> Add the featured Projects-section card linking to `/field-intelligence`. Commit on a branch `site/field-intelligence`, push, and give me the Vercel preview URL. Summarize what's left as fine-tuning.

---

## REFERENCE ARTIFACTS (optional, if you want to see prior iterations)
- A working standalone build of this exact concept exists at `field-intelligence/app-v2/index.html` (in Cain's Career Search folder, not this repo). It is a single-file HTML version; treat it as a reference for interactions and the readability fix, not as code to import. You are expected to build something better and native to this site.
- Fuller spec and narrative rationale: `App-Build-Doc_A-Day-of-Field-Intelligence_2026-07-14.md` (in Cain's Obsidian vault).

/**
 * Enneagram pairing analysis for all 45 unique type combinations (1-1 through 9-9).
 *
 * Keys use canonical ordering (lower type number first), so pairing(8, 1)
 * is stored as "1-8".  The function normalizes order automatically.
 *
 * Content is grounded in professional collaboration context:
 * how the two types' core motivations, core emotions, and defense
 * mechanisms interact in a working relationship.
 *
 * @typedef {Object} EnneagramPairing
 * @property {string} synergies            - Where these types naturally complement each other
 * @property {string} frictionPoints       - Predictable tension patterns
 * @property {string} communicationRules   - How to speak each type's language
 * @property {string} underStressTogether  - What happens when both are stressed
 * @property {string} growthTogether       - How they help each other develop
 */

import { ENNEAGRAM_TYPES } from './enneagramTypes'

/** @type {Record<string, EnneagramPairing>} */
const PAIRINGS = {

  // ═══════════════════════════════════════
  // SAME-TYPE PAIRINGS (9)
  // ═══════════════════════════════════════

  '1-1': {
    synergies: 'Shared commitment to quality, ethics, and doing things right. Two 1s build systems that actually hold up under scrutiny, and neither will let the other cut corners.',
    frictionPoints: 'Mutual criticism amplifies. Both have strong opinions about the "correct" way; disagreements over method can escalate into moral judgments of each other\'s character.',
    communicationRules: 'Name your standards explicitly upfront — disagreements over method are much easier to resolve than discovering you\'ve been silently judging each other\'s choices.',
    underStressTogether: 'Both disintegrate to 4: hypercritical resentment gives way to withdrawal and feelings of being fundamentally misunderstood. Perfection becomes personal.',
    growthTogether: 'Each can model the integration path to 7 — finding joy in what\'s already good rather than fixating on what\'s imperfect.',
  },

  '2-2': {
    synergies: 'Warm, supportive, and naturally attuned to each other\'s needs. Two 2s build genuinely caring work environments and are natural advocates for the humans around them.',
    frictionPoints: 'Competition for the "most needed" role. Both give to receive appreciation — when neither is explicitly acknowledging the other\'s contributions, resentment builds quietly.',
    communicationRules: 'Be explicit about appreciation. Neither will ask for it directly, but both need it. Schedule it intentionally: "What do you need from me right now?"',
    underStressTogether: 'Both disintegrate to 8: unexpressed resentment erupts as controlling or manipulative behavior. The normally generous energy turns possessive.',
    growthTogether: 'Help each other notice when giving is transactional. Model integration to 4 — practicing authentic self-expression rather than always redirecting focus to others\' needs.',
  },

  '3-3': {
    synergies: 'High-performing, adaptable, and mutually motivating. Two 3s can accomplish extraordinary things together when their goals align — both understand hustle and both speak the language of results.',
    frictionPoints: 'Image management becomes a shared performance. Neither wants to show failure to the other, so problems get hidden until they\'re too big to ignore.',
    communicationRules: 'Create explicit "no spin" time — agreements to share what\'s actually happening without the success narrative. Both need permission to be real.',
    underStressTogether: 'Both disintegrate to 9: when overwhelmed, both go numb and autopilot — productivity continues but authenticity vanishes. The work keeps moving; the people disappear.',
    growthTogether: 'Model integration to 6 for each other — the move toward genuine commitment and loyalty rather than performing commitment for an audience.',
  },

  '4-4': {
    synergies: 'Deep mutual understanding of emotional complexity, creative depth, and the desire to do meaningful work. Neither pathologizes the other\'s intensity.',
    frictionPoints: 'Emotional amplification. Both process through feeling; when one is in a trough, the other\'s empathy can pull them in rather than providing stability.',
    communicationRules: 'Establish a "who holds the ground today" norm — someone needs to stay regulated so the other can process. Take turns being the stable one.',
    underStressTogether: 'Both disintegrate to 2: emotional turbulence shifts into manipulation, over-involvement in each other\'s feelings, and losing individual perspective.',
    growthTogether: 'Model the integration path to 1 — channeling emotional depth into disciplined action and principled execution rather than staying in the feeling.',
  },

  '5-5': {
    synergies: 'Intellectual depth without performance pressure. Two 5s can collaborate on complex problems with minimal friction — both respect each other\'s need for space and both contribute genuine expertise.',
    frictionPoints: 'Execution gap. Both prefer to analyze; neither naturally drives toward implementation or stakeholder management. Projects can stall in perpetual refinement.',
    communicationRules: 'Establish output agreements: "By when and in what form will we share findings?" Without explicit commitments, both may assume the other will initiate.',
    underStressTogether: 'Both disintegrate to 7: the controlled withdrawal breaks into scattered, impulsive thinking. The usual analytical rigor becomes unfocused and reactive.',
    growthTogether: 'Model integration to 8 for each other — the move from expertise-hoarding to using knowledge for direct impact and confident action in the world.',
  },

  '6-6': {
    synergies: 'Exceptional loyalty, thorough risk assessment, and deeply reliable partnership. Two 6s build relationships that last through genuine adversity.',
    frictionPoints: 'Anxiety reinforcement. Both are wired to anticipate what can go wrong; together they can catastrophize or create a vigilance loop that never reaches "safe enough."',
    communicationRules: 'Separate fact from fear explicitly: "Is this a real risk or are we spiraling?" Give each other explicit permission to call out worst-case thinking.',
    underStressTogether: 'Both disintegrate to 3: anxiety-driven performance kicks in — projecting confidence they don\'t feel, pushing harder while the internal alarm stays on.',
    growthTogether: 'Model integration to 9 for each other — practicing trust in the process and in each other, even without certainty.',
  },

  '7-7': {
    synergies: 'Boundless energy, creative range, and genuine optimism. Two 7s can generate more possibilities in an afternoon than most teams do in a quarter.',
    frictionPoints: 'Follow-through collapses. Both are energized by the new and depleted by the tedious. Commitments multiply faster than completions.',
    communicationRules: 'Name what "done" looks like before starting. Build explicit accountability checkpoints — not because either lacks integrity, but because both need external structure to counter internal restlessness.',
    underStressTogether: 'Both disintegrate to 1: the joyful improvisation becomes rigid and hypercritical — "we\'re doing this wrong" replaces "let\'s try everything."',
    growthTogether: 'Model integration to 5 for each other — the move toward depth over breadth, and discovering that staying with one thing longer reveals more richness than constant novelty.',
  },

  '8-8': {
    synergies: 'Formidable force when aligned — both bring intensity, decisiveness, and genuine respect for each other\'s directness. Two 8s don\'t waste each other\'s time.',
    frictionPoints: 'Territory conflicts are inevitable. Both instinctively claim authority; without explicit role separation, every decision becomes a power contest.',
    communicationRules: 'Establish domains of authority before starting. Be direct but lead with shared goals: "Here\'s what I need to protect and why." Respect that pushback is how 8s show engagement, not disrespect.',
    underStressTogether: 'Both disintegrate to 5: the outward intensity inverts — both withdraw, become secretive, and stop engaging. The silence is more dangerous than the conflict.',
    growthTogether: 'Model integration to 2 for each other — discovering that genuine vulnerability and care for others multiplies influence rather than undermining it.',
  },

  '9-9': {
    synergies: 'Deeply harmonious, low-friction collaboration. Both prioritize peace and both genuinely care about maintaining the relationship. Steady, sustainable partnership.',
    frictionPoints: 'Decision inertia. Neither wants to impose a direction and neither wants to be seen as the source of conflict. Important choices drift.',
    communicationRules: 'Assign a "decider" role explicitly for each project — someone who has permission to make the call when consensus stalls. Rotate the role so neither feels permanently burdened.',
    underStressTogether: 'Both disintegrate to 6: the comfortable diffuseness gives way to anxiety, suspicion, and worst-case thinking. The normally peaceful relationship becomes paranoid.',
    growthTogether: 'Model integration to 3 for each other — finding the self-assertion and directed energy that turns good intentions into actual impact.',
  },

  // ═══════════════════════════════════════
  // SAME-TRIAD PAIRINGS (9)
  // ═══════════════════════════════════════

  // GUT: 1-8, 1-9, 8-9
  '1-8': {
    synergies: 'Both are direct, principled, and resistant to compromise on what they believe is right. Can build formidable change when their values align — 1 provides the ethical framework, 8 provides the force to implement it.',
    frictionPoints: '1 wants correctness; 8 wants strength. 1\'s rule-following frustrates 8\'s instinct to challenge the rules. 8\'s bluntness triggers 1\'s resentment about disrespect.',
    communicationRules: '1: lead with the principled rationale before the procedural argument — 8 cares about "right vs. wrong," not "correct vs. incorrect." 8: respect that 1\'s standards aren\'t arbitrary; slow down enough to explain your reasoning.',
    underStressTogether: 'Both withdraw into their gut-based anger differently — 1 becomes hypercritical and self-righteous, 8 becomes controlling and aggressive. The relationship can feel like two people who simultaneously fight and stonewall.',
    growthTogether: '1 learns from 8 how to express anger directly rather than suppressing it as resentment. 8 learns from 1 how to channel intensity into principled, sustainable action.',
  },

  '1-9': {
    synergies: 'Both share deep Gut-center values and a desire to live with integrity. 9 provides the calm stability that prevents 1\'s inner critic from running too hot; 1 provides principled direction for 9\'s inclusive energy.',
    frictionPoints: '1 is active about standards; 9 avoids the discomfort of enforcing them. 1 experiences 9\'s non-judgment as moral indifference. 9 experiences 1\'s criticism as aggression.',
    communicationRules: '1: raise concerns gently and one at a time — 9 hears a barrage as personal rejection. 9: commit to voicing concerns before they accumulate into passive-aggressive resistance.',
    underStressTogether: '1 becomes more rigid and critical; 9 numbs out and withdraws. The pairing\'s gentle surface masks building resentment on both sides that neither names directly.',
    growthTogether: '9 helps 1 accept what\'s good enough; 1 helps 9 find the conviction to act on their actual opinions.',
  },

  '8-9': {
    synergies: 'Complementary energy — 8 provides the force and 9 provides the gravitational center. 9 softens 8\'s edges without challenging their authority; 8 gives 9 a direction to organize around.',
    frictionPoints: '8 moves fast and expects people to keep pace; 9 needs time to process and may comply outwardly while building internal resentment. 8 doesn\'t notice what\'s not said; 9 never says it.',
    communicationRules: '8: create explicit space for 9\'s input — ask "what do you actually think?" and wait for the full answer. 9: practice naming preferences in the moment rather than after the fact.',
    underStressTogether: '8 escalates intensity while 9 dissociates. The louder 8 gets, the further 9 retreats — which triggers more 8 intensity. Classic escalation-withdrawal loop.',
    growthTogether: '9 learns from 8 how to access and express their own power. 8 learns from 9 how to create space for others\' truth before acting.',
  },

  // HEART: 2-3, 2-4, 3-4
  '2-3': {
    synergies: 'Both Heart types oriented toward success and social connection. 2 manages relationships while 3 drives results — a natural support-and-achievement partnership.',
    frictionPoints: '2\'s help is people-focused; 3\'s performance is image-focused. 2 may feel 3 uses relationships instrumentally. 3 may feel 2\'s emotional attunement slows down execution.',
    communicationRules: '2: acknowledge 3\'s achievements explicitly — they need recognition of what they\'ve accomplished, not just relationship. 3: name 2\'s contributions publicly and specifically.',
    underStressTogether: '3 disintegrates toward 9 (going through the motions without presence); 2 disintegrates toward 8 (resentful controlling behavior). The helpful partner becomes demanding; the high-performer becomes absent.',
    growthTogether: '3 helps 2 build an identity independent of others\' needs. 2 helps 3 develop genuine connection rather than performed warmth.',
  },

  '2-4': {
    synergies: 'Both have deep emotional intelligence and genuine care about authenticity. 2 offers warmth and support; 4 offers emotional depth and honesty. Each feels unusually understood.',
    frictionPoints: '2 gives love to earn love back; 4 needs to be loved for exactly who they are, unconditionally. 4\'s emotional turbulence can exhaust 2\'s giving impulse; 2\'s need for appreciation can feel demanding to 4.',
    communicationRules: '2: express needs directly rather than through giving — 4 will respect the honesty. 4: acknowledge 2\'s care even when you\'re in a trough; silence reads as dismissal.',
    underStressTogether: 'Both can create a codependency loop — 2 over-helps, 4 over-processes. Both lose individual boundaries in the emotional intensity of the relationship.',
    growthTogether: '4 helps 2 acknowledge their own feelings and needs. 2 helps 4 recognize that consistent care from others is real, not a performance.',
  },

  '3-4': {
    synergies: 'Both creative, emotionally intelligent, and driven to make an impact. 3\'s execution ability gives 4\'s deep ideas a path to reality.',
    frictionPoints: '3 adapts image for success; 4 refuses adaptation as self-betrayal. 3 sees 4\'s emotional rawness as counterproductive; 4 sees 3\'s image management as inauthentic.',
    communicationRules: '3: demonstrate authenticity through vulnerability, not polish — 4 will trust you more when you admit what\'s hard. 4: translate emotional insights into impact language that 3 can act on.',
    underStressTogether: '3 disintegrates toward 9 (disengagement); 4 disintegrates toward 2 (emotional over-involvement). The partnership loses both direction and grounding simultaneously.',
    growthTogether: '4 helps 3 develop genuine emotional depth beneath the performance. 3 helps 4 transform emotional insight into concrete achievement.',
  },

  // HEAD: 5-6, 5-7, 6-7
  '5-6': {
    synergies: 'Both are careful, analytical, and appreciate thorough preparation. 5\'s expertise provides the knowledge base; 6\'s vigilance identifies the failure modes. Excellent risk-management partnership.',
    frictionPoints: '5 withdraws when overwhelmed; 6 seeks reassurance. 5\'s self-sufficiency reads as cold detachment to 6. 6\'s worry-seeking can feel like an intrusion on 5\'s need for space.',
    communicationRules: '5: offer occasional unprompted check-ins — not because 6 needs handholding, but because they need to know you\'re present. 6: ask for data, not reassurance — it\'s easier for 5 to give.',
    underStressTogether: '5 withdraws further into their head; 6 escalates vigilance into suspicion. Neither is addressing the actual problem; both are managing fear through their defense mechanisms.',
    growthTogether: '6 helps 5 see that relationships build the safety net they\'ve been trying to construct alone. 5 helps 6 develop trust in their own analysis rather than seeking external validation.',
  },

  '5-7': {
    synergies: 'Complementary Head types — 5 goes deep, 7 goes wide. 5\'s expertise meets 7\'s range. Together they can synthesize insights across domains that neither could access alone.',
    frictionPoints: '5 wants depth and focus; 7 wants breadth and novelty. 5 feels 7 skims; 7 feels 5 obsesses. 7\'s constant pivoting disrupts 5\'s carefully constructed process.',
    communicationRules: '7: give 5 the topic in advance — spontaneous demands for complex analysis feel unfair. 5: engage 7\'s rapid-fire ideas with genuine curiosity; the seeds of good ideas are there even when rough.',
    underStressTogether: '5 disintegrates to 7 (scattered, impulsive); 7 disintegrates to 1 (hypercritical). They can switch roles: the analytical one becomes scattered while the spontaneous one becomes rigid.',
    growthTogether: '7 helps 5 discover that sharing expertise publicly amplifies impact. 5 helps 7 discover that going deep on something actually generates more stimulation than skimming everything.',
  },

  '6-7': {
    synergies: 'Complementary fear management styles. 6 prepares for worst cases; 7 assumes positive outcomes. Together they get both contingency planning and the energy to move forward despite uncertainty.',
    frictionPoints: '6 sees 7\'s optimism as dangerous naivete; 7 sees 6\'s vigilance as anxiety-inducing. 7\'s reframing can invalidate 6\'s legitimate concerns. 6\'s catastrophizing can drain 7\'s enthusiasm.',
    communicationRules: '7: take 6\'s risk scenarios seriously before offering the positive reframe — validation first. 6: let 7 know when you\'re processing vs. genuinely alarmed; they need context to calibrate.',
    underStressTogether: '6 becomes suspicious and worst-case focused; 7 escapes into distraction and avoidance. The partnership loses both analysis and follow-through simultaneously.',
    growthTogether: '7 helps 6 develop faith that they can handle whatever comes. 6 helps 7 build the discipline to prepare rather than improvise.',
  },

  // ═══════════════════════════════════════
  // CROSS-TRIAD PAIRINGS (27)
  // ═══════════════════════════════════════

  // GUT × HEART: 1-2, 1-3, 1-4, 2-8, 2-9, 3-8, 3-9, 4-8, 4-9
  '1-2': {
    synergies: '1\'s principled systems thinking and 2\'s relationship intelligence create organizations that do good AND function properly. 2 humanizes 1\'s standards; 1 structures 2\'s good intentions.',
    frictionPoints: '1 leads with impersonal correctness; 2 leads with personal connection. 1 may feel 2\'s exceptions undermine standards. 2 may feel 1\'s rules are cold and inflexible.',
    communicationRules: '1: acknowledge the relationship dimension before the principle. 2: engage with 1\'s logical framework rather than going around it to manage impressions.',
    underStressTogether: '1 becomes more hypercritical (disintegrating toward 4); 2 becomes more controlling (disintegrating toward 8). Both become more extreme versions of themselves.',
    growthTogether: '2 helps 1 see that good systems serve people, not abstract principles. 1 helps 2 build helping structures that don\'t require constant personal involvement.',
  },

  '1-3': {
    synergies: 'Both are driven, capable, and hold high standards for work product. 1 provides ethical grounding; 3 provides the execution engine. Can produce impressive, principled results.',
    frictionPoints: '1 values integrity above image; 3 values success above both. 1 may judge 3\'s self-promotion as shallow. 3 may feel 1\'s perfectionism wastes momentum.',
    communicationRules: '1: acknowledge 3\'s achievements — they need recognition of what they\'ve accomplished, not just how well they followed the process. 3: show the work, not just the result — 1 trusts effort and transparency.',
    underStressTogether: '1 becomes rigid and self-righteous; 3 disengages and goes through the motions. The partnership produces technically correct outputs with diminishing authentic investment.',
    growthTogether: '3 helps 1 value progress over perfection. 1 helps 3 anchor success in genuine quality rather than projected image.',
  },

  '1-4': {
    synergies: 'Both are idealistic and deeply committed to meaningful work. 1\'s principled structure and 4\'s creative depth can produce work that is both beautiful and functional.',
    frictionPoints: '1 wants objective standards; 4 wants subjective authenticity. 1 judges 4\'s emotional variability as self-indulgence. 4 judges 1\'s rule-following as suppression of genuine expression.',
    communicationRules: '1: engage 4\'s emotional reasoning as data rather than noise — it often contains valid signals wrapped in feeling. 4: translate emotional insights into principled arguments that 1 can engage with.',
    underStressTogether: '1 disintegrates toward 4 (dramatic, self-critical); 4 disintegrates toward 2 (emotionally manipulative). Both become more difficult to reach and less able to do their best work.',
    growthTogether: '4 helps 1 integrate emotional honesty into their standards. 1 helps 4 channel creative depth into disciplined execution.',
  },

  '2-8': {
    synergies: 'Powerful complementary dynamic — 8 provides the force and authority; 2 manages the human dimension. 2\'s care softens 8\'s impact; 8\'s directness gives 2 the protection they often need.',
    frictionPoints: '2 gives to feel needed; 8 is intensely self-sufficient. 8\'s independence can leave 2 feeling unnecessary. 2\'s helping can feel to 8 like an attempt to create obligation.',
    communicationRules: '8: express appreciation explicitly — 2 reads silence as indifference. 2: express your own needs directly — 8 respects straightforwardness and is bewildered by indirect requests for care.',
    underStressTogether: '2 becomes controlling and resentful; 8 becomes aggressive and domineering. The normally supportive relationship tips into a power struggle.',
    growthTogether: '8 helps 2 develop independence and direct self-advocacy. 2 helps 8 discover that vulnerability strengthens rather than undermines their authority.',
  },

  '2-9': {
    synergies: 'Highly harmonious, people-centered partnership. Both genuinely care about others\' well-being and both create warm, inclusive environments naturally.',
    frictionPoints: 'Both avoid conflict and both suppress their own needs. This can produce a relationship that is externally harmonious but internally dishonest — neither names what\'s actually happening.',
    communicationRules: '2: ask for what you need directly, without framing it as care for the other. 9: name your preferences before "going with the flow" — 2 will keep giving without knowing if it\'s what you actually want.',
    underStressTogether: '2 disintegrates toward 8 (controlling); 9 disintegrates toward 6 (anxious). The normally gentle partnership becomes tense as unexpressed needs emerge as aggression and suspicion.',
    growthTogether: '9 helps 2 discover the value of genuine peace — not earned through service but inherent. 2 helps 9 see that their needs matter to others.',
  },

  '3-8': {
    synergies: 'High-output, high-authority partnership. Both are assertive, achievement-focused, and comfortable with power. Can build significant things quickly when pointed at the same goal.',
    frictionPoints: '3 manages image; 8 is blunt about reality. 8\'s directness punctures the 3\'s narrative management. 3\'s performance focus can read to 8 as inauthentic or manipulative.',
    communicationRules: '3: be honest about setbacks early — 8 can handle bad news but not spin. 8: direct feedback delivered without the editorial can land better with 3 than the full force of 8 honesty.',
    underStressTogether: '3 disengages and goes through the motions; 8 withdraws into strategic isolation. Both stop investing in the relationship while continuing to perform function.',
    growthTogether: '8 helps 3 build identity grounded in authentic action rather than projected image. 3 helps 8 understand the strategic value of managing how their power is perceived.',
  },

  '3-9': {
    synergies: '3\'s ambition is grounded and humanized by 9\'s inclusive steadiness. 9\'s stability allows 3 to focus on achievement without burning the relationship capital they need.',
    frictionPoints: '3 drives forward; 9 maintains equilibrium. 3 may feel 9 lacks urgency. 9 may feel 3\'s constant drive disrupts the stability they value.',
    communicationRules: '3: include 9 in directional decisions rather than announcing changes — 9 needs to feel part of the vision, not just handed tasks. 9: voice preferences about pace and direction before you\'re running on empty.',
    underStressTogether: '3 disintegrates toward 9 (empty performance); 9 disintegrates toward 6 (anxious). Both lose their usual effectiveness — the driver stops driving, the stabilizer stops stabilizing.',
    growthTogether: '9 helps 3 slow down enough to connect authentically with their work and relationships. 3 helps 9 discover that pursuing goals actively creates peace, not disrupts it.',
  },

  '4-8': {
    synergies: 'Both are intense, authentic, and allergic to pretense. 4\'s emotional depth and 8\'s direct power can create an unusually honest partnership — neither performs for the other.',
    frictionPoints: '4 wants to be understood in all their complexity; 8 doesn\'t have patience for extended emotional processing. 8\'s bluntness can wound 4; 4\'s emotional turbulence can exhaust 8.',
    communicationRules: '8: slow down for the emotional dimension — 4\'s intensity is data. 4: distill the emotional insight into something actionable before engaging 8; they respond to clarity.',
    underStressTogether: '4 becomes emotionally dysregulated; 8 becomes combative. The authenticity that makes this pairing work becomes raw and uncontained under pressure.',
    growthTogether: '8 helps 4 channel emotional depth into real-world impact. 4 helps 8 access the vulnerability and empathy that constitute their integration path.',
  },

  '4-9': {
    synergies: '4\'s creative intensity is stabilized by 9\'s non-judgmental acceptance. 9 is one of the few types that doesn\'t flinch at 4\'s emotional range; 4 appreciates being received without attempt to fix.',
    frictionPoints: '4 seeks engagement with their inner world; 9 may just accept without truly engaging. 4 may feel unseen in a different way — accepted but not really known. 9 can be overwhelmed by 4\'s emotional demands.',
    communicationRules: '4: distinguish between wanting to be heard and wanting 9 to actively engage — be explicit about which you need. 9: practice genuine reflection rather than reflexive validation.',
    underStressTogether: '4 becomes more intensely self-absorbed; 9 retreats further from their own agency. The partnership can get stuck in an emotional holding pattern with no forward momentum.',
    growthTogether: '9 helps 4 find peace that isn\'t contingent on being fully understood. 4 helps 9 discover and express their own genuine emotional experience.',
  },

  // GUT × HEAD: 1-5, 1-6, 1-7, 5-8, 5-9, 6-8, 6-9, 7-8, 7-9
  '1-5': {
    synergies: 'Both are analytical, principled, and concerned with doing things correctly. 1\'s standards combine with 5\'s expertise to produce rigorous, defensible work.',
    frictionPoints: '1\'s standards are externally applied; 5\'s knowledge is internally contained. 1 wants clear processes followed; 5 wants autonomy to determine the right approach. 1 can feel 5 is withholding; 5 can feel 1 is imposing.',
    communicationRules: '1: engage 5\'s expertise before asserting standards — ask for their analysis of the right way before prescribing one. 5: share the reasoning behind your approach; 1 trusts logic more than authority.',
    underStressTogether: '1 becomes more rigid and critical; 5 withdraws further. The quality they could produce together becomes inaccessible as 5 retreats and 1 criticizes the retreat.',
    growthTogether: '5 helps 1 develop the intellectual humility to admit uncertainty. 1 helps 5 translate expertise into principled action rather than indefinite research.',
  },

  '1-6': {
    synergies: 'Both responsible, careful, and driven by a need to do things right. 1\'s ethical standards and 6\'s loyal reliability create trustworthy, high-integrity partnerships.',
    frictionPoints: '1\'s standards are about correctness; 6\'s vigilance is about security. 1 may feel 6\'s questioning is challenge rather than due diligence. 6 may feel 1\'s rigidity provides false security.',
    communicationRules: '1: recognize 6\'s questions as genuine due diligence, not obstruction. 6: trust 1\'s systems enough to act without resolving every contingency; some risk is acceptable.',
    underStressTogether: '1 becomes hypercritical (disintegrating to 4); 6 becomes anxious and suspicious (disintegrating to 3). Both feel increasingly let down by the other\'s reliability.',
    growthTogether: '6 helps 1 build structures flexible enough to survive reality. 1 helps 6 develop internal certainty that doesn\'t depend on external guarantees.',
  },

  '1-7': {
    synergies: 'Productive creative tension — 1\'s discipline and 7\'s imagination can produce both ambitious vision and rigorous execution. 7 keeps 1 from over-constraining; 1 keeps 7 from over-promising.',
    frictionPoints: '1 believes in rules; 7 believes in options. 1\'s rigor feels like constraint to 7\'s exploratory instinct. 7\'s improvisation looks like sloppy thinking to 1.',
    communicationRules: '1: give 7 the framework, not the fixed path — "the goal is X, the constraints are Y, how do you want to get there?" 7: honor 1\'s process commitments rather than restarting; it\'s not rigidity, it\'s respect.',
    underStressTogether: '7 disintegrates to 1 (hypercritical, rigid); 1 is already there. Together under pressure they can become unpleasantly rigid and mutual-fault-finding.',
    growthTogether: '7 helps 1 discover that joy and rigor can coexist. 1 helps 7 discover that committing to one direction fully generates more real freedom than keeping all options open.',
  },

  '5-8': {
    synergies: 'Expertise meets force — 5\'s deep analysis combined with 8\'s decisive action creates a high-impact partnership. 8 trusts 5\'s knowledge; 5 trusts 8\'s instinct for action.',
    frictionPoints: '5 needs time to prepare and synthesize; 8 acts fast and expects others to keep pace. 8\'s bluntness can feel like an invasion of 5\'s carefully maintained boundaries.',
    communicationRules: '8: give 5 advance notice before expecting analysis — "I need your read on X by end of day" is fair; "what do you think about X, right now?" is not. 5: share conclusions before the full reasoning chain; 8 decides on synthesis, not detail.',
    underStressTogether: '5 disintegrates to 7 (scattered and impulsive); 8 disintegrates to 5 (secretive and withdrawn). Both become harder to reach and neither is operating from their natural strength.',
    growthTogether: '8 helps 5 discover that acting on incomplete information is sometimes exactly right. 5 helps 8 develop the analytical patience that prevents costly errors.',
  },

  '5-9': {
    synergies: 'Both need significant space and neither seeks to control the other. 5\'s knowledge and 9\'s receptive steadiness create a quiet, sustainable partnership.',
    frictionPoints: 'Both may avoid conflict to the point where important issues go unaddressed. Neither initiates difficult conversations naturally; problems can go unnamed for too long.',
    communicationRules: '5: check in on relational health explicitly — 9 won\'t raise issues until they\'re critical. 9: name concerns in the moment rather than accumulating them into eventual shutdown.',
    underStressTogether: '5 withdraws into their head; 9 dissociates and goes through the motions. The partnership can feel functional on the surface while both are essentially absent.',
    growthTogether: '9 helps 5 see that genuine presence with others doesn\'t require losing themselves. 5 helps 9 develop clarity of thought that gives their wisdom structure.',
  },

  '6-8': {
    synergies: '6\'s thorough preparation and 8\'s decisive action make a powerful risk management team. 8 provides the authority that 6\'s security needs; 6\'s vigilance protects 8 from blind spots.',
    frictionPoints: '8 moves fast and takes risks; 6 prepares and anticipates failure modes. 8 can read 6\'s questions as disloyalty. 6 can read 8\'s confidence as dangerous overreach.',
    communicationRules: '8: treat 6\'s risk questions as useful intelligence, not challenge to authority. 6: state your concerns as clear "if X then Y" scenarios rather than generalized worry — it\'s easier for 8 to engage concretely.',
    underStressTogether: '6 disintegrates toward 3 (performing confidence they don\'t feel); 8 disintegrates toward 5 (withdrawing). The outward confidence of both masks real fragility.',
    growthTogether: '8 helps 6 develop trust in their own capacity to handle what comes. 6 helps 8 understand that thorough preparation amplifies rather than diminishes decisive action.',
  },

  '6-9': {
    synergies: 'Both value security, loyalty, and stable relationships. The combination of 6\'s preparation and 9\'s harmonizing creates reliably safe, well-managed environments.',
    frictionPoints: 'Both avoid conflict and both need security — but for different reasons. 6\'s anxiety can disrupt 9\'s hard-won equanimity. 9\'s conflict avoidance can leave 6\'s security needs unaddressed.',
    communicationRules: '6: distinguish between risk assessment and anxiety spiral — 9 can engage the former. 9: offer reassurance through action, not just presence — 6 needs evidence of engagement, not just calm.',
    underStressTogether: 'Both disintegrate toward types that increase fragmentation: 6 toward suspicious 3-level performance, 9 toward anxious 6-level vigilance. Normally stable, they become unpredictably reactive.',
    growthTogether: '9 helps 6 develop the inner peace that doesn\'t depend on eliminating risk. 6 helps 9 develop the vigilance and preparation that makes peace sustainable.',
  },

  '7-8': {
    synergies: 'High-energy, fast-moving, and fearless. Both are assertive, optimistic about their capacity, and willing to go big. 7 generates the ideas; 8 drives the execution. Tremendous range.',
    frictionPoints: '7 wants freedom and options; 8 wants control and results. 8 can close off options 7 hasn\'t finished exploring. 7\'s restlessness can undermine 8\'s need for committed execution.',
    communicationRules: '8: give 7 creative latitude within clear boundaries — "own this domain, make it work." 7: commit to the plan once made rather than continuing to generate alternatives; 8 needs reliability.',
    underStressTogether: '7 disintegrates toward 1 (hypercritical); 8 disintegrates toward 5 (withdrawn). The usual high energy goes cold — both become harder, less engaged versions of themselves.',
    growthTogether: '8 helps 7 discover the satisfaction of sustained commitment. 7 helps 8 find the joy in the journey rather than only in the destination.',
  },

  '7-9': {
    synergies: 'Both positive-outlook types that create warm, optimistic environments. 7\'s energy and 9\'s steadiness balance each other — 7 keeps 9 from stagnating; 9 keeps 7 from burning out.',
    frictionPoints: '7 is constantly generating new directions; 9 needs stability and consistency. 7\'s pace can exhaust 9; 9\'s resistance to change can frustrate 7.',
    communicationRules: '7: introduce change gradually rather than all at once — 9 needs transition time. 9: express pace preferences directly before you\'re overwhelmed; 7 is genuinely responsive to clear feedback.',
    underStressTogether: '7 disintegrates toward 1 (critical and joyless); 9 disintegrates toward 6 (anxious). The normally pleasant partnership becomes tense and problem-focused.',
    growthTogether: '9 helps 7 develop the ability to be fully present in what\'s already good. 7 helps 9 discover that pursuing new experiences actively creates vitality rather than disrupting peace.',
  },

  // HEART × HEAD: 2-5, 2-6, 2-7, 3-5, 3-6, 3-7, 4-5, 4-6, 4-7
  '2-5': {
    synergies: 'Complementary in a high-functional way: 2 manages the relational environment so 5 can focus; 5 provides the expertise that makes 2\'s support substantively valuable.',
    frictionPoints: '2 needs closeness and connection; 5 needs distance and autonomy. 2\'s attentiveness can feel intrusive to 5. 5\'s detachment can feel withholding to 2.',
    communicationRules: '2: respect 5\'s need for advance notice and space — scheduled check-ins work better than spontaneous emotional bids. 5: offer small unprompted updates; 2 interprets silence as absence.',
    underStressTogether: '2 disintegrates toward 8 (controlling); 5 withdraws further. The 5\'s retreat triggers increasingly demanding 2 behavior — the exact opposite of what brings 5 back.',
    growthTogether: '5 helps 2 find competence and self-reliance that don\'t depend on being needed. 2 helps 5 discover that relationships provide sustenance rather than drain resources.',
  },

  '2-6': {
    synergies: 'Both deeply loyal, relationship-oriented, and motivated to support the people they\'re committed to. Build genuine trust through consistent follow-through on care.',
    frictionPoints: '2 may over-give and create obligations 6 didn\'t ask for; 6 may find 2\'s help anxiety-inducing rather than reassuring. Both avoid conflict, so friction accumulates before it\'s addressed.',
    communicationRules: '2: check what support 6 actually wants before providing it — asked-for help builds trust; unsolicited help can feel like evaluation. 6: express specific needs rather than general worry.',
    underStressTogether: 'Both become more fear-driven in their care — 2 controls through helping; 6 tests loyalty through suspicion. The relationship can become suffocating rather than supportive.',
    growthTogether: '6 helps 2 develop trust that relationships can survive imperfection. 2 helps 6 feel genuinely secure through consistent, unconditional presence.',
  },

  '2-7': {
    synergies: 'Warm, outgoing, and energizing. Both are people-oriented and both bring optimism. 2\'s genuine care gives 7\'s enthusiasm a relational foundation.',
    frictionPoints: '2 focuses care on others; 7 focuses attention on experiences and possibilities. 2 may feel 7 doesn\'t slow down enough to genuinely connect. 7 may feel 2\'s emotional engagement is constraining.',
    communicationRules: '7: pause and fully acknowledge 2\'s care before moving to the next thing — it costs little and means a great deal. 2: stay curious about 7\'s world rather than redirecting toward relationship needs.',
    underStressTogether: '2 becomes controlling and resentful; 7 becomes critical and rigidly problem-focused. The normally positive pairing becomes unexpectedly tense.',
    growthTogether: '7 helps 2 discover the pleasure of experiences for their own sake. 2 helps 7 develop the relational depth that makes experiences meaningful.',
  },

  '3-5': {
    synergies: 'Achievement meets expertise. 3\'s execution ability and 5\'s analytical depth can produce work that is both ambitious and rigorously grounded.',
    frictionPoints: '3 wants visible success and recognition; 5 values private competence over public acknowledgment. 3 may see 5\'s reluctance to promote as a missed opportunity. 5 may see 3\'s promotion as hollow.',
    communicationRules: '3: bring 5 into the work process, not just the outcome — they need to see the full picture. 5: communicate your expertise in impact language that connects to 3\'s goals.',
    underStressTogether: '3 disintegrates toward 9 (disengaged); 5 disintegrates toward 7 (scattered). Both lose their defining strength — the achiever stops achieving; the analyst stops analyzing.',
    growthTogether: '5 helps 3 build genuine competence beneath the performance. 3 helps 5 see that sharing expertise visibly multiplies its impact.',
  },

  '3-6': {
    synergies: '3\'s confident execution and 6\'s thorough preparation make a strong launch-and-sustain team. 3 drives past obstacles; 6 anticipates them before they arrive.',
    frictionPoints: '3 projects confidence to manage impressions; 6 is hypervigilant about authenticity. 6 may distrust 3\'s smooth presentation as spin. 3 may feel 6\'s worst-case thinking undercuts momentum.',
    communicationRules: '3: be transparent about obstacles rather than managing the narrative — 6\'s trust depends on full disclosure. 6: distinguish between legitimate risk analysis and anxiety that masquerades as due diligence.',
    underStressTogether: '3 goes through the motions; 6 escalates vigilance and suspicion. The pairing can become unproductively critical precisely when trust is most needed.',
    growthTogether: '6 helps 3 develop genuine commitment that doesn\'t depend on an audience. 3 helps 6 build the confidence that comes from repeatedly executing despite fear.',
  },

  '3-7': {
    synergies: 'High-energy, optimistic, and fast-moving. Both are assertive, future-oriented, and comfortable with change. One of the most naturally energizing pairings.',
    frictionPoints: 'Both can generate enormous enthusiasm without building the systems to sustain it. Neither naturally focuses on what could go wrong or what maintenance is required.',
    communicationRules: '3: slow down enough to check 7\'s follow-through commitments — enthusiasm doesn\'t always convert to execution. 7: engage with 3\'s finishing impulse rather than treating project closure as the start of the next project.',
    underStressTogether: '3 disintegrates toward 9 (empty motion); 7 disintegrates toward 1 (hypercritical). Normally fast-moving, both suddenly lose direction and find fault in everything.',
    growthTogether: '7 helps 3 find genuine pleasure in the process, not just the achievement. 3 helps 7 discover the freedom of fully committing to something specific.',
  },

  '4-5': {
    synergies: 'Both are introspective, non-conformist, and depth-seekers. 4\'s emotional intelligence and 5\'s analytical depth can produce unusually insightful work. Both have high tolerance for each other\'s intensity.',
    frictionPoints: 'Both withdraw under stress and both resist the pragmatic middle. 4 processes through emotion; 5 processes through analysis. Neither naturally meets the other\'s preferred engagement mode.',
    communicationRules: '4: offer the insight embedded in the emotion, not just the emotion — 5 connects to the intellectual content. 5: acknowledge the emotional dimension before analyzing it — 4 needs to feel heard before engaging intellectually.',
    underStressTogether: 'Both can disappear into their respective inner worlds — 4 into emotional intensity; 5 into analytical abstraction. The partnership can become productively isolated from practical reality.',
    growthTogether: '5 helps 4 develop the conceptual framework that makes emotional insights communicable. 4 helps 5 discover that emotional experience is data, not noise.',
  },

  '4-6': {
    synergies: 'Both authentic and uninterested in surface-level interaction. 4\'s emotional depth meets 6\'s genuine loyalty — when this pairing clicks, it\'s unusually real.',
    frictionPoints: '4\'s emotional variability unsettles 6\'s need for stability and predictability. 6\'s anxiety can feel to 4 like misunderstanding their depth. 4\'s moods can trigger 6\'s catastrophizing.',
    communicationRules: '4: reassure 6 when you\'re in a trough — "I\'m processing X, it\'s not about you" prevents the anxiety spiral. 6: don\'t interpret 4\'s emotional states as evidence of instability.',
    underStressTogether: '4 disintegrates toward 2 (manipulative and needy); 6 disintegrates toward 3 (performative and defensive). Both are operating from hidden need rather than genuine presence.',
    growthTogether: '6 helps 4 develop the security that comes from consistent relationships. 4 helps 6 develop tolerance for the ambiguity that makes deep experience possible.',
  },

  '4-7': {
    synergies: 'Creative range meets emotional depth. 7\'s expansive optimism can lift 4 out of the trough; 4\'s depth can give 7\'s enthusiasm genuine substance.',
    frictionPoints: '4 wants to explore depth; 7 wants to explore breadth. 7\'s movement away from pain (via reframing) can invalidate 4\'s need to dwell in difficulty. 4\'s intensity can deplete 7\'s energy.',
    communicationRules: '7: resist the impulse to reframe 4\'s pain as perspective — listen to it first. 4: engage 7\'s positive energy rather than interpreting it as shallow; the joy is real, even if it doesn\'t last.',
    underStressTogether: '4 disintegrates toward 2 (emotionally demanding); 7 disintegrates toward 1 (critical and rigid). Both become harder to reach and both become sources of demand rather than support.',
    growthTogether: '7 helps 4 discover that the full range of experience includes joy, not just depth. 4 helps 7 discover that staying with difficulty produces insight unavailable to those who escape it.',
  },
}

/**
 * Get the pairing analysis for two Enneagram types.
 * Order doesn't matter — getEnneagramPairing(8, 1) === getEnneagramPairing(1, 8).
 *
 * @param {number|string} typeA  Enneagram type number (1-9)
 * @param {number|string} typeB  Enneagram type number (1-9)
 * @returns {EnneagramPairing|null}
 */
export function getEnneagramPairing(typeA, typeB) {
  const a = parseInt(typeA, 10)
  const b = parseInt(typeB, 10)
  if (!ENNEAGRAM_TYPES[a] || !ENNEAGRAM_TYPES[b]) return null

  const key = a <= b ? `${a}-${b}` : `${b}-${a}`
  return PAIRINGS[key] ?? null
}

/**
 * Get all pairings where either type equals the given type.
 * Useful for showing everything related to Cain's type (8).
 *
 * @param {number|string} type  Enneagram type number (1-9)
 * @returns {Array<{ key: string, pairing: EnneagramPairing }>}
 */
export function getPairingsForType(type) {
  const t = parseInt(type, 10)
  return Object.entries(PAIRINGS)
    .filter(([key]) => {
      const [a, b] = key.split('-').map(Number)
      return a === t || b === t
    })
    .map(([key, pairing]) => ({ key, pairing }))
}

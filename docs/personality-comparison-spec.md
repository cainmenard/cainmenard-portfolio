# Personality Comparison Feature — Full Implementation Spec

## Overview

Add an interactive personality comparison feature to cainmenard.com/personality that lets visitors input or take assessments across five frameworks, then see side-by-side visualizations and collaboration insights compared against Cain Menard's results.

**Key constraints:**
- No persistent data storage — all visitor state resets on page reload (React state / in-memory only)
- Match existing dark theme and component patterns
- Mobile responsive
- Legal disclaimers required for all unofficial assessments

---

## Cain Menard's Profile (Hardcoded Reference Data)

```json
{
  "name": "Cain Menard",
  "mbti": {
    "type": "ENTJ",
    "variant": "A",
    "label": "Commander",
    "dichotomies": {
      "EI": { "label": "Extraverted", "code": "E", "percentage": 68 },
      "SN": { "label": "Intuitive", "code": "N", "percentage": 73 },
      "TF": { "label": "Thinking", "code": "T", "percentage": 65 },
      "JP": { "label": "Judging", "code": "J", "percentage": 61 },
      "AT": { "label": "Assertive", "code": "A", "percentage": 65 }
    },
    "cognitiveStack": [
      { "function": "Te", "role": "Dominant", "label": "Extraverted Thinking" },
      { "function": "Ni", "role": "Auxiliary", "label": "Introverted Intuition" },
      { "function": "Se", "role": "Tertiary", "label": "Extraverted Sensing" },
      { "function": "Fi", "role": "Inferior", "label": "Introverted Feeling" }
    ]
  },
  "disc": {
    "primary": "D",
    "style": "D",
    "label": "Producer",
    "description": "High Dominance"
  },
  "enneagram": {
    "type": 8,
    "wing": 7,
    "label": "The Maverick",
    "triad": "Gut",
    "coreEmotion": "Anger",
    "integrationPoint": 2,
    "disintegrationPoint": 5,
    "hornevianGroup": "Assertive",
    "harmonicGroup": "Reactive"
  },
  "instinctiveDrives": {
    "verify": 7,
    "authenticate": 7,
    "complete": 3,
    "improvise": 3,
    "label": "Verify · Authenticate"
  },
  "proScan": {
    "dominance": "High",
    "extroversion": "High",
    "pace": "Low",
    "conformity": "Low",
    "logic": "Fact",
    "energyStyle": ["Thrust"],
    "energyLevel": "High"
  }
}
```

---

## Framework 1: MBTI / 16 Personalities

### All 16 Types with Cognitive Function Stacks

```json
{
  "ENTJ": { "stack": ["Te","Ni","Se","Fi"], "quadra": "Gamma", "temperament": "NT" },
  "INTJ": { "stack": ["Ni","Te","Fi","Se"], "quadra": "Gamma", "temperament": "NT" },
  "ESFP": { "stack": ["Se","Fi","Te","Ni"], "quadra": "Gamma", "temperament": "SP" },
  "ISFP": { "stack": ["Fi","Se","Ni","Te"], "quadra": "Gamma", "temperament": "SP" },
  "ENTP": { "stack": ["Ne","Ti","Fe","Si"], "quadra": "Alpha", "temperament": "NT" },
  "INTP": { "stack": ["Ti","Ne","Si","Fe"], "quadra": "Alpha", "temperament": "NT" },
  "ESFJ": { "stack": ["Fe","Si","Ne","Ti"], "quadra": "Alpha", "temperament": "SJ" },
  "ISFJ": { "stack": ["Si","Fe","Ti","Ne"], "quadra": "Alpha", "temperament": "SJ" },
  "ENFJ": { "stack": ["Fe","Ni","Se","Ti"], "quadra": "Beta", "temperament": "NF" },
  "INFJ": { "stack": ["Ni","Fe","Ti","Se"], "quadra": "Beta", "temperament": "NF" },
  "ESTP": { "stack": ["Se","Ti","Fe","Ni"], "quadra": "Beta", "temperament": "SP" },
  "ISTP": { "stack": ["Ti","Se","Ni","Fe"], "quadra": "Beta", "temperament": "SP" },
  "ENFP": { "stack": ["Ne","Fi","Te","Si"], "quadra": "Delta", "temperament": "NF" },
  "INFP": { "stack": ["Fi","Ne","Si","Te"], "quadra": "Delta", "temperament": "NF" },
  "ESTJ": { "stack": ["Te","Si","Ne","Fi"], "quadra": "Delta", "temperament": "SJ" },
  "ISTJ": { "stack": ["Si","Te","Fi","Ne"], "quadra": "Delta", "temperament": "SJ" }
}
```

### Cognitive Function Stack Rules (for algorithmic derivation)
1. E-types lead with extraverted function, I-types with introverted
2. J-types have extraverted Judging (Te or Fe) in top two; P-types have extraverted Perceiving (Ne or Se) in top two
3. Function pairs always opposite: Ti↔Fe, Te↔Fi, Si↔Ne, Se↔Ni
4. Stack alternates extravert/introvert attitudes

### MBTI Wheel Chart Layout
Position all 16 types radially. Recommended: group by Keirsey temperament into four quadrants:
- Top-right: NT (ENTJ, INTJ, ENTP, INTP)
- Top-left: NF (ENFJ, INFJ, ENFP, INFP)
- Bottom-left: SP (ESTP, ISTP, ESFP, ISFP)
- Bottom-right: SJ (ESTJ, ISTJ, ESFJ, ISFJ)

Opposite types diametrically across (ENTJ ↔ ISFP, INTJ ↔ ESFP, etc.)

### MBTI Compatibility Scoring Algorithm

```javascript
function mbtiCompatibility(typeA, typeB) {
  const types = getAllTypes(); // from data above
  const a = types[typeA];
  const b = types[typeB];
  
  let score = 50; // baseline
  
  // Dichotomy matching (S/N most important)
  if (typeA[1] === typeB[1]) score += 12; // S/N match
  else score -= 5;
  if (typeA[2] === typeB[2]) score += 8;  // T/F match
  if (typeA[0] === typeB[0]) score += 3;  // E/I match
  if (typeA[3] === typeB[3]) score += 3;  // J/P match
  
  // Cognitive function analysis
  if (a.quadra === b.quadra) score += 8;  // Same quadra bonus
  
  // Complementary dominant functions (opposite attitude, same domain)
  const domA = a.stack[0], domB = b.stack[0];
  if (areFunctionPair(domA, domB)) score += 10; // e.g., Te↔Ti
  
  // Shadow conflict (identical stack reversed = tension)
  if (isReversedStack(a.stack, b.stack)) score -= 8;
  
  return Math.min(100, Math.max(0, score));
}
```

### MBTI Interaction Categories (per pairing)
Generate for each pair:
- **Communication**: How each type prefers to give/receive information
- **Decision-Making**: Where they'll agree vs. clash on approach
- **Leadership Dynamic**: Natural hierarchy based on cognitive functions
- **Conflict Pattern**: What triggers it and how each handles it
- **Delegation Style**: What tasks suit each type's strengths

### MBTI Quiz Design (20 questions)

4 questions per dichotomy (E/I, S/N, T/F, J/P, A/T). 7-point Likert scale.

Example questions per dichotomy:

**E/I (Energy Direction)**
1. After a long day, I recharge by: [Socializing ←→ Time alone]
2. In group settings, I tend to: [Speak up first ←→ Listen then contribute]
3. I get energized by: [Variety of activities with people ←→ Deep focus on one thing]
4. When meeting new people: [I initiate conversation easily ←→ I wait for others to approach]

**S/N (Information Processing)**
1. I focus more on: [What's real and present ←→ What's possible and future]
2. I trust more: [Direct experience ←→ Theoretical patterns]
3. When explaining something: [I give specific examples ←→ I describe the big picture]
4. I'm drawn to: [Practical, proven methods ←→ Novel, innovative approaches]

**T/F (Decision-Making)**
1. When deciding, I prioritize: [Logical consistency ←→ Impact on people]
2. In disagreements, I value: [Being correct ←→ Maintaining harmony]
3. I give feedback that's: [Direct and analytical ←→ Supportive and encouraging]
4. I'm more impressed by: [Competence ←→ Compassion]

**J/P (Lifestyle Orientation)**
1. I prefer to: [Plan ahead and decide early ←→ Keep options open]
2. My workspace tends to be: [Organized with clear systems ←→ Flexible with creative clutter]
3. Deadlines make me: [Motivated to finish early ←→ Productive under pressure]
4. I prefer schedules that are: [Structured and predictable ←→ Flexible and spontaneous]

**A/T (Identity — 16personalities variant)**
1. After making a decision: [I move on confidently ←→ I wonder if it was right]
2. Under pressure: [I stay calm and collected ←→ I feel stressed and worried]
3. When criticized: [I take it in stride ←→ It affects me deeply]
4. My self-confidence is: [Generally stable ←→ Fluctuates based on circumstances]

**Scoring**: Sum responses per dichotomy. Likert midpoint = 4. Scores 1-3 = left letter (E, S, T, J, A), scores 5-7 = right letter (I, N, F, P, T). Score of 4 = slight lean toward whichever side has more extreme responses on other questions in that dichotomy. Calculate percentage as distance from midpoint normalized to 50-100%.

---

## Framework 2: DISC

### DISC Dimensions
| Dimension | High Traits | Low Traits | Focus |
|-----------|------------|------------|-------|
| **D** (Dominance) | Direct, decisive, competitive, results-oriented | Agreeable, modest, accommodating | Task + Fast |
| **I** (Influence) | Enthusiastic, persuasive, optimistic, collaborative | Reserved, reflective, cautious | People + Fast |
| **S** (Steadiness) | Patient, reliable, team-oriented, consistent | Restless, impatient, change-seeking | People + Moderate |
| **C** (Conscientiousness) | Analytical, precise, systematic, quality-focused | Unconventional, independent, flexible | Task + Moderate |

### 16 DISC Blend Positions (clockwise from 12 o'clock)

```json
[
  { "code": "D",  "angle": 0,    "primary": "D", "secondary": null, "label": "Dominant" },
  { "code": "Di", "angle": 22.5, "primary": "D", "secondary": "I",  "label": "Driver" },
  { "code": "DI", "angle": 45,   "primary": "D", "secondary": "I",  "label": "Inspirational" },
  { "code": "Id", "angle": 67.5, "primary": "I", "secondary": "D",  "label": "Influencer" },
  { "code": "I",  "angle": 90,   "primary": "I", "secondary": null, "label": "Influential" },
  { "code": "Is", "angle": 112.5,"primary": "I", "secondary": "S",  "label": "Supportive" },
  { "code": "IS", "angle": 135,  "primary": "I", "secondary": "S",  "label": "Harmonizer" },
  { "code": "Si", "angle": 157.5,"primary": "S", "secondary": "I",  "label": "Counselor" },
  { "code": "S",  "angle": 180,  "primary": "S", "secondary": null, "label": "Steady" },
  { "code": "Sc", "angle": 202.5,"primary": "S", "secondary": "C",  "label": "Stabilizer" },
  { "code": "SC", "angle": 225,  "primary": "S", "secondary": "C",  "label": "Coordinator" },
  { "code": "Cs", "angle": 247.5,"primary": "C", "secondary": "S",  "label": "Analyst" },
  { "code": "C",  "angle": 270,  "primary": "C", "secondary": null, "label": "Conscientious" },
  { "code": "Cd", "angle": 292.5,"primary": "C", "secondary": "D",  "label": "Challenger" },
  { "code": "CD", "angle": 315,  "primary": "C", "secondary": "D",  "label": "Objective" },
  { "code": "Dc", "angle": 337.5,"primary": "D", "secondary": "C",  "label": "Architect" }
]
```

### DISC Quadrant Circle Visualization
- Four colored quadrants: D=red/olive (top-left), I=orange/gold (top-right), S=green/teal (bottom-right), C=blue (bottom-left)
- Axes: Vertical = Pace (fast at top, moderate at bottom), Horizontal = Focus (task at left, people at right)
- Plot each person's position within the circle based on their blend. Pure D=12 o'clock, pure I=3 o'clock, etc.
- Cain's position: "D: Producer" = 12 o'clock position (pure D quadrant)

### DISC Interaction Rules

**D ↔ D**: Divide authority clearly. Focus on shared goals. Respect each other's domain. Risk: power struggles.
**D ↔ I**: Natural chemistry (shared fast pace). D provides direction, I rallies people. Risk: D dismisses I's relationship focus.
**D ↔ S**: Maximum tension on pace. D must slow down, introduce change gradually, actively solicit S's input. S must speak up proactively.
**D ↔ C**: D wants speed, C wants accuracy. Give C clear goals with deadlines but allow methodical execution. C provides quality checks D skips.
**I ↔ I**: Fun and energetic but may lack follow-through. Assign accountability explicitly.
**I ↔ S**: Complementary on people focus. I brings energy, S brings consistency. Risk: I overwhelms S with constant change.
**I ↔ C**: Tension between spontaneity and structure. I must respect C's need for data. C must tolerate I's brainstorming.
**S ↔ S**: Stable and reliable but risk-averse. Need external push for innovation.
**S ↔ C**: Comfortable pace match. Both methodical. Risk: slow decision-making, avoiding conflict.
**C ↔ C**: High quality output but analysis paralysis risk. Need deadlines and "good enough" checkpoints.

### DISC Quiz Design (16 questions, Most/Least format)

Each question presents 4 descriptive words. User picks MOST like them and LEAST like them. Each word maps to one DISC dimension.

Example question sets:
```
Q1:  Adventurous (D) | Playful (I) | Patient (S) | Precise (C)
Q2:  Commanding (D) | Charming (I) | Loyal (S) | Careful (C)
Q3:  Decisive (D) | Persuasive (I) | Dependable (S) | Systematic (C)
Q4:  Bold (D) | Enthusiastic (I) | Calm (S) | Thorough (C)
Q5:  Competitive (D) | Talkative (I) | Supportive (S) | Methodical (C)
Q6:  Direct (D) | Expressive (I) | Accommodating (S) | Analytical (C)
Q7:  Forceful (D) | Optimistic (I) | Steady (S) | Accurate (C)
Q8:  Daring (D) | Fun-loving (I) | Gentle (S) | Perfectionist (C)
Q9:  Results-driven (D) | People-oriented (I) | Reliable (S) | Detail-oriented (C)
Q10: Independent (D) | Sociable (I) | Cooperative (S) | Reserved (C)
Q11: Determined (D) | Inspiring (I) | Consistent (S) | Cautious (C)
Q12: Assertive (D) | Lively (I) | Even-tempered (S) | Logical (C)
Q13: Ambitious (D) | Spontaneous (I) | Predictable (S) | Disciplined (C)
Q14: Strong-willed (D) | Convincing (I) | Considerate (S) | Orderly (C)
Q15: Risk-taking (D) | Energetic (I) | Thoughtful (S) | Structured (C)
Q16: Tough-minded (D) | Magnetic (I) | Harmonious (S) | Fact-based (C)
```

**Scoring**: MOST pick = +2 for that dimension, LEAST pick = -1 for that dimension. Sum each dimension. Highest = primary, second-highest = secondary (if within 25% of primary). Map to one of 16 positions.

---

## Framework 3: Enneagram

### All 9 Types

```json
{
  "1": { "name": "The Reformer", "triad": "Gut", "coreEmotion": "Anger (internalized as resentment)", "coreFear": "Being corrupt/defective", "coreDesire": "Integrity/being good", "integration": 7, "disintegration": 4, "hornevian": "Compliant", "harmonic": "Competency", "wings": ["9","2"] },
  "2": { "name": "The Helper", "triad": "Heart", "coreEmotion": "Shame (redirected as pride)", "coreFear": "Being unwanted/unlovable", "coreDesire": "Being loved", "integration": 4, "disintegration": 8, "hornevian": "Compliant", "harmonic": "Positive Outlook", "wings": ["1","3"] },
  "3": { "name": "The Achiever", "triad": "Heart", "coreEmotion": "Shame (masked by image)", "coreFear": "Being worthless", "coreDesire": "Being valuable/admired", "integration": 6, "disintegration": 9, "hornevian": "Assertive", "harmonic": "Competency", "wings": ["2","4"] },
  "4": { "name": "The Individualist", "triad": "Heart", "coreEmotion": "Shame (amplified as envy)", "coreFear": "Having no identity", "coreDesire": "Being unique/authentic", "integration": 1, "disintegration": 2, "hornevian": "Withdrawn", "harmonic": "Reactive", "wings": ["3","5"] },
  "5": { "name": "The Investigator", "triad": "Head", "coreEmotion": "Fear (managed by withdrawing)", "coreFear": "Being useless/incompetent", "coreDesire": "Being capable/competent", "integration": 8, "disintegration": 7, "hornevian": "Withdrawn", "harmonic": "Competency", "wings": ["4","6"] },
  "6": { "name": "The Loyalist", "triad": "Head", "coreEmotion": "Fear (managed by vigilance)", "coreFear": "Being without support", "coreDesire": "Security/guidance", "integration": 9, "disintegration": 3, "hornevian": "Compliant", "harmonic": "Reactive", "wings": ["5","7"] },
  "7": { "name": "The Enthusiast", "triad": "Head", "coreEmotion": "Fear (avoided through stimulation)", "coreFear": "Being deprived/in pain", "coreDesire": "Being satisfied/content", "integration": 5, "disintegration": 1, "hornevian": "Assertive", "harmonic": "Positive Outlook", "wings": ["6","8"] },
  "8": { "name": "The Challenger", "triad": "Gut", "coreEmotion": "Anger (expressed directly)", "coreFear": "Being controlled/vulnerable", "coreDesire": "Self-protection/control", "integration": 2, "disintegration": 5, "hornevian": "Assertive", "harmonic": "Reactive", "wings": ["7","9"] },
  "9": { "name": "The Peacemaker", "triad": "Gut", "coreEmotion": "Anger (repressed/numbed)", "coreFear": "Loss/fragmentation", "coreDesire": "Inner peace/wholeness", "integration": 3, "disintegration": 6, "hornevian": "Withdrawn", "harmonic": "Positive Outlook", "wings": ["8","1"] }
}
```

### Triads Layout (for circle visualization)
- **Gut Center** (8, 9, 1): Top of circle. Color: green/sage. Core emotion: Anger
- **Heart Center** (2, 3, 4): Bottom-right. Color: red/rose. Core emotion: Shame
- **Head Center** (5, 6, 7): Bottom-left. Color: blue/indigo. Core emotion: Fear

Type positions on circle: Type 9 at top (12 o'clock), then clockwise: 1 (40°), 2 (80°), 3 (120°), 4 (160°), 5 (200°), 6 (240°), 7 (280°), 8 (320°).

Math: `angle = (type_number * 40) - 90` degrees, then `x = cx + r * cos(angle_rad)`, `y = cy + r * sin(angle_rad)`

Inner lines:
- Hexad: 1→4→2→8→5→7→1
- Triangle: 3→6→9→3

### Cain's 8w7 Profile
- Core Type 8 in Gut triad (processes through instinct, core emotion is anger)
- 7-wing adds: extroversion, spontaneity, charisma, work-hard-play-hard energy
- Anger burns hot and fast then dissipates (vs 8w9 slow buildup)
- Under stress → moves to 5 (withdraws, becomes secretive/analytical)
- In growth → moves to 2 (becomes open-hearted, caring, supportive)
- Hornevian: Assertive (moves toward people to get needs met)
- Harmonic: Reactive (responds to conflict emotionally and directly)

### Enneagram Pairing Analysis Dimensions
For each type-to-type pairing, generate:
1. **Synergies**: Where the types naturally complement
2. **Friction Points**: Predictable conflict patterns
3. **Communication Rules**: How to speak each type's language
4. **Under Stress Together**: What happens when both are stressed
5. **Growth Together**: How they can help each other develop

### Enneagram Quiz Design (36 forced-choice pairs)

Each question presents two statements. User picks which resonates more. Each statement maps to a type.

Example pairs:
```
1. (a) I tend to take charge of situations [8] vs (b) I prefer to go with the flow [9]
2. (a) I focus on being helpful to others [2] vs (b) I focus on achieving my goals [3]
3. (a) I value being unique and authentic [4] vs (b) I value being knowledgeable [5]
4. (a) I seek security and stability [6] vs (b) I seek new experiences [7]
5. (a) I try to do things the right way [1] vs (b) I try to keep everyone happy [9]
6. (a) I express my feelings openly [4] vs (b) I keep my feelings private [5]
7. (a) I'm driven by helping others succeed [2] vs (b) I'm driven by personal achievement [3]
8. (a) I challenge authority [8] vs (b) I support authority [6]
9. (a) I focus on what could go wrong [6] vs (b) I focus on what could go right [7]
...
(Continue with 4 pairs per type = 36 total, covering each type against 4 others)
```

**Scoring**: Each choice adds 1 point to its associated type. Highest score = primary type. Compare adjacent types to determine wing (e.g., if primary is 8, compare scores for 7 and 9 to determine 8w7 vs 8w9).

---

## Framework 4: Instinctive Drives (I.D.)

### Four Drives — Scale 1-9, midpoint 5

| Drive | USE (6-9) | AVOID (1-4) | Neutral (5) |
|-------|-----------|-------------|-------------|
| **Verify** | Driven to evaluate, compare, prioritize. Needs to know "why." Natural problem-solver. Seeks feedback. | Avoids analysis, takes things at face value, acts on instinct without evaluation | Selective evaluation |
| **Authenticate** | Driven for genuine congruency. Hands-on, personally involved. Communicates openly/literally. Loyal to spoken word. | Avoids personal involvement, delegates easily, comfortable with abstraction | Situational involvement |
| **Complete** | Driven for structure, routine, wholeness. Systematic, organized. Anticipates contingencies. Follows through on every detail. | Avoids structure/routine, views things as exceptions, spontaneous, goal-over-process | Balanced structure |
| **Improvise** | Driven to take risks, innovate. Quick commitment, comfortable with uncertainty. Self-promoting, opportunity-seizing. | Avoids risk, needs certainty before committing. Prefers proven methods. Consistent, composed. | Moderate risk comfort |

### Cain's Profile: 7-7-3-3

- **Verify 7 (USE)**: Thoroughly analytical, sees improvements before successes, gives and needs frequent feedback
- **Authenticate 7 (USE)**: Hands-on, demands tangible proof, communicates directly and literally, insists on personal involvement
- **Complete 3 (AVOID)**: Flexible about process, spontaneous, goal-focused not process-focused, may not anticipate contingencies
- **Improvise 3 (AVOID)**: Needs certainty before committing, prefers proven methods, brings composure but may appear slow to act

### I.D. Comparison Logic

```javascript
function idComparison(profileA, profileB) {
  const drives = ['verify', 'authenticate', 'complete', 'improvise'];
  const insights = {};
  
  drives.forEach(drive => {
    const a = profileA[drive];
    const b = profileB[drive];
    const aDirection = a >= 6 ? 'USE' : a <= 4 ? 'AVOID' : 'NEUTRAL';
    const bDirection = b >= 6 ? 'USE' : b <= 4 ? 'AVOID' : 'NEUTRAL';
    
    if (aDirection === bDirection) {
      insights[drive] = {
        alignment: 'matched',
        note: `Both ${aDirection} ${drive} — shared strength but watch for shared blind spots`
      };
    } else if ((aDirection === 'USE' && bDirection === 'AVOID') || 
               (aDirection === 'AVOID' && bDirection === 'USE')) {
      insights[drive] = {
        alignment: 'complementary',
        note: `Opposite orientations on ${drive} — natural tension but complementary coverage`
      };
    } else {
      insights[drive] = {
        alignment: 'partial',
        note: `One neutral, one active on ${drive} — moderate flexibility`
      };
    }
  });
  
  return insights;
}
```

### I.D. Visualization: 4-Axis Radar Chart
- Axes: Verify, Authenticate, Complete, Improvise
- Scale: 1-9 with 5 clearly marked as neutral line (USE zone above, AVOID zone below)
- Two overlapping semi-transparent polygons (Cain = primary color, Visitor = secondary color)
- Use Recharts `<RadarChart>` with `<PolarGrid>`, `<PolarAngleAxis>`, `<Radar>` components

### I.D. Manual Input UI
- Four sliders or number steppers, 1-9 each
- Labels: Verify, Authenticate, Complete, Improvise
- Descriptive tooltip on each explaining USE vs AVOID
- Optional: 4-question self-identification guide with heavy accuracy disclaimer

Self-ID questions:
1. "Do you need to thoroughly evaluate and understand WHY before acting?" → High Verify
2. "Do you need to be personally, hands-on involved to trust the outcome?" → High Authenticate
3. "Do you need clear structure, systems, and processes for everything?" → High Complete
4. "Do you love taking risks and seizing opportunities on the fly?" → High Improvise

---

## Framework 5: ProScan (Manual Input Only)

### ProScan Dimensions

| Trait | High | Low |
|-------|------|-----|
| **Dominance** | Take-charge, decisive, competitive, direct | Agreeable, collaborative, accommodating |
| **Extroversion** | Enthusiastic, persuasive, people-oriented | Reserved, data-focused, task-oriented |
| **Pace** | Steady, consistent, change-resistant, patient | Urgent, spontaneous, fast-moving |
| **Conformity** | Structured, rule-following, detail-oriented | Independent, freedom-seeking, flexible |

Additional dimensions:
- **Logic Style**: Fact-based / Feeling-based / Balanced
- **Energy Style**: Thrust (self-igniting bursts) / Allegiance (dedicated follow-through) / Ste-Nacity (persistent determination)
- **Energy Level**: Scale 1-6 or zone labels

### ProScan Input UI
```
Dominance:    [High ▼] [Mid ▼] [Low ▼]
Extroversion: [High ▼] [Mid ▼] [Low ▼]  
Pace:         [High ▼] [Mid ▼] [Low ▼]
Conformity:   [High ▼] [Mid ▼] [Low ▼]
Logic Style:  [Fact ▼] [Feeling ▼] [Balanced ▼]
Energy Style: ☐ Thrust  ☐ Allegiance  ☐ Ste-Nacity
```

### Required Disclaimer
"ProScan® is a registered trademark of PDP, Inc. This is not a replacement for the official ProScan assessment. Results should be interpreted by a certified PDP professional."

### ProScan Comparison: Rule-Based
Compare trait-by-trait using if-then rules:
- Same D level → "Aligned on assertiveness — clear communication comes naturally"
- High D vs Low D → "Different assertiveness levels — the high-D partner should actively invite input"
- Matching Energy Style → "Similar work rhythms — momentum builds naturally"
- Opposing Energy Style → "Different work rhythms — coordinate handoff points explicitly"

---

## Cross-Framework Collaboration Analysis

### The 8 Collaboration Dimensions

For each dimension, indicate which framework provides primary and secondary insight:

| Dimension | Primary Framework | Secondary | What to Analyze |
|-----------|------------------|-----------|-----------------|
| **Communication Style** | DISC | MBTI (E/I, T/F) | Pace, directness, detail level, emotional tone |
| **Decision-Making** | MBTI (T/F, J/P) | Enneagram | Analytical vs. values-based, speed, consensus needs |
| **Conflict Resolution** | Enneagram | DISC | Core triggers, defense mechanisms, de-escalation |
| **Delegation** | DISC | I.D. (Complete) | What info each needs, supervision level, check-in frequency |
| **Feedback Reception** | DISC + Enneagram | MBTI (T/F) | Delivery format, emotional sensitivity, specificity |
| **Leadership Dynamic** | MBTI + ProScan | I.D. (Verify) | Natural hierarchy, authority style, energy patterns |
| **Stress Responses** | Enneagram (arrows) | ProScan (3 perspectives) | How each deteriorates, warning signs, support needed |
| **Motivational Drivers** | I.D. | Enneagram (core desires) | What energizes vs. drains, intrinsic vs. extrinsic |

### Cross-Framework Correlation Map
```json
{
  "DISC_D": {
    "commonMBTI": ["ENTJ", "ESTJ", "ENFJ", "ESTP"],
    "commonEnneagram": [1, 3, 7, 8],
    "commonID": { "verify": "high", "authenticate": "high" }
  },
  "DISC_I": {
    "commonMBTI": ["ENFP", "ESFP", "ENTP", "ENFJ"],
    "commonEnneagram": [2, 3, 7],
    "commonID": { "improvise": "high", "authenticate": "high" }
  },
  "DISC_S": {
    "commonMBTI": ["ISFJ", "ISTJ", "INFP", "ISFP"],
    "commonEnneagram": [2, 6, 9],
    "commonID": { "complete": "high", "improvise": "low" }
  },
  "DISC_C": {
    "commonMBTI": ["INTJ", "ISTJ", "INTP", "ISTP"],
    "commonEnneagram": [1, 5, 6],
    "commonID": { "verify": "high", "complete": "high" }
  }
}
```

### Synthesis Template (for each collaboration dimension)

```javascript
function generateInsight(dimension, cainProfile, visitorProfile) {
  // Example for Communication Style
  if (dimension === 'communication') {
    const discInsight = getDISCCommunication(cainProfile.disc, visitorProfile.disc);
    const mbtiInsight = getMBTICommunication(cainProfile.mbti, visitorProfile.mbti);
    
    return {
      summary: `${discInsight.paceMatch}. ${mbtiInsight.processingMatch}.`,
      forVisitor: `When communicating with Cain: ${discInsight.tipsForPartner}`,
      forCain: `When communicating with you: ${discInsight.tipsForSelf}`,
      watchOut: `Potential friction: ${discInsight.frictionPoint}`
    };
  }
}
```

---

## Component Architecture

```
PersonalityComparison/
├── ComparisonContainer.jsx      — Main wrapper, state management
├── InputPanel/
│   ├── InputPanel.jsx           — Tab interface: "Take Quiz" | "Enter Results"
│   ├── ManualInput/
│   │   ├── MBTISelector.jsx     — 16-type dropdown + optional dichotomy sliders
│   │   ├── DISCSelector.jsx     — 16-position selector or 4-dimension sliders
│   │   ├── EnneagramSelector.jsx — Type (1-9) + Wing dropdown
│   │   ├── IDInput.jsx          — Four sliders (1-9 each)
│   │   └── ProScanInput.jsx     — Trait dropdowns + energy checkboxes
│   └── Quizzes/
│       ├── MBTIQuiz.jsx         — 20 Likert questions
│       ├── DISCQuiz.jsx         — 16 Most/Least questions
│       └── EnneagramQuiz.jsx    — 36 forced-choice pairs
├── Visualizations/
│   ├── MBTIWheel.jsx            — Custom SVG cognitive function wheel
│   ├── DISCCircle.jsx           — Custom SVG 4-quadrant with 16 positions
│   ├── EnneagramTriads.jsx      — Custom SVG circle with triads + inner lines
│   ├── IDRadar.jsx              — Recharts radar chart (4-axis)
│   └── ProScanBars.jsx          — Side-by-side bar comparison
├── Insights/
│   ├── InsightsPanel.jsx        — Tabbed view of 8 collaboration dimensions
│   ├── CommunicationInsight.jsx
│   ├── DecisionMakingInsight.jsx
│   ├── ConflictInsight.jsx
│   ├── DelegationInsight.jsx
│   ├── FeedbackInsight.jsx
│   ├── LeadershipInsight.jsx
│   ├── StressInsight.jsx
│   └── MotivationInsight.jsx
├── data/
│   ├── mbtiTypes.json           — All 16 types with stacks
│   ├── mbtiCompatibility.js     — Scoring algorithm + pairing descriptions
│   ├── discProfiles.json        — 16 blend positions
│   ├── discInteractions.json    — Interaction rules per primary-pair
│   ├── enneagramTypes.json      — All 9 types with wings, triads, arrows
│   ├── enneagramPairings.json   — 45 unique pairing descriptions
│   ├── idDrives.json            — Drive definitions and interaction rules
│   ├── proScanTraits.json       — Trait definitions
│   ├── crossFramework.json      — Correlation map + synthesis rules
│   └── cainProfile.json         — Cain's hardcoded results
└── shared/
    ├── Disclaimer.jsx           — Legal/accuracy disclaimers
    ├── ProgressBar.jsx          — Quiz progress indicator
    └── ResetButton.jsx          — Clear all visitor data
```

---

## Legal Disclaimers (Required)

Display prominently at top of comparison section and before each quiz:

> **Disclaimer**: The assessments on this page are unofficial, simplified versions created for educational and professional collaboration purposes only. They are not replacements for official instruments.
>
> - Myers-Briggs Type Indicator® and MBTI® are registered trademarks of The Myers & Briggs Foundation. This site is not affiliated with or endorsed by the Foundation.
> - DiSC® is a registered trademark of Wiley. The DISC model itself (based on William Marston's 1928 work) is in the public domain.
> - ProScan® is a registered trademark of PDP, Inc. ProScan results require certified professional interpretation.
> - Instinctive Drives™ is a trademark of Link-Up International.
> - Results are approximate and should not be used for hiring, clinical, or other high-stakes decisions.

---

## Visualization Tech Stack

| Chart | Library | Approach |
|-------|---------|----------|
| MBTI Wheel | Custom SVG + D3 math | `d3.arc()` for sectors, React for rendering |
| DISC Circle | Custom SVG + D3 math | Quadrant arcs + positioned markers |
| Enneagram Circle | Custom SVG | Trigonometric positioning + inner lines |
| I.D. Radar | Recharts | `<RadarChart>` with dual `<Radar>` series |
| ProScan Bars | Recharts or custom | Side-by-side horizontal bars |

All SVGs use `viewBox` for responsiveness. Include ARIA labels and visually-hidden data tables for accessibility.

---

## Implementation Priority Order

1. **Data layer** — JSON files for all frameworks + Cain's profile
2. **Manual input selectors** — Dropdowns/sliders for all 5 frameworks
3. **Comparison visualizations** — Static versions with Cain's data, then add visitor position
4. **Simplified quizzes** — MBTI (20q), DISC (16q), Enneagram (36q)
5. **Collaboration insights engine** — 8-dimension analysis from paired profiles
6. **Polish** — Animations, progressive disclosure, mobile optimization, disclaimers

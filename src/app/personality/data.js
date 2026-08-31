// ═══════════════════════════════════════
// MBTI DATA
// ═══════════════════════════════════════

export const mbtiData = {
  id: 'mbti',
  name: 'Myers-Briggs',
  icon: '⚡',
  headline: 'ENTJ-A',
  subtitle: 'Commander',
  source: '16Personalities',
  summary: 'Natural-born leader who projects authority and draws people toward common goals. Combines charisma, confidence, strategic thinking, and relentless drive. Growth path runs through developing emotional sensitivity and patience.',
  scores: {
    EI: { left: 'Extraverted', right: 'Introverted', value: 68, letter: 'E' },
    SN: { left: 'Intuitive', right: 'Observant', value: 73, letter: 'N' },
    TF: { left: 'Thinking', right: 'Feeling', value: 65, letter: 'T' },
    JP: { left: 'Judging', right: 'Prospecting', value: 61, letter: 'J' },
    AT: { left: 'Assertive', right: 'Turbulent', value: 65, letter: 'A' },
  },
  cognitiveStack: [
    { fn: 'Te', name: 'Extraverted Thinking', role: 'Dominant', desc: 'Organizes the external world through logic, systems, and efficiency. Drives goal execution and strategic planning.' },
    { fn: 'Ni', name: 'Introverted Intuition', role: 'Auxiliary', desc: 'Synthesizes patterns into a singular vision of the future. Sees the big picture and long-term implications.' },
    { fn: 'Se', name: 'Extraverted Sensing', role: 'Tertiary', desc: 'Engages with the present moment. Drives action-orientation and awareness of tangible opportunities.' },
    { fn: 'Fi', name: 'Introverted Feeling', role: 'Inferior', desc: 'Internal values and emotional depth. Growth area: developing emotional awareness and vulnerability.' },
  ],
  strengths: ['Efficient', 'Energetic', 'Self-Confident', 'Strong-Willed', 'Strategic Thinker', 'Charismatic'],
  weaknesses: ['Stubborn', 'Impatient', 'Dominant', 'Emotionally Distant', 'Intolerant of Inefficiency'],
}

// ═══════════════════════════════════════
// DISC DATA
// ═══════════════════════════════════════

export const discData = {
  id: 'disc',
  name: 'DISC',
  icon: '🎯',
  headline: 'D: Producer',
  subtitle: 'High Dominance',
  source: 'Cloverleaf',
  summary: 'Results-driven producer motivated by goals, challenges, and autonomy. Ideal crisis leader with future focus and courage. Direct approach: seeks competition and recognition.',
  profile: {
    D: { score: 85, label: 'Dominance' },
    I: { score: 55, label: 'Influence' },
    S: { score: 25, label: 'Steadiness' },
    C: { score: 20, label: 'Conscientiousness' },
  },
  motivators: ['Setting and overcoming goals', 'Fast pace and quick outcomes', 'Autonomy and freedom', 'Advancement opportunities', 'Competition and winning', 'Public recognition'],
  dislikes: ['Detail-heavy mundane tasks', 'Non-results-oriented environments', 'Micromanagement', 'Slow decision-making'],
}

// ═══════════════════════════════════════
// ENNEAGRAM DATA
// ═══════════════════════════════════════

export const enneagramData = {
  id: 'enneagram',
  name: 'Enneagram',
  icon: '◎',
  headline: '8w7',
  subtitle: 'The Maverick',
  source: 'Cloverleaf',
  summary: 'Powerful 8w7 driven by independence, strength, and justice. The 7 wing adds playfulness and entrepreneurial spirit. Natural leader who challenges authority. Growth: embracing vulnerability and empathy.',
  type: { core: 8, wing: 7, triad: 'Body/Gut (8-9-1)', center: 'Action Center' },
  coreMotivation: 'Needing to be strong and independent. Protecting self and others through assertive control of environment.',
  coreFear: 'Being controlled, harmed, or vulnerable. Loss of autonomy.',
  atBest: 'When assertive self embraces empathy and compassion, leaning into vulnerability as growth.',
  wingInfluence: 'The 7 wing adds playfulness, enjoyment of life, and outgoing spirit. Mind for leadership and entrepreneurship with big-picture vision.',
  arrows: {
    growth: { number: 2, desc: 'Moves toward The Helper: becomes more empathetic, generous, emotionally connected.' },
    stress: { number: 5, desc: 'Moves toward The Investigator: withdraws, becomes secretive, detached, overly analytical.' },
  },
  traits: ['Imparts strength to others', 'Stands up to authority', 'Intuitive sense of justice', 'Tremendous reliability', 'Unafraid of conflict', 'Resists being told what to do'],
}

// ═══════════════════════════════════════
// PROSCAN DATA
// ═══════════════════════════════════════

export const proscanData = {
  id: 'proscan',
  name: 'ProScan',
  icon: '📊',
  headline: 'High D/E',
  subtitle: 'Thrust Energy',
  source: 'PDP: FMI Corporation, March 2022',
  summary: 'Outgoing, interactive, forcefully persuasive team builder. Passionate about new ideas, always on the move. Thrust energy style with Zone 5 kinetic energy, rocket-launch intensity.',
  traits: {
    Dominance:       { basic: 5.5, priority: 6,   predictor: 5.5, desc: 'Self-confident, decisive, results-oriented. Strong impact on others.' },
    Extroversion:    { basic: 6.5, priority: 5.5, predictor: 6,   desc: 'Outgoing, friendly, empathetic. Strongest behavioral trait. Influential.' },
    'Pace/Patience': { basic: 2.5, priority: 3,   predictor: 2.5, desc: 'Fast-paced, action-oriented, impatient. Doer and driver who seeks change.' },
    Conformity:      { basic: 2.5, priority: 2,   predictor: 2.5, desc: 'Non-traditional, candid, informal. Big-picture, independent free-thinker.' },
  },
  logic: { style: 'Feeling', desc: 'Responds instinctively when making decisions. Initial automatic conclusion based on inner sense.' },
  energy: { style: 'Thrust', level: 'Zone 5', desc: 'Rocket launch style: highly inner-directed, self-starting, intense. Significant capacity.' },
  communication: { style: 'Seller/Persuasive', desc: 'Influential and convincing. Positive, optimistic, inspirational.' },
  leadership: { style: 'Persuasive', desc: 'Selling style: influences and reads people. Builds teams, delegates authority.' },
  uniquePairs: [
    { name: 'Persuasive/Seller', desc: 'Friendly, empathetic, persuasive approach to getting help.' },
    { name: 'Organizational Advocate', desc: 'Promotes team/org goals. Appreciates structure, delegates details.' },
    { name: 'Hard Charging', desc: 'Competitive spirit with ambitious desire to win.' },
    { name: 'Fast, Fluent Communicator', desc: 'Quickly and effectively conveys ideas influentially.' },
    { name: 'Confident Risk Taker', desc: 'Self-confident. Pursues opportunities, takes calculated risks.' },
  ],
  backup: 'Verbal attack: exhaustive over-explanation when cornered, ignored, or undervalued.',
}

// ═══════════════════════════════════════
// I.D. DRIVES DATA
// ═══════════════════════════════════════

export const idDrivesData = {
  id: 'id_drives',
  name: 'Instinctive Drives',
  icon: '🔥',
  headline: '7-7-3-3',
  subtitle: 'Verify · Authenticate',
  source: 'I.D. System',
  summary: 'Strong drive to Verify (investigate, research) and Authenticate (build trust, be genuine). Avoids Complete (rigid process) and Improvise (unplanned action). Thorough in preparation, genuine in relationships.',
  drives: [
    { name: 'Verify', score: 7, direction: 'Use', desc: 'Driven to investigate, research, and understand the "why" before acting.' },
    { name: 'Authenticate', score: 7, direction: 'Use', desc: 'Driven to build trust-based relationships. Values honesty, integrity, being real.' },
    { name: 'Complete', score: 3, direction: 'Avoid', desc: 'Avoids rigid process completion for its own sake. Moves on once essentials are done.' },
    { name: 'Improvise', score: 3, direction: 'Avoid', desc: 'Avoids unplanned spontaneous action. Prefers preparation and genuine connection first.' },
  ],
}

// ═══════════════════════════════════════
// BIG FIVE DATA
// ═══════════════════════════════════════

export const bigFiveData = {
  id: 'bigfive',
  name: 'Big Five',
  icon: '🧬',
  headline: 'High E · Low A · Low N',
  subtitle: 'Understand Myself',
  source: 'Understand Myself (Jordan Peterson)',
  summary: 'Very high extraversion (91st) with exceptional assertiveness (92nd). Very low agreeableness (11th): especially politeness (4th). Low neuroticism (26th) provides stability under pressure. A direct, dominant, authority-challenging profile built for strategic leadership.',
  factors: [
    {
      name: 'Agreeableness', percentile: 11,
      desc: 'Competitive, blunt, dominant, skeptical. Effective negotiator. Protects against manipulation.',
      aspects: [
        { name: 'Compassion', percentile: 31, desc: 'Not primarily other-oriented. Negotiates effectively on own behalf.' },
        { name: 'Politeness', percentile: 4, desc: 'Challenges authority. Hyper-dominant. Comfortable with confrontation.' },
      ]
    },
    {
      name: 'Conscientiousness', percentile: 56,
      desc: 'Average: reliable, reasonably decisive and organized. Balances work with life.',
      aspects: [
        { name: 'Industriousness', percentile: 50, desc: 'Balanced work ethic. Completes duties but values leisure.' },
        { name: 'Orderliness', percentile: 60, desc: 'Prefers schedules and structure. Somewhat disturbed by mess.' },
      ]
    },
    {
      name: 'Extraversion', percentile: 91,
      desc: 'Very enthusiastic, talkative, assertive, gregarious. Captivating and convincing.',
      aspects: [
        { name: 'Enthusiasm', percentile: 79, desc: 'Excitable, happy, easy to know. Optimistic and warm.' },
        { name: 'Assertiveness', percentile: 92, desc: 'Take-charge type. Dominates social situations. Leadership communication.' },
      ]
    },
    {
      name: 'Neuroticism', percentile: 26,
      desc: 'Moderately low: copes well, recovers quickly. Tolerant of stress and risk.',
      aspects: [
        { name: 'Withdrawal', percentile: 15, desc: 'Rarely impeded by anxiety. Handles uncertainty and complexity well.' },
        { name: 'Volatility', percentile: 43, desc: 'Average mood stability. Calms down relatively quickly when upset.' },
      ]
    },
    {
      name: 'Openness', percentile: 68,
      desc: 'Moderately high: creative, exploratory, intelligent. Enjoys complex abstract ideas.',
      aspects: [
        { name: 'Intellect', percentile: 67, desc: 'Interested in ideas and abstract concepts. Articulate, quick-thinking.' },
        { name: 'Aesthetics', percentile: 63, desc: 'Finds beauty important. Creative, imaginative. Responds to art and music.' },
      ]
    },
  ],
}

// ═══════════════════════════════════════
// CROSS-ASSESSMENT THEMES
// ═══════════════════════════════════════

export const themes = [
  {
    id: 'leadership', name: 'How I Lead', icon: '⚡',
    synthesis: 'Persuasive authority backed by strategic vision. Not command-and-control: influential direction-setting with a bias toward action.',
    points: [
      { source: 'MBTI', insight: 'ENTJ: Te-dominant. Organizes through logic and efficiency. Strategic commander.' },
      { source: 'DISC', insight: 'High D Producer: drives results through goal-setting, autonomy, decisive action.' },
      { source: 'ProScan', insight: 'Persuasive leadership. Builds teams, delegates authority, influences and convinces.' },
      { source: 'Enneagram', insight: '8w7: leads by imparting strength. Challenges authority, creates own path.' },
      { source: 'Big Five', insight: '92nd percentile Assertiveness: take-charge communication associated with leadership.' },
      { source: 'I.D.', insight: 'High Verify: leads with thorough investigation before directing action.' },
    ]
  },
  {
    id: 'communication', name: 'How I Communicate', icon: '💬',
    synthesis: 'Fast, fluent, persuasive: and direct. High social energy meets very low politeness: captivating but can be confrontational.',
    points: [
      { source: 'MBTI', insight: '68% Extraverted: speaks first, self-discloses readily, captivating in groups.' },
      { source: 'ProScan', insight: 'Seller/Persuasive: influential, positive, optimistic, inspirational.' },
      { source: 'Big Five', insight: '91st Extraversion + 4th Politeness, energetic and unfiltered.' },
      { source: 'I.D.', insight: 'High Authenticate: communication driven by genuine connection and honesty.' },
    ]
  },
  {
    id: 'pressure', name: 'Under Pressure', icon: '🔥',
    synthesis: 'Remarkably stable under stress with low anxiety and high self-esteem. When pushed to extremes: verbal escalation or withdrawal into analysis.',
    points: [
      { source: 'MBTI', insight: 'ENTJ-A (Assertive): maintains confidence through adversity. Fi inferior = emotional blind spot.' },
      { source: 'ProScan', insight: 'Backup: verbal attack: over-explanation when cornered. Zone 5 energy provides capacity.' },
      { source: 'Big Five', insight: '26th Neuroticism, 15th Withdrawal: rarely impeded by anxiety.' },
      { source: 'Enneagram', insight: '8→5 stress arrow: withdraws, becomes secretive and overly analytical.' },
    ]
  },
  {
    id: 'decisions', name: 'Decision Making', icon: '🧠',
    synthesis: 'Intuition-led with analytical validation. Trusts gut first, then verifies with research. Fast on people and strategy; careful on complex unknowns.',
    points: [
      { source: 'MBTI', insight: 'Te-Ni stack: external logic filtered through pattern recognition.' },
      { source: 'ProScan', insight: 'Feeling logic: instinctive, automatic conclusions based on inner sense.' },
      { source: 'Big Five', insight: '67th Intellect: interested in abstract ideas. Articulate problem-solver.' },
      { source: 'I.D.', insight: '7/9 Verify: strong drive to investigate and research before committing.' },
    ]
  },
  {
    id: 'motivation', name: 'What Drives Me', icon: '🚀',
    synthesis: 'Autonomy, mastery, and genuine connection. Energized by challenge and recognition. Demotivated by routine and compliance.',
    points: [
      { source: 'DISC', insight: 'Goals, competition, advancement, autonomy, recognition.' },
      { source: 'ProScan', insight: 'Thrust energy: rocket-launch self-starting drive. Needs challenge for Zone 5 energy.' },
      { source: 'Enneagram', insight: '8w7: core desire for strength, independence, freedom. 7 wing adds pursuit of enjoyment.' },
      { source: 'Big Five', insight: '91st Extraversion = energized by people. 11th Agreeableness = energized by competition.' },
      { source: 'I.D.', insight: 'High Authenticate: motivated by genuine relationships. Avoids Complete: not motivated by process for its own sake.' },
    ]
  },
]

// Convenience exports
export const allAssessments = [mbtiData, discData, enneagramData, proscanData, bigFiveData, idDrivesData]

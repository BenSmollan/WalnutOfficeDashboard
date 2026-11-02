// PLACEHOLDER CONTENT
// Everything in this file is made up so the screens have something realistic to show.
// Wording for Sam's plan follows the reference mock-up Jo shared. Jo and Romy will supply
// the final fictional person, profile, feedback and priorities, and they replace what is here.
// Never put real client names, reports or feedback in this file.

export const product = {
  name: 'Development Plan',
  // Set to Ovida's real link when we have it. While it is null, the Practice
  // buttons open a mock practice screen instead.
  ovidaUrl: null,
};

export const person = {
  name: 'Sam Patel',
  firstName: 'Sam',
  role: 'Director of Operations',
  company: 'Harbourline Group',
  manager: 'Alex Morgan',
};

// Dates and labels for the review cycle the demo is set in
export const cycle = {
  label: '2027 review cycle',
  agreedOn: '20 January',
  goalsUpdated: '12 January',
  checkIn: 'Thursday 6 February, 10:00',
};

// Source 1: summary of the Enneagram Coaching Companion report
export const enneagram = {
  title: 'Enneagram Coaching Companion',
  type: 'Type Nine, self-preservation first',
  tileNote: 'From your Coaching Companion',
  summary:
    'Sam is steady, inclusive and good at bringing people together. Attention goes naturally to keeping things calm and making sure everyone feels heard.',
  sections: [
    {
      label: 'Motivations',
      text: 'Harmony, stability and a settled routine. Sam wants people to feel at ease and things to run smoothly.',
    },
    {
      label: 'Strengths',
      text: 'Sees every side of an argument, calms tense situations and builds trust quickly.',
    },
    {
      label: 'Blind spots',
      text: 'Nines keep the peace by holding back their own position. Important priorities can slip behind smaller, easier tasks.',
    },
    {
      label: 'Conflict style',
      text: 'Under pressure, conflict feels like a threat to stability, so it gets postponed. May become quietly stubborn rather than say no directly.',
    },
  ],
};

// Source 2: feedback from the company
export const companySummary = {
  title: '2026 review and 360',
  tileNote: 'Shared by HR with your permission',
};

export const company = [
  {
    id: 'c1',
    kind: '2026 review',
    from: 'Line manager',
    date: 'December 2026',
    quote: 'Needs to be more visible in leadership meetings.',
  },
  {
    id: 'c2',
    kind: '2026 review',
    from: 'Line manager',
    date: 'December 2026',
    quote: 'Team delivery has slipped; issues need addressing sooner.',
  },
  {
    id: 'c3',
    kind: '2026 review',
    from: 'Delivery record',
    date: 'December 2026',
    text: 'The client strategy was delivered late.',
  },
  {
    id: 'c4',
    kind: '360 feedback',
    from: 'Direct report',
    date: 'November 2026',
    quote: 'Kind and supportive, but feedback often arrives too late for us to act on.',
  },
  {
    id: 'c5',
    kind: '360 feedback',
    from: 'Line manager',
    date: 'November 2026',
    quote: "Sam's team would follow them anywhere. I'd like to see Sam push back on me more.",
  },
  {
    id: 'c6',
    kind: 'Values survey',
    from: 'Company values survey',
    date: '2026',
    text: 'Lowest score: "Courageous conversations", 3.1 out of 5.',
  },
];

// Source 3: the person's own goals (they can add, edit and remove these)
export const defaultGoals = [
  { id: 'g1', text: 'I want to be taken seriously at exec level.' },
  { id: 'g2', text: 'I want my team to grow, not just get through.' },
  { id: 'g3', text: "I'm stuck in operations and want to think ahead." },
];

export const weeklyReflection = {
  prompt: 'When did you hold back your view this week, and what did it cost?',
};

// Suggested priorities. Each shows its evidence from the three sources.
// A source can be null when it has nothing to say about that priority.
// The first three are the plan in the reference mock-up.
export const priorities = [
  {
    id: 'speak-up',
    title: 'Say what I think, earlier and more clearly',
    why: 'You tend to wait until everyone else has spoken, then go along with the room. Your view often arrives after the decision is made.',
    sources: {
      company: { quote: 'Needs to be more visible in leadership meetings.', ref: '2026 review' },
      you: { quote: 'I want to be taken seriously at exec level.', ref: 'Your goals' },
      enneagram: { text: 'Nines keep the peace by holding back their own position.', ref: 'Coaching Companion' },
    },
    insight: {
      paragraphs: [
        'Your profile describes a strong pull towards harmony. In a meeting, that shows up as listening first, weighing every view and waiting to see where the room lands. It makes you a fair colleague, and it also means your own view often arrives after the decision has been made.',
        "At exec level, people judge contribution by what is said in the room. Saying what you think early, briefly and calmly is not a threat to harmony. It gives the group your judgement while it can still change the outcome.",
      ],
      showsUp: [
        'You nod along in the meeting and send a long email afterwards.',
        'Colleagues are surprised to learn you had reservations.',
        'You start with "I might be wrong, but..." and the point gets lost.',
      ],
    },
    build: [
      { id: 'speak-up-b1', kind: 'Read', title: 'Why the first view in the room carries the most weight', minutes: 5 },
      { id: 'speak-up-b2', kind: 'Watch', title: 'Making a point in 30 seconds', minutes: 4 },
      { id: 'speak-up-b3', kind: 'Tool', title: 'Three openings for disagreeing without derailing', minutes: 3 },
      { id: 'speak-up-b4', kind: 'Try', title: 'Give your view in the first ten minutes of your next leadership meeting', minutes: null },
    ],
    practice: [
      {
        id: 'speak-up-p1',
        title: 'Challenge a plan the room is leaning towards',
        who: 'Your CEO and peers, in the leadership meeting',
        brief: 'A 10-minute role-play. The room is leaning one way; you practise giving your view before the decision is made.',
        aim: 'Say your view early, once and clearly.',
        minutes: 10,
      },
      {
        id: 'speak-up-p2',
        title: 'Hold your point when you are talked over',
        who: 'A senior peer who likes to have the last word',
        brief: 'An 8-minute role-play. Your colleague moves on before you finish; you practise coming back to your point.',
        aim: 'Return to your point without apologising for it.',
        minutes: 8,
      },
    ],
  },
  {
    id: 'performance-talks',
    title: 'Have direct performance conversations with my team',
    why: 'Two performance issues in your team have gone unaddressed for months. Raising them early is kinder than letting them grow.',
    sources: {
      company: { quote: 'Team delivery has slipped; issues need addressing sooner.', ref: '2026 review' },
      you: { quote: 'I want my team to grow, not just get through.', ref: 'Your goals' },
      enneagram: { text: 'Under pressure, conflict feels like a threat to stability, so it gets postponed.', ref: 'Coaching Companion' },
    },
    insight: {
      paragraphs: [
        'You want people to feel at ease, so difficult messages tend to get softened or put off until a better moment, and the moment often passes. Meanwhile the issue grows and the conversation gets harder.',
        'Your team experiences that delay as uncertainty. They value your kindness, and they also want to know where they stand early enough to act. Raising an issue plainly and soon is a form of respect.',
      ],
      showsUp: [
        'You notice a problem but wait until the quarterly review to raise it.',
        'Your message is wrapped in so much reassurance that the point gets lost.',
        'You fix the work yourself rather than ask someone to change how they work.',
      ],
    },
    build: [
      { id: 'performance-talks-b1', kind: 'Read', title: 'Why delayed feedback costs more than it saves', minutes: 6 },
      { id: 'performance-talks-b2', kind: 'Tool', title: 'Situation, behaviour, impact: a simple structure', minutes: 5 },
      { id: 'performance-talks-b3', kind: 'Try', title: 'Raise one issue within 24 hours of noticing it', minutes: null },
    ],
    practice: [
      {
        id: 'performance-talks-p1',
        title: 'Raise a missed deadline with a team member',
        who: 'A team member who has missed two deadlines',
        brief: 'A 10-minute role-play. The other person tries to steer away from the issue; you practise staying on point.',
        aim: 'Stay on the point and agree a next step.',
        minutes: 10,
      },
      {
        id: 'performance-talks-p2',
        title: 'Open a conversation about a long-running issue',
        who: 'A well-liked team member whose work has slipped for months',
        brief: 'A 12-minute role-play. They are surprised and a little hurt; you practise being clear and kind at once.',
        aim: 'Name the issue plainly, then listen.',
        minutes: 12,
      },
    ],
  },
  {
    id: 'strategic-time',
    title: 'Protect time for strategic work',
    why: 'Day-to-day requests fill your week, and the work that matters most to your role keeps moving to next week.',
    sources: {
      company: { text: 'The client strategy was delivered late.', ref: '2026 review' },
      you: { quote: "I'm stuck in operations and want to think ahead.", ref: 'Your goals' },
      enneagram: { text: 'Nines can lose priorities to smaller, easier tasks.', ref: 'Coaching Companion' },
    },
    insight: {
      paragraphs: [
        'Small, urgent requests are easy to say yes to and satisfying to clear. Big, important work has no deadline until it is late. Your profile suggests the small tasks will win unless the time for strategy is protected in advance.',
        'Protecting that time means saying no, or not yet, to some reasonable requests. That can feel like letting people down, and it is what your role now needs from you.',
      ],
      showsUp: [
        'Time blocked for strategy gets given away to the first urgent request.',
        'Your inbox is clear and the strategy document has not moved.',
      ],
    },
    build: [
      { id: 'strategic-time-b1', kind: 'Read', title: 'Urgent versus important: why the small things win', minutes: 5 },
      { id: 'strategic-time-b2', kind: 'Tool', title: 'Plan a weekly block for thinking time', minutes: 10 },
      { id: 'strategic-time-b3', kind: 'Try', title: 'Keep one two-hour block free of meetings this week', minutes: null },
    ],
    practice: [
      {
        id: 'strategic-time-p1',
        title: 'Say no to an urgent request from a peer',
        who: 'A senior peer who needs your help today',
        brief: 'An 8-minute role-play. The request sounds urgent; you practise protecting the time you set aside.',
        aim: 'Decline clearly and offer an alternative.',
        minutes: 8,
      },
    ],
  },
  {
    id: 'delegate',
    title: 'Hand over decisions, not just tasks',
    why: 'Let others own outcomes so you can step back from firefighting.',
    sources: {
      company: { quote: 'Team delivery has slipped; issues need addressing sooner.', ref: '2026 review' },
      you: { quote: "I'm stuck in operations and want to think ahead.", ref: 'Your goals' },
      enneagram: { text: 'It can feel easier to take work on yourself than to ask others to stretch.', ref: 'Coaching Companion' },
    },
    insight: {
      paragraphs: [
        'You are generous with your time and quick to step in when something goes wrong. Over time that makes you the bottleneck: decisions wait for you, and your team learns to bring problems rather than solutions.',
        'Handing over decisions, with clear limits, builds your team and gives you back the time you want for strategy.',
      ],
      showsUp: ['Your calendar fills with problems your team could solve.', 'Projects slow down when you are away.'],
    },
    build: [
      { id: 'delegate-b1', kind: 'Read', title: 'The difference between delegating tasks and decisions', minutes: 7 },
      { id: 'delegate-b2', kind: 'Try', title: 'Hand one recurring decision to a team member this week', minutes: null },
    ],
    practice: [
      {
        id: 'delegate-p1',
        title: 'Hand a decision to a team lead',
        who: 'A capable team lead',
        brief: 'An 8-minute role-play. They ask you to decide for them; you practise setting limits and letting go.',
        aim: 'Set clear limits, then let go.',
        minutes: 8,
      },
    ],
  },
  {
    id: 'push-back',
    title: 'Push back when I disagree with my manager',
    why: 'Give your manager your real view, even when it differs from theirs.',
    sources: {
      company: { quote: "I'd like to see Sam push back on me more.", ref: '360 feedback, line manager' },
      you: null,
      enneagram: { text: "Your own priorities can slip behind other people's, especially more senior people's.", ref: 'Coaching Companion' },
    },
    insight: {
      paragraphs: [
        'Your manager has asked for more challenge. Agreeing keeps things smooth, but it also means your manager is deciding without the full picture you hold.',
        'Pushing back is not disloyalty. Done well, it is one of the most useful things you can offer a senior colleague.',
      ],
      showsUp: ['You accept deadlines you privately think are unrealistic.', 'Your manager hears about problems late.'],
    },
    build: [
      { id: 'push-back-b1', kind: 'Read', title: 'Managing up without managing around', minutes: 6 },
      { id: 'push-back-b2', kind: 'Try', title: 'Bring one honest "no, because" to your next one-to-one', minutes: null },
    ],
    practice: [
      {
        id: 'push-back-p1',
        title: 'Tell your manager a deadline is unrealistic',
        who: 'Your line manager',
        brief: 'A 10-minute role-play. Your manager is under pressure too; you practise explaining the trade-off.',
        aim: 'Explain the trade-off and propose an alternative.',
        minutes: 10,
      },
    ],
  },
  {
    id: 'steady',
    title: 'Say what I need when pressure builds',
    why: 'Notice when you go quiet, and name the problem instead.',
    sources: {
      company: { text: 'Lowest values score: "Courageous conversations", 3.1 out of 5.', ref: 'Company values survey' },
      you: null,
      enneagram: { text: 'Under pressure, may become quietly stubborn rather than say no directly.', ref: 'Coaching Companion' },
    },
    insight: {
      paragraphs: [
        'When pressure builds, you tend to withdraw and dig in quietly rather than name the problem. People read this as calm, but the tension still affects the work.',
        'Learning to notice that moment, and to say plainly what you need, keeps pressure from turning into silent resistance.',
      ],
      showsUp: ['You agree to more than you can deliver, then slow down without saying so.', 'Your team senses tension but cannot tell what is wrong.'],
    },
    build: [
      { id: 'steady-b1', kind: 'Read', title: 'Recognising your early signs of strain', minutes: 5 },
      { id: 'steady-b2', kind: 'Try', title: 'Name one pressure out loud to your team this week', minutes: null },
    ],
    practice: [
      {
        id: 'steady-p1',
        title: 'Name the pressure in your team meeting',
        who: 'Your team, at the weekly meeting',
        brief: 'An 8-minute role-play. The team is stretched; you practise saying what is not working.',
        aim: 'Name the problem and ask for help.',
        minutes: 8,
      },
    ],
  },
];

// What the person has approved for their manager to see
export const howToWorkWithMe = {
  intro:
    "I'm at my best when people are direct with me in private and give me a little time to think. I care a lot about the team getting on well, which can make me slow to raise problems.",
  helps: [
    'Give me feedback soon after the event, specifically and in private.',
    'Ask me directly what I think. I may not volunteer disagreement in a group.',
    "Give me a moment to reflect. I'll come back with a considered view.",
  ],
  avoid: [
    'Raising several issues at once. One clear point lands better.',
    'Taking my agreement in a meeting as the final word. Check in afterwards.',
    'Framing feedback as a judgement of character rather than behaviour.',
  ],
};

// The manager who sees the team overview
export const manager = {
  name: 'Alex Morgan',
  firstName: 'Alex',
  role: 'Chief Operating Officer',
};

// Steps shown on every team member's profile in the manager view
export const managerPrep = {
  steps: [
    'Pick one behaviour to discuss, with a recent, specific example.',
    'Check their "how to work with me" notes for how they take feedback best.',
    'Open by asking for their view before giving yours.',
    'Agree one next step together and a date to check in.',
  ],
};

// Sam's entry in the team overview. Sam's plan and progress come from what the viewer clicks.
export const samInTeam = {
  nextOneToOne: 'Thursday 6 February',
  lastActive: 'Today',
  practice: {
    id: 'mgr-sam',
    title: 'Giving Sam feedback on missed delivery dates',
    who: 'Sam, in your next one-to-one',
    aim: 'Be specific and direct, and invite Sam to disagree.',
  },
};

// The rest of Alex's team. Fixed example data.
// status: 'active' = plan set, 'choosing' = choosing priorities, 'invited' = not started
export const team = [
  {
    id: 'priya',
    name: 'Priya Shah',
    firstName: 'Priya',
    role: 'Head of Finance',
    status: 'active',
    lastActive: 'Yesterday',
    nextOneToOne: 'Thursday',
    sharing: { summary: true, priorities: true },
    howToWorkWithMe: {
      intro: "I hold high standards for myself and my team. Tell me plainly what isn't working; I'd rather know than guess.",
      helps: [
        'Bring specific examples, not general impressions.',
        'Tell me what is going well too. I tend to notice only what needs fixing.',
      ],
      avoid: ['Vague praise or vague criticism.', 'Changing a decision without explaining why.'],
    },
    priorities: [
      { id: 'priya-1', title: 'Let good enough be good enough', why: 'Save the highest standards for the work that needs them.', done: 4, steps: 6 },
      { id: 'priya-2', title: 'Give credit out loud', why: 'Make your appreciation as visible as your corrections.', done: 2, steps: 5 },
      { id: 'priya-3', title: 'Delegate the detail', why: 'Hand over reviews you currently redo yourself.', done: 1, steps: 5 },
    ],
    practice: {
      id: 'mgr-priya',
      title: 'Asking Priya to hand over the monthly reporting',
      who: 'Priya, in your next one-to-one',
      aim: 'Acknowledge her standards while asking her to let go.',
    },
  },
  {
    id: 'hannah',
    name: 'Hannah Cole',
    firstName: 'Hannah',
    role: 'Head of Customer Service',
    status: 'active',
    lastActive: '2 days ago',
    nextOneToOne: 'Tuesday',
    sharing: { summary: true, priorities: true },
    howToWorkWithMe: {
      intro: 'I think best out loud and like to talk things through. Give me space to explore before we decide.',
      helps: [
        'Talk it through with me rather than sending a written note.',
        'Ask questions that help me find the answer myself.',
      ],
      avoid: ['Expecting an instant answer to a big question.', 'Feedback in front of the team.'],
    },
    priorities: [
      { id: 'hannah-1', title: 'Make the call', why: 'Decide sooner, with less need for everyone to agree.', done: 3, steps: 5 },
      { id: 'hannah-2', title: 'Hold the team to deadlines', why: 'Keep warmth and accountability together.', done: 5, steps: 6 },
      { id: 'hannah-3', title: 'Say what you think first', why: 'Share your view before asking for everyone else’s.', done: 2, steps: 4 },
    ],
    practice: {
      id: 'mgr-hannah',
      title: 'Asking Hannah to make the call on the rota changes',
      who: 'Hannah, in your next one-to-one',
      aim: 'Be clear the decision is hers, and by when.',
    },
  },
  {
    id: 'lena',
    name: 'Lena Okafor',
    firstName: 'Lena',
    role: 'Head of People',
    status: 'active',
    lastActive: 'Today',
    nextOneToOne: 'Wednesday',
    sharing: { summary: true, priorities: false },
    howToWorkWithMe: {
      intro: 'I put a lot into supporting others and can forget to ask for support myself. Check in on my workload, not just my team’s.',
      helps: ['Ask me directly what I need.', 'Recognise the work that happens behind the scenes.'],
      avoid: ['Assuming I have capacity because I said yes.', 'Feedback by email on sensitive topics.'],
    },
    priorities: [],
    practice: {
      id: 'mgr-lena',
      title: 'Asking Lena what she would drop to make room',
      who: 'Lena, in your next one-to-one',
      aim: 'Make it safe for her to say she has too much on.',
    },
  },
  {
    id: 'tom',
    name: 'Tom Reed',
    firstName: 'Tom',
    role: 'Head of Sales',
    status: 'choosing',
    lastActive: '3 days ago',
    nextOneToOne: 'Monday',
    sharing: { summary: true, priorities: true },
    howToWorkWithMe: {
      intro: "I move fast and like to keep energy high. Catch me early if I've moved on before others are ready.",
      helps: ['Keep it short and get to the point.', 'Tie feedback to results I care about.'],
      avoid: ['Long written feedback I have to decode.', 'Raising it weeks after the event.'],
    },
    priorities: [],
    practice: {
      id: 'mgr-tom',
      title: 'Telling Tom his team feels rushed',
      who: 'Tom, in your next one-to-one',
      aim: 'Slow the conversation down and ask how his team is finding the pace.',
    },
  },
  {
    id: 'marcus',
    name: 'Marcus Bell',
    firstName: 'Marcus',
    role: 'Head of Technology',
    status: 'invited',
    lastActive: 'Not yet',
    nextOneToOne: 'Friday',
    sharing: { summary: false, priorities: false },
    howToWorkWithMe: null,
    priorities: [],
    practice: {
      id: 'mgr-marcus',
      title: 'Encouraging Marcus to start his development plan',
      who: 'Marcus, in your next one-to-one',
      aim: 'Show why it matters without making it feel like an order.',
    },
  },
];

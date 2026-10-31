// PLACEHOLDER CONTENT
// Everything in this file is made up so the screens have something realistic to show.
// Jo and Romy will supply the real fictional person, profile, feedback and priorities,
// and they replace what is here. Never put real client names, reports or feedback in this file.

export const product = {
  name: 'Development Plan',
  // Set to Ovida's real link when we have it. While it is null, the Practice
  // buttons open a mock practice screen instead.
  ovidaUrl: null,
};

export const person = {
  name: 'Sam Taylor',
  firstName: 'Sam',
  role: 'Director of Operations',
  company: 'Harbourline Group',
  manager: 'Alex Morgan',
};

// Source 1: summary of the Enneagram Coaching Companion report
export const enneagram = {
  title: 'Enneagram Coaching Companion',
  type: 'Type 9',
  summary:
    'Sam is steady, inclusive and good at bringing people together. Attention goes naturally to keeping things calm and making sure everyone feels heard.',
  sections: [
    {
      label: 'Motivations',
      text: 'Harmony, stability and keeping relationships intact. Sam wants people to feel at ease.',
    },
    {
      label: 'Strengths',
      text: 'Sees every side of an argument, calms tense situations and builds trust quickly.',
    },
    {
      label: 'Blind spots',
      text: "Can put off difficult conversations and go along with decisions to avoid friction. Sam's own priorities can slip behind other people's.",
    },
    {
      label: 'Conflict style',
      text: 'Smooths things over and waits for tension to pass. Under pressure, may become quietly stubborn rather than say no directly.',
    },
  ],
};

// Source 2: feedback from the company
export const company = [
  {
    id: 'c1',
    kind: '360 feedback',
    from: 'Direct report',
    date: 'Q3 2026',
    quote: 'Kind and supportive, but feedback often arrives too late for us to act on.',
  },
  {
    id: 'c2',
    kind: '360 feedback',
    from: 'Peer',
    date: 'Q3 2026',
    quote: 'In leadership meetings Sam often agrees in the room and raises concerns afterwards.',
  },
  {
    id: 'c3',
    kind: '360 feedback',
    from: 'Line manager',
    date: 'Q3 2026',
    quote: "Sam's team would follow them anywhere. I'd like to see Sam push back on me more.",
  },
  {
    id: 'c4',
    kind: 'KPI',
    from: 'Operations scorecard',
    date: 'Sept 2026',
    text: 'On-time project delivery: 78% against a target of 90%.',
  },
  {
    id: 'c5',
    kind: 'Values survey',
    from: 'Company values survey',
    date: '2026',
    text: 'Lowest score: "Courageous conversations", 3.1 out of 5.',
  },
];

// Source 3: the person's own goals (they can add, edit and remove these)
export const defaultGoals = [
  { id: 'g1', text: 'I want my team to always know where they stand with me.' },
  { id: 'g2', text: "I'd like to spend less time firefighting and more time on strategy." },
  { id: 'g3', text: 'I want to be more confident speaking up with the executive team.' },
];

// Suggested priorities. Each shows its evidence from the three sources.
// A source can be null when it has nothing to say about that priority.
export const priorities = [
  {
    id: 'feedback',
    title: 'Give honest feedback early',
    why: 'All three sources point to the same pattern.',
    sources: {
      enneagram: {
        text: 'You want people to feel at ease, so difficult messages tend to get softened or put off.',
        ref: 'Blind spots',
      },
      company: {
        quote: 'Kind and supportive, but feedback often arrives too late for us to act on.',
        ref: '360 feedback, direct report',
      },
      you: {
        quote: 'I want my team to always know where they stand with me.',
        ref: 'Your goals',
      },
    },
    insight: {
      paragraphs: [
        'Your profile describes a strong pull towards harmony. When a conversation might upset someone, you are more likely to soften the message or wait for a better moment, and the moment often passes.',
        'Your team experiences that delay as uncertainty. They value your kindness, and they also want to know early enough to act. Feedback given quickly and plainly is a form of respect, not a threat to the relationship.',
      ],
      showsUp: [
        'You notice a problem but wait until the next one-to-one, or the next quarter, to raise it.',
        'Your message is wrapped in so much reassurance that the point gets lost.',
        'You fix things yourself rather than ask someone to change how they work.',
      ],
    },
    build: [
      { id: 'feedback-b1', kind: 'Read', title: 'Why delayed feedback costs more than it saves', minutes: 6 },
      { id: 'feedback-b2', kind: 'Watch', title: 'Framing a hard message in under two minutes', minutes: 4 },
      { id: 'feedback-b3', kind: 'Tool', title: 'Situation, behaviour, impact: a simple structure', minutes: 5 },
      { id: 'feedback-b4', kind: 'Try', title: 'Give one piece of feedback within 24 hours of noticing it', minutes: null },
    ],
    practice: [
      {
        id: 'feedback-p1',
        title: 'Telling a strong performer their reports are late',
        who: 'A direct report you like and rely on',
        aim: 'Say it plainly, without softening it away.',
      },
      {
        id: 'feedback-p2',
        title: "Following up when feedback didn't land",
        who: 'The same person, two weeks later',
        aim: 'Hold your point when they push back.',
      },
    ],
  },
  {
    id: 'in-the-room',
    title: 'Say it in the room',
    why: 'Raise disagreement while the decision is being made, not afterwards.',
    sources: {
      enneagram: {
        text: 'Going along with a decision can feel safer than causing friction in the moment.',
        ref: 'Conflict style',
      },
      company: {
        quote: 'In leadership meetings Sam often agrees in the room and raises concerns afterwards.',
        ref: '360 feedback, peer',
      },
      you: {
        quote: 'I want to be more confident speaking up with the executive team.',
        ref: 'Your goals',
      },
    },
    insight: {
      paragraphs: [
        'You often see the risks in a plan before others do. Because open disagreement feels uncomfortable, you tend to keep those concerns until after the meeting, when they are harder to act on.',
        'Raising a concern in the room, briefly and calmly, gives the group the benefit of your judgement while the decision can still change.',
      ],
      showsUp: [
        'You nod along in the meeting and send a long email afterwards.',
        'Colleagues are surprised to learn you had reservations.',
        'Decisions you doubted go ahead without your view on record.',
      ],
    },
    build: [
      { id: 'in-the-room-b1', kind: 'Read', title: 'Disagreeing without derailing the meeting', minutes: 5 },
      { id: 'in-the-room-b2', kind: 'Tool', title: 'Three phrases for raising a concern in under 30 seconds', minutes: 3 },
      { id: 'in-the-room-b3', kind: 'Try', title: 'Voice one concern in your next leadership meeting', minutes: null },
    ],
    practice: [
      {
        id: 'in-the-room-p1',
        title: 'Challenging a plan the CEO favours',
        who: 'Your CEO, in a leadership meeting',
        aim: 'State your concern once, clearly, and stay with it.',
      },
    ],
  },
  {
    id: 'delegate',
    title: 'Delegate decisions, not just tasks',
    why: 'Let others own outcomes so you can step back from firefighting.',
    sources: {
      enneagram: {
        text: 'It can feel easier to take work on yourself than to ask others to stretch.',
        ref: 'Blind spots',
      },
      company: {
        text: 'On-time project delivery: 78% against a target of 90%.',
        ref: 'Operations scorecard',
      },
      you: {
        quote: "I'd like to spend less time firefighting and more time on strategy.",
        ref: 'Your goals',
      },
    },
    insight: {
      paragraphs: [
        'You are generous with your time and quick to step in when something goes wrong. Over time that makes you the bottleneck: decisions wait for you, and your team learns to bring problems rather than solutions.',
        'Handing over decisions, with clear limits, builds your team and gives you back the time you want for strategy.',
      ],
      showsUp: [
        'Your calendar fills with problems your team could solve.',
        'You re-do work rather than give feedback on it.',
        'Projects slow down when you are away.',
      ],
    },
    build: [
      { id: 'delegate-b1', kind: 'Read', title: 'The difference between delegating tasks and decisions', minutes: 7 },
      { id: 'delegate-b2', kind: 'Tool', title: 'A decision map: what you decide, what they decide', minutes: 10 },
      { id: 'delegate-b3', kind: 'Try', title: 'Hand one recurring decision to a team member this week', minutes: null },
    ],
    practice: [
      {
        id: 'delegate-p1',
        title: 'Handing over a decision you would usually make',
        who: 'A capable team lead',
        aim: 'Set clear limits, then let go.',
      },
    ],
  },
  {
    id: 'push-back',
    title: 'Push back upwards',
    why: 'Give your manager your real view, even when it differs from theirs.',
    sources: {
      enneagram: {
        text: "Your own priorities can slip behind other people's, especially more senior people's.",
        ref: 'Blind spots',
      },
      company: {
        quote: "I'd like to see Sam push back on me more.",
        ref: '360 feedback, line manager',
      },
      you: null,
    },
    insight: {
      paragraphs: [
        'Your manager has asked for more challenge. Agreeing keeps things smooth, but it also means your manager is deciding without the full picture you hold.',
        'Pushing back is not disloyalty. Done well, it is one of the most useful things you can offer a senior colleague.',
      ],
      showsUp: [
        'You accept deadlines you privately think are unrealistic.',
        'Your manager hears about problems late.',
      ],
    },
    build: [
      { id: 'push-back-b1', kind: 'Read', title: 'Managing up without managing around', minutes: 6 },
      { id: 'push-back-b2', kind: 'Try', title: 'Bring one honest "no, because" to your next one-to-one', minutes: null },
    ],
    practice: [
      {
        id: 'push-back-p1',
        title: 'Saying a deadline is unrealistic',
        who: 'Your line manager',
        aim: 'Explain the trade-off and propose an alternative.',
      },
    ],
  },
  {
    id: 'steady',
    title: 'Stay steady under pressure',
    why: 'Notice when you go quiet, and say what you need instead.',
    sources: {
      enneagram: {
        text: 'Under pressure you may become quietly stubborn rather than say no directly.',
        ref: 'Conflict style',
      },
      company: {
        text: 'Lowest values score: "Courageous conversations", 3.1 out of 5.',
        ref: 'Company values survey',
      },
      you: null,
    },
    insight: {
      paragraphs: [
        'When pressure builds, you tend to withdraw and dig in quietly rather than name the problem. People read this as calm, but the tension still affects the work.',
        'Learning to notice that moment, and to say plainly what you need, keeps pressure from turning into silent resistance.',
      ],
      showsUp: [
        'You agree to more than you can deliver, then slow down without saying so.',
        'Your team senses tension but cannot tell what is wrong.',
      ],
    },
    build: [
      { id: 'steady-b1', kind: 'Read', title: 'Recognising your early signs of strain', minutes: 5 },
      { id: 'steady-b2', kind: 'Try', title: 'Name one pressure out loud to your team this week', minutes: null },
    ],
    practice: [
      {
        id: 'steady-p1',
        title: 'Saying no to an urgent extra request',
        who: 'A senior peer under pressure themselves',
        aim: 'Decline clearly and offer what you can do.',
      },
    ],
  },
  {
    id: 'say-no',
    title: "Protect your team's focus",
    why: 'Fewer, clearer priorities so the important work lands on time.',
    sources: {
      enneagram: {
        text: 'Saying no can feel like letting people down.',
        ref: 'Motivations',
      },
      company: {
        text: 'On-time project delivery: 78% against a target of 90%.',
        ref: 'Operations scorecard',
      },
      you: {
        quote: "I'd like to spend less time firefighting and more time on strategy.",
        ref: 'Your goals',
      },
    },
    insight: {
      paragraphs: [
        'Your team takes on almost every request because you find it hard to turn people away. The result is too many projects in flight and late delivery across the board.',
        'Choosing what the team will not do this quarter is as important as choosing what it will.',
      ],
      showsUp: [
        'New requests are accepted without anything being dropped.',
        'Your team is busy but key projects slip.',
      ],
    },
    build: [
      { id: 'say-no-b1', kind: 'Read', title: 'The cost of saying yes to everything', minutes: 5 },
      { id: 'say-no-b2', kind: 'Tool', title: 'A one-page quarterly priority list', minutes: 15 },
      { id: 'say-no-b3', kind: 'Try', title: 'Drop or defer one project this month', minutes: null },
    ],
    practice: [
      {
        id: 'say-no-p1',
        title: 'Turning down a request from another department',
        who: "A head of department you've worked with for years",
        aim: 'Say no warmly, with a clear reason.',
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

export const managerPrep = {
  steps: [
    'Pick one behaviour to discuss, with a recent, specific example.',
    'Open by asking for their view before giving yours.',
    'Leave a pause after your point. Sam may need a moment before responding.',
    'Agree one next step together and a date to check in.',
  ],
  practice: {
    id: 'manager-p1',
    title: 'Giving Sam feedback on missed delivery dates',
    who: 'Sam, in your next one-to-one',
    aim: 'Be specific and direct, and invite Sam to disagree.',
  },
};

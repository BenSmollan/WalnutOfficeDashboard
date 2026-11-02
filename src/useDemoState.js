import { useCallback, useEffect, useState } from 'react';
import { cycle, defaultGoals, person, priorities } from './content.js';

// Everything a viewer changes is saved in their own browser, so the demo
// remembers clicks between visits. "Reset demo" puts it back to a starting point.
const STORAGE_KEY = 'walnut-dashboard-demo-v2';
export const PLAN_SIZE = 3;

const baseState = {
  goals: defaultGoals,
  order: priorities.map((p) => p.id),
  chosen: [],
  setAside: [],
  planSet: false,
  shared: false,
  sharedNote: '',
  insightRead: {},
  insightOpened: {},
  done: {},
  reflections: {},
  sessions: {},
  sharing: { summary: true, priorities: true },
  lastPriority: null,
  viewer: 'individual',
};

// Two starting points for demos:
// 'start' = beginning of the cycle, nothing chosen yet
// 'mid'   = a few weeks in, matching the reference mock-up
export function startingState(kind = 'mid') {
  if (kind === 'start') return { ...baseState };
  return {
    ...baseState,
    chosen: ['speak-up', 'performance-talks', 'strategic-time'],
    planSet: true,
    shared: true,
    sharedNote: `Agreed with your manager on ${cycle.agreedOn}`,
    insightRead: { 'speak-up': true, 'performance-talks': true },
    insightOpened: { 'speak-up': true, 'performance-talks': true, 'strategic-time': true },
    done: { 'speak-up-b1': true, 'speak-up-b2': true, 'performance-talks-b1': true },
    sessions: { 'speak-up-p1': 1 },
    lastPriority: 'speak-up',
  };
}

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return startingState('mid');
    return { ...baseState, ...JSON.parse(raw) };
  } catch {
    return startingState('mid');
  }
}

function save(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be blocked (private windows, previews). The demo still works without it.
  }
}

export function useDemoState() {
  const [state, setState] = useState(load);

  useEffect(() => {
    save(state);
  }, [state]);

  const update = useCallback((fn) => setState((s) => ({ ...s, ...fn(s) })), []);

  const actions = {
    addGoal: (text) => update((s) => ({ goals: [...s.goals, { id: `g${Date.now()}`, text }] })),
    editGoal: (id, text) => update((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, text } : g)) })),
    removeGoal: (id) => update((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),

    choose: (id) =>
      update((s) => (s.chosen.includes(id) || s.chosen.length >= PLAN_SIZE ? {} : { chosen: [...s.chosen, id] })),
    unchoose: (id) =>
      update((s) => ({ chosen: s.chosen.filter((c) => c !== id), planSet: false, shared: false, sharedNote: '' })),
    setAside: (id) =>
      update((s) => ({
        setAside: [...s.setAside, id],
        chosen: s.chosen.filter((c) => c !== id),
        planSet: s.chosen.includes(id) ? false : s.planSet,
      })),
    bringBack: (id) => update((s) => ({ setAside: s.setAside.filter((c) => c !== id) })),
    move: (id, direction) =>
      update((s) => {
        const visible = s.order.filter((o) => !s.setAside.includes(o));
        const i = visible.indexOf(id);
        const j = i + direction;
        if (i < 0 || j < 0 || j >= visible.length) return {};
        const swapped = [...visible];
        [swapped[i], swapped[j]] = [swapped[j], swapped[i]];
        const hidden = s.order.filter((o) => s.setAside.includes(o));
        return { order: [...swapped, ...hidden] };
      }),
    setPlan: () => update((s) => (s.chosen.length === PLAN_SIZE ? { planSet: true } : {})),
    share: () => update(() => ({ shared: true, sharedNote: `Shared with ${person.manager} today` })),

    openInsight: (id) =>
      update((s) => (s.insightOpened[id] ? {} : { insightOpened: { ...s.insightOpened, [id]: true } })),
    markRead: (id) => update((s) => ({ insightRead: { ...s.insightRead, [id]: true } })),
    toggleDone: (itemId) => update((s) => ({ done: { ...s.done, [itemId]: !s.done[itemId] } })),
    addReflection: (key, text) =>
      update((s) => ({
        reflections: {
          ...s.reflections,
          [key]: [...(s.reflections[key] || []), { text, date: new Date().toISOString() }],
        },
      })),
    logSession: (conversationId) =>
      update((s) => ({ sessions: { ...s.sessions, [conversationId]: (s.sessions[conversationId] || 0) + 1 } })),
    setSharing: (key, value) => update((s) => ({ sharing: { ...s.sharing, [key]: value } })),
    setLastPriority: (id) => update((s) => (s.lastPriority === id ? {} : { lastPriority: id })),
    setViewer: (viewer) => update(() => ({ viewer })),

    reset: (kind) => setState(startingState(kind)),
  };

  return [state, actions];
}

// The chosen priorities in the order the person ranked them
export function planPriorities(state) {
  return state.order.filter((id) => state.chosen.includes(id)).map((id) => priorities.find((p) => p.id === id));
}

export function progressFor(state, priority) {
  const buildDone = priority.build.filter((b) => state.done[b.id]).length;
  const sessions = priority.practice.reduce((n, c) => n + (state.sessions[c.id] || 0), 0);
  const practised = priority.practice.filter((c) => state.sessions[c.id]).length;
  const steps = 1 + priority.build.length + priority.practice.length;
  const doneSteps = (state.insightRead[priority.id] ? 1 : 0) + buildDone + practised;
  const insight = state.insightRead[priority.id] ? 'done' : state.insightOpened[priority.id] ? 'in progress' : 'not started';
  return { buildDone, sessions, practised, steps, doneSteps, insight };
}

// Where "Continue" should take the person for one priority
export function nextTabFor(state, priority) {
  const pr = progressFor(state, priority);
  if (pr.insight !== 'done') return 'insight';
  if (pr.buildDone < priority.build.length) return 'build';
  if (pr.practised < priority.practice.length) return 'practice';
  return 'insight';
}

// The next conversation worth rehearsing across the plan
export function nextPractice(state) {
  const plan = planPriorities(state);
  for (const p of plan) {
    if (progressFor(state, p).sessions === 0 && state.insightRead[p.id]) return { priority: p, conversation: p.practice[0] };
  }
  for (const p of plan) {
    const c = p.practice.find((x) => !state.sessions[x.id]);
    if (c) return { priority: p, conversation: c };
  }
  return null;
}

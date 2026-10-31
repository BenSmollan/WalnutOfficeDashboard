import { useCallback, useEffect, useState } from 'react';
import { defaultGoals, priorities } from './content.js';

// Everything a viewer changes is saved in their own browser, so the demo
// remembers clicks between visits. "Reset demo" clears it.
const STORAGE_KEY = 'walnut-dashboard-demo-v1';
export const PLAN_SIZE = 3;

function initialState() {
  return {
    goals: defaultGoals,
    order: priorities.map((p) => p.id),
    chosen: [],
    setAside: [],
    planSet: false,
    insightRead: {},
    done: {},
    reflections: {},
    sessions: {},
    sharing: { summary: true, priorities: true },
  };
}

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    return { ...initialState(), ...JSON.parse(raw) };
  } catch {
    return initialState();
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
    addGoal: (text) =>
      update((s) => ({ goals: [...s.goals, { id: `g${Date.now()}`, text }] })),
    editGoal: (id, text) =>
      update((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, text } : g)) })),
    removeGoal: (id) => update((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),

    choose: (id) =>
      update((s) =>
        s.chosen.includes(id) || s.chosen.length >= PLAN_SIZE ? {} : { chosen: [...s.chosen, id] },
      ),
    unchoose: (id) => update((s) => ({ chosen: s.chosen.filter((c) => c !== id), planSet: false })),
    setAside: (id) =>
      update((s) => ({
        setAside: [...s.setAside, id],
        chosen: s.chosen.filter((c) => c !== id),
        planSet: false,
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

    markRead: (id) => update((s) => ({ insightRead: { ...s.insightRead, [id]: true } })),
    toggleDone: (itemId) => update((s) => ({ done: { ...s.done, [itemId]: !s.done[itemId] } })),
    addReflection: (id, text) =>
      update((s) => ({
        reflections: {
          ...s.reflections,
          [id]: [...(s.reflections[id] || []), { text, date: new Date().toISOString() }],
        },
      })),
    logSession: (conversationId) =>
      update((s) => ({
        sessions: { ...s.sessions, [conversationId]: (s.sessions[conversationId] || 0) + 1 },
      })),
    setSharing: (key, value) => update((s) => ({ sharing: { ...s.sharing, [key]: value } })),

    reset: () => setState(initialState()),
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
  return { buildDone, sessions, practised, steps, doneSteps };
}

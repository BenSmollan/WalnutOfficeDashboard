import { progressFor } from '../useDemoState.js';

// "Insight · done", "Build · 2 of 4", "Practice · 1 session"
export default function StatusChips({ state, priority }) {
  const pr = progressFor(state, priority);
  const n = priority.build.length;
  const build = pr.buildDone === 0 ? 'not started' : pr.buildDone === n ? 'done' : `${pr.buildDone} of ${n}`;
  const practice = pr.sessions === 0 ? 'not started' : `${pr.sessions} session${pr.sessions === 1 ? '' : 's'}`;
  const tone = (value) => (value === 'done' ? 'done' : value === 'not started' ? 'todo' : 'doing');
  return (
    <ul className="status-chips" aria-label="Progress">
      <li className={`chip ${tone(pr.insight)}`}>Insight · {pr.insight}</li>
      <li className={`chip ${tone(build)}`}>Build · {build}</li>
      <li className={`chip ${pr.sessions ? 'doing' : 'todo'}`}>Practice · {practice}</li>
    </ul>
  );
}

import ScreenHead from '../components/ScreenHead.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { person } from '../content.js';
import { priorityHash } from '../router.js';
import { planPriorities, progressFor } from '../useDemoState.js';

function nextStep(state, list) {
  for (const p of list) {
    const pr = progressFor(state, p);
    if (!state.insightRead[p.id]) return { p, tab: 'insight', label: 'Read why it matters' };
    if (pr.buildDone < p.build.length) return { p, tab: 'build', label: 'Carry on learning' };
    if (pr.practised < p.practice.length) return { p, tab: 'practice', label: 'Practise a conversation' };
  }
  return null;
}

export default function Plan({ state, actions }) {
  if (!state.planSet) {
    return (
      <div className="screen">
        <ScreenHead eyebrow="Step 3 of 3" title="Your Development Plan" />
        <div className="empty-state">
          <div className="texture" aria-hidden="true" />
          <p>Your plan appears here once you&rsquo;ve chosen three priorities.</p>
          <a href="#priorities" className="pill primary">
            Choose my priorities
          </a>
        </div>
      </div>
    );
  }

  const list = planPriorities(state);
  const totals = list.reduce(
    (t, p) => {
      const pr = progressFor(state, p);
      return { done: t.done + pr.doneSteps, steps: t.steps + pr.steps };
    },
    { done: 0, steps: 0 },
  );
  const next = nextStep(state, list);

  return (
    <div className="screen">
      <ScreenHead eyebrow="Step 3 of 3" title="Your Development Plan">
        <p>Three priorities, chosen by you. Open one to see why it matters, learn, and practise the conversations involved.</p>
      </ScreenHead>

      <div className="plan-summary">
        <div className="stat">
          <p className="stat-number">
            {totals.done} of {totals.steps}
          </p>
          <p className="stat-label">steps done across your plan</p>
          <p className="stat-foot">Your plan so far</p>
        </div>
        <div className="next-step">
          {next ? (
            <>
              <p className="eyebrow">Next step</p>
              <p className="next-title">{next.p.title}</p>
              <a className="pill primary" href={priorityHash(next.p.id, next.tab)}>
                {next.label}
              </a>
            </>
          ) : (
            <>
              <p className="eyebrow">All steps done</p>
              <p className="next-title">You&rsquo;ve worked through every step in your plan.</p>
            </>
          )}
        </div>
      </div>

      <ol className="plan-grid">
        {list.map((p, i) => {
          const pr = progressFor(state, p);
          return (
            <li key={p.id}>
              <article className="plan-card">
                <p className="eyebrow">Priority {i + 1}</p>
                <h2 className="priority-name small">
                  <a href={priorityHash(p.id)} className="card-link">
                    {p.title}
                  </a>
                </h2>
                <p className="priority-why">{p.why}</p>
                <ul className="status-list">
                  <li className={state.insightRead[p.id] ? 'done' : ''}>
                    <span>Insight</span>
                    <span>{state.insightRead[p.id] ? 'Read' : 'Not read yet'}</span>
                  </li>
                  <li className={pr.buildDone === p.build.length ? 'done' : ''}>
                    <span>Build</span>
                    <span>
                      {pr.buildDone} of {p.build.length} done
                    </span>
                  </li>
                  <li className={pr.practised === p.practice.length ? 'done' : ''}>
                    <span>Practice</span>
                    <span>
                      {pr.sessions === 0 ? 'Not started' : `${pr.sessions} session${pr.sessions === 1 ? '' : 's'}`}
                    </span>
                  </li>
                </ul>
                <ProgressBar done={pr.doneSteps} total={pr.steps} label={`Progress on ${p.title}`} />
              </article>
            </li>
          );
        })}
      </ol>

      <section className="panel sharing" aria-labelledby="sharing-title">
        <div className="sharing-text">
          <h2 id="sharing-title" className="panel-title">
            What {person.manager} can see
          </h2>
          <p className="muted">You decide what your manager sees. Your reflections always stay private.</p>
        </div>
        <div className="toggles">
          <label className="toggle" htmlFor="share-summary">
            <input
              id="share-summary"
              type="checkbox"
              checked={state.sharing.summary}
              onChange={(e) => actions.setSharing('summary', e.target.checked)}
            />
            <span className="switch" aria-hidden="true" />
            <span>My &ldquo;how to work with me&rdquo; summary</span>
          </label>
          <label className="toggle" htmlFor="share-priorities">
            <input
              id="share-priorities"
              type="checkbox"
              checked={state.sharing.priorities}
              onChange={(e) => actions.setSharing('priorities', e.target.checked)}
            />
            <span className="switch" aria-hidden="true" />
            <span>My three priorities and progress</span>
          </label>
          <a href="#manager" className="link-btn">
            See what your manager sees
          </a>
        </div>
      </section>

      <p className="screen-foot quiet">
        <a href="#priorities" className="link-btn">
          Change my priorities
        </a>
      </p>
    </div>
  );
}

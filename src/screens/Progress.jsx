import ScreenHead from '../components/ScreenHead.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import StatusChips from '../components/StatusChips.jsx';
import { SharingToggles } from '../components/ShareDialog.jsx';
import { ArrowRight } from '../components/Icons.jsx';
import { cycle, person, priorities } from '../content.js';
import { priorityHash } from '../router.js';
import { nextTabFor, planPriorities, progressFor } from '../useDemoState.js';

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export default function Progress({ state, actions }) {
  const list = planPriorities(state);
  const totals = list.reduce(
    (t, p) => {
      const pr = progressFor(state, p);
      return { done: t.done + pr.doneSteps, steps: t.steps + pr.steps, sessions: t.sessions + pr.sessions };
    },
    { done: 0, steps: 0, sessions: 0 },
  );
  const reflections = Object.entries(state.reflections)
    .flatMap(([key, items]) =>
      items.map((r) => ({
        ...r,
        label: key === 'weekly' ? 'Weekly reflection' : priorities.find((p) => p.id === key)?.title || 'Reflection',
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="screen">
      <ScreenHead eyebrow={`Development plan · ${cycle.label}`} title="Your Progress">
        <p>How far you have come on each priority, and everything you have written along the way.</p>
      </ScreenHead>

      {!state.planSet ? (
        <div className="empty-state">
          <div className="texture" aria-hidden="true" />
          <p>Your progress appears here once you have chosen three priorities.</p>
          <a href="#priorities" className="pill primary">
            Choose my priorities
          </a>
        </div>
      ) : (
        <>
          <ul className="team-summary" aria-label="This cycle so far">
            <li>
              <span className="summary-number">
                {totals.done} of {totals.steps}
              </span>
              <span>steps done</span>
            </li>
            <li>
              <span className="summary-number">{totals.sessions}</span>
              <span>practice session{totals.sessions === 1 ? '' : 's'}</span>
            </li>
            <li>
              <span className="summary-number">{reflections.length}</span>
              <span>reflection{reflections.length === 1 ? '' : 's'}</span>
            </li>
          </ul>

          <ol className="progress-rows">
            {list.map((p, i) => {
              const pr = progressFor(state, p);
              return (
                <li key={p.id} className="progress-row">
                  <span className="row-number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="row-body">
                    <h2 className="row-title">
                      <a href={priorityHash(p.id, 'insight')}>{p.title}</a>
                    </h2>
                    <StatusChips state={state} priority={p} />
                  </div>
                  <div className="row-side">
                    <ProgressBar done={pr.doneSteps} total={pr.steps} label={`Progress on ${p.title}`} />
                    <a href={priorityHash(p.id, nextTabFor(state, p))} className="pill ghost small continue">
                      Continue <ArrowRight />
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}

      <div className="two-panels">
        <section className="panel" aria-labelledby="reflections-title">
          <h2 id="reflections-title" className="panel-title">
            Your reflections
          </h2>
          <p className="muted small">Private to you. Never shared with your manager.</p>
          {reflections.length === 0 ? (
            <p className="muted small">No reflections yet. Add one from My plan or a priority&rsquo;s Insight page.</p>
          ) : (
            <ul className="ruled reflections">
              {reflections.map((r, i) => (
                <li key={i}>
                  <p>{r.text}</p>
                  <p className="meta">
                    <span>{r.label}</span>
                    <span className="dot" aria-hidden="true" />
                    <span>{dateFormat.format(new Date(r.date))}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel" aria-labelledby="sharing-title">
          <h2 id="sharing-title" className="panel-title">
            What {person.manager} can see
          </h2>
          <p className="muted small">You decide. Change it at any time.</p>
          <SharingToggles state={state} actions={actions} idPrefix="progress" />
          <a href="#preview" className="link-btn">
            Preview what {person.manager.split(' ')[0]} sees
          </a>
        </section>
      </div>
    </div>
  );
}

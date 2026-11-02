import { useEffect, useState } from 'react';
import ScreenHead from '../components/ScreenHead.jsx';
import Sources from '../components/Sources.jsx';
import Meta from '../components/Meta.jsx';
import { ArrowLeft, Check } from '../components/Icons.jsx';
import { priorities, product } from '../content.js';
import { priorityHash } from '../router.js';
import { planPriorities, progressFor } from '../useDemoState.js';

const TAB_TITLES = { insight: 'Insight', build: 'Build', practice: 'Practice' };

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function InsightTab({ p, state, actions }) {
  const [draft, setDraft] = useState('');
  const read = state.insightRead[p.id];
  const reflections = state.reflections[p.id] || [];
  return (
    <div className="tab-grid">
      <div className="reading">
        <h2 className="section-title">Why This Matters for You</h2>
        {p.insight.paragraphs.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
        <h3 className="small-title">How it shows up at work</h3>
        <ul className="dotted">
          {p.insight.showsUp.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <div className="actions">
          {read ? (
            <span className="chip-added">
              <Check /> Read
            </span>
          ) : (
            <button type="button" className="pill ghost" onClick={() => actions.markRead(p.id)}>
              Mark as read
            </button>
          )}
          <a href={priorityHash(p.id, 'build')} className="link-btn">
            Next: Build
          </a>
        </div>
      </div>
      <aside className="panel reflect" aria-labelledby="reflect-title">
        <h3 id="reflect-title" className="panel-title">
          Your reflections
        </h3>
        <p className="muted">Private to you. What did you notice this week?</p>
        <form
          className="goal-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            actions.addReflection(p.id, draft.trim());
            setDraft('');
          }}
        >
          <label className="sr-only" htmlFor={`reflection-${p.id}`}>
            Add a reflection
          </label>
          <textarea
            id={`reflection-${p.id}`}
            rows={4}
            value={draft}
            placeholder="I noticed that..."
            onChange={(e) => setDraft(e.target.value)}
          />
          <button type="submit" className="pill primary small" disabled={!draft.trim()}>
            Save reflection
          </button>
        </form>
        {reflections.length > 0 ? (
          <ul className="ruled reflections">
            {[...reflections].reverse().map((r, i) => (
              <li key={i}>
                <p>{r.text}</p>
                <p className="meta">{dateFormat.format(new Date(r.date))}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted small">No reflections yet.</p>
        )}
      </aside>
    </div>
  );
}

function BuildTab({ p, state, actions }) {
  const done = p.build.filter((b) => state.done[b.id]).length;
  return (
    <div className="narrow">
      <h2 className="section-title">Learn the Skills</h2>
      <p className="muted">
        {done} of {p.build.length} done. Short items you can fit between meetings.
      </p>
      <ul className="checklist">
        {p.build.map((b) => (
          <li key={b.id} className={state.done[b.id] ? 'done' : ''}>
            <label htmlFor={`item-${b.id}`}>
              <input id={`item-${b.id}`} type="checkbox" checked={!!state.done[b.id]} onChange={() => actions.toggleDone(b.id)} />
              <span className="check" aria-hidden="true">
                <Check size={12} />
              </span>
              <span className="item-text">
                <span className="item-title">{b.title}</span>
                <Meta items={[b.kind, b.minutes ? `${b.minutes} min` : 'This week']} />
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="actions">
        <a href={priorityHash(p.id, 'practice')} className="link-btn">
          Next: Practice
        </a>
      </div>
    </div>
  );
}

function PracticeTab({ p, state, onPractise }) {
  return (
    <div className="narrow">
      <h2 className="section-title">Rehearse the Conversation</h2>
      <p className="muted">Practise with an AI role-play partner in Ovida before you have the real conversation.</p>
      <ul className="practice-list">
        {p.practice.map((c) => {
          const n = state.sessions[c.id] || 0;
          return (
            <li key={c.id} className="practice-card">
              <h3 className="item-heading">{c.title}</h3>
              <p className="muted small">{c.brief}</p>
              <dl className="facts">
                <div>
                  <dt>Who you&rsquo;re talking to</dt>
                  <dd>{c.who}</dd>
                </div>
                <div>
                  <dt>What to practise</dt>
                  <dd>{c.aim}</dd>
                </div>
              </dl>
              <div className="actions">
                {product.ovidaUrl ? (
                  <a className="pill primary" href={product.ovidaUrl} target="_blank" rel="noreferrer" onClick={() => onPractise(c, true)}>
                    Practise in Ovida
                  </a>
                ) : (
                  <button type="button" className="pill primary" onClick={() => onPractise(c)}>
                    Practise in Ovida
                  </button>
                )}
                <span className="hint">{n === 0 ? 'Not practised yet' : `Practised ${n} time${n === 1 ? '' : 's'}`}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Priority({ route, state, actions, onPractise }) {
  const plan = planPriorities(state);
  const tab = route.tab || 'insight';
  // From the main menu (#insight, #build, #practice) there is no id: use the last priority opened.
  const id = route.id || (plan.some((x) => x.id === state.lastPriority) ? state.lastPriority : plan[0]?.id);
  const p = priorities.find((x) => x.id === id);

  useEffect(() => {
    if (!p) return;
    actions.setLastPriority(p.id);
    if (tab === 'insight') actions.openInsight(p.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p?.id, tab]);

  if (!p) {
    return (
      <div className="screen">
        <ScreenHead eyebrow={TAB_TITLES[tab]} title="Choose Your Priorities First">
          <p>Insight, Build and Practice open once you have chosen three priorities for this cycle.</p>
        </ScreenHead>
        <div className="actions">
          <a href="#priorities" className="pill primary">
            Choose my priorities
          </a>
        </div>
      </div>
    );
  }

  const index = plan.findIndex((x) => x.id === p.id);
  const pr = progressFor(state, p);

  return (
    <div className="screen">
      <a href="#plan" className="back-link">
        <ArrowLeft /> My plan
      </a>

      {plan.length > 0 && index >= 0 && (
        <nav className="switcher" aria-label="Choose a priority">
          {plan.map((x, i) => (
            <a key={x.id} href={priorityHash(x.id, tab)} className="switch-item" aria-current={x.id === p.id ? 'true' : undefined}>
              <span className="row-number small">{i + 1}</span>
              <span className="switch-title">{x.title}</span>
            </a>
          ))}
        </nav>
      )}

      <ScreenHead
        eyebrow={`${TAB_TITLES[tab]} · ${index >= 0 && state.planSet ? `Priority ${index + 1} of ${plan.length}` : 'Suggested priority'}`}
        title={p.title}
      >
        <p>{p.why}</p>
      </ScreenHead>

      <details className="where-from">
        <summary>Where this came from</summary>
        <Sources sources={p.sources} compact />
      </details>

      <p className="tab-progress meta">
        <span>Insight {pr.insight}</span>
        <span className="dot" aria-hidden="true" />
        <span>
          Build {pr.buildDone} of {p.build.length}
        </span>
        <span className="dot" aria-hidden="true" />
        <span>
          {pr.sessions} practice session{pr.sessions === 1 ? '' : 's'}
        </span>
      </p>

      <div className="tab-panel">
        {tab === 'insight' && <InsightTab p={p} state={state} actions={actions} />}
        {tab === 'build' && <BuildTab p={p} state={state} actions={actions} />}
        {tab === 'practice' && <PracticeTab p={p} state={state} onPractise={onPractise} />}
      </div>
    </div>
  );
}

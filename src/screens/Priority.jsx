import { useState } from 'react';
import ScreenHead from '../components/ScreenHead.jsx';
import Sources from '../components/Sources.jsx';
import Meta from '../components/Meta.jsx';
import { priorities, product } from '../content.js';
import { priorityHash } from '../router.js';
import { planPriorities, progressFor } from '../useDemoState.js';

const TABS = [
  { key: 'insight', label: 'Insight' },
  { key: 'build', label: 'Build' },
  { key: 'practice', label: 'Practice' },
];

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
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Read
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
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
  const p = priorities.find((x) => x.id === route.id);
  if (!p) {
    return (
      <div className="screen">
        <ScreenHead title="Priority Not Found">
          <p>
            <a href="#plan" className="link-btn">
              Back to my plan
            </a>
          </p>
        </ScreenHead>
      </div>
    );
  }
  const plan = planPriorities(state);
  const index = plan.findIndex((x) => x.id === p.id);
  const pr = progressFor(state, p);

  return (
    <div className="screen">
      <a href="#plan" className="back-link">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13 8H3M7.5 3.5 3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        My plan
      </a>
      <ScreenHead eyebrow={index >= 0 && state.planSet ? `Priority ${index + 1} of ${plan.length}` : 'Suggested priority'} title={p.title}>
        <p>{p.why}</p>
      </ScreenHead>

      <details className="where-from">
        <summary>Where this came from</summary>
        <Sources sources={p.sources} compact />
      </details>

      <nav className="tabs" aria-label="Priority sections">
        {TABS.map((t) => (
          <a key={t.key} href={priorityHash(p.id, t.key)} className="tab" aria-current={route.tab === t.key ? 'page' : undefined}>
            {t.label}
            {t.key === 'insight' && state.insightRead[p.id] && <span className="tab-tick" aria-label="read" />}
            {t.key === 'build' && (
              <span className="tab-count">
                {pr.buildDone}/{p.build.length}
              </span>
            )}
            {t.key === 'practice' && pr.sessions > 0 && <span className="tab-count">{pr.sessions}</span>}
          </a>
        ))}
      </nav>

      <div className="tab-panel">
        {route.tab === 'insight' && <InsightTab p={p} state={state} actions={actions} />}
        {route.tab === 'build' && <BuildTab p={p} state={state} actions={actions} />}
        {route.tab === 'practice' && <PracticeTab p={p} state={state} onPractise={onPractise} />}
      </div>
    </div>
  );
}

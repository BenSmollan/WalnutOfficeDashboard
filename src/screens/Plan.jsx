import { useState } from 'react';
import { company, companySummary, cycle, enneagram, person, product, weeklyReflection } from '../content.js';
import { SourceLines } from '../components/SourceTag.jsx';
import StatusChips from '../components/StatusChips.jsx';
import ShareDialog from '../components/ShareDialog.jsx';
import { ArrowRight, Check, FeedbackIcon, PersonIcon, ProfileIcon } from '../components/Icons.jsx';
import { priorityHash } from '../router.js';
import { nextPractice, nextTabFor, planPriorities } from '../useDemoState.js';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function SourceTiles({ state }) {
  const tiles = [
    { key: 'enneagram', icon: <ProfileIcon />, label: 'Your Enneagram profile', value: enneagram.type, note: enneagram.tileNote },
    { key: 'company', icon: <FeedbackIcon />, label: 'Company feedback', value: companySummary.title, note: companySummary.tileNote },
    {
      key: 'you',
      icon: <PersonIcon />,
      label: 'Your own goals',
      value: `${state.goals.length} goal${state.goals.length === 1 ? '' : 's'} you added`,
      note: `Last updated ${cycle.goalsUpdated}`,
    },
  ];
  return (
    <ul className="tiles" aria-label="Your three sources">
      {tiles.map((t) => (
        <li key={t.key}>
          <a href="#inputs" className={`tile tile-${t.key}`}>
            <span className="tile-icon">{t.icon}</span>
            <span className="tile-text">
              <span className="tile-label">{t.label}</span>
              <span className="tile-value">{t.value}</span>
              <span className="tile-note">{t.note}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function sharedSentence(state) {
  const parts = [];
  if (state.sharing.priorities) parts.push('your three priorities and your progress');
  if (state.sharing.summary) parts.push('your "how to work with me" summary');
  if (parts.length === 0) return "Your manager won't see anything from your profile.";
  return `Your manager will see ${parts.join(' and ')}, nothing else from your profile.`;
}

function ComingUp({ state, actions, onPractise }) {
  const next = state.planSet ? nextPractice(state) : null;
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState(false);

  return (
    <aside className="coming-up" aria-labelledby="coming-up-title">
      <h2 id="coming-up-title" className="section-title">
        Coming Up
      </h2>

      {next && (
        <section className="next-practice" aria-label="Next practice">
          <p className="eyebrow on-dark">Next practice</p>
          <h3>{next.conversation.title}</h3>
          <p className="np-brief">{next.conversation.brief}</p>
          <div className="actions">
            {product.ovidaUrl ? (
              <a
                className="pill light"
                href={product.ovidaUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => onPractise(next.conversation, true)}
              >
                Start practice
              </a>
            ) : (
              <button type="button" className="pill light" onClick={() => onPractise(next.conversation)}>
                Start practice
              </button>
            )}
            <span className="np-note">Practice session in Ovida</span>
          </div>
        </section>
      )}

      <section className="side-card" aria-label="Check-in with your manager">
        <p className="eyebrow">Check-in with your manager</p>
        <p className="side-strong">{cycle.checkIn}</p>
        <p className="side-text">{sharedSentence(state)}</p>
        <a href="#preview" className="link-btn">
          Prepare for this conversation
        </a>
      </section>

      <section className="side-card" aria-label="This week's reflection">
        <p className="eyebrow">This week&rsquo;s reflection</p>
        <p className="side-strong">{weeklyReflection.prompt}</p>
        <form
          className="goal-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            actions.addReflection('weekly', draft.trim());
            setDraft('');
            setSaved(true);
          }}
        >
          <label className="sr-only" htmlFor="weekly-reflection">
            Your reflection
          </label>
          <textarea
            id="weekly-reflection"
            rows={3}
            value={draft}
            placeholder="A few lines is enough"
            onChange={(e) => {
              setDraft(e.target.value);
              setSaved(false);
            }}
          />
          <button type="submit" className="pill ghost small" disabled={!draft.trim()}>
            Save reflection
          </button>
          {saved && (
            <p className="saved-note" role="status">
              <Check /> Saved. You can find it under <a href="#progress">Progress</a>.
            </p>
          )}
        </form>
      </section>
    </aside>
  );
}

export default function Plan({ state, actions, onPractise }) {
  const [sharing, setSharing] = useState(false);
  const list = planPriorities(state);

  return (
    <div className="screen">
      <div className="home-head">
        <div className="screen-head">
          <p className="eyebrow">Development plan · {cycle.label}</p>
          <h1>
            {greeting()}, {person.firstName}
          </h1>
          <div className="screen-intro">
            <p>
              {state.planSet
                ? "You chose three priorities for this cycle. Each one draws on your company's feedback, your own goals and your Enneagram profile."
                : 'Start by checking your three sources, then choose three priorities for this cycle.'}
            </p>
          </div>
        </div>
        {state.planSet && (
          <div className="head-actions">
            <a href="#priorities" className="pill ghost">
              Review my priorities
            </a>
            {state.shared ? (
              <button type="button" className="pill ghost" onClick={() => setSharing(true)}>
                <Check /> Shared with my manager
              </button>
            ) : (
              <button type="button" className="pill primary" onClick={() => setSharing(true)}>
                Share with my manager
              </button>
            )}
          </div>
        )}
      </div>

      <SourceTiles state={state} />

      <div className="home-grid">
        <section className="home-main" aria-labelledby="my-priorities-title">
          <div className="section-row">
            <h2 id="my-priorities-title" className="section-title">
              My Three Priorities
            </h2>
            {state.planSet && <p className="muted small">{state.sharedNote || 'Not yet shared with your manager'}</p>}
          </div>

          {state.planSet ? (
            <ol className="priority-rows">
              {list.map((p, i) => (
                <li key={p.id} className="priority-row">
                  <span className="row-number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="row-body">
                    <h3 className="row-title">
                      <a href={priorityHash(p.id, 'insight')}>{p.title}</a>
                    </h3>
                    <p className="row-why">{p.why}</p>
                    <SourceLines sources={p.sources} />
                    <div className="row-foot">
                      <StatusChips state={state} priority={p} />
                      <a href={priorityHash(p.id, nextTabFor(state, p))} className="pill ghost small continue">
                        Continue <ArrowRight />
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty-state">
              <div className="texture" aria-hidden="true" />
              <p>
                You haven&rsquo;t chosen your priorities for this cycle yet. There are {company.length} pieces of company
                feedback and {state.goals.length} goals of your own to draw on.
              </p>
              <div className="actions">
                <a href="#inputs" className="pill ghost">
                  Check my sources
                </a>
                <a href="#priorities" className="pill primary">
                  Choose my priorities
                </a>
              </div>
            </div>
          )}
        </section>

        <ComingUp state={state} actions={actions} onPractise={onPractise} />
      </div>

      {sharing && <ShareDialog state={state} actions={actions} onClose={() => setSharing(false)} />}
    </div>
  );
}

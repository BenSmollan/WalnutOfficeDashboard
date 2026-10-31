import ScreenHead from '../components/ScreenHead.jsx';
import Quote from '../components/Quote.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { howToWorkWithMe, managerPrep, person } from '../content.js';
import { planPriorities, progressFor } from '../useDemoState.js';

function NotShared({ what }) {
  return (
    <p className="not-shared">
      {person.firstName} hasn&rsquo;t shared {what} with you.
    </p>
  );
}

export default function Manager({ state, onPractise }) {
  const list = state.planSet ? planPriorities(state) : [];

  return (
    <div className="screen">
      <div className="manager-banner">
        <p>
          <strong>Manager view.</strong> You&rsquo;re seeing what {person.firstName} has chosen to share with{' '}
          {person.manager}.
        </p>
        <a href="#plan" className="link-btn">
          Back to {person.firstName}&rsquo;s view
        </a>
      </div>

      <ScreenHead eyebrow={`For ${person.manager}`} title={`Working With ${person.firstName}`}>
        <p>
          A short guide, approved by {person.firstName}, to help you give feedback that lands. {person.firstName} controls
          what appears here.
        </p>
      </ScreenHead>

      <section className="panel src-top src-enneagram" aria-labelledby="hww-title">
        <p className="eyebrow">In {person.firstName}&rsquo;s words</p>
        <h2 id="hww-title" className="section-title">
          How to Work With Me
        </h2>
        {state.sharing.summary ? (
          <>
            <Quote>{howToWorkWithMe.intro}</Quote>
            <div className="two-col">
              <div>
                <h3 className="small-title">What helps</h3>
                <ul className="dotted">
                  {howToWorkWithMe.helps.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="small-title">What to avoid</h3>
                <ul className="dotted">
                  {howToWorkWithMe.avoid.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <NotShared what="their summary" />
        )}
      </section>

      <section className="panel" aria-labelledby="mgr-priorities-title">
        <p className="eyebrow">Agreed priorities</p>
        <h2 id="mgr-priorities-title" className="section-title">
          What {person.firstName} Is Working On
        </h2>
        {!state.sharing.priorities ? (
          <NotShared what="their priorities" />
        ) : list.length === 0 ? (
          <p className="not-shared">{person.firstName} hasn&rsquo;t set a plan yet.</p>
        ) : (
          <ol className="mgr-list">
            {list.map((p, i) => {
              const pr = progressFor(state, p);
              return (
                <li key={p.id}>
                  <div>
                    <p className="eyebrow">Priority {i + 1}</p>
                    <p className="item-heading">{p.title}</p>
                    <p className="muted small">{p.why}</p>
                  </div>
                  <ProgressBar done={pr.doneSteps} total={pr.steps} label={`Progress on ${p.title}`} />
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section className="panel prep" aria-labelledby="prep-title">
        <p className="eyebrow">Before your next one-to-one</p>
        <h2 id="prep-title" className="section-title">
          Prepare for a Feedback Conversation
        </h2>
        <ol className="steps">
          {managerPrep.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <div className="practice-card inset">
          <h3 className="item-heading">{managerPrep.practice.title}</h3>
          <p className="muted small">{managerPrep.practice.aim}</p>
          <div className="actions">
            <button type="button" className="pill primary" onClick={() => onPractise({ ...managerPrep.practice, forManager: true })}>
              Rehearse in Ovida
            </button>
            <span className="hint">
              {state.sessions[managerPrep.practice.id]
                ? `Rehearsed ${state.sessions[managerPrep.practice.id]} time${state.sessions[managerPrep.practice.id] === 1 ? '' : 's'}`
                : 'Not rehearsed yet'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

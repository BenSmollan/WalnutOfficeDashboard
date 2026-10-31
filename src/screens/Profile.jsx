import ScreenHead from '../components/ScreenHead.jsx';
import Quote from '../components/Quote.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { manager, managerPrep } from '../content.js';
import { STATUS_LABEL, findMember } from '../team.js';

function NotShared({ children }) {
  return <p className="not-shared">{children}</p>;
}

// One team member as their manager sees it. With preview=true, the person is
// looking at their own profile to check what their manager can see.
export default function Profile({ id, state, onPractise, preview = false }) {
  const m = findMember(state, id);
  if (!m) {
    return (
      <div className="screen">
        <ScreenHead title="Person Not Found">
          <p>
            <a href="#team" className="link-btn">
              Back to your team
            </a>
          </p>
        </ScreenHead>
      </div>
    );
  }
  const sessions = state.sessions[m.practice.id] || 0;

  return (
    <div className="screen">
      {preview ? (
        <div className="manager-banner">
          <p>
            <strong>Preview.</strong> This is what {manager.name} sees on your profile. Change it with the switches on My
            plan.
          </p>
          <a href="#plan" className="link-btn">
            Back to my plan
          </a>
        </div>
      ) : (
        <a href="#team" className="back-link">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7.5 3.5 3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Your team
        </a>
      )}

      <ScreenHead eyebrow={`${m.role} · ${STATUS_LABEL[m.status]}`} title={`Working With ${m.firstName}`}>
        <p>
          A short guide, approved by {m.firstName}, to help you give feedback that lands. {m.firstName} controls what appears
          here.
        </p>
      </ScreenHead>

      <section className="panel src-top src-enneagram" aria-labelledby="hww-title">
        <p className="eyebrow">In {m.firstName}&rsquo;s words</p>
        <h2 id="hww-title" className="section-title">
          How to Work With Me
        </h2>
        {m.sharing.summary && m.howToWorkWithMe ? (
          <>
            <Quote>{m.howToWorkWithMe.intro}</Quote>
            <div className="two-col">
              <div>
                <h3 className="small-title">What helps</h3>
                <ul className="dotted">
                  {m.howToWorkWithMe.helps.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="small-title">What to avoid</h3>
                <ul className="dotted">
                  {m.howToWorkWithMe.avoid.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <NotShared>
            {m.status === 'invited'
              ? `${m.firstName} hasn't written a summary yet.`
              : `${m.firstName} hasn't shared their summary with you.`}
          </NotShared>
        )}
      </section>

      <section className="panel" aria-labelledby="mgr-priorities-title">
        <p className="eyebrow">Agreed priorities</p>
        <h2 id="mgr-priorities-title" className="section-title">
          What {m.firstName} Is Working On
        </h2>
        {!m.sharing.priorities ? (
          <NotShared>{m.firstName} hasn&rsquo;t shared their priorities with you.</NotShared>
        ) : m.priorities.length === 0 ? (
          <NotShared>{m.firstName} hasn&rsquo;t set a plan yet.</NotShared>
        ) : (
          <ol className="mgr-list">
            {m.priorities.map((p, i) => (
              <li key={p.id}>
                <div>
                  <p className="eyebrow">Priority {i + 1}</p>
                  <p className="item-heading">{p.title}</p>
                  <p className="muted small">{p.why}</p>
                </div>
                <ProgressBar done={p.done} total={p.steps} label={`Progress on ${p.title}`} />
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="panel prep" aria-labelledby="prep-title">
        <p className="eyebrow">Before your one-to-one on {m.nextOneToOne}</p>
        <h2 id="prep-title" className="section-title">
          Prepare for a Feedback Conversation
        </h2>
        <ol className="steps">
          {managerPrep.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <div className="practice-card inset">
          <h3 className="item-heading">{m.practice.title}</h3>
          <p className="muted small">{m.practice.aim}</p>
          <div className="actions">
            <button
              type="button"
              className="pill primary"
              disabled={preview}
              onClick={() => onPractise({ ...m.practice, forManager: true, firstName: m.firstName })}
            >
              Rehearse in Ovida
            </button>
            <span className="hint">
              {preview
                ? `Only ${manager.firstName} can rehearse from here.`
                : sessions
                  ? `Rehearsed ${sessions} time${sessions === 1 ? '' : 's'}`
                  : 'Not rehearsed yet'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

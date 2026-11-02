import { useState } from 'react';
import ScreenHead from '../components/ScreenHead.jsx';
import { ArrowLeft } from '../components/Icons.jsx';
import Quote from '../components/Quote.jsx';
import Meta from '../components/Meta.jsx';
import { company, enneagram, person } from '../content.js';

function GoalItem({ goal, onSave, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(goal.text);
  const inputId = `goal-edit-${goal.id}`;

  if (editing) {
    return (
      <li className="goal editing">
        <form
          className="goal-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            onSave(text.trim());
            setEditing(false);
          }}
        >
          <label className="sr-only" htmlFor={inputId}>
            Edit goal
          </label>
          <textarea id={inputId} value={text} rows={3} onChange={(e) => setText(e.target.value)} autoFocus />
          <div className="row-actions">
            <button type="submit" className="pill ghost small">
              Save
            </button>
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setText(goal.text);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="goal">
      <Quote>{goal.text}</Quote>
      <div className="row-actions">
        <button type="button" className="link-btn" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button type="button" className="link-btn" onClick={onRemove}>
          Remove
        </button>
      </div>
    </li>
  );
}

export default function Inputs({ state, actions }) {
  const [draft, setDraft] = useState('');

  return (
    <div className="screen">
      <a href="#plan" className="back-link">
        <ArrowLeft /> My plan
      </a>
      <ScreenHead eyebrow="Your inputs" title="Three Views of You">
        <p>
          Your plan draws on three sources: your Enneagram profile, feedback from {person.company}, and what you want for
          yourself. Add or change your goals, then see the priorities they suggest.
        </p>
      </ScreenHead>

      <div className="inputs-grid">
        <section className="panel src-top src-enneagram" aria-labelledby="enneagram-title">
          <p className="eyebrow">Your Enneagram profile</p>
          <h2 id="enneagram-title" className="panel-title">
            {enneagram.title}
          </h2>
          <Meta items={[enneagram.type, 'Summary']} />
          <p className="panel-lead">{enneagram.summary}</p>
          <dl className="defs">
            {enneagram.sections.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="panel src-top src-company" aria-labelledby="company-title">
          <p className="eyebrow">Your company</p>
          <h2 id="company-title" className="panel-title">
            Feedback from {person.company}
          </h2>
          <ul className="ruled">
            {company.map((c) => (
              <li key={c.id}>
                {c.quote ? <Quote>{c.quote}</Quote> : <p>{c.text}</p>}
                <Meta items={[c.kind, c.from, c.date]} />
              </li>
            ))}
          </ul>
        </section>

        <section className="panel src-top src-you" aria-labelledby="goals-title">
          <p className="eyebrow">You</p>
          <h2 id="goals-title" className="panel-title">
            What you want to work on
          </h2>
          <ul className="ruled goals">
            {state.goals.map((g) => (
              <GoalItem
                key={g.id}
                goal={g}
                onSave={(text) => actions.editGoal(g.id, text)}
                onRemove={() => actions.removeGoal(g.id)}
              />
            ))}
          </ul>
          {state.goals.length === 0 && <p className="muted">No goals yet. Add one below.</p>}
          <form
            className="goal-form add"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              actions.addGoal(draft.trim());
              setDraft('');
            }}
          >
            <label htmlFor="new-goal">Add a goal</label>
            <textarea
              id="new-goal"
              rows={2}
              value={draft}
              placeholder="For example: I want to delegate more of the day-to-day."
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" className="pill ghost small" disabled={!draft.trim()}>
              Add goal
            </button>
          </form>
        </section>
      </div>

      <div className="screen-foot">
        <a href="#priorities" className="pill primary">
          {state.planSet ? 'Review my priorities' : 'See my suggested priorities'}
        </a>
      </div>
    </div>
  );
}

import ScreenHead from '../components/ScreenHead.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { manager } from '../content.js';
import { STATUS_LABEL, initials, teamMembers } from '../team.js';

function totals(m) {
  return m.priorities.reduce((t, p) => ({ done: t.done + p.done, steps: t.steps + p.steps }), { done: 0, steps: 0 });
}

export default function Team({ state }) {
  const members = teamMembers(state);
  const count = (status) => members.filter((m) => m.status === status).length;

  return (
    <div className="screen">
      <ScreenHead eyebrow={`For ${manager.name}`} title="Your Team">
        <p>
          {members.length} people report to you. You see only what each person has chosen to share. Open a profile to prepare
          for your next conversation.
        </p>
      </ScreenHead>

      <ul className="team-summary" aria-label="Team at a glance">
        <li>
          <span className="summary-number">{count('active')}</span>
          <span>have set their plan</span>
        </li>
        <li>
          <span className="summary-number">{count('choosing')}</span>
          <span>choosing priorities</span>
        </li>
        <li>
          <span className="summary-number">{count('invited')}</span>
          <span>not started yet</span>
        </li>
      </ul>

      <ul className="team-grid">
        {members.map((m) => {
          const t = totals(m);
          const showPriorities = m.sharing.priorities && m.priorities.length > 0;
          return (
            <li key={m.id}>
              <article className="member-card">
                <div className="member-top">
                  <span className="avatar" aria-hidden="true">
                    {initials(m.name)}
                  </span>
                  <div className="member-name">
                    <h2 className="item-heading">
                      <a href={`#team-${m.id}`} className="card-link">
                        {m.name}
                      </a>
                    </h2>
                    <p className="muted small">{m.role}</p>
                  </div>
                </div>
                <span className={`status status-${m.status}`}>{STATUS_LABEL[m.status]}</span>
                {showPriorities ? (
                  <>
                    <ul className="mini-list">
                      {m.priorities.map((p) => (
                        <li key={p.id}>{p.title}</li>
                      ))}
                    </ul>
                    <ProgressBar done={t.done} total={t.steps} label={`${m.name}'s progress`} />
                  </>
                ) : (
                  <p className="member-note">
                    {m.status === 'invited'
                      ? `${m.firstName} hasn't started yet.`
                      : m.status === 'choosing'
                        ? `${m.firstName} is still choosing priorities.`
                        : `${m.firstName} keeps their priorities private.`}
                  </p>
                )}
                <p className="meta member-meta">
                  <span>Next one-to-one: {m.nextOneToOne}</span>
                  <span className="dot" aria-hidden="true" />
                  <span>Active: {m.lastActive}</span>
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

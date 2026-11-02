import { useState } from 'react';
import { manager, person, product } from '../content.js';
import { initials } from '../team.js';

const NAV = {
  individual: [
    { hash: '#plan', key: 'plan', label: 'My plan' },
    { hash: '#insight', key: 'insight', label: 'Insight' },
    { hash: '#build', key: 'build', label: 'Build' },
    { hash: '#practice', key: 'practice', label: 'Practice' },
    { hash: '#progress', key: 'progress', label: 'Progress' },
  ],
  manager: [{ hash: '#team', key: 'team', label: 'Your team' }],
};

function activeKey(screen, tab) {
  if (screen === 'priority') return tab;
  if (['plan', 'inputs', 'priorities', 'preview'].includes(screen)) return 'plan';
  if (screen === 'member') return 'team';
  return screen;
}

// The thin bar above the product holds the demo controls, so they are clearly not part of the product.
function DemoBar({ viewer, onSwitchViewer, onReset }) {
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="demo-bar">
      <div className="demo-inner">
        <span className="demo-label">Prototype</span>
        <label className="view-as" htmlFor="view-as">
          <span>View as</span>
          <select id="view-as" value={viewer} onChange={(e) => onSwitchViewer(e.target.value)}>
            <option value="individual">{person.name}</option>
            <option value="manager">{manager.name} (manager)</option>
          </select>
        </label>
        {confirming ? (
          <span className="reset-confirm" role="group" aria-label="Reset the demo">
            <span>Reset to:</span>
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                onReset('start');
                setConfirming(false);
              }}
            >
              Start of cycle
            </button>
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                onReset('mid');
                setConfirming(false);
              }}
            >
              Mid-cycle example
            </button>
            <button type="button" className="link-btn quiet" onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </span>
        ) : (
          <button type="button" className="link-btn" onClick={() => setConfirming(true)}>
            Reset demo
          </button>
        )}
      </div>
    </div>
  );
}

export default function Header({ screen, tab, viewer, onSwitchViewer, onReset }) {
  const who = viewer === 'manager' ? manager : person;
  const current = activeKey(screen, tab);

  return (
    <>
      <DemoBar viewer={viewer} onSwitchViewer={onSwitchViewer} onReset={onReset} />
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href={viewer === 'manager' ? '#team' : '#plan'}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">{product.name}</span>
          </a>
          <nav className="nav" aria-label="Main">
            {NAV[viewer].map((l) => (
              <a key={l.key} href={l.hash} className="nav-link" aria-current={current === l.key ? 'page' : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="user-chip">
            <span className="user-name">{who.name}</span>
            <span className="user-avatar" aria-hidden="true">
              {initials(who.name)}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

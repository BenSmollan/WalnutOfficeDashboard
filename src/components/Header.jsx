import { useState } from 'react';
import { manager, person, product } from '../content.js';

const NAV = {
  individual: [
    { hash: '#inputs', screens: ['inputs'], label: 'My inputs', short: 'Inputs', step: 1 },
    { hash: '#priorities', screens: ['priorities'], label: 'Choose priorities', short: 'Priorities', step: 2 },
    { hash: '#plan', screens: ['plan', 'priority', 'preview'], label: 'My plan', short: 'Plan', step: 3 },
  ],
  manager: [{ hash: '#team', screens: ['team', 'member'], label: 'Your team', short: 'Team' }],
};

export default function Header({ screen, viewer, onSwitchViewer, onReset }) {
  const [confirming, setConfirming] = useState(false);
  const who = viewer === 'manager' ? manager : person;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href={viewer === 'manager' ? '#team' : '#plan'}>
          <span className="brand-name">{product.name}</span>
          <span className="brand-for">
            {who.name}
            {viewer === 'manager' ? ' · Manager' : ''}
          </span>
        </a>
        <div className="controls">
          <label className="view-as" htmlFor="view-as">
            <span>View as</span>
            <select id="view-as" value={viewer} onChange={(e) => onSwitchViewer(e.target.value)}>
              <option value="individual">{person.name}</option>
              <option value="manager">{manager.name} (manager)</option>
            </select>
          </label>
          {confirming ? (
            <span className="reset-confirm" role="group" aria-label="Confirm reset">
              <span>Clear everything?</span>
              <button
                type="button"
                className="link-btn on-dark"
                onClick={() => {
                  onReset();
                  setConfirming(false);
                }}
              >
                Yes, reset
              </button>
              <button type="button" className="link-btn on-dark" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </span>
          ) : (
            <button type="button" className="pill on-dark small" onClick={() => setConfirming(true)}>
              Reset demo
            </button>
          )}
        </div>
        <nav className="nav" aria-label="Main">
          {NAV[viewer].map((l) => (
            <a key={l.hash} href={l.hash} className="nav-link" aria-current={l.screens.includes(screen) ? 'page' : undefined}>
              {l.step && <span className="nav-step">{l.step}</span>}
              <span className="label-long">{l.label}</span>
              <span className="label-short">{l.short}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

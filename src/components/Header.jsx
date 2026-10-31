import { useState } from 'react';
import { person, product } from '../content.js';

const LINKS = [
  { hash: '#inputs', screen: 'inputs', label: 'My inputs', short: 'Inputs', step: 1 },
  { hash: '#priorities', screen: 'priorities', label: 'Choose priorities', short: 'Priorities', step: 2 },
  { hash: '#plan', screen: 'plan', label: 'My plan', short: 'Plan', step: 3 },
];

export default function Header({ route, onReset }) {
  const [confirming, setConfirming] = useState(false);
  const current = route.screen === 'priority' ? 'plan' : route.screen;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#plan">
          <span className="brand-name">{product.name}</span>
          <span className="brand-for">{person.name}</span>
        </a>
        <div className="reset">
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
          {LINKS.map((l) => (
            <a key={l.hash} href={l.hash} className="nav-link" aria-current={current === l.screen ? 'page' : undefined}>
              <span className="nav-step">{l.step}</span>
              <span className="label-long">{l.label}</span>
              <span className="label-short">
                {l.short}
              </span>
            </a>
          ))}
          <a href="#manager" className="nav-link manager" aria-current={current === 'manager' ? 'page' : undefined}>
            <span className="label-long">Manager view</span>
            <span className="label-short">
              Manager
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}

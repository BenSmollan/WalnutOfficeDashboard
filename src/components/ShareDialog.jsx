import { useEffect, useRef } from 'react';
import { person } from '../content.js';

export function SharingToggles({ state, actions, idPrefix = 'share' }) {
  return (
    <div className="toggles">
      <label className="toggle" htmlFor={`${idPrefix}-priorities`}>
        <input
          id={`${idPrefix}-priorities`}
          type="checkbox"
          checked={state.sharing.priorities}
          onChange={(e) => actions.setSharing('priorities', e.target.checked)}
        />
        <span className="switch" aria-hidden="true" />
        <span>My three priorities and my progress</span>
      </label>
      <label className="toggle" htmlFor={`${idPrefix}-summary`}>
        <input
          id={`${idPrefix}-summary`}
          type="checkbox"
          checked={state.sharing.summary}
          onChange={(e) => actions.setSharing('summary', e.target.checked)}
        />
        <span className="switch" aria-hidden="true" />
        <span>My &ldquo;how to work with me&rdquo; summary</span>
      </label>
    </div>
  );
}

export default function ShareDialog({ state, actions, onClose }) {
  const firstRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && closeRef.current();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="share-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-band">
          <p className="eyebrow on-dark">Your plan</p>
          <h2 id="share-title">Share With {person.manager}</h2>
        </div>
        <div className="modal-body">
          <p>Choose what your manager can see. Your reflections and the rest of your profile always stay private.</p>
          <SharingToggles state={state} actions={actions} idPrefix="dialog" />
          <a href="#preview" className="link-btn" onClick={onClose}>
            Preview what {person.manager.split(' ')[0]} will see
          </a>
          <div className="actions">
            <button
              ref={firstRef}
              type="button"
              className="pill primary"
              disabled={!state.sharing.priorities && !state.sharing.summary}
              onClick={() => {
                actions.share();
                onClose();
              }}
            >
              Share
            </button>
            <button type="button" className="pill ghost" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';

// Stand-in for Ovida's AI role-play. The real version opens Ovida with this scenario loaded.
export default function PracticeModal({ conversation, onFinish, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!conversation) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="practice-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-band">
          <p className="eyebrow on-dark">Practice session · Ovida</p>
          <h2 id="practice-title">{conversation.title}</h2>
        </div>
        <div className="modal-body">
          <dl className="facts">
            <div>
              <dt>Who you&rsquo;re talking to</dt>
              <dd>{conversation.who}</dd>
            </div>
            <div>
              <dt>What to practise</dt>
              <dd>{conversation.aim}</dd>
            </div>
          </dl>
          <div className="mock-chat" aria-label="Example of the role-play">
            <p className="bubble them">Hi, you wanted to talk?</p>
            <p className="bubble you">Yes, thanks for making the time. There&rsquo;s something I want to raise with you.</p>
          </div>
          <p className="modal-note">
            This is a placeholder. In the real version, this button opens Ovida&rsquo;s AI role-play with this
            scenario already set up.
          </p>
          <div className="actions">
            <button type="button" className="pill primary" onClick={onFinish}>
              Finish session
            </button>
            <button type="button" className="pill ghost" onClick={onClose} ref={closeRef}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

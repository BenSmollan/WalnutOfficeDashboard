import ScreenHead from '../components/ScreenHead.jsx';
import Sources from '../components/Sources.jsx';
import { priorities } from '../content.js';
import { PLAN_SIZE } from '../useDemoState.js';

const ArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Choose({ state, actions, navigate }) {
  const visible = state.order.filter((id) => !state.setAside.includes(id)).map((id) => priorities.find((p) => p.id === id));
  const asideList = state.setAside.map((id) => priorities.find((p) => p.id === id));
  const full = state.chosen.length >= PLAN_SIZE;

  return (
    <div className="screen with-dock">
      <ScreenHead eyebrow="Step 2 of 3" title="Choose Your Three Priorities">
        <p>
          Each suggestion shows where it came from. Add three to your plan, set aside any that don&rsquo;t fit, and use the
          arrows to put them in your order.
        </p>
      </ScreenHead>

      <ol className="choice-list">
        {visible.map((p, i) => {
          const chosen = state.chosen.includes(p.id);
          return (
            <li key={p.id}>
              <article className={`priority-card ${chosen ? 'chosen' : ''}`} aria-labelledby={`title-${p.id}`}>
                <div className="priority-top">
                  <div className="priority-title">
                    <p className="eyebrow">
                      {chosen ? 'In your plan' : `Suggestion ${i + 1} of ${visible.length}`}
                    </p>
                    <h2 id={`title-${p.id}`} className="priority-name">
                      {p.title}
                    </h2>
                    <p className="priority-why">{p.why}</p>
                  </div>
                  <div className="move">
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Move ${p.title} up`}
                      disabled={i === 0}
                      onClick={() => actions.move(p.id, -1)}
                    >
                      <ArrowUp />
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Move ${p.title} down`}
                      disabled={i === visible.length - 1}
                      onClick={() => actions.move(p.id, 1)}
                    >
                      <ArrowDown />
                    </button>
                  </div>
                </div>
                <Sources sources={p.sources} />
                <div className="actions">
                  {chosen ? (
                    <>
                      <span className="chip-added">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Added to your plan
                      </span>
                      <button type="button" className="link-btn" onClick={() => actions.unchoose(p.id)}>
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="pill ghost" disabled={full} onClick={() => actions.choose(p.id)}>
                        Add to my plan
                      </button>
                      <button type="button" className="link-btn" onClick={() => actions.setAside(p.id)}>
                        Not for now
                      </button>
                      {full && <span className="hint">Remove one to add another.</span>}
                    </>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      {asideList.length > 0 && (
        <section className="aside-list" aria-labelledby="aside-title">
          <h2 id="aside-title" className="small-title">
            Set aside
          </h2>
          <ul className="ruled">
            {asideList.map((p) => (
              <li key={p.id} className="aside-item">
                <span>{p.title}</span>
                <button type="button" className="link-btn" onClick={() => actions.bringBack(p.id)}>
                  Bring back
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="dock" role="region" aria-label="Your choices">
        <div className="dock-inner">
          <div className="dock-count">
            <span className="dots-row" aria-hidden="true">
              {Array.from({ length: PLAN_SIZE }, (_, i) => (
                <i key={i} className={i < state.chosen.length ? 'on' : ''} />
              ))}
            </span>
            <span>
              {state.chosen.length} of {PLAN_SIZE} chosen
            </span>
          </div>
          <button
            type="button"
            className="pill primary"
            disabled={!full}
            onClick={() => {
              actions.setPlan();
              navigate('#plan');
            }}
          >
            Set my plan
          </button>
        </div>
      </div>
    </div>
  );
}

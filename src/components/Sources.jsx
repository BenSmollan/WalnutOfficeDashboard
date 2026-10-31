import Quote from './Quote.jsx';

const SOURCES = [
  { key: 'enneagram', label: 'From your Enneagram profile', className: 'src-enneagram' },
  { key: 'company', label: 'From your company', className: 'src-company' },
  { key: 'you', label: 'From you', className: 'src-you' },
];

// The three sources side by side: the heart of the product
export default function Sources({ sources, compact = false }) {
  return (
    <div className={`sources ${compact ? 'compact' : ''}`}>
      {SOURCES.map((s) => {
        const src = sources[s.key];
        return (
          <div key={s.key} className={`source ${s.className} ${src ? '' : 'empty'}`}>
            <span className="source-label">
              <i aria-hidden="true" />
              {s.label}
            </span>
            {src ? (
              <>
                {src.quote ? <Quote>{src.quote}</Quote> : <p>{src.text}</p>}
                <p className="source-ref">{src.ref}</p>
              </>
            ) : (
              <p className="source-none">Nothing from this source for this priority.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

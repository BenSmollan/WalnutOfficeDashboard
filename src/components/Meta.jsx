import { Fragment } from 'react';

// A row of short labels separated by coral dots, as on walnutoffice.com
export default function Meta({ items, className = '' }) {
  const parts = items.filter(Boolean);
  return (
    <p className={`meta ${className}`}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="dot" aria-hidden="true" />}
          <span>{p}</span>
        </Fragment>
      ))}
    </p>
  );
}

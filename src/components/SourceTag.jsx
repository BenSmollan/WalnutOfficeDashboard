const TAGS = {
  company: { label: 'Company', className: 'tag-company' },
  you: { label: 'You', className: 'tag-you' },
  enneagram: { label: 'Profile', className: 'tag-enneagram' },
};

// One line of evidence: a coloured source tag, then the words
export function SourceLine({ kind, source }) {
  if (!source) return null;
  const t = TAGS[kind];
  return (
    <li className="source-line">
      <span className={`tag ${t.className}`}>{t.label}</span>
      <span className="source-words">{source.quote ? <>&ldquo;{source.quote}&rdquo;</> : source.text}</span>
    </li>
  );
}

export function SourceLines({ sources }) {
  return (
    <ul className="source-lines">
      <SourceLine kind="company" source={sources.company} />
      <SourceLine kind="you" source={sources.you} />
      <SourceLine kind="enneagram" source={sources.enneagram} />
    </ul>
  );
}

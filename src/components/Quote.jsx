// Opening quotation mark drawn as a shape, like the faint marks on walnutoffice.com
export function QuoteMark() {
  return (
    <svg className="qm" viewBox="0 0 34 24" aria-hidden="true" focusable="false">
      <path d="M0 24V14.5C0 6.6 4.2 1.6 12.2 0l1.3 3.3C9.2 4.9 7 7.6 6.6 11.4H13V24H0Zm20 0V14.5C20 6.6 24.2 1.6 32.2 0l1.3 3.3c-4.3 1.6-6.5 4.3-6.9 8.1H33V24H20Z" />
    </svg>
  );
}

export default function Quote({ children }) {
  return (
    <blockquote className="quote">
      <QuoteMark />
      <p>{children}</p>
    </blockquote>
  );
}

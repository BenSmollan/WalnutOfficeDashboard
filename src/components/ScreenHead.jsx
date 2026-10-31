export default function ScreenHead({ eyebrow, title, children }) {
  return (
    <div className="screen-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {children && <div className="screen-intro">{children}</div>}
    </div>
  );
}

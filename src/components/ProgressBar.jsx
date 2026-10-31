export default function ProgressBar({ done, total, label }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="progress">
      <div className="track" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={label}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="progress-count">
        {done} of {total} steps done
      </p>
    </div>
  );
}

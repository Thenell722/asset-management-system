const TONE_DOT = {
  teal: 'bg-teal',
  amber: 'bg-amber',
  alert: 'bg-alert',
  steel: 'bg-steel',
};

const TONE_TEXT = {
  teal: 'text-teal',
  amber: 'text-amber-deep',
  alert: 'text-alert',
  steel: 'text-steel',
};

export default function StatTag({ label, value, delta, tone = 'steel' }) {
  return (
    <div className="manifest-tag shadow-card">
      <div className="flex items-center justify-between px-4 pt-3 pb-3">
        <p className="text-[10px] uppercase tracking-widest2 text-steel">{label}</p>
        <span className={`w-2 h-2 rounded-full ${TONE_DOT[tone]}`} />
      </div>
      <div className="manifest-tag__perf" />
      <div className="px-4 pt-4 pb-4">
        <p className="font-mono text-3xl text-ink tabular-nums">{value}</p>
        <p className={`mt-1 text-xs font-medium ${TONE_TEXT[tone]}`}>{delta}</p>
      </div>
    </div>
  );
}

export default function Card({ title, eyebrow, action, children, className = '' }) {
  return (
    <section className={`bg-paper-card border border-steel-line rounded-lg shadow-card ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-steel-line">
          <div>
            {eyebrow && (
              <p className="text-[10px] uppercase tracking-widest2 text-steel mb-0.5">{eyebrow}</p>
            )}
            {title && <h2 className="font-display text-lg text-ink">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

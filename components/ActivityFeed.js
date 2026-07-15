const TYPE_STYLE = {
  Inbound: 'text-teal',
  Outbound: 'text-rust',
  Adjustment: 'text-steel',
};

export default function ActivityFeed({ items }) {
  return (
    <div className="divide-y divide-steel-line">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 py-3 text-sm">
          <span className="font-mono text-xs text-steel-soft w-14 shrink-0">{item.time}</span>
          <span className={`font-medium w-24 shrink-0 ${TYPE_STYLE[item.type]}`}>{item.type}</span>
          <span className="font-mono text-ink w-24 shrink-0">{item.sku}</span>
          <span className="text-steel flex-1 truncate">{item.warehouse}</span>
          <span className="font-mono tabular-nums text-ink">{item.qty}</span>
        </div>
      ))}
    </div>
  );
}

const STYLES = {
  Active: 'bg-teal-soft text-teal',
  Suspended: 'bg-alert-soft text-alert',
};

export default function StatusPill({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STYLES[status] ?? 'bg-steel-line text-steel'}`}>
      {status}
    </span>
  );
}

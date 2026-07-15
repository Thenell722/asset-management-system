'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ListChecks, ShieldCheck, Boxes, X } from 'lucide-react';

const NAV = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/assets', label: 'Assets', icon: ListChecks },
  { href: '/roles', label: 'Roles', icon: ShieldCheck },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-ink/50 md:hidden"
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-fuchsia-950  text-paper flex flex-col
        transform transition-transform md:translate-x-0 md:static md:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-purple-500 text-ink-navy">
              <Boxes size={10} strokeWidth={3} /> {/* this is a good option or replace it with the image */}
            </span>
            <div className="leading-none">
              <p className="font-display text-xl tracking-wide">Invento</p>
              <p className="text-[10px] uppercase tracking-widest2 text-steel-soft">Asset Management</p>
            </div>
          </div>
          <button className="md:hidden text-steel-soft" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium border-l-2 transition-colors
                ${active
                  ? 'bg-white/[0.06] border-amber text-white'
                  : 'border-transparent text-steel-soft hover:text-white hover:bg-white/[0.04]'}`}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-widest2 text-steel-soft mb-1">IT DEPARTMENT</p>
          <p className="text-sm text-white">Avacado LTD</p>
        </div>
      </aside>
    </>
  );
}

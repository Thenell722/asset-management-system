'use client';

import { X } from 'lucide-react';

export default function Modal({ open, title, eyebrow, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-ink/55"
      />
      <div className="relative bg-paper-card border border-steel-line rounded-lg shadow-card w-full max-w-md">
        <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-steel-line">
          <div>
            {eyebrow && <p className="text-[10px] uppercase tracking-widest2 text-steel mb-0.5">{eyebrow}</p>}
            <h2 className="font-display text-xl text-ink">{title}</h2>
          </div>
          <button onClick={onClose} className="text-steel-soft hover:text-ink" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

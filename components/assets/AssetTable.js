'use client';

import React, { useState } from 'react';
import { Pencil, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import StatusPill from '@/components/StatusPill';

export default function AssetTable({ assets, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(null);

  if (assets.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-steel">
        No assets found.
      </div>
    );
  }

  function toggle(id) {
    setExpanded(expanded === id ? null : id);
  }

  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-widest text-steel border-b border-steel-line">
            <th className="px-5 py-3 w-10"></th>
            <th className="px-5 py-3">Asset Tag</th>
            <th className="px-5 py-3">Category</th>
            <th className="px-5 py-3">Manufacturer</th>
            <th className="px-5 py-3">Model</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Assigned To</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-steel-line">
          {assets.map((asset) => (
            <React.Fragment key={asset.id}>
              <tr
                className="hover:bg-paper cursor-pointer"
                onClick={() => toggle(asset.id)}
              >
                <td className="px-5 py-4">
                  {expanded === asset.id ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </td>

                <td className="px-5 py-4 font-medium">
                  {asset.assetTag}
                </td>

                <td className="px-5 py-4">
                  {asset.category}
                </td>

                <td className="px-5 py-4">
                  {asset.manufacturer}
                </td>

                <td className="px-5 py-4">
                  {asset.model}
                </td>

                <td className="px-5 py-4">
                  <StatusPill status={asset.status} />
                </td>

                <td className="px-5 py-4">
                  {asset.assignedEmployee || '-'}
                </td>

                <td
                  className="px-5 py-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(asset)}
                      className="grid place-items-center w-8 h-8 rounded-md text-steel hover:text-ink hover:bg-paper"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(asset)}
                      className="grid place-items-center w-8 h-8 rounded-md text-steel hover:text-alert hover:bg-alert-soft"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>

              {expanded === asset.id && (
                <tr>
                  <td colSpan={8} className="bg-paper px-8 py-6">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

                      <Detail
                        label="Serial Number"
                        value={asset.serialNumber}
                      />

                      <Detail
                        label="Purchase Date"
                        value={asset.purchaseDate}
                      />

                      <Detail
                        label="Purchase Cost"
                        value={
                          asset.purchaseCost
                            ? `$${asset.purchaseCost}`
                            : '-'
                        }
                      />

                      <Detail
                        label="Warranty Expiry"
                        value={asset.warrantyExpiry}
                      />

                      <Detail
                        label="Department"
                        value={asset.department}
                      />

                      <Detail
                        label="Location"
                        value={asset.location}
                      />

                      <Detail
                        label="Condition"
                        value={asset.condition}
                      />

                    </div>

                    {asset.notes && (
                      <div className="mt-6">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-steel mb-2">
                          Notes
                        </h4>

                        <div className="rounded-lg border border-steel-line bg-white p-4 text-sm text-ink">
                          {asset.notes}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-steel">
        {label}
      </p>

      <p className="mt-1 font-medium text-ink">
        {value || '-'}
      </p>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';

const EMPTY = {
  assetTag: '',
  category: '',
  manufacturer: '',
  model: '',
  serialNumber: '',

  purchaseDate: '',
  purchaseCost: '',
  warrantyExpiry: '',

  status: 'Available',
  assignedEmployee: '',
  location: '',
  department: '',
  condition: 'Excellent',

  notes: '',
};

export default function AssetModal({
  open,
  onClose,
  onSave,
  initial,
}) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(initial ? { ...EMPTY, ...initial } : EMPTY);
    setError('');
  }, [initial, open]);

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.assetTag.trim() ||
      !form.category ||
      !form.manufacturer.trim() ||
      !form.model.trim()
    ) {
      setError(
        'Asset Tag, Category, Manufacturer and Model are required.'
      );
      return;
    }

    onSave(form);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={initial ? initial.assetTag : 'New Asset'}
      title={initial ? 'Edit Asset' : 'Add Asset'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Asset Information */}
        <div>
          <h3 className="text-sm font-semibold text-ink-navy mb-4">
            Asset Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field label="Asset Tag *">
              <input
                className="input"
                value={form.assetTag}
                onChange={(e) =>
                  handleChange('assetTag', e.target.value)
                }
                placeholder="AST-0001"
              />
            </Field>

            <Field label="Category *">
              <select
                className="input"
                value={form.category}
                onChange={(e) =>
                  handleChange('category', e.target.value)
                }
              >
                <option value="">Select Category</option>
                <option>Laptop</option>
                <option>Desktop</option>
                <option>Monitor</option>
                <option>Printer</option>
                <option>Phone</option>
                <option>Tablet</option>
                <option>Networking</option>
                <option>Accessory</option>
              </select>
            </Field>

            <Field label="Manufacturer *">
              <input
                className="input"
                value={form.manufacturer}
                onChange={(e) =>
                  handleChange('manufacturer', e.target.value)
                }
                placeholder="Dell"
              />
            </Field>

            <Field label="Model *">
              <input
                className="input"
                value={form.model}
                onChange={(e) =>
                  handleChange('model', e.target.value)
                }
                placeholder="Latitude 5420"
              />
            </Field>

            <Field label="Serial Number">
              <input
                className="input"
                value={form.serialNumber}
                onChange={(e) =>
                  handleChange('serialNumber', e.target.value)
                }
                placeholder="ABC123456"
              />
            </Field>

          </div>
        </div>

        {/* Purchase Information */}

        <div>
          <h3 className="text-sm font-semibold text-ink-navy mb-4">
            Purchase Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field label="Purchase Date">
              <input
                type="date"
                className="input"
                value={form.purchaseDate}
                onChange={(e) =>
                  handleChange('purchaseDate', e.target.value)
                }
              />
            </Field>

            <Field label="Purchase Cost">
              <input
                type="number"
                className="input"
                value={form.purchaseCost}
                onChange={(e) =>
                  handleChange('purchaseCost', e.target.value)
                }
                placeholder="1500"
              />
            </Field>

            <Field label="Warranty Expiry">
              <input
                type="date"
                className="input"
                value={form.warrantyExpiry}
                onChange={(e) =>
                  handleChange('warrantyExpiry', e.target.value)
                }
              />
            </Field>

          </div>
        </div>

        {/* Assignment */}

        <div>
          <h3 className="text-sm font-semibold text-ink-navy mb-4">
            Assignment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field label="Assigned Employee">
              <input
                className="input"
                value={form.assignedEmployee}
                onChange={(e) =>
                  handleChange(
                    'assignedEmployee',
                    e.target.value
                  )
                }
                placeholder="John Smith"
              />
            </Field>

            <Field label="Department">
              <select
                className="input"
                value={form.department}
                onChange={(e) =>
                  handleChange('department', e.target.value)
                }
              >
                <option value="">Select Department</option>
                <option>IT</option>
                <option>Finance</option>
                <option>Human Resources</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Operations</option>
              </select>
            </Field>

            <Field label="Location">
              <input
                className="input"
                value={form.location}
                onChange={(e) =>
                  handleChange('location', e.target.value)
                }
                placeholder="Head Office"
              />
            </Field>

          </div>
        </div>

        {/* Asset Details */}

        <div>
          <h3 className="text-sm font-semibold text-ink-navy mb-4">
            Asset Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field label="Status">
              <select
                className="input"
                value={form.status}
                onChange={(e) =>
                  handleChange('status', e.target.value)
                }
              >
                <option>Available</option>
                <option>Assigned</option>
              </select>
            </Field>

            <Field label="Condition">
              <select
                className="input"
                value={form.condition}
                onChange={(e) =>
                  handleChange('condition', e.target.value)
                }
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
                <option>Damaged</option>
              </select>
            </Field>

          </div>
        </div>

        {/* Notes */}

        <Field label="Notes">
          <textarea
            rows={4}
            className="input resize-none"
            value={form.notes}
            onChange={(e) =>
              handleChange('notes', e.target.value)
            }
            placeholder="Additional information about the asset..."
          />
        </Field>

        {/* Error */}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Buttons */}

        <div className="flex justify-end gap-3 pt-2">

          <button
            type="button"
            onClick={onClose}
            className="btn-ghost"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-primary"
          >
            {initial ? 'Save Changes' : 'Add Asset'}
          </button>

        </div>

      </form>
    </Modal>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-steel mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
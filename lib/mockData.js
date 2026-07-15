// ---------------------------------------------------------------------------
// Mock data layer.
// Swap the exports below for real API calls (e.g. fetch('/api/...')) once
// the backend is wired up. Shapes are kept deliberately simple/flat so the
// swap is mechanical.
// ---------------------------------------------------------------------------

export const stats = [
  { id: 'sku', label: 'SKUs tracked', value: '1,284', delta: '+36 this month', tone: 'teal' },
  { id: 'value', label: 'Inventory value', value: '$482.6k', delta: '+4.1% vs last month', tone: 'amber' },
  { id: 'low', label: 'Low stock alerts', value: '17', delta: '5 need reorder today', tone: 'alert' },
  { id: 'turns', label: 'Stock turns / yr', value: '6.4', delta: '+0.3 vs target', tone: 'steel' },
];

export const stockTrend = [
  { month: 'Jan', inbound: 3200, outbound: 2800 },
  { month: 'Feb', inbound: 3400, outbound: 3100 },
  { month: 'Mar', inbound: 3100, outbound: 3300 },
  { month: 'Apr', inbound: 3800, outbound: 3200 },
  { month: 'May', inbound: 4100, outbound: 3600 },
  { month: 'Jun', inbound: 3950, outbound: 3800 },
  { month: 'Jul', inbound: 4300, outbound: 3900 },
];

export const categoryBreakdown = [
  { name: 'Raw materials', value: 34, color: '#E8A33D' },
  { name: 'Packaging', value: 22, color: '#2F8F7B' },
  { name: 'Finished goods', value: 28, color: '#B0552E' },
  { name: 'Spare parts', value: 16, color: '#56626F' },
];

export const activityLog = [
  { id: 'A-1042', type: 'Inbound', sku: 'RM-2281', qty: '+240', warehouse: 'Dock 3', time: '08:12' },
  { id: 'A-1041', type: 'Outbound', sku: 'FG-0093', qty: '-88', warehouse: 'Dock 1', time: '07:55' },
  { id: 'A-1040', type: 'Adjustment', sku: 'PK-1187', qty: '-6', warehouse: 'Bay B', time: '07:30' },
  { id: 'A-1039', type: 'Inbound', sku: 'SP-0442', qty: '+120', warehouse: 'Dock 2', time: '06:58' },
  { id: 'A-1038', type: 'Outbound', sku: 'FG-0071', qty: '-54', warehouse: 'Dock 1', time: '06:41' },
];

export const initialRoles = [
  {
    id: 'ROLE-01',
    name: 'Warehouse Admin',
    description: 'Full access to inventory, users, and role configuration.',
    permissions: ['Manage products', 'Manage stock movements', 'Manage users', 'Manage roles', 'View reports'],
  },
  {
    id: 'ROLE-02',
    name: 'Inventory Clerk',
    description: 'Records stock in/out and views product catalog.',
    permissions: ['Manage stock movements', 'View reports'],
  },
  {
    id: 'ROLE-03',
    name: 'Auditor',
    description: 'Read-only access across dashboards and reports.',
    permissions: ['View reports'],
  },
];

export const initialUsers = [
  { id: 'U-101', name: 'Dara Whitfield', email: 'dara.whitfield@warely.com', role: 'Warehouse Admin', status: 'Active' },
  { id: 'U-102', name: 'Miles Sato', email: 'miles.sato@warely.com', role: 'Inventory Clerk', status: 'Active' },
  { id: 'U-103', name: 'Priya Anand', email: 'priya.anand@warely.com', role: 'Inventory Clerk', status: 'Active' },
  { id: 'U-104', name: 'Owen Blackwood', email: 'owen.blackwood@warely.com', role: 'Auditor', status: 'Suspended' },
  { id: 'U-105', name: 'Ceylan Aksoy', email: 'ceylan.aksoy@warely.com', role: 'Warehouse Admin', status: 'Active' },
];

export const ALL_PERMISSIONS = [
  'Manage products',
  'Manage stock movements',
  'Manage users',
  'Manage roles',
  'View reports',
];

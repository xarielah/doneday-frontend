export const statusList = [
    { value: 'done', label: 'Done', className: 'status-done' },
    { value: 'wip', label: 'Working on it', className: 'status-wip' },
    { value: 'stuck', label: 'Stuck', className: 'status-stuck' },
    { value: 'onhold', label: 'On Hold', className: 'status-onhold' },
    { value: 'revision', label: 'Requires Revision', className: 'status-revision' },
    { value: 'design', label: 'In Design', className: 'status-design' },
    { value: 'draft', label: 'Draft', className: 'status-draft' },
]

export const priorityList = [
    { value: 'low', label: 'Low', className: 'priority-low' },
    { value: 'medium', label: 'Medium', className: 'priority-medium' },
    { value: 'high', label: 'High', className: 'priority-high' },
    { value: 'critical', label: 'Critical ⚠️', className: 'priority-critical' },
    { value: 'tbd', label: 'TBD', className: 'priority-tbd' },
]

export const STATUS_COLORS = {
    'done': '#00c875',     // Green
    'wip': '#fdab3d',      // Orange
    'stuck': '#e44258',    // Red
    'onhold': '#a25ddc',   // Purple
    'revision': '#0086c0', // Blue
    'design': '#579bfc',   // Light Blue
    'draft': '#c4c4c4'     // Gray
};
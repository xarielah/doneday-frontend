const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

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

const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
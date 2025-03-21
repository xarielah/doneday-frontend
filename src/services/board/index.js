const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from './board.service.local';
import { boardService as remote } from './board.service.remote';

export { priorityList, statusList } from './board-values';

const service = VITE_LOCAL === 'true' ? local : remote;
export const boardService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
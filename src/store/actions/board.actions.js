
import { storageService } from '../../services/async-storage.service';
import { boardService } from '../../services/board';
import { userService } from '../../services/user';

import { NOTIFICATION_INDICATOR, REMOVE_BOARD, SET_BOARD, SET_BOARDS, SET_CMP_ORDER, SET_FILTER, SET_MEMBERS, SET_SORT, UPDATE_NOTIFICATIONS } from '../reducers/board.reducer';
import { store } from '../store';

export async function loadMembers() {
    const users = await userService.getUsers();
    store.dispatch(getCmdSetMembers(users));
}

export async function loadNotifications() {
    const notifications = await storageService.query('notificationsDB') || [];
    store.dispatch(getCmdSetNotifications(notifications));
}

export async function addNewNotification(notification) {
    let notifications = await storageService.query('notificationsDB') || [];
    notifications = [notification, ...notifications];

    alertNotifications();

    storageService._save('notificationsDB', notifications);
    store.dispatch(getCmdSetNotifications(notifications));
}

// Get Boards
export async function loadBoards() {
    try {
        const boards = await boardService.query();
        store.dispatch(getCmdSetBoards(boards));
        return boards;
    } catch (err) {
        console.error('Board Action -> Cannot load boards', err);
        throw err;
    }
}

export function readNotifications() {
    const notifications = store.getState().boardModule.notifications;
    for (let notification of notifications) {
        notification.read = true;
    }
    storageService._save('notificationsDB', notifications);
    store.dispatch(getCmdSetNotifications(notifications));
    store.dispatch(getCmdNotificationIndicator(false));
}

export function alertNotifications() {
    store.dispatch(getCmdNotificationIndicator(true));
}

export async function updateBoardRemoved(boardId) {
    let boards = store.getState().boardModule.boards;
    boards = boards.filter(board => board._id !== boardId);
    store.dispatch(getCmdSetBoards(boards))
}

// Save boards
export async function setBoards(boards) {
    try {
        store.dispatch(getCmdSetBoards(boards));
        const savedBoards = await Promise.all(
            boards.map(board => boardService.save(board))
        );
        // store.dispatch(getCmdSetBoards(savedBoards));
        return savedBoards;
    } catch (error) {
        console.error('Failed to save boards:', error);
        throw error;
    }
}

// Get Board
export async function getById(boardId, filterBy = {}, sortBy = []) {
    try {
        const board = await boardService.getById(boardId, filterBy, sortBy);
        if (!board) throw new Error('Board not found');
        return board;
    } catch (err) {
        console.error('Board Action -> Cannot get board', err);
        throw err;
    }
}

// Set Board
export async function setBoard(board) {
    store.dispatch(getCmdSetBoard(board));
}

// Remove Board
export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId);
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.error('Board Action -> Cannot remove board', err);
        throw err;
    }
}

// Add Board
export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board);
        store.dispatch(getCmdSetBoard(savedBoard));
        const boards = await boardService.query()
        store.dispatch(getCmdSetBoards(boards));
        return savedBoard;
    } catch (err) {
        console.error('Board Action -> Cannot add board', err);
        throw err;
    }
}

// Update Board
export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board);
        store.dispatch(getCmdSetBoard(savedBoard));
    } catch (err) {
        console.error('Board Action -> Cannot save board', err)
        throw err
    }
}

// Update Board Without setting it a current board
export async function updateBoardOnBackground(board) {
    try {
        await boardService.save(board);
    } catch (err) {
        console.error('Board Action -> Cannot save board', err)
        throw err
    }
}

// Set Component Order (optional action)
export function setCmpOrder(cmpOrder) {
    return store.dispatch(getCmdCmpOrder(cmpOrder));
}

// Set Filter
export function setFilterBy(filterBy) {
    return store.dispatch(getCmdFilterBy(filterBy));
}
// Set Sort
export function setSortBy(sortBy) {
    return store.dispatch(getCmdSortBy(sortBy));
}

// Command Creators:
// Board Commands
function getCmdSetBoards(boards) {
    return { type: SET_BOARDS, boards };
}
export function getCmdSetBoard(board) {
    return { type: SET_BOARD, board };
}

function getCmdRemoveBoard(boardId) {
    return { type: REMOVE_BOARD, boardId }
}

// Component Order Command
function getCmdCmpOrder(cmpOrder) {
    return { type: SET_CMP_ORDER, cmpOrder };
}

// Filter By Command
function getCmdFilterBy(filterBy) {
    return { type: SET_FILTER, filterBy };
}
function getCmdSortBy(sortBy) {
    return { type: SET_SORT, sortBy };
}

function getCmdSetMembers(members) {
    return { type: SET_MEMBERS, members };
}

function getCmdSetNotifications(notifications) {
    return { type: UPDATE_NOTIFICATIONS, notifications };
}

function getCmdNotificationIndicator(state) {
    return { type: NOTIFICATION_INDICATOR, state };
}
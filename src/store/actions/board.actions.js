
// import { getDummyBoardAsync } from '../../../board'
import { boardService } from '../../services/board/board.service.local'
import { groupService } from '../../services/board/group.service.local'
import { taskService } from '../../services/board/task.service.local'
import { ADD_BOARD, ADD_GROUP, ADD_TASK, REMOVE_BOARD, REMOVE_GROUP, REMOVE_TASK, SET_BOARD, SET_BOARDS, SET_CMP_ORDER, SET_TASK, UPDATE_BOARD, UPDATE_GROUP, UPDATE_TASK, } from '../reducers/board.reducer'
import { store } from '../store'

loadBoards()
// Set Boards
export async function loadBoards(filterBy = {}) {
    try {
        const boards = await boardService.getBoards(filterBy);
        store.dispatch(getCmdSetBoards(boards));
        return boards;
    } catch (err) {
        console.error('Board Action -> Cannot load boards', err);
        throw err;
    }
}

// Get Board
export async function getBoardById(boardId) {
    try {
        const board = await boardService.getBoardById(boardId);
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
        await boardService.removeBoard(boardId);
        store.dispatch(getCmdRemoveBoard(boardId));
    } catch (err) {
        console.error('Board Action -> Cannot remove board', err);
        throw err;
    }
}

// Add Board
export async function addBoard(board) {
    try {
        const savedBoard = await boardService.saveBoard(board);
        store.dispatch(getCmdAddBoard(savedBoard));
        return savedBoard;
    } catch (err) {
        console.error('Board Action -> Cannot add board', err);
        throw err;
    }
}

// Update Board
export async function updateBoard(board) {
    try {
        return await boardService.saveBoard(board)
            .then(savedBoard => {
                store.dispatch(getCmdUpdateBoard(savedBoard))
                return savedBoard
            })
    } catch (err) {
        console.log('Board Action -> Cannot save board', err)
        throw err
    }
}


// Get Group
export async function getGroupById(groupId) {
    const board = store.getState().boardModule.board;

    if (!board || !board.groups) {
        throw new Error('No board found in the store or board has no groups.');
    }

    const group = board.groups.find(group => group._id === groupId);
    if (!group) {
        throw new Error(`Group with ID ${groupId} not found.`);
    }

    return group;
}

// Add Group
export async function addGroup(group) {
    const board = store.getState().boardModule.board;

    if (!board) throw new Error('No board found in the store.');

    try {
        const savedGroup = await boardService.saveGroup(board._id, group);
        store.dispatch(getCmdAddGroup(savedGroup));
        return savedGroup;
    } catch (err) {
        console.error('Board Action -> Cannot add group', err);
        throw err;
    }
}

// Update Group
export async function updateGroup(group) {
    const board = store.getState().boardModule.board;

    if (!board) throw new Error('No board found in the store.');

    try {
        const savedGroup = await boardService.saveGroup(board._id, group);
        store.dispatch(getCmdUpdateGroup(savedGroup));
        return savedGroup;
    } catch (err) {
        console.error('Board Action -> Cannot update group', err);
        throw err;
    }
}

// Remove Group
export async function removeGroup(groupId) {
    const board = store.getState().boardModule.board;

    if (!board) throw new Error('No board found in the store.');

    try {
        await boardService.removeGroup(board._id, groupId);
        store.dispatch(getCmdRemoveGroup(groupId));
    } catch (err) {
        console.error('Board Action -> Cannot remove group', err);
        throw err;
    }
}

// Get Task
export async function getTaskById(groupId, taskId) {
    const board = store.getState().boardModule.board;

    if (!board || !board.groups) {
        throw new Error('No board found in the store or board has no groups.');
    }

    const group = board.groups.find(group => group._id === groupId);
    if (!group || !group.tasks) {
        throw new Error(`Group with ID ${groupId} not found or has no tasks.`);
    }

    const task = group.tasks.find(task => task._id === taskId);
    if (!task) {
        throw new Error(`Task with ID ${taskId} not found.`);
    }

    return task;
}


// Add Task
export async function addTask(groupId, task) {
    const board = store.getState().boardModule.board;

    if (!board) throw new Error('No board found in the store.');

    try {
        const savedTask = await boardService.saveTask(board._id, groupId, task);
        store.dispatch(getCmdAddTask(groupId, savedTask));
        return savedTask;
    } catch (err) {
        console.error('Board Action -> Cannot add task', err);
        throw err;
    }
}

// Update Task
export async function updateTask(groupId, updatedTask) {
    const board = store.getState().boardModule.board;

    if (!board) throw new Error('No board found in the store.');

    try {
        const savedTask = await boardService.saveTask(board._id, groupId, updatedTask);
        store.dispatch(getCmdUpdateTask(groupId, savedTask));
        return savedTask;
    } catch (err) {
        console.error('Board Action -> Cannot update task', err);
        throw err;
    }
}


// Remove Task
export async function removeTask(groupId, taskId) {
    const board = store.getState().boardModule.board;

    if (!board) throw new Error('No board found in the store.');

    try {
        await boardService.removeTask(board._id, groupId, taskId);
        store.dispatch(getCmdRemoveTask(groupId, taskId));
    } catch (err) {
        console.error('Board Action -> Cannot remove task', err);
        throw err;
    }
}

// Set Task (for local state updates)
export function setTask(task) {
    store.dispatch(getCmdSetTask(task));
}

// Set Component Order (optional action)
export function setCmpOrder(cmpOrder) {
    return getCmdCmpOrder(cmpOrder);
}

// Command Creators:
// Board Commands
function getCmdSetBoards(boards) {
    return { type: SET_BOARDS, boards };
}
function getCmdSetBoard(board) {
    return { type: SET_BOARD, board };
}
function getCmdRemoveBoard(boardId) {
    return { type: REMOVE_BOARD, boardId };
}
function getCmdAddBoard(board) {
    return { type: ADD_BOARD, board };
}
function getCmdUpdateBoard(board) {
    return { type: UPDATE_BOARD, board };
}

// Group Commands
function getCmdAddGroup(group) {
    return { type: ADD_GROUP, group };
}
function getCmdUpdateGroup(group) {
    return { type: UPDATE_GROUP, group };
}
function getCmdRemoveGroup(groupId) {
    return { type: REMOVE_GROUP, groupId };
}

// Task Commands
function getCmdSetTask(task) {
    return { type: SET_TASK, task };
}
function getCmdAddTask(groupId, task) {
    return { type: ADD_TASK, groupId, task };
}
function getCmdUpdateTask(groupId, task) {
    return { type: UPDATE_TASK, groupId, task };
}
function getCmdRemoveTask(groupId, taskId) {
    return { type: REMOVE_TASK, groupId, taskId };
}

// Component Order Command
function getCmdCmpOrder(cmpOrder) {
    return { type: SET_CMP_ORDER, cmpOrder };
}
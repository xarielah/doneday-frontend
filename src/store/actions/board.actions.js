
import { getDummyBoardAsync } from '../../../board'
import { boardService } from '../../services/board/board.service.local'
import { groupService } from '../../services/board/group.service.local'
import { taskService } from '../../services/board/task.service.local'
import { ADD_BOARD, ADD_GROUP, ADD_SELECTED_TASK, ADD_TASK, REMOVE_BOARD, REMOVE_GROUP, REMOVE_SELECTED_TASK, REMOVE_TASK, SET_BOARD, SET_BOARDS, SET_CMP_ORDER, SET_SELECTED_TASK, SET_TASK, UPDATE_BOARD, UPDATE_GROUP, UPDATE_TASK, } from '../reducers/board.reducer'
import { store } from '../store'


const boardId = "hey"




// Set Boards
export async function loadBoards(filterBy = {}) {
    try {
        //     const boards = await boardService.query(filterBy)
        return boardService.getBoards()
            .then(boards => {
                store.dispatch(getCmdSetBoards(boards))
            })
    } catch (err) {
        console.log('Board Action -> Cannot load boards', err)
        throw err
    }
}

// Set Board
export async function setBoard(board) {
    store.dispatch(getCmdSetBoard(board))
}

// Remove Board
export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log('Board Action -> Cannot remove board', err)
        throw err
    }
}

// Add Board
export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Board Action -> Cannot add board', err)
        throw err
    }
}

// Update Board
export async function updateBoard(board) {
    try {
        return await boardService.save(board)
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
export function getGroupById(groupId) {
    try {
        const board = store.getState().boardModule.board;
        if (!board || !board.groups) {
            throw new Error('Board or groups are undefined.');
        }

        const group = board.groups.find(group => group._id === groupId);
        if (!group) {
            throw new Error(`Group with ID ${groupId} not found.`);
        }
        return group;
    } catch (err) {
        console.error('Error in getGroupById:', err.message);
        return null;
    }
}


// Add Group
export async function addGroup(group) {
    try {
        return groupService.add(group)
            .then((savedGroup) => {
                store.dispatch(getCmdAddGroup(savedGroup))
            })
    } catch (err) {
        console.log('Board Action -> Cannot add group', err)
        throw err
    }
}


// Update Group
export async function updateGroup(group) {
    try {
        return groupService.update(group)
            .then((savedGroup) => {
                store.dispatch(getCmdUpdateGroup(savedGroup))
            })
    } catch (err) {
        console.log('Board Action -> Cannot update group', err)
        throw err
    }
}


// Remove Group
export async function removeGroup(groupId) {
    try {
        return groupService.remove(groupId)
            .then(() => {
                store.dispatch(getCmdRemoveGroup(groupId))
            })
    } catch (err) {
        console.log('Board Action -> Cannot remove group', err)
        throw err
    }
}

// Set Task
export async function setTask(task) {
    try {
        return store.dispatch(getCmdSetTask(task))

    } catch (err) {
        console.log('Board Action -> Cannot set task', err)
        throw err
    }
}

// Get Task
export function getTaskById(taskId) {
    const board = store.getState().boardModule.board;
    for (const group of board.groups) {
        for (const task of group.tasks || []) {
            if (task._id === taskId) {
                return task;
            }
        }
    }
    return null;
}


// Add Task
export async function addTask(groupId, task) {
    try {

        return taskService.add(task)
            .then(task => {
                store.dispatch(getCmdAddTask(groupId, task))
            })
    } catch (err) {
        console.log('Board Action -> Cannot update task', err)
        throw err
    }
}

// Update Task
export async function updateTask(groupId, updatedTask) {
    try {
        const currentBoard = store.getState().boardModule.board
        const currentGroup = currentBoard.groups.find(group => group._id === groupId)
        const taskIdx = currentGroup.tasks.findIndex(task => task._id === updatedTask._id)
        if (taskIdx === -1) return
        currentGroup.tasks.splice(taskIdx, 1, updatedTask);

        taskService.update(updatedTask).then(() => setBoard(currentBoard))
    } catch (err) {
        console.log('Board Action -> Cannot update task', err)
        throw err
    }
}

// Remove Task
export async function removeTask(groupId, taskId) {
    try {
        return taskService.remove(taskId)
            .then(() => {
                return store.dispatch(getCmdRemoveTask(groupId, taskId))
            })
    } catch (err) {
        console.log('Board Action -> Cannot remove task', err)
        throw err
    }
}

export async function setSelectedTask(selectedTasks = []) {
    try {
        return store.dispatch(getCmdSetSelectedTasks(selectedTasks))
    } catch (err) {
        console.log('Board Action -> Cannot set select task', err)
        throw err
    }
}

export async function addSelectedTask(groupId, taskId) {
    try {
        return store.dispatch(getCmdAddSelectedTasks(groupId, taskId))

    } catch (err) {
        console.log('Board Action -> Cannot select task', err)
        throw err
    }
}

export async function removeSelectedTask(groupId, taskId) {
    try {
        return store.dispatch(getCmdRemoveSelectedTasks(groupId, taskId))
    } catch (err) {
        console.log('Board Action -> Cannot remove select task', err)
        throw err
    }
}

export async function addSelectedGroup(groupId, tasks) {
    try {
        if (!Array.isArray(tasks)) return
        for (const task of tasks) {
            store.dispatch(getCmdAddSelectedTasks(groupId, task._id))
        }

    } catch (err) {
        console.log('Board Action -> Cannot select group tasks', err)
        throw err
    }
}


export async function removeSelectedGroup(groupId, tasks) {
    try {
        if (!Array.isArray(tasks)) return
        for (const task of tasks) {
            store.dispatch(getCmdRemoveSelectedTasks(groupId, task._id))
        }

    } catch (err) {
        console.log('Board Action -> Cannot unselect group tasks', err)
        throw err
    }
}


export async function setCmpOrder(cmpOrder) {
    return getCmdCmpOrder(cmpOrder)
}






// Command Creators:
// Board
function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}
function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board: { ...board }
    }
}
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

// Group
function getCmdAddGroup(group) {
    return {
        type: ADD_GROUP,
        group
    }
}
function getCmdUpdateGroup(group) {
    return {
        type: UPDATE_GROUP,
        group
    }
}
function getCmdRemoveGroup(groupId) {
    return {
        type: REMOVE_GROUP,
        groupId
    }
}

// Task
function getCmdSetTask(task) {
    return {
        type: SET_TASK,
        task
    }
}
function getCmdAddTask(groupId, task) {
    return {
        type: ADD_TASK,
        groupId,
        task
    }
}
function getCmdUpdateTask(groupId, task) {
    return {
        type: UPDATE_TASK,
        groupId,
        task
    }
}
function getCmdRemoveTask(groupId, taskId) {
    return {
        type: REMOVE_TASK,
        groupId,
        taskId
    }
}
function getCmdCmpOrder(cmpOrder) {
    return {
        type: SET_CMP_ORDER,
        cmpOrder
    }
}



// Selected Tasks
function getCmdSetSelectedTasks(selectedTasks = []) {
    return {
        type: SET_SELECTED_TASK,
        selectedTasks
    }
}
function getCmdAddSelectedTasks(groupId, taskId) {
    return {
        type: ADD_SELECTED_TASK,
        groupId,
        taskId
    }
}
function getCmdRemoveSelectedTasks(groupId, taskId) {
    return {
        type: REMOVE_SELECTED_TASK,
        groupId,
        taskId
    }
}



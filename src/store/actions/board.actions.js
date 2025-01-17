/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { boardService } from '../../services/board'
import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, ADD_GROUP, UPDATE_GROUP, REMOVE_GROUP, SET_TASK, ADD_TASK, UPDATE_TASK, REMOVE_TASK, } from '../reducers/board.reducer'
import { getBoard, getDummyBoardAsync, testBoard } from '../../../board'

// Set Boards
export async function loadBoards(filterBy = {}) {
    try {
        //     const boards = await boardService.query(filterBy)
        const boards = testBoard
        store.dispatch(getCmdSetBoards(boards))
        return boards
    } catch (err) {
        console.log('Board Action -> Cannot load boards', err)
        throw err
    }
}

// Set Board
export async function loadBoard(boardId) {
    try {
        // const board = await boardService.getById(boardId)
        const board = testBoard
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('Board Action -> Cannot load board', err)
        throw err
    }
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
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Board Action -> Cannot save board', err)
        throw err
    }
}


// Add Group
export async function addGroup(group) {
    try {
        return getDummyBoardAsync(boardId) //saveGroup(boardId, group)
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
        return getDummyBoardAsync(boardId) //saveGroup(boardId, group)
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
        return getDummyBoardAsync(boardId) //removeGroup(boardId, groupId)
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

// Add Task
export async function addTask(groupId, task) {
    try {
        return getDummyBoardAsync(boardId) //saveTask(groupId, task)
            .then((savedTask) => {
                store.dispatch(getCmdAddTask(groupId, savedTask))
            })
    } catch (err) {
        console.log('Board Action -> Cannot add task', err)
        throw err
    }
}

// Update Task
export async function updateTask(groupId, task) {
    try {
        return getDummyBoardAsync(boardId) //saveTask(groupId, task)
            .then((savedTask) => {
                store.dispatch(getCmdUpdateTask(groupId, savedTask))
            })
    } catch (err) {
        console.log('Board Action -> Cannot update task', err)
        throw err
    }
}

// Remove Task
export async function removeTask(groupId, taskId) {
    try {
        return getDummyBoardAsync(boardId) //removeTask(boardId, groupId, taskId)
            .then(() => {
                store.dispatch(getCmdRemoveTask(groupId, taskId))
            })
    } catch (err) {
        console.log('Board Action -> Cannot remove task', err)
        throw err
    }
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
        board
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

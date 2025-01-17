/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'

export const SET_TASK = 'SET_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'


const initialState = {
    boards: [],
    board: [],
    selectedTasks: null,
    lastRemovedBoard: null,
    statusLabels: [],
    priorityLabels: []
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case SET_BOARDS:
            newState = {
                ...state,
                boards: action.boards
            }
            break
        case SET_BOARD:
            newState = {
                ...state,
                board: action.board
            }
            break
        case REMOVE_BOARD:
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = {
                ...state,
                boards,
                lastRemovedBoard
            }
            break
        case ADD_BOARD:
            newState = {
                ...state,
                boards: [...state.boards, action.board]
            }
            break
        case UPDATE_BOARD:
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = {
                ...state,
                boards
            }
            break
        case ADD_GROUP:
            newState = {
                ...state,
                board: [...state.board, action.group]
            }
            break
        case UPDATE_GROUP:
            newState = {
                ...state,
                board: state.board.map(group => (group._id === action.group._id) ? action.group : group)
            }
            break
        case REMOVE_GROUP:
            newState = {
                ...state,
                board: state.board.filter(group => group._id !== action.groupId)
            }
            break
        case SET_TASK:
            newState = {
                ...state,
                selectedTasks: action.task
            }
            break
        case ADD_TASK:
            const newBoard = state.board.map(group => group._id === action.groupId ? { ...group, tasks: [...group.tasks, action.task] } : group)
            newState = {
                ...state,
                board: [
                    ...newBoard
                ]
            }
            break
        case UPDATE_TASK:
            const updatedBoard = state.board.map(group => group._id === action.groupId ? group.tasks.map(task => task._id === action.task._id ? action.task : task) : group)
            newState = {
                ...state,
                board: [
                    ...updatedBoard
                ]
            }
            break
        case REMOVE_TASK:
            newState = {
                ...state,
                board: state.board.map(group => group._id === action.groupId ? group.tasks.filter(task => task._id !== action.taskId) : group)
            }
            break
        default:
    }
    return newState
}



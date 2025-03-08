export const SET_BOARDS = 'SET_BOARDS';
export const SET_BOARD = 'SET_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const ADD_BOARD = 'ADD_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';

export const ADD_GROUP = 'ADD_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';

export const SET_TASK = 'SET_TASK';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

export const SET_CMP_ORDER = 'SET_CMP_ORDER';

export const ADD_MEMBERS = 'ADD_MEMBERS'

export const SET_GLOBALLY_COLLAPSED = 'SET_GLOBALLY_COLLAPSED';

export const REMOVE_SELECTED_TASK = 'REMOVE_SELECTED_TASK';



const initialState = {
    boards: [],
    board: null,
    selectedTasks: [],
    lastRemovedBoard: null,
    statusLabels: [],
    priorityLabels: [],
    cmpOrder: ["status",
        "priority",
        "members",
        "date",
        "timeline",
    "link"],
    isGloballyCollapsed: false
};

export function boardReducer(state = initialState, action) {
    let boards;
    switch (action.type) {
        case SET_BOARDS:
            return {
                ...state,
                boards: action.boards || []
            };

        case SET_BOARD:
            return {
                ...state,
                board: action.board || { groups: [] }
            };

        case UPDATE_BOARD:
            return {
                ...state,
                boards: state.boards.map(board =>
                    board._id === action.board._id ? action.board : board
                ),
                board: { ...action.board }
            };

        case REMOVE_BOARD:
            boards = state.boards.filter(board => board._id !== action.boardId);
            return {
                ...state,
                boards: [...boards],
            };

        case ADD_BOARD:
            return {
                ...state,
                boards: [...state.boards, action.board]
            };

        case ADD_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: [...(state.board.groups || []), action.group]
                }
            };

        case UPDATE_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: (state.board.groups || []).map(group =>
                        group._id === action.group._id ? action.group : group
                    )
                }
            };

        case REMOVE_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: (state.board.groups || []).filter(
                        group => group._id !== action.groupId
                    )
                }
            };

        case ADD_TASK:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: (state.board.groups || []).map(group =>
                        group._id === action.groupId
                            ? {
                                ...group,
                                tasks: [...(group.tasks || []), { ...action.task }]
                            }
                            : { ...group }
                    )
                }
            };

        case UPDATE_TASK:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: (state.board.groups || []).map(group =>
                        group._id === action.groupId
                            ? {
                                ...group,
                                tasks: (group.tasks || []).map(task =>
                                    task._id === action.task._id ? { ...task, ...action.task } : { ...task }
                                )
                            }
                            : { ...group }
                    )
                }
            };

        case REMOVE_TASK:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: (state.board.groups || []).map(group =>
                        group._id === action.groupId
                            ? {
                                ...group,
                                tasks: (group.tasks || []).filter(
                                    task => task._id !== action.taskId
                                )
                            }
                            : group
                    )
                }
            };

        case SET_CMP_ORDER:
            return {
                ...state,
                cmpOrder: action.cmpOrder
            };

        case SET_GLOBALLY_COLLAPSED:
            return {
                ...state,
                isGloballyCollapsed: action.isGloballyCollapsed
            };

        case ADD_MEMBERS: {
            const groupId = action.groupId;
            const members = action.members;

            return {
                ...state,
                board: {
                    ...state.board,
                    groups: (state.board.groups || []).map(group =>
                        group._id === groupId
                            ? {
                                ...group,
                                tasks: (group.tasks || []).map(task => ({
                                    ...task,
                                    members: [...(task.members || []), ...members]
                                }))
                            }
                            : group
                    )
                }
            };
        }

        case REMOVE_SELECTED_TASK:
            return {
                ...state,
                selectedTasks: state.selectedTasks.filter(task => task._id !== action.taskId)
            };

        default:
            return state;
    }
}
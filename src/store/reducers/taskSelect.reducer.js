
export const SET_SELECTED_TASK = 'SET_SELECTED_TASK';
export const ADD_SELECTED_TASK = 'ADD_SELECTED_TASK';
export const REMOVE_SELECTED_TASK = 'REMOVE_SELECTED_TASK';

const initialState = {
    selectedTasks: [],
};

export function taskSelectReducer(state = initialState, action) {
    let newState = state;
    let boards;
    switch (action.type) {
        case SET_SELECTED_TASK:
            newState = {
                ...state,
                selectedTasks: action.selectedTasks
            };
            break;

        case ADD_SELECTED_TASK: {
            const groupId = action.groupId;
            const taskId = action.taskId;
            const existingGroupIndex = state.selectedTasks?.findIndex(
                item => item.groupId === groupId
            );

            if (existingGroupIndex === -1) {
                const newGroup = {
                    groupId,
                    tasks: [taskId]
                };

                return {
                    ...state,
                    selectedTasks: [...state.selectedTasks, newGroup]
                };
            } else {
                const existingGroup = state.selectedTasks[existingGroupIndex];

                if (existingGroup.tasks.includes(taskId)) {
                    return state;
                } else {
                    const updatedGroup = {
                        ...existingGroup,
                        tasks: [...existingGroup.tasks, taskId]
                    };

                    const updatedSelectedTasks = [...state.selectedTasks];
                    updatedSelectedTasks[existingGroupIndex] = updatedGroup;
                    return {
                        ...state,
                        selectedTasks: updatedSelectedTasks
                    };
                }
            }
        }

        case REMOVE_SELECTED_TASK: {
            const groupId = action.groupId;
            const taskId = action.taskId;
            const existingGroupIndex = state.selectedTasks.findIndex(
                item => item.groupId === groupId
            );

            if (existingGroupIndex === -1) {
                return state;
            }

            const existingGroup = state.selectedTasks[existingGroupIndex];
            const updatedTasks = existingGroup.tasks.filter(task => task !== taskId);

            if (updatedTasks.length === 0) {
                return {
                    ...state,
                    selectedTasks: state.selectedTasks.filter(
                        item => item.groupId !== groupId
                    )
                };
            }

            const updatedGroup = {
                ...existingGroup,
                tasks: updatedTasks
            };

            const updatedSelectedTasks = [...state.selectedTasks];
            updatedSelectedTasks[existingGroupIndex] = updatedGroup;
            return {
                ...state,
                selectedTasks: updatedSelectedTasks
            };
        }

        default:
            break;
    }
    return newState;
}


import { boardService } from '../../services/board/board.service.local'
import { ADD_SELECTED_TASK, REMOVE_SELECTED_TASK, SET_SELECTED_TASK } from '../reducers/taskSelect.reducer'
import { store } from '../store'
import { addTask, getTaskById, removeTask, setBoard, updateBoard, updateTask } from './board.actions'


export async function setSelectedTask(selectedTasks = []) {
    try {
        store.dispatch(getCmdSetSelectedTasks(selectedTasks));
    } catch (err) {
        console.error('Task Select Action -> Cannot set selected tasks', err);
        throw err;
    }
}

export async function addSelectedTask(groupId, taskId) {
    try {
        const task = await getTaskById(taskId);
        if (!task) throw new Error(`Task with ID ${taskId} not found.`);

        store.dispatch(getCmdAddSelectedTasks(groupId, taskId));
    } catch (err) {
        console.error('Task Select Action -> Cannot add selected task', err);
        throw err;
    }
}

export async function removeSelectedTask(groupId, taskId) {
    try {
        store.dispatch(getCmdRemoveSelectedTasks(groupId, taskId));
    } catch (err) {
        console.error('Task Select Action -> Cannot remove selected task', err);
        throw err;
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

export async function duplicateSelectedTasks(selectedTasks, board) {

    for (const { groupId, tasks } of selectedTasks) {

        const group = board.groups.find(group => group._id === groupId);
        for (const taskId of tasks) {
            const task = group.tasks.find(task => task._id === taskId);
            if (!task) {
                console.error(`Task with ID ${taskId} not found in group ${groupId}.`);
                continue;
            }
            const newTask = {
                ...task,
                _id: undefined,
                taskTitle: `${task.taskTitle} (copy)`
            };
            await addTask(groupId, newTask);
        }
    }
}

export async function deleteSelectedTasks(selectedTasks) {
    try {
        const board = store.getState().boardModule.board;
        for (const { groupId, tasks } of selectedTasks) {
            for (const taskId of tasks) {

                for (const group of board.groups) {
                    if (group._id === groupId) {
                        group.tasks = group.tasks.filter(task => task._id !== taskId);
                    }
                }

            }
        }
        updateBoard(board)
        setSelectedTask([]);
    } catch (err) {
        console.error('Task Select Action -> Cannot delete selected tasks', err);
        throw err;
    }
}

export async function moveSelectedTasks(selectedTasks, targetGroupId = null) {
    try {
        const board = store.getState().boardModule.board;
        for (const { groupId, tasks } of selectedTasks) {
            const sourceGroup = board.groups.find(group => group._id === groupId);
            const targetGroup = board.groups.find(group => group._id === targetGroupId);
            for (const taskId of tasks) {
                const taskIndex = sourceGroup.tasks.findIndex(task => task._id === taskId);
                const [taskToMove] = sourceGroup.tasks.splice(taskIndex, 1);
                const updatedTask = { ...taskToMove, groupId: targetGroupId };
                targetGroup.tasks.push(updatedTask);

            }
        }
        await updateBoard(board);

        setSelectedTask([]);
    } catch (err) {
        console.error('Task Select Action -> Cannot move selected tasks', err);
        throw err;
    }
}


// Command Creators:
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



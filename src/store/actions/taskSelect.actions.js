
import { makeId } from '../../services/util.service';
import { ADD_SELECTED_TASK, REMOVE_SELECTED_TASK, SET_SELECTED_TASK } from '../reducers/taskSelect.reducer';
import { store } from '../store';
// import { getTaskById, updateBoard } from './board.actions';


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
    const newBoard = { ...board }

    for (const { groupId, tasks } of selectedTasks) {
        const group = newBoard.groups.find(group => group._id === groupId);
        for (const taskId of tasks) {

            const task = group.tasks.find(task => task._id === taskId);
            if (!task) {
                console.error(`Task with ID ${taskId} not found in group ${groupId}.`);
                continue;
            }

            const cloneTask = {
                ...task,
                taskTitle: `${task.taskTitle} (copy)`,
                _id: 't' + makeId()
            }

            const groupIdx = newBoard.groups.findIndex(group => group._id === task.groupId)
            if (groupIdx === -1) throw new Error(`Group with ID ${task.groupId} not found`)

            const taskIndex = newBoard.groups[groupIdx].tasks.findIndex(t => t._id === task._id)
            if (taskIndex === -1) throw new Error(`Task with ID ${task._id} not found`)

            newBoard.groups[groupIdx].tasks.splice(taskIndex + 1, 0, cloneTask)

        }
    }
    return await updateBoard(newBoard)

}

export async function deleteSelectedTasks(selectedTasks, board) {
    try {
        const newBoard = { ...board }
        for (const { groupId, tasks } of selectedTasks) {
            for (const taskId of tasks) {
                for (const group of newBoard.groups) {
                    if (group._id === groupId) {
                        group.tasks = group.tasks.filter(task => task._id !== taskId);
                    }
                }
            }
        }
        updateBoard(newBoard)
        setSelectedTask([]);
    } catch (err) {
        console.error('Task Select Action -> Cannot delete selected tasks', err);
        throw err;
    }
}

export async function moveSelectedTasks(selectedTasks, board, targetGroupId = null) {
    try {
        const newBoard = { ...board }
        for (const { groupId, tasks } of selectedTasks) {
            const sourceGroup = newBoard.groups.find(group => group._id === groupId);
            const targetGroup = newBoard.groups.find(group => group._id === targetGroupId);
            for (const taskId of tasks) {
                const taskIndex = sourceGroup.tasks.findIndex(task => task._id === taskId);
                const [taskToMove] = sourceGroup.tasks.splice(taskIndex, 1);
                const updatedTask = { ...taskToMove, groupId: targetGroupId };
                targetGroup.tasks.push(updatedTask);

            }
        }
        await updateBoard(newBoard);
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



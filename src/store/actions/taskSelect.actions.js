
import { boardService } from '../../services/board/board.service.local'
import { groupService } from '../../services/board/group.service.local'
import { taskService } from '../../services/board/task.service.local'
import { ADD_SELECTED_TASK, REMOVE_SELECTED_TASK, SET_SELECTED_TASK } from '../reducers/taskSelect.reducer'
import { store } from '../store'
import { addTask, getTaskById, removeTask, setBoard, updateTask } from './board.actions'


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
        const task = await getTaskById(groupId, taskId);
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

export async function saveBoardEntities(board) {
    try {
        let newBoard = {}
        await boardService.save(board)
            .then(savedBoard => newBoard = { ...savedBoard });
        await Promise.all(
            board.groups.map((group) => {
                group.boardId = board._id;
                return groupService.save(group)
            })
        ).then((savedGroups) => {
            newBoard.groups = savedGroups;
        })
        const tasks = board.groups.flatMap((group) => group.tasks);
        await Promise.all(
            tasks.map((task) => {
                return taskService.save(task);
            })
        ).then((savedTasks) => {
            const groupLookup = newBoard.groups.reduce((lookup, group) => {
                lookup[group._id] = { ...group, tasks: [] };
                return lookup;
            }, {})
            savedTasks.forEach((task) => {
                if (groupLookup[task.groupId]) {
                    groupLookup[task.groupId].tasks.push(task);
                }
            })
            newBoard.groups = Object.values(groupLookup);
        }).then(() => setBoard(newBoard))
        return newBoard;
    } catch (err) {
        console.error('select task -> Failed to save board entities:', err);
        throw err;
    }
}

export async function duplicateSelectedTasks(selectedTasks, board) {
    if (!Array.isArray(selectedTasks)) {
        console.error("selectedTasks must be an array.");
        return;
    }

    for (const { groupId, tasks } of selectedTasks) {
        if (!Array.isArray(tasks)) {
            console.error(`Tasks for groupId ${groupId} must be an array.`);
            continue;
        }

        const group = board.groups.find(group => group._id === groupId);
        if (!group) {
            console.error(`Group with ID ${groupId} not found in the board.`);
            continue;
        }

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
        for (const { groupId, tasks } of selectedTasks) {
            for (const taskId of tasks) {
                await removeTask(groupId, taskId);
            }
        }
        setSelectedTask([]);
    } catch (err) {
        console.error('Task Select Action -> Cannot delete selected tasks', err);
        throw err;
    }
}

export async function moveSelectedTasks(selectedTasks, targetGroupId = null) {
    try {
        for (const { groupId, tasks } of selectedTasks) {
            for (const taskId of tasks) {
                const task = await getTaskById(groupId, taskId);
                if (!task) {
                    console.error(`Task with ID ${taskId} not found.`);
                    continue;
                }

                const updatedTask = { ...task, groupId: targetGroupId };
                await updateTask(groupId, updatedTask);
            }
        }
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



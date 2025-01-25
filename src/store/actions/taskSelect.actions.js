
import { boardService } from '../../services/board/board.service.local'
import { groupService } from '../../services/board/group.service.local'
import { taskService } from '../../services/board/task.service.local'
import { ADD_SELECTED_TASK, REMOVE_SELECTED_TASK, SET_SELECTED_TASK } from '../reducers/taskSelect.reducer'
import { store } from '../store'
import { addTask, getTaskById, removeTask, setBoard } from './board.actions'


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
        for (const taskId of tasks) {
            let originalTask = {};
            for (const group of board.groups) {
                for (const task of group.tasks || []) {
                    if (task._id === taskId) {
                        originalTask = task;
                    }
                }
            }
            if (!originalTask) {
                console.error(`Task with ID ${taskId} not found in the board.`);
                continue;
            }
            const newTask = {
                ...originalTask,
                _id: undefined,
                taskTitle: `${originalTask.taskTitle} (copy)`,
            };
            await addTask(groupId, newTask);
        }
    }
}

export async function deleteSelectedTasks(selectedTasks) {
    for (const { groupId, tasks } of selectedTasks) {
        for (const taskId of tasks) {
            await removeTask(groupId, taskId)
        }
    }
    setSelectedTask([])
}


export async function moveSelectedTasks(selectedTasks, targetGroupId = null) {
    let actualTargetGroupId = targetGroupId

    if (!actualTargetGroupId) {
        const newGroupObj = {
            title: 'My New Group',
        }
        const savedGroup = await addGroup(newGroupObj)
        actualTargetGroupId = makeId(5)
        actualTargetGroupId._id = makeId(5)
    }
    for (const { groupId, tasks } of selectedTasks) {
        for (const taskId of tasks) {
            await removeTask(groupId, taskId)
            const movedTask = {
                title: `Moved ${taskId}`,
            }
            await addTask(actualTargetGroupId, movedTask)
        }
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



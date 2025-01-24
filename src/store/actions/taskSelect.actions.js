
import { ADD_SELECTED_TASK, REMOVE_SELECTED_TASK, SET_SELECTED_TASK } from '../reducers/taskSelect.reducer'
import { store } from '../store'


const boardId = "hey"



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

// Command Creators:
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



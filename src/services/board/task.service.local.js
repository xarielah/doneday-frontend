import { storageService } from "../async-storage.service";

const STORAGE_KEY = "taskDB";

export const taskService = {
    add,
    update,
    remove,
    get,
    _query,
    STORAGE_KEY,
    getByGroupId,
    getEmptyTask
};

function _query() {
    return storageService.query(STORAGE_KEY)
}

function add(task) {
    return storageService.post(STORAGE_KEY, task);
}

function update(updatedTask) {
    return storageService.put(STORAGE_KEY, updatedTask)
}

function remove(taskId) {
    return storageService.remove(STORAGE_KEY, taskId);
}

function get(taskId) {
    return storageService.get(STORAGE_KEY, taskId);
}

function getByGroupId(groupId) {
    return storageService.query(STORAGE_KEY).then(tasks => tasks.filter(task => task.groupId === groupId))
}
function getEmptyTask() {
    return {
        side: null,
        taskTitle: "New task",
        members: [
        ],
        date: "",
        status: "",
        priority: "",
    }
}
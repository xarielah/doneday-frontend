import { storageService } from "../async-storage.service";

const STORAGE_KEY = "taskDB";
const UPDATES_STORAGE_KEY = "taskUpdatesDB";

export const taskService = {
    add,
    update,
    remove,
    get,
    _query,
    STORAGE_KEY,
    getByGroupId,
    getEmptyReply,
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

function getEmptyReply() {
    return ({
        _id: crypto.randomUUID(),
        text: '',
        by: {
            _id: 'user101',
            name: 'User 101',
            avatar: ''
        },
        likedBy: []
    })
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
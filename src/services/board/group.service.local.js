import { storageService } from "../async-storage.service";
import { getRandomColor } from "../util.service";

const STORAGE_KEY = "groupDB";

export const groupService = {
    add,
    update,
    save,
    remove,
    get,
    _query,
    STORAGE_KEY,
    getByBoardId,
    getEmptyGroup
};

function _query() {
    return storageService.query(STORAGE_KEY)
}

function add(group) {
    return storageService.post(STORAGE_KEY, group);
}

function update(updatedGroup) {
    return storageService.put(STORAGE_KEY, updatedGroup)
}

function save(group) {
    if (group._id) {
        return storageService.put(STORAGE_KEY, group);
    } else {
        return storageService.post(STORAGE_KEY, group)
    }
}

function remove(groupId) {
    return storageService.remove(STORAGE_KEY, groupId);
}

function get(groupId) {
    return storageService.get(STORAGE_KEY, groupId);
}

function getByBoardId(boardId) {
    return storageService.query(STORAGE_KEY).then(groups => groups.filter(group => group.boardId === boardId))
}

function getEmptyGroup() {
    return {
        name: "",
        color: getRandomColor(),
        tasks: []
    }
}

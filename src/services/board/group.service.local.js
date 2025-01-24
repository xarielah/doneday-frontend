import { storageService } from "../async-storage.service";

const STORAGE_KEY = "groupDB";

export const groupService = {
    add,
    update,
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

const colors = [
    "#cce5ff", "#0073ea", "#0060b9", "#f65f7c", "#f6f7fb",
    "#dcdfec", "#c3c6d4", "#676879", "#323338", "#000000", "#00854d",
    "#007038", "#bbdbc9", "#d83a52", "#b63546", "#f4c3cb", "#1f76c2",
    "#292f4c", "#0073ea", "#0060b9", "#cce5ff", "#aed4fc", "#f0f7ff",
    "#eceff8", "#323338", "#676879", "#676879",
    "#676879", "#1f76c2", "#323338",
    "#f6f7fb", "#f6f7fb", "#323338", "#ecedf5", "#00854d", "#007038",
    "#bbdbc9", "#b5cec0", "#d83a52", "#b63546", "#f4c3cb", "#ecb7bf",
    "#c3c6d4", "#dcdfec", "#d0d4e4", "#ffcb00", "#eaaa15", "#fceba1",
    "#f2d973", "#0073ea", "#0060b9", "#cce5ff", "#aed4fc",
    "#037f4c", "#116846", "#81bfa5", "#00c875", "#0f9b63", "#80e3ba",
    "#9cd326", "#7ca32b", "#cde992", "#cab641", "#9d8f3e", "#e4daa0",
    "#ffcb00", "#eaaa15", "#ffe580", "#fdab3d", "#c0873c", "#fed59e",
    "#ff6d3b", "#c25531", "#ffb196", "#ffadad", "#c2888a", "#ffd6d6",
    "#ff7575", "#c26163", "#ffbaba", "#df2f4a", "#ad3f51", "#f0a1ad",
    "#bb3354", "#92334c", "#dd99a9", "#e50073", "#c20062", "#ff8ac4",
    "#ff5ac4", "#c24e9a", "#fface1", "#faa1f1", "#be80ba", "#fcd0f8",
    "#9d50dd", "#7d45b0", "#d0aeed", "#784bd1", "#6344a3", "#bba5e8",
    "#7e3b8a", "#673971", "#be9dc4", "#401694", "#3c1f78", "#a08bc9",
    "#5559df", "#4b4ead", "#aaacef", "#225091", "#274776", "#90a7c8",
    "#579bfc", "#4c7cc1", "#abcdfd", "#007eb5", "#0f6d97", "#80c2df",
    "#4eccc6", "#469e9b", "#a6e5e2", "#66ccff", "#569ec3", "#b2e5ff",
    "#74afcc", "#588095", "#b3d0de", "#9aadbd", "#7b8895", "#ccd6de",
    "#c4c4c4", "#98999a", "#e1e1e1", "#757575", "#69696a", "#bfbfbf",
    "#333333", "#222222", "#999999", "#7f5347", "#684943", "#bfa9a3",
    "#e484bd", "#ae5d8d", "#ecbad7", "#bca58a", "#8a7862", "#d6cabc",
    "#a1e3f6", "#81b6c5", "#d0f1fa", "#cd9282", "#976758", "#dec0b7",
    "#216edf", "#225eb7", "#95bbf2", "#175a63", "#12484f", "#8bacb1",
    "#bda8f9", "#9786c7", "#ded4fc", "#a9bee8", "#8798ba", "#d4dff4",
    "#9d99b9", "#7e7a94", "#ceccdc", "#563e3e", "#453232", "#ab9f9f",
    "#f1f1f1", "#f7f7f7", "#e1e1e1", "#edeef0", "#d9f0ff", "#ebebeb",
    "#a1a1a1", "#9699a6", "#6b6d77", "#757575", "#c7e6fa", "#61caf7",
    "#66ccff", "#00d1d1", "#009aff", "#597bfc", "#181d37", "#ff5ac4",
    "#ff007f", "#bb3354", "#ffcb00", "#cab641", "#fdab3d", "#9cd326",
    "#03c875", "#00a359", "#037f4c", "#9d50dd", "#784bd1"
]

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
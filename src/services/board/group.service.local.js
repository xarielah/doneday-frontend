import { makeId } from "../util.service";

export const groupService = {
    add,
    put,
    remove
};

function add(boardId, group) {
    boardService.query({ _id: boardId }).then(async board => {
        group._id = makeId()
        board.groups.push(group)
        boardService.save(board)
    });
}

function put(boardId, groupId, newGroup) {
    boardService.query({ _id: boardId }).then(async board => {
        const group = board.groups.find(group => group._id === groupId)
        group = { ...group, ...newGroup };
        boardService.save(board);
    })
}

function remove(boardId, groupId) {
    boardService.query({ _id: boardId }).then(async board => {
        const group = board.groups.find(group => group._id === groupId)
        board.groups.splice(board.groups.indexOf(group), 1)
        boardService.save(board)
    })
}
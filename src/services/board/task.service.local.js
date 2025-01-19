import { makeId } from "../util.service";
import { boardService } from "./board.service.local";

export const taskService = {
    add,
    put,
    remove
};

function add(boardId, groupId, task) {
    boardService.query({ _id: boardId }).then(async board => {
        task._id = makeId();
        const group = board.groups.find(group => group._id === groupId)
        group.tasks.push(task)
        boardService.save(board)
    })
}

function put(boardId, groupId, taskId, newTask) {
    boardService.query({ _id: boardId }).then(async board => {
        const group = board.groups.find(group => group._id === groupId)
        const task = group.tasks.find(task => task._id === taskId)
        task = { ...task, ...newTask };
        boardService.save(board);
    })
}

function remove(boardId, groupId, taskId) {
    boardService.query({ _id: boardId }).then(async board => {
        const group = board.groups.find(group => group._id === groupId)
        const task = group.tasks.find(task => task._id === taskId)
        group.tasks.splice(group.tasks.indexOf(task), 1)
        boardService.save(board)
    })
}
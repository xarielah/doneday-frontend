
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'boardDb'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyTask
}
window.cs = boardService


async function query(filterBy = {}) {
    var boards = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    }
    if (minSpeed) {
        boards = boards.filter(board => board.speed >= minSpeed)
    }
    if (sortField === 'vendor' || sortField === 'owner') {
        boards.sort((board1, board2) =>
            board1[sortField].localeCompare(board2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'speed') {
        boards.sort((board1, board2) =>
            (board1[sortField] - board2[sortField]) * +sortDir)
    }

    boards = boards.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        const boardToSave = {
            _id: board._id,

        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const boardToSave = {
            vendor: board.vendor,
            price: board.price,
            speed: board.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

function getEmptyTask() {
    return {
        _id: makeId(4),
        side: null,
        taskTitle: "New task",
        members: [
        ],
        date: "",
        status: "",
        priority: "",
    }
}


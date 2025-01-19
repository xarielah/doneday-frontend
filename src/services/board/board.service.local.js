
import { storageService } from '../async-storage.service';
import { userService } from '../user';
import { makeId } from '../util.service';

const defaultGroupsLocal = [
    {
        _id: "group1",
        color: "red",
        tasks: [
            {
                _id: "task101",
                side: null,
                taskTitle: "Design homepage UI",
                members: [
                    { name: "Tal", color: "red" },
                    { name: "Avi", color: "blue" },
                ],
                date: "15-01-2025",
                status: "IN WORK",
                priority: "HIGH",
            },
            {
                _id: "task102",
                side: null,
                taskTitle: "Integrate payment gateway",
                members: [
                    { name: "Dana", color: "green" },
                    { name: "Shay", color: "black" },
                ],
                date: "20-01-2025",
                status: "STUCK",
                priority: "CRITICAL",
            },
            {
                _id: "task103",
                side: null,
                taskTitle: "Write test cases for API",
                members: [
                    { name: "Eli", color: "orange" },
                    { name: "Tal", color: "red" },
                ],
                date: "18-01-2025",
                status: "DONE",
                priority: "MEDIUM",
            },
            {
                _id: "task104",
                side: null,
                taskTitle: "Create onboarding illustrations",
                members: [
                    { name: "Shir", color: "purple" },
                    { name: "Lior", color: "blue" },
                ],
                date: "22-01-2025",
                status: "IN WORK",
                priority: "LOW",
            },
        ],
    },
    {
        _id: "group2",
        color: "blue",
        tasks: [
            {
                _id: "task201",
                side: null,
                taskTitle: "Develop campaign strategy",
                members: [
                    { name: "Yossi", color: "pink" },
                    { name: "Dana", color: "green" },
                ],
                date: "10-02-2025",
                status: "IN REVIEW",
                priority: "HIGH",
            },
            {
                _id: "task202",
                side: null,
                taskTitle: "Prepare client proposals",
                members: [
                    { name: "Tal", color: "red" },
                    { name: "Shay", color: "black" },
                ],
                date: "12-02-2025",
                status: "STUCK",
                priority: "MEDIUM",
            },
            {
                _id: "task203",
                side: null,
                taskTitle: "Define MVP scope",
                members: [
                    { name: "Avi", color: "blue" },
                    { name: "Eli", color: "orange" },
                ],
                date: "08-02-2025",
                status: "DONE",
                priority: "HIGH",
            },
            {
                _id: "task204",
                side: null,
                taskTitle: "Setup CI/CD pipeline",
                members: [
                    { name: "Shay", color: "black" },
                    { name: "Lior", color: "blue" },
                ],
                date: "15-02-2025",
                status: "IN WORK",
                priority: "CRITICAL",
            },
        ],
    },
    {
        _id: "group3",
        color: "green",
        tasks: [
            {
                _id: "task301",
                side: null,
                taskTitle: "Resolve high-priority tickets",
                members: [
                    { name: "Shir", color: "purple" },
                    { name: "Dana", color: "green" },
                ],
                date: "13-01-2025",
                status: "IN WORK",
                priority: "HIGH",
            },
            {
                _id: "task302",
                side: null,
                taskTitle: "Build dashboard for KPIs",
                members: [
                    { name: "Yossi", color: "pink" },
                    { name: "Shay", color: "black" },
                ],
                date: "20-01-2025",
                status: "IN WORK",
                priority: "MEDIUM",
            },
            {
                _id: "task303",
                side: null,
                taskTitle: "Redesign landing page",
                members: [
                    { name: "Lior", color: "blue" },
                    { name: "Tal", color: "red" },
                ],
                date: "25-01-2025",
                status: "IN REVIEW",
                priority: "HIGH",
            },
            {
                _id: "task304",
                side: null,
                taskTitle: "Write user stories",
                members: [
                    { name: "Avi", color: "blue" },
                    { name: "Eli", color: "orange" },
                ],
                date: "18-01-2025",
                status: "DONE",
                priority: "LOW",
            },
        ],
    },
];

export const defaultBoardsLocal = [
    {
        _id: "board1",
        name: "Board numero uno",
        color: "red",
        groups: defaultGroupsLocal,
    },
    {
        _id: "board2",
        name: "Monday clone development",
        color: "blue",
        groups: defaultGroupsLocal,
    },
    {
        _id: "board3",
        name: "Self development",
        color: "green",
        groups: defaultGroupsLocal,
    },
]

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
    let savedBoard
    if (board._id) {
        const boardToSave = {
            _id: board._id,
            name: board.name,
            color: board.color,
            groups: board.groups,
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const boardToSave = {
            name: board.name,
            color: board.color,
            groups: [],
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


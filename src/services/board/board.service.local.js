
import { storageService } from '../async-storage.service';
import { getRandomColor, makeId } from '../util.service';
import { dummyData } from './dummy-data';
import { groupService } from './group.service.local';
import { taskService } from './task.service.local';


const STORAGE_KEY = 'boardDB'

export const boardService = {
    // CRUD Operations for Boards
    query,
    getById,
    save,
    remove,
    getBoards,
    saveBoard,
    removeBoard,
    getBoardById,
    // CRUD Operations for Groups
    getGroupById,
    saveGroup,
    removeGroup,
    // CRUD Operations for Tasks
    getTaskById,
    saveTask,
    removeTask,
    // Utility Functions
    getRandomStatus,
    getRandomPriority,
    getRandomMembers,
    getRandomDate,
    // Empty Templates and Generators
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    generateBoard,
    generateGroup,
    generateTask,
    // Message Operations
    addBoardMsg,
    // Storage Key
    STORAGE_KEY
};
const allMembers = [
    { name: "Dor", color: "red" },
    { name: "Ariel", color: "blue" },
    { name: "Afik", color: "yellow" }
]

const statusList = [
    { value: 'draft', label: 'Draft', className: 'status-draft' },
    { value: 'done', label: 'Done', className: 'status-done' },
    { value: 'wip', label: 'Working on it', className: 'status-wip' },
    { value: 'stuck', label: 'Stuck', className: 'status-stuck' },
    { value: 'onhold', label: 'On Hold', className: 'status-onhold' },
    { value: 'revision', label: 'Requires Revision', className: 'status-revision' },
    { value: 'design', label: 'In Design', className: 'status-design' },
]

const priorityList = [
    { value: 'low', label: 'Low', className: 'priority-low' },
    { value: 'medium', label: 'Medium', className: 'priority-medium' },
    { value: 'high', label: 'High', className: 'priority-high' },
    { value: 'critical', label: 'Critical', className: 'priority-critical' },
    { value: 'tbd', label: 'TBD', className: 'priority-tbd' },
]

_checkForDummyData();

// Dummy data feeder
async function _checkForDummyData() {
    let boards = await storageService.query(STORAGE_KEY);
    if (boards && boards.length > 0) return boards;

    boards = Array.from({ length: 2 }, () => generateBoard());
    await storageService._save(STORAGE_KEY, boards);
    return boards;
}

function getBoards(filterBy = {}) {
    return query()
}

async function query(filterBy = { name: '' }) {
    var boards = await storageService.query(STORAGE_KEY) || [];

    const { name } = filterBy;

    if (name) {
        return boards.filter(board => name.toLowerCase().includes(board.name.toLowerCase()))
    }

    return boards
}

async function getById(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    board.groups = await groupService.getByBoardId(boardId)
    for (let group of board.groups) {
        group.tasks = await taskService.getByGroupId(group._id)
    }
    return board
}

async function remove(boardId) {
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
            color: getRandomColor(),
        }
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

// ----------------- Boards -----------------
async function getBoardById(boardId) {
    let boards = await storageService.query(STORAGE_KEY) || [];
    return boards.find(board => board._id === boardId) || null;
}

async function saveBoard(newBoard) {
    let boards = await storageService.query(STORAGE_KEY) || [];
    const boardIdx = boards.findIndex(board => board._id === newBoard._id)

    if (boardIdx === -1) {
        boards.push(newBoard)
    } else {
        boards[boardIdx] = newBoard
    }

    await storageService._save(STORAGE_KEY, boards);
    return newBoard;
}

async function removeBoard(boardId) {
    let boards = await storageService.query(STORAGE_KEY) || [];
    boards = boards.filter(board => board._id !== boardId);

    await storageService._save(STORAGE_KEY, boards);
    return boardId;
}

// ----------------- Groups -----------------
async function getGroupById(boardId, groupId) {
    const board = await getBoardById(boardId);
    if (!board) throw new Error(`Board with ID ${boardId} not found`);

    return board.groups.find(group => group._id === groupId) || null;
}

async function saveGroup(boardId, newGroup) {
    let boards = await storageService.query(STORAGE_KEY) || [];
    const boardIdx = boards.findIndex(board => board._id === boardId);

    if (boardIdx === -1) throw new Error(`Board with ID ${boardId} not found`);

    const groupIdx = boards[boardIdx].groups.findIndex(group => group._id === newGroup._id)

    if (groupIdx === -1) {
        newGroup._id = 'g' + makeId();
        boards[boardIdx].groups.push(newGroup)
    } else {
        boards[boardIdx].groups[groupIdx] = newGroup
    }

    await storageService._save(STORAGE_KEY, boards)
    return newGroup;
}

async function removeGroup(boardId, groupId) {
    let boards = await storageService.query(STORAGE_KEY) || [];
    const boardIdx = boards.findIndex(board => board._id === boardId);

    if (boardIdx === -1) throw new Error(`Board with ID ${boardId} not found`);

    boards[boardIdx].groups = boards[boardIdx].groups.filter(group => group._id !== groupId);

    await storageService._save(STORAGE_KEY, boards);
    return groupId;
}

// ----------------- Tasks -----------------
async function getTaskById(boardId, groupId, taskId) {
    const group = await getGroupById(boardId, groupId);
    if (!group) throw new Error(`Group with ID ${groupId} not found`);

    return group.tasks.find(task => task._id === taskId) || null;
}

async function saveTask(boardId, groupId, newTask) {
    let boards = await storageService.query(STORAGE_KEY) || [];
    const boardIdx = boards.findIndex(board => board._id === boardId);

    if (boardIdx === -1) throw new Error(`Board with ID ${boardId} not found`);

    const groupIdx = boards[boardIdx].groups.findIndex(group => group._id === groupId);

    if (groupIdx === -1) throw new Error(`Group with ID ${groupId} not found`);

    if (!boards[boardIdx].groups[groupIdx].tasks) {
        boards[boardIdx].groups[groupIdx].tasks = [];
    }

    newTask.groupId = groupId;

    const taskIdx = boards[boardIdx].groups[groupIdx].tasks.findIndex(task => task._id === newTask._id);

    if (taskIdx === -1) {
        newTask.allMembers = allMembers;
        newTask._id = 't' + makeId();
        boards[boardIdx].groups[groupIdx].tasks.push(newTask);
        await storageService._save(STORAGE_KEY, boards);
        return newTask;
    } else {
        boards[boardIdx].groups[groupIdx].tasks[taskIdx] = newTask;
        await storageService._save(STORAGE_KEY, boards);
        return newTask
    }

}


async function removeTask(boardId, groupId, taskId) {
    let boards = await storageService.query(STORAGE_KEY) || [];
    const boardIdx = boards.findIndex(board => board._id === boardId);

    if (boardIdx === -1) throw new Error(`Board with ID ${boardId} not found`);

    const groupIdx = boards[boardIdx].groups.findIndex(group => group._id === groupId);

    if (groupIdx === -1) throw new Error(`Group with ID ${groupId} not found`);

    boards[boardIdx].groups[groupIdx].tasks = boards[boardIdx].groups[groupIdx].tasks.filter(task => task._id !== taskId);

    await storageService._save(STORAGE_KEY, boards);
    return taskId;
}

// ----------------- Util -----------------
function getRandomStatus() {
    const randomIndex = Math.floor(Math.random() * statusList.length);
    return statusList[randomIndex].value;
}

function getRandomPriority() {
    const randomIndex = Math.floor(Math.random() * priorityList.length);
    return priorityList[randomIndex].value;
}

function getRandomMembers() {
    const shuffled = allMembers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * allMembers.length) + 1);
}

function getRandomDate() {
    const start = new Date(2025, 0, 1);
    const end = new Date(2025, 11, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
}



// ----------------- Get Empty + Generate -----------------

function getEmptyBoard() {
    return {
        name: '',
        color: getRandomColor(),
        groups: []
    }
}

function generateBoard() {
    return {
        _id: 'b' + makeId(),
        name: `Board ${makeId().slice(0, 5)}`,
        color: getRandomColor(),
        groups: Array.from({ length: 3 }, () => generateGroup())
    };
}

function getEmptyGroup(boardId) {
    return {
        name: '',
        color: getRandomColor(),
        boardId,
        tasks: []
    }
}

function generateGroup() {
    const groupId = 'g' + makeId();
    return {
        _id: groupId,
        name: `Group ${makeId().slice(0, 5)}`,
        color: getRandomColor(),
        tasks: Array.from({ length: 4 }, () => generateTask(groupId))
    };
}

function getEmptyTask(groupId) {
    return {
        taskTitle: '',
        groupId,
        members: [],
        allMembers: allMembers,
        date: '',
        status: '',
        priority: ''
    }
}

function generateTask(groupId = '') {
    return {
        _id: 't' + makeId(),
        taskTitle: `Task ${makeId().slice(0, 5)}`,
        groupId,
        members: getRandomMembers(),
        allMembers: allMembers,
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "",
        status: getRandomStatus(),
        priority: getRandomPriority()
    };
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)

    const msg = {
        _id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

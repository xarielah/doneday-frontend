
import { storageService } from '../async-storage.service';
import { generateBoardName, generateGroupName, generateTaskName, getRandomColor, makeId } from '../util.service';



const STORAGE_KEY = 'boardDB'

export const boardService = {
    // CRUD Operations for Boards
    query,
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
    getEmptyReply,
    // Message Operations
    addBoardMsg,
    // Storage Key
    STORAGE_KEY
};

export const allMembers = [
    { name: "Dor", label: "Dor", value: "Dor", color: "#2a5699" },
    { name: "Ariel", label: "Ariel", value: "Ariel", color: "#e4901c" },
    { name: "Afik", label: "Afik", value: "Afik", color: "#fb275d" }
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

async function query(filterBy = { name: '' }) {
    var boards = await storageService.query(STORAGE_KEY) || [];

    const { name } = filterBy;

    if (name) {
        return boards.filter(board => name.toLowerCase().includes(board.name.toLowerCase()))
    }

    return boards
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
function getBoards(filterBy = {}) {
    return query()
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
        const emptyBoard = getEmptyBoard();
        newBoard._id = 'b' + makeId();
        newBoard = { ...emptyBoard, ...newBoard }
        console.log(newBoard);
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
async function getGroupById(groupId) {
    const boards = await boardService.getBoards();
    if (!boards || boards.length === 0) {
        throw new Error('No boards found.');
    }
    for (const board of boards) {
        if (board.groups && board.groups.length) {
            const group = board.groups.find(g => g._id === groupId);
            if (group) return group;
        }
    }
    throw new Error(`Group with ID ${groupId} not found in any board.`);
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
async function getTaskById(taskId) {
    const boards = await boardService.getBoards();
    if (!boards || boards.length === 0) {
        throw new Error('No boards found.');
    }
    for (const board of boards) {
        if (board.groups && board.groups.length) {
            for (const group of board.groups) {
                if (group.tasks && group.tasks.length) {
                    const task = group.tasks.find(t => t._id === taskId);
                    console.log(task);

                    if (task) return task;
                }
            }
        }
    }
    throw new Error(`Task with ID ${taskId} not found in any board.`);
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

    if (!newTask.groupId) newTask.groupId = groupId;

    const taskIdx = boards[boardIdx].groups[groupIdx].tasks.findIndex(task => task._id === newTask._id);

    if (taskIdx === -1) {
        newTask.allMembers = allMembers;
        newTask._id = 't' + makeId();
        boards[boardIdx].groups[groupIdx].tasks.push(newTask);
        await storageService._save(STORAGE_KEY, boards);
        return { ...newTask };
    } else {
        boards[boardIdx].groups[groupIdx].tasks[taskIdx] = newTask;
        await storageService._save(STORAGE_KEY, boards);
        return { ...newTask }
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
        name: generateBoardName(),
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
        name: generateGroupName(),
        color: getRandomColor(),
        tasks: Array.from({ length: 4 }, () => generateTask(groupId))
    };
}

function getEmptyTask(groupId) {
    return {
        taskTitle: '',
        groupId,
        members: [],
        replies: [],
        allMembers: allMembers,
        date: '',
        status: '',
        priority: ''
    }
}

function generateTask(groupId = '') {
    return {
        _id: 't' + makeId(),
        taskTitle: generateTaskName(),
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


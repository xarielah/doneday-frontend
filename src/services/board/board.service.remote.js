import { httpService } from '../http.service';

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardMsg
}

async function query(filterBy = {}) {
    return httpService.get(`board`, filterBy);
}

// function getById(boardId) {
//     return httpService.get(`board/${boardId}`);
// }
async function getById(boardId, filterBy = {}, sortBy = []) {
    const board = await httpService.get(`board/${boardId}`) || null;
    if (!board) return null;

    const groups = Array.isArray(board.groups) ? board.groups : [];

    const taskTitleFilter = filterBy.taskTitle && filterBy.taskTitle.trim()
        ? filterBy.taskTitle.toLowerCase()
        : null;

    const getStatusIndex = (status) => statusList.findIndex(s => s.value === status);
    const getPriorityIndex = (priority) => priorityList.findIndex(p => p.value === priority);

    const filteredGroups = groups.map(group => {
        const tasks = Array.isArray(group.tasks) ? group.tasks : [];
        const filteredTasks = tasks.filter(task => {
            const priorityMatch = filterBy.Priority && filterBy.Priority.length > 0
                ? filterBy.Priority.includes(task.priority)
                : true;

            const membersMatch = filterBy.Members && filterBy.Members.length > 0
                ? task.members && task.members.some(member => filterBy.Members.includes(member.name))
                : true;

            const statusMatch = filterBy.Status && filterBy.Status.length > 0
                ? filterBy.Status.includes(task.status)
                : true;

            const titleMatch = taskTitleFilter
                ? task.taskTitle && task.taskTitle.toLowerCase().includes(taskTitleFilter)
                : true;

            const timelineMatch = filterBy.Timeline
                ? task.timeline?.endDate && new Date(task.timeline.endDate) <= new Date(filterBy.Timeline)
                : true;

            return priorityMatch && membersMatch && statusMatch && titleMatch && timelineMatch;
        });

        const sortedTasks = filteredTasks.sort((taskA, taskB) => {
            for (const { title, order } of sortBy) {
                let comparison = 0;
                if (title === 'status') {
                    comparison = getStatusIndex(taskA.status) - getStatusIndex(taskB.status);
                } else if (title === 'priority') {
                    comparison = getPriorityIndex(taskA.priority) - getPriorityIndex(taskB.priority);
                } else if (title === 'name') {
                    comparison = taskA.taskTitle.localeCompare(taskB.taskTitle)
                } else if (title === 'timeline') {
                    const dateA = new Date(taskA.timeline?.endDate || 0)
                    const dateB = new Date(taskB.timeline?.endDate || 0)
                    if (isNaN(dateA) && isNaN(dateB)) {
                        comparison = 0
                    } else if (isNaN(dateA)) {
                        comparison = 1
                    } else if (isNaN(dateB)) {
                        comparison = -1
                    } else {
                        comparison = dateA - dateB
                    }
                }
                if (comparison !== 0) return comparison * order;
            }
            return 0
        }
        )
        return {
            ...group,
            tasks: sortedTasks
        };
    });


    return {
        ...board,
        groups: filteredGroups
    };

}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`);
}

async function save(board) {
    var savedBoard;
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board);
    } else {
        savedBoard = await httpService.post('board', board);
    }
    return savedBoard;
}

async function addBoardMsg(boardId, txt) {
    const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt })
    return savedMsg
}
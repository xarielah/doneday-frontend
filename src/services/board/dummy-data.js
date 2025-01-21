const defaultTasks = [
    {
        _id: "task101",
        groupId: "group1",
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
        groupId: "group1",
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
        groupId: "group1",
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
        groupId: "group1",
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
    {
        _id: "task201",
        groupId: "group2",
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
        groupId: "group2",
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
        groupId: "group2",
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
        groupId: "group2",
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
    {
        _id: "task301",
        groupId: "group3",
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
        groupId: "group3",
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
        groupId: "group3",
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
        groupId: "group3",
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

];

const defaultGroups = [
    {
        _id: "group1",
        boardId: "board1",
        color: "red",
    },
    {
        _id: "group2",
        boardId: "board1",
        color: "blue",

    },
    {
        _id: "group3",
        boardId: "board1",
        color: "green",
    }
];

const defaultBoards = [
    {
        _id: "board1",
        name: "Board numero uno",
        color: "red"
    }
];

export const dummyData = {
    defaultBoards,
    defaultGroups,
    defaultTasks
}
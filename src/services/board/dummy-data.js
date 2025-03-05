const defaultTasks = [
    {
        _id: "task101",
        groupId: "group1",
        side: null,
        taskTitle: "Design homepage UI",
        members: [
            { name: "Tal", color: "#2a5699" },
            { name: "Avi", color: "#e4901c" },
        ],
        allMembers: [
            { name: "Dor", color: "#2a5699" },
            { name: "Ariel", color: "#e4901c" },
            { name: "Afik", color: "#fb275d" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "15-01-2025",
        status: "wip",
        priority: "high",
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
        allMembers: [
            { name: "Dor", color: "#2a5699" },
            { name: "Ariel", color: "#e4901c" },
            { name: "Afik", color: "#fb275d" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "20-01-2025",
        status: "stuck",
        priority: "critical",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "18-01-2025",
        status: "done",
        priority: "medium",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "22-01-2025",
        status: "wip",
        priority: "low",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "10-02-2025",
        status: "revision",
        priority: "high",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "12-02-2025",
        status: "stuck",
        priority: "medium",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "08-02-2025",
        status: "done",
        priority: "high",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "15-02-2025",
        status: "wip",
        priority: "critical",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "13-01-2025",
        status: "wip",
        priority: "high",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "20-01-2025",
        status: "wip",
        priority: "medium",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "25-01-2025",
        status: "revision",
        priority: "high",
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
        allMembers: [
            { name: "Dor", color: "red" },
            { name: "Ariel", color: "blue" },
            { name: "Afik", color: "yellow" },
        ],
        timeline: {
            startDate: '',
            endDate: ''
        },
        date: "18-01-2025",
        status: "done",
        priority: "low",
    },

];

const defaultGroups = [
    {
        _id: "group1",
        name: "Backlog",
        boardId: "board1",
        color: "#339ecd",
    },
    {
        _id: "group2",
        name: "Current Sprint",
        boardId: "board1",
        color: "#00c875",

    },
    {
        _id: "group3",
        name: "Done Stories",
        boardId: "board1",
        color: "#784bd1",
    }
];

const defaultBoards = [
    {
        _id: "board1",
        name: "Board numero uno",
        color: "#339ecd",
        groups: [{
            _id: "group1",
            name: "Backlog",
            boardId: "board1",
            color: "#339ecd",
            tasks: [{
                _id: "task101",
                groupId: "group1",
                taskTitle: "Design homepage UI",
                members: [
                    { name: "Tal", color: "red" },
                    { name: "Avi", color: "blue" }
                ],
                allMembers: [
                    { name: "Dor", color: "red" },
                    { name: "Ariel", color: "blue" },
                    { name: "Afik", color: "yellow" }
                ],
                timeline: { startDate: "", endDate: "" },
                date: "15-01-2025",
                status: "wip",
                priority: "high"
            }]
        },

        ]
    }
];

export const dummyData = {
    defaultBoards,
    defaultGroups,
    defaultTasks
}
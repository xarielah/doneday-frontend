// Guidelines
// boardStore (no need for groupStore, taskStore), boardService
// *. Support saving the entire board and also on the task level, 
// *. No need for saving an activities array per task, 
// *. those activities are easily filtered from the board activities

// *. activites - when board is updated, the frontend does not send the activities
//    array within the board 
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios

// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// As start - you can replace the entire board
// Later, support switching a specific task


// <BoardDetails> => <BoardGroup v-for / map>
// <BoardGroup> => <TaskPreview v-for / map>
// <TaskDetails> (supports edit) - initially can be loaded in seperate route 
// (later on we can place it in a modal and nested route)

const newB = {
    _id: "board1",
    name: "Board numero uno",
    color: "#339ecd",
    groups: []
}

const newG = {
    _id: "group1",
    name: "Backlog",
    boardId: "board1",
    color: "#339ecd",
    tasks: [{
        _id: "task101",
        groupId: "group1",
        taskTitle: "Design homepage UI",
        members: [
            { name: "Tal", color: "#2a5699" },
            { name: "Avi", color: "blue" }
        ],
        allMembers: [
            { name: "Dor", color: "#2a5699" },
            { name: "Ariel", color: "#e4901c" },
            { name: "Afik", color: "#fb275d" }
        ],
        timeline: { startDate: "", endDate: "" },
        link: "",
        date: "15-01-2025",
        status: "wip",
        priority: "high"
    }]
}



// const newT =


// let newBdoard = {
//     _id: "board1",
//     name: "Board numero uno",
//     color: "#339ecd",
//     groups: [
//         {
//             _id: "group1",
//             name: "Backlog",
//             boardId: "board1",
//             color: "#339ecd",
//             tasks: [
//                 {
//                     _id: "task101",
//                     groupId: "group1",
//                     taskTitle: "Design homepage UI",
//                     members: [
//                         { name: "Tal", color: "red" },
//                         { name: "Avi", color: "blue" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "15-01-2025",
//                     status: "wip",
//                     priority: "high"
//                 },
//                 {
//                     _id: "task102",
//                     groupId: "group1",
//                     taskTitle: "Integrate payment gateway",
//                     members: [
//                         { name: "Dana", color: "green" },
//                         { name: "Shay", color: "black" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "20-01-2025",
//                     status: "stuck",
//                     priority: "critical"
//                 },
//                 {
//                     _id: "task103",
//                     groupId: "group1",
//                     taskTitle: "Write test cases for API",
//                     members: [
//                         { name: "Eli", color: "orange" },
//                         { name: "Tal", color: "red" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "18-01-2025",
//                     status: "done",
//                     priority: "medium"
//                 },
//                 {
//                     _id: "task104",
//                     groupId: "group1",
//                     taskTitle: "Create onboarding illustrations",
//                     members: [
//                         { name: "Shir", color: "purple" },
//                         { name: "Lior", color: "blue" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "22-01-2025",
//                     status: "wip",
//                     priority: "low"
//                 }
//             ]
//         },
//         {
//             _id: "group2",
//             name: "Current Sprint",
//             boardId: "board1",
//             color: "#00c875",
//             tasks: [
//                 {
//                     _id: "task201",
//                     groupId: "group2",
//                     taskTitle: "Develop campaign strategy",
//                     members: [
//                         { name: "Yossi", color: "pink" },
//                         { name: "Dana", color: "green" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "10-02-2025",
//                     status: "revision",
//                     priority: "high"
//                 },
//                 {
//                     _id: "task202",
//                     groupId: "group2",
//                     taskTitle: "Prepare client proposals",
//                     members: [
//                         { name: "Tal", color: "red" },
//                         { name: "Shay", color: "black" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "12-02-2025",
//                     status: "stuck",
//                     priority: "medium"
//                 },
//                 {
//                     _id: "task203",
//                     groupId: "group2",
//                     taskTitle: "Define MVP scope",
//                     members: [
//                         { name: "Avi", color: "blue" },
//                         { name: "Eli", color: "orange" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "08-02-2025",
//                     status: "done",
//                     priority: "high"
//                 },
//                 {
//                     _id: "task204",
//                     groupId: "group2",
//                     taskTitle: "Setup CI/CD pipeline",
//                     members: [
//                         { name: "Shay", color: "black" },
//                         { name: "Lior", color: "blue" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "15-02-2025",
//                     status: "wip",
//                     priority: "critical"
//                 }
//             ]
//         },
//         {
//             _id: "group3",
//             name: "Done Stories",
//             boardId: "board1",
//             color: "#784bd1",
//             tasks: [
//                 {
//                     _id: "task301",
//                     groupId: "group3",
//                     taskTitle: "Resolve high-priority tickets",
//                     members: [
//                         { name: "Shir", color: "purple" },
//                         { name: "Dana", color: "green" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "13-01-2025",
//                     status: "wip",
//                     priority: "high"
//                 },
//                 {
//                     _id: "task302",
//                     groupId: "group3",
//                     taskTitle: "Build dashboard for KPIs",
//                     members: [
//                         { name: "Yossi", color: "pink" },
//                         { name: "Shay", color: "black" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "20-01-2025",
//                     status: "wip",
//                     priority: "medium"
//                 },
//                 {
//                     _id: "task303",
//                     groupId: "group3",
//                     taskTitle: "Redesign landing page",
//                     members: [
//                         { name: "Lior", color: "blue" },
//                         { name: "Tal", color: "red" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "25-01-2025",
//                     status: "revision",
//                     priority: "high"
//                 },
//                 {
//                     _id: "task304",
//                     groupId: "group3",
//                     taskTitle: "Write user stories",
//                     members: [
//                         { name: "Avi", color: "blue" },
//                         { name: "Eli", color: "orange" }
//                     ],
//                     allMembers: [
//                         { name: "Dor", color: "red" },
//                         { name: "Ariel", color: "blue" },
//                         { name: "Afik", color: "yellow" }
//                     ],
//                     timeline: { startDate: "", endDate: "" },
//                     date: "18-01-2025",
//                     status: "done",
//                     priority: "low"
//                 }
//             ]
//         }
//     ]
// }





// export const testBoard = [
//     {
//         _id: "group1",
//         color: "#66ccff",
//         tasks: [
//             {
//                 _id: "task101"
//                 taskTitle: "Design homepage UI",
//                 members: [
//                     { name: "Tal", color: "red" },
//                     { name: "Avi", color: "blue" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "15-01-2025",
//                 status: "IN WORK",
//                 priority: "HIGH",
//             },
//             {
//                 _id: "task102"
//                 taskTitle: "Integrate payment gateway",
//                 members: [
//                     { name: "Dana", color: "green" },
//                     { name: "Shay", color: "black" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "20-01-2025",
//                 status: "STUCK",
//                 priority: "CRITICAL",
//             },
//             {
//                 _id: "task103"
//                 taskTitle: "Write test cases for API",
//                 members: [
//                     { name: "Eli", color: "orange" },
//                     { name: "Tal", color: "red" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "18-01-2025",
//                 status: "DONE",
//                 priority: "MEDIUM",
//             },
//             {
//                 _id: "task104"
//                 taskTitle: "Create onboarding illustrations",
//                 members: [
//                     { name: "Shir", color: "purple" },
//                     { name: "Lior", color: "blue" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "22-01-2025",
//                 status: "IN WORK",
//                 priority: "LOW",
//             },
//         ],
//     },
//     {
//         _id: "group2",
//         color: "#401694",
//         tasks: [
//             {
//                 _id: "task201"
//                 taskTitle: "Develop campaign strategy",
//                 members: [
//                     { name: "Yossi", color: "pink" },
//                     { name: "Dana", color: "green" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "10-02-2025",
//                 status: "IN REVIEW",
//                 priority: "HIGH",
//             },
//             {
//                 _id: "task202"
//                 taskTitle: "Prepare client proposals",
//                 members: [
//                     { name: "Tal", color: "red" },
//                     { name: "Shay", color: "black" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "12-02-2025",
//                 status: "STUCK",
//                 priority: "MEDIUM",
//             },
//             {
//                 _id: "task203"
//                 taskTitle: "Define MVP scope",
//                 members: [
//                     { name: "Avi", color: "blue" },
//                     { name: "Eli", color: "orange" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "08-02-2025",
//                 status: "DONE",
//                 priority: "HIGH",
//             },
//             {
//                 _id: "task204"
//                 taskTitle: "Setup CI/CD pipeline",
//                 members: [
//                     { name: "Shay", color: "black" },
//                     { name: "Lior", color: "blue" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "15-02-2025",
//                 status: "IN WORK",
//                 priority: "CRITICAL",
//             },
//         ],
//     },
//     {
//         _id: "group3",
//         color: "#ff6d3b",
//         tasks: [
//             {
//                 _id: "task301"
//                 taskTitle: "Resolve high-priority tickets",
//                 members: [
//                     { name: "Shir", color: "purple" },
//                     { name: "Dana", color: "green" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "13-01-2025",
//                 status: "IN WORK",
//                 priority: "HIGH",
//             },
//             {
//                 _id: "task302"
//                 taskTitle: "Build dashboard for KPIs",
//                 members: [
//                     { name: "Yossi", color: "pink" },
//                     { name: "Shay", color: "black" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "20-01-2025",
//                 status: "IN WORK",
//                 priority: "MEDIUM",
//             },
//             {
//                 _id: "task303"
//                 taskTitle: "Redesign landing page",
//                 members: [
//                     { name: "Lior", color: "blue" },
//                     { name: "Tal", color: "red" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "25-01-2025",
//                 status: "IN REVIEW",
//                 priority: "HIGH",
//             },
//             {
//                 _id: "task304"
//                 taskTitle: "Write user stories",
//                 members: [
//                     { name: "Avi", color: "blue" },
//                     { name: "Eli", color: "orange" },
//                 ],
//                 allMembers: [
//                     { name: "Dor", color: "red" },
//                     { name: "Ariel", color: "blue" },
//                     { name: "Afik", color: "yellow" },
//                 ],
//                 date: "18-01-2025",
//                 status: "DONE",
//                 priority: "LOW",
//             },
//         ],
//     },
// ];


// export async function getDummyBoardAsync(boardId = "") {
//     return Promise.resolve(testBoard);
// }

// // The comment feature can be implemented with activity
// const activity = {
//     "_id": makeId(),
//     "txt": "Changed Color",
//     "createdAt": Date.now(),
//     "byMember": userService.getLoggedinUser(),
//     "group": group, // optional
//     "task": task    // optional
// }

// // Store - saveTask
// function storeSaveTask(boardId, groupId, task, activity) {

//     board = boardService.saveTask(boardId, groupId, task, activity)
//     // commit(ACTION) // dispatch(ACTION)
// }

// // boardService
// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
//     // PUT /api/board/b123/task/t678

//     // TODO: find the task, and update
//     board.activities.unshift(activity)
//     saveBoard(board)
//     // return board
//     // return task
// }

// const board = {
//     title: "Robot dev proj",
//     isStarred: false,
//     archivedAt: 1589983468418,
//     createdBy: {
//         "_id": "u101",
//         "fullname": "Abi Abambi",
//         "imgUrl": "http://some-img"
//     },
//     style: {
//         backgroundImage: ""
//     },
//     labels: [
//         {
//             "_id": "l101",
//             "title": "Done",
//             "color": "#61bd4f"
//         },
//         {
//             "_id": "l102",
//             "title": "Progress",
//             "color": "#61bd33"
//         }
//     ],
//     members: [
//         {
//             "_id": "u101",
//             "fullname": "Tal Taltal",
//             "imgUrl": "https://www.google.com"
//         },
//         {
//             "_id": "u102",
//             "fullname": "Josh Ga",
//             "imgUrl": "https://www.google.com"
//         }
//     ],
//     groups: [
//         {
//             "_id": "g101",
//             "title": "Group 1",
//             "archivedAt": 1589983468418,
//             "tasks": [
//                 {
//                     "_id": "c101",
//                     "title": "Replace logo"
//                 },
//                 {
//                     "_id": "c102",
//                     "title": "Add Samples"
//                 }
//             ],
//             "style": {}
//         },
//         {
//             "_id": "g102",
//             "title": "Group 2",
//             "tasks": [
//                 {
//                     "_id": "c103",
//                     "title": "Do that",
//                     "archivedAt": 1589983468418,
//                 },
//                 {
//                     "_id": "c104",
//                     "title": "Help me",
//                     "status": "inProgress", // monday / both
//                     "priority": "high",  // monday / both
//                     "dueDate": "2024-09-24",
//                     "description": "description",
//                     "comments": [ // in Trello this is easier implemented as an activity
//                         {
//                             "_id": "ZdPnm",
//                             "title": "also @yaronb please CR this",
//                             "createdAt": 1590999817436,
//                             "byMember": {
//                                 "_id": "u101",
//                                 "fullname": "Tal Tarablus",
//                                 "imgUrl": ""
//                             }
//                         }
//                     ],
//                     "checklists": [
//                         {
//                             "_id": "YEhmF",
//                             "title": "Checklist",
//                             "todos": [
//                                 {
//                                     "_id": "212jX",
//                                     "title": "To Do 1",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "memberIds": ["u101"],
//                     "labelIds": ["l101", "l102"],
//                     "byMember": {
//                         "_id": "u101",
//                         "fullname": "Tal Tarablus",
//                         "imgUrl": ""
//                     },
//                     "style": {
//                         "backgroundColor": "#26de81"
//                     }
//                 }
//             ],
//             "style": {}
//         }
//     ],
//     activities: [
//         {
//             "_id": "a101",
//             "title": "Changed Color",
//             "createdAt": 154514,
//             "byMember": {
//                 "_id": "u101",
//                 "fullname": "Abi Abambi",
//                 "imgUrl": "http://some-img"
//             },
//             "group": {
//                 "_id": "g101",
//                 "title": "Urgent Stuff"
//             },
//             "task": {
//                 "_id": "c101",
//                 "title": "Replace Logo"
//             }
//         }
//     ],

//     // For Monday draggable columns (optional)
//     cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
// }



// const user = {
//     "_id": "u101",
//     "fullname": "Abi Abambi",
//     "username": "abi@ababmi.com",
//     "password": "aBambi123",
//     "imgUrl": "http://some-img.jpg",
//     "mentions": [{ //optional
//         "_id": "m101",
//         "boardId": "m101",
//         "taskId": "t101"
//     }]
// }

// // <LabelPicker info={} onUpdate={} />
// // <MemberPicker info={} onUpdate={} />
// // <DatePicker info={} onUpdate={} />

// // <DynamicPicker info={} onUpdate={} >


// // For Monday Mostly:
// // Dynamic Components:



// function updateTask(cmpType, data) {
//     // Switch by cmpType
//     // case MEMBERS:
//     //    task.members = data
//     //    activity = boardService.getEmptyActivity()
//     //    activity.txt = `Members changed for task ${}`
//     //    activity.task = '{mini-task}'
//     // case STATUS:
//     //    task.status = data

//     // dispatch to store: updateTask(task, activity)
// }


// const cmp1 = {
//     type: 'StatusPicker',
//     info: {
//         selectedStatus: 'pending',
//         statuses: [{}, {}]
//     }
// }

// const cmp2 = {
//     type: 'MemberPicker',
//     info: {
//         selectedMembers: ['m1', 'm2'],
//         members: ['m1', 'm2', 'm3']
//     }
// }

// const cmp3 = {
//     type: 'DatePicker',
//     info: {
//         selectedDate: '2022-09-07',
//     }
// }


// // Code Ideas in React
// export function TaskPreview({ task }) {
//     const cmpsOrder = [
//         "StatusPicker",
//         "MemberPicker",
//         "DatePicker",
//         "PriorityPicker",
//     ]
//     return (
//         <section>
//             <h5>{task.txt}</h5>
//             {cmpsOrder.map((cmp, idx) => {
//                 return (
//                     <DynamicCmp
//                         cmp={cmp}
//                         key={idx}
//                         onUpdate={(data) => {
//                             console.log("Updating: ", cmp, "with data:", data);
//                             // make a copy, update the task, create an action
//                             // Call action: updateTask(task, action)
//                         }}
//                     />
//                 )
//             })}
//         </section>
//     )
// }

// export function DynamicCmp({ cmp, info, onUpdate }) {
//     switch (cmp) {
//         case "StatusPicker":
//             return <StatusPicker info={info} onUpdate={onUpdate} />;
//         case "MemberPicker":
//             return <MemberPicker info={info} onUpdate={onUpdate} />;
//         default:
//             return <p>UNKNOWN {cmp}</p>;
//     }
// }


// Vue.js Syntax:
// <TaskPreview> => <tr>
//    <td v-for="(cmpType) in cmpsOrder">
//         <Component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>
// </tr>
import { useSelector } from "react-redux";
import { testBoard } from "../../../board";
import { GroupPreview } from "./GroupsPreview";
import { useEffect } from "react";
import { loadBoard } from "../../store/actions/board.actions";

export function BoardDetails() {

    const storeBoard = useSelector(storeState => storeState.boardModule.board)
    const selectedTasks = useSelector(storeState => storeState.boardModule.selectedTasks ?? [])

    useEffect(() => {
        console.log(storeBoard[0].tasks);

        // loadBoard()
    }, [storeBoard])

    // console.log(storeBoard);


    // const groups = [
    //     {
    //         id: "group1",
    //         color: "red",
    //         tasks: [
    //             {
    //                 id: "task101",
    //                 side: null,
    //                 taskTitle: "Design homepage UI",
    //                 members: [
    //                     { name: "Tal", color: "red" },
    //                     { name: "Avi", color: "blue" },
    //                 ],
    //                 date: "15-01-2025",
    //                 status: "IN WORK",
    //                 priority: "HIGH",
    //             },
    //             {
    //                 id: "task102",
    //                 side: null,
    //                 taskTitle: "Integrate payment gateway",
    //                 members: [
    //                     { name: "Dana", color: "green" },
    //                     { name: "Shay", color: "black" },
    //                 ],
    //                 date: "20-01-2025",
    //                 status: "STUCK",
    //                 priority: "CRITICAL",
    //             },
    //             {
    //                 id: "task103",
    //                 side: null,
    //                 taskTitle: "Write test cases for API",
    //                 members: [
    //                     { name: "Eli", color: "orange" },
    //                     { name: "Tal", color: "red" },
    //                 ],
    //                 date: "18-01-2025",
    //                 status: "DONE",
    //                 priority: "MEDIUM",
    //             },
    //             {
    //                 id: "task104",
    //                 side: null,
    //                 taskTitle: "Create onboarding illustrations",
    //                 members: [
    //                     { name: "Shir", color: "purple" },
    //                     { name: "Lior", color: "blue" },
    //                 ],
    //                 date: "22-01-2025",
    //                 status: "IN WORK",
    //                 priority: "LOW",
    //             },
    //         ],
    //     },
    //     {
    //         id: "group2",
    //         color: "blue",
    //         tasks: [
    //             {
    //                 id: "task201",
    //                 side: null,
    //                 taskTitle: "Develop campaign strategy",
    //                 members: [
    //                     { name: "Yossi", color: "pink" },
    //                     { name: "Dana", color: "green" },
    //                 ],
    //                 date: "10-02-2025",
    //                 status: "IN REVIEW",
    //                 priority: "HIGH",
    //             },
    //             {
    //                 id: "task202",
    //                 side: null,
    //                 taskTitle: "Prepare client proposals",
    //                 members: [
    //                     { name: "Tal", color: "red" },
    //                     { name: "Shay", color: "black" },
    //                 ],
    //                 date: "12-02-2025",
    //                 status: "STUCK",
    //                 priority: "MEDIUM",
    //             },
    //             {
    //                 id: "task203",
    //                 side: null,
    //                 taskTitle: "Define MVP scope",
    //                 members: [
    //                     { name: "Avi", color: "blue" },
    //                     { name: "Eli", color: "orange" },
    //                 ],
    //                 date: "08-02-2025",
    //                 status: "DONE",
    //                 priority: "HIGH",
    //             },
    //             {
    //                 id: "task204",
    //                 side: null,
    //                 taskTitle: "Setup CI/CD pipeline",
    //                 members: [
    //                     { name: "Shay", color: "black" },
    //                     { name: "Lior", color: "blue" },
    //                 ],
    //                 date: "15-02-2025",
    //                 status: "IN WORK",
    //                 priority: "CRITICAL",
    //             },
    //         ],
    //     },
    //     {
    //         id: "group3",
    //         color: "green",
    //         tasks: [
    //             {
    //                 id: "task301",
    //                 side: null,
    //                 taskTitle: "Resolve high-priority tickets",
    //                 members: [
    //                     { name: "Shir", color: "purple" },
    //                     { name: "Dana", color: "green" },
    //                 ],
    //                 date: "13-01-2025",
    //                 status: "IN WORK",
    //                 priority: "HIGH",
    //             },
    //             {
    //                 id: "task302",
    //                 side: null,
    //                 taskTitle: "Build dashboard for KPIs",
    //                 members: [
    //                     { name: "Yossi", color: "pink" },
    //                     { name: "Shay", color: "black" },
    //                 ],
    //                 date: "20-01-2025",
    //                 status: "IN WORK",
    //                 priority: "MEDIUM",
    //             },
    //             {
    //                 id: "task303",
    //                 side: null,
    //                 taskTitle: "Redesign landing page",
    //                 members: [
    //                     { name: "Lior", color: "blue" },
    //                     { name: "Tal", color: "red" },
    //                 ],
    //                 date: "25-01-2025",
    //                 status: "IN REVIEW",
    //                 priority: "HIGH",
    //             },
    //             {
    //                 id: "task304",
    //                 side: null,
    //                 taskTitle: "Write user stories",
    //                 members: [
    //                     { name: "Avi", color: "blue" },
    //                     { name: "Eli", color: "orange" },
    //                 ],
    //                 date: "18-01-2025",
    //                 status: "DONE",
    //                 priority: "LOW",
    //             },
    //         ],
    //     },
    // ];

    const cmpOrder = [
        "status",
        "priority",
        "members",
        "date",
        "timeline"
    ];

    // const labels = ["Status", "Priority", "members", "date"];



    return (
        <section className="board-details">
            {storeBoard.map((group) => (
                <GroupPreview
                    group={group}
                    // labels={labels}
                    cmpOrder={cmpOrder}
                    key={group.id}
                    selectedTasks={selectedTasks}
                />
            ))}
        </section>
    )
}
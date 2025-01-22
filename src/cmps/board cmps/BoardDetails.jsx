import { useSelector } from "react-redux";
import { testBoard } from "../../../board";
import { GroupPreview } from "./GroupsPreview";
import { useEffect } from "react";

export function BoardDetails() {

    const storeBoard = useSelector(storeState => storeState.boardModule.board)
    const selectedTasks = useSelector(storeState => storeState.boardModule.selectedTasks ?? [])


    const cmpOrder = [
        "status",
        "priority",
        "members",
        "date",
    ];

    // const labels = ["Status", "Priority", "members", "date"];



    return (
        <section className="board-details">
            {storeBoard.map((group) => (
                <GroupPreview
                    group={group}
                    // labels={labels}
                    cmpOrder={cmpOrder}
                    key={group._id}
                    selectedTasks={selectedTasks}
                />
            ))}
        </section>
    )
}
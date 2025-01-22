import { useSelector } from "react-redux";
import GroupContainer from "./structure/GroupContainer";

export function BoardDetails() {
    const storeBoard = useSelector(storeState => storeState.boardModule.board)
    const selectedTasks = useSelector(storeState => storeState.boardModule.selectedTasks ?? [])

    const cmpOrder = [
        "status",
        "priority",
        "members",
        "date",
    ];

    return (
        <section className="board-details">
            {storeBoard.map((group) => (
                <GroupContainer
                    group={group}
                    cmpOrder={cmpOrder}
                    key={group._id}
                />
            ))}
        </section>
    )
}

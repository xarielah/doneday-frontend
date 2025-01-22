import { useSelector } from "react-redux";
import GroupContainer from "./structure/GroupContainer";


export function BoardDetails() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const selectedTasks = useSelector(storeState => storeState.boardModule.selectedTasks ?? [])

    const cmpOrder = [
        "status",
        "priority",
        "members",
        "date",
    ];

    if (!board || !board.groups) return null
    return (
        <section className="board-details">
            {board.groups.map((group) => (
                <GroupContainer
                    group={group}
                    cmpOrder={cmpOrder}
                    key={group._id}
                    selectedTasks={selectedTasks}
                />
            ))}
        </section>
    )
}

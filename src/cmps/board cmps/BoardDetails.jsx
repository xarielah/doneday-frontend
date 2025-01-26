import { closestCorners, DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { setBoard } from "../../store/actions/board.actions";
import { AddGroup } from "./structure/AddGroup";
import GroupContainer from "./structure/GroupContainer";


export function BoardDetails() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const selectedTasks = useSelector(storeState => storeState.taskSelectModule.selectedTasks ?? [])

    const cmpOrder = [
        "status",
        "priority",
        "members",
        "date",
    ];

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor),
    );

    const onDragEnd = (dragEvent) => {
        const { active, over } = dragEvent;
        console.log("🚀 ~ onDragEnd ~ over:", over)
        console.log("🚀 ~ onDragEnd ~ active:", active)

        if (!over || !active) return;

        const activeGroupId = active.id;
        const overGroupId = over.id;

        const activeGroupIdx = board.groups.findIndex(group => group._id === activeGroupId);
        const overGroupIdx = board.groups.findIndex(group => group._id === overGroupId);

        const activeGroup = board.groups[activeGroupIdx];
        const overGroup = board.groups[overGroupIdx];

        board.groups[activeGroupIdx] = overGroup;
        board.groups[overGroupIdx] = activeGroup;

        setBoard({ ...board })
    }

    const boardGroupIds = useMemo(() => board.groups.map(g => g._id), [board])

    if (!board || !board.groups) return null
    return (
        <DndContext sensors={sensors} onDragEnd={onDragEnd} collisionDetection={closestCorners}>
            <section className="board-details">
                <SortableContext items={boardGroupIds} strategy={verticalListSortingStrategy}>
                    {board.groups && board.groups.map((group) => (
                        <GroupContainer
                            group={group}
                            cmpOrder={cmpOrder}
                            key={group?._id}
                            selectedTasks={selectedTasks}
                        />
                    ))}
                </SortableContext>
                <AddGroup />
            </section >
        </DndContext>
    )
}

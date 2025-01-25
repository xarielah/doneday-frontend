import { closestCenter, DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { groupService } from "../../services/board/group.service.local";
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

    const onDragEnd = useCallback((dragEvent) => {
        const { active, over } = dragEvent;
        if (!over) return;
        const activeGroupId = active.id;
        const overGroupId = over.id;

        const activeGroupIdx = board.groups.findIndex(group => group._id === activeGroupId);
        const overGroupIdx = board.groups.findIndex(group => group._id === overGroupId);

        const activeGroup = board.groups[activeGroupIdx];
        const overGroup = board.groups[overGroupIdx];

        board.groups[activeGroupIdx] = overGroup;
        board.groups[overGroupIdx] = activeGroup;

        groupService.update
        setBoard({ ...board })
    }, [])

    if (!board || !board.groups) return null
    return (
        <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
            <section className="board-details">
                <SortableContext items={board.groups.map(g => g._id)} strategy={verticalListSortingStrategy}>
                    {board.groups.map((group) => (
                        <GroupContainer
                            group={group}
                            cmpOrder={cmpOrder}
                            key={group._id}
                            selectedTasks={selectedTasks}
                        />
                    ))}
                </SortableContext>
                <AddGroup />
            </section >
        </DndContext>
    )
}

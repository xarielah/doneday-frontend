import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import { updateGroup } from "../../../store/actions/board.actions";
import GroupTableContentTask from "./GroupTableContentTask";

const GroupTableContent = ({ group }) => {
    // Maintain a local state for tasks
    const [tasks, setTasks] = useState(group.tasks);

    useEffect(() => {
        // When group.tasks changes externally, update local state
        setTasks(group.tasks);
    }, [group.tasks]);

    const onDragEnd = useCallback((dragEvent) => {
        const { active, over } = dragEvent;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex(task => task._id === active.id);
        const newIndex = tasks.findIndex(task => task._id === over.id);
        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        setTasks(newTasks);

        // Update the group object and persist the change
        const updatedGroup = { ...group, tasks: newTasks };
        updateGroup(updatedGroup);
        // Optionally dispatch an action to update the Redux store here
    }, [tasks, group]);

    return (
        <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
            <SortableContext
                items={tasks.map(task => task._id)}
                strategy={verticalListSortingStrategy}
            >
                <section className="group-table-content">
                    {tasks.map(task =>
                        <GroupTableContentTask
                            key={task._id}
                            task={task}
                            group={group}
                        />
                    )}
                </section>
            </SortableContext>
        </DndContext>
    );
}

export default GroupTableContent;

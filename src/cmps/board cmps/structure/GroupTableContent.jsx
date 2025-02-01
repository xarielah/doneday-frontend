import { useCallback } from "react";
import GroupTableContentTask from "./GroupTableContentTask";
import { boardService } from "../../../services/board/board.service.local";

const GroupTableContent = ({ group }) => {

    const onDragEnd = useCallback((dragEvent) => {
        const { active, over } = dragEvent;
        if (!over) return;
        const activeTaskId = active.id;
        const overTaskId = over.id;

        const activeTaskIdx = group.tasks.findIndex(task => task._id === activeTaskId);
        const overTaskIdx = group.tasks.findIndex(task => task._id === overTaskId);

        const activeTask = group.tasks[activeTaskIdx];
        const overTask = group.tasks[overTaskIdx];

        group.tasks[activeTaskIdx] = overTask;
        group.tasks[overTaskIdx] = activeTask;

        boardService.updateGroup(group)
        setBoard({ ...board })
    }, [])

    return <section className="group-table-content">
        {group.tasks && group.tasks.map(task =>
            <GroupTableContentTask
                key={task._id}
                task={task}
                group={group}
            />
        )}
    </section>
}

export default GroupTableContent
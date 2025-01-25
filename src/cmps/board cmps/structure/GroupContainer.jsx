import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import GroupHeader from "./GroupHeader";
import GroupTableContent from "./GroupTableContent";
import GroupTableFooter from "./GroupTableFooter";
import GroupTableHeader from "./GroupTableHeader";

const GroupContainer = ({ group, cmpOrder }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { attributes, listeners, setNodeRef: setDraggableRef, transform, transition, isDragging } = useSortable({ id: group._id });
    const { setNodeRef: setDroppableRef } = useDroppable({ id: group._id });

    const handleOnAddTask = (task) => {
        console.log('task: ' + task);
    }

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 1250 : 0,
    };

    console.log("🚀 ~ GroupContainer ~ dndStyles:", style)
    return <section ref={setDroppableRef} className="group-container" role="rowgroup" style={style}>
        <section role="rowheader" className="group-header-container">
            <GroupHeader
                ref={setDraggableRef}
                dndProps={{ ...attributes, ...listeners }}
                isDragging={isDragging}
                group={group}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <GroupTableHeader group={group} columnLabels={cmpOrder} />
        </section>
        <section role="rowgroup">
            <GroupTableContent group={group} columnLabels={cmpOrder} />
        </section>
        <footer>
            <GroupTableFooter group={group} onAddTask={handleOnAddTask} />
        </footer>
    </section>
}

export default GroupContainer
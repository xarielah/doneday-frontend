import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_GLOBALLY_COLLAPSED } from "../../../store/reducers/board.reducer";
import GroupHeader from "./GroupHeader";
import GroupSummaryRow from "./GroupSummaryRow";
import GroupTableContent from "./GroupTableContent";
import GroupTableFooter from "./GroupTableFooter";
import GroupTableHeader from "./GroupTableHeader";

const GroupContainer = ({ group }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const { attributes, listeners, setNodeRef: setDraggableRef, transform, transition, isDragging } = useSortable({ id: group?._id || "", activationConstraint: { distance: 5 } });
    const { setNodeRef: setDroppableRef } = useDroppable({ id: group._id });
    const previousCollapsedValue = useRef(isCollapsed);
    const { isGloballyCollapsed } = useSelector(state => state.boardModule)
    const dispatch = useDispatch();

    useEffect(() => {
        if (isGloballyCollapsed) {
            previousCollapsedValue.current = isCollapsed
            setIsCollapsed(true)
        } else {
            setIsCollapsed(previousCollapsedValue.current)
        }
    }, [isGloballyCollapsed])

    useEffect(() => {
        if (isDragging !== isGloballyCollapsed) {
            dispatch({ type: SET_GLOBALLY_COLLAPSED, isGloballyCollapsed: isDragging })
        }
    }, [isDragging])

    const handleOnAddTask = (task) => {
        console.log('task: ' + task);
    }

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 3000 : 0,
    };
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
            {!isCollapsed && <GroupTableHeader group={group} />}
        </section>
        {!isCollapsed && <>
            <section role="rowgroup">
                <GroupTableContent group={group} />
            </section>
            <footer>
                <GroupTableFooter group={group} onAddTask={handleOnAddTask} />
                <GroupSummaryRow group={group} />
            </footer>
        </>}
    </section>
}

export default GroupContainer
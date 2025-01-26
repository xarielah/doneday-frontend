import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_GLOBALLY_COLLAPSED } from "../../../store/reducers/board.reducer";
import GroupHeader from "./GroupHeader";
import GroupTableContent from "./GroupTableContent";
import GroupTableFooter from "./GroupTableFooter";
import GroupTableHeader from "./GroupTableHeader";

const GroupContainer = ({ group, cmpOrder }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { attributes, listeners, setNodeRef: setDraggableRef, transform, transition, isDragging } = useSortable({ id: group?._id || "" });
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
        zIndex: isDragging ? 1250 : 0,
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
            {!isCollapsed && <GroupTableHeader group={group} columnLabels={cmpOrder} />}
        </section>
        {!isCollapsed && <>
            <section role="rowgroup">
                <GroupTableContent group={group} columnLabels={cmpOrder} />
            </section>
            <footer>
                <GroupTableFooter group={group} onAddTask={handleOnAddTask} />
            </footer>
        </>}
    </section>
}

export default GroupContainer
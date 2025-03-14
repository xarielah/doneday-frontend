import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GroupHeader from "./GroupHeader";
import GroupSummaryRow from "./GroupSummaryRow";
import GroupTableContent from "./GroupTableContent";
import GroupTableFooter from "./GroupTableFooter";
import GroupTableHeader from "./GroupTableHeader";

const GroupContainer = ({ group }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({
            id: group._id,
            activationConstraint: { distance: 5 },
            data: { type: "group" }
        });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 3000 : 0,
    };

    return (
        <section ref={setNodeRef} className="group-container" style={style}>
            <div className="group-header-container">
                <GroupHeader
                    dndProps={{ ...attributes, ...listeners }}
                    group={group}
                />
                {!group.isCollapsed && <GroupTableHeader group={group} />}
            </div>
            {!group.isCollapsed && (
                <>
                    <GroupTableContent group={group} />
                    <GroupTableFooter group={group} />
                    <GroupSummaryRow group={group} />
                </>
            )}
        </section>
    );
};

export default GroupContainer;

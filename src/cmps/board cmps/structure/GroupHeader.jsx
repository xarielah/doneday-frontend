
import { Heading, Icon, Text } from "@vibe/core";
import { DropdownChevronDown, DropdownChevronRight } from "@vibe/icons";
import { forwardRef } from "react";
import { updateGroup } from "../../../store/actions/board.actions";

const GroupHeader = forwardRef(({ group, isCollapsed, setIsCollapsed, dndProps, isDragging }, ref) => {
    const groupCount = group.tasks?.length || 0;

    function handleChangeName(name) {
        try {
            const updatedName = { ...group, name }
            updateGroup(updatedName)
        } catch (err) {
            console.error('group name could not be updated' + err);
        }
    }

    return <section ref={ref} {...dndProps} className="group-header" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        {isCollapsed && <button onClick={() => setIsCollapsed(false)}>
            <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronRight} iconSize={20} />
        </button>}
        {!isCollapsed && <button onClick={() => setIsCollapsed(true)}>
            <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronDown} iconSize={20} />
        </button>}
        <Heading type="h3" style={{ color: group.color || 'inherit' }}>{group.name || group._id}</Heading>
        <Text className="items-count" color='secondary' type="text2" style={{ marginLeft: '8px' }}>{groupCount} items</Text>
    </section>
})

export default GroupHeader
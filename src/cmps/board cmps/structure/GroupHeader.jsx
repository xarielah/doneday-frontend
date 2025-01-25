
import { EditableHeading, Heading, Icon, Text } from "@vibe/core";
import { DropdownChevronDown, DropdownChevronRight } from "@vibe/icons";
import { updateGroup } from "../../../store/actions/board.actions";

const GroupHeader = ({ group, isCollapsed, setIsCollapsed }) => {
    const groupCount = group.tasks?.length || 0;
    function handleChangeName(name) {
        try {
            const updatedName = { ...group, name }
            updateGroup(updatedName)
        } catch (err) {
            console.error('group name could not be updated' + err);
        }
    }

    return <section className="group-header">
        {isCollapsed && <button onClick={() => setIsCollapsed(false)}>
            <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronRight} iconSize={20} />
        </button>}
        {!isCollapsed && <button onClick={() => setIsCollapsed(true)}>
            <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronDown} iconSize={20} />
        </button>}
        <EditableHeading type="h3" style={{ color: group.color || 'inherit' }} value={group.name || group._id} />
        <Text className="items-count" color='secondary' type="text2" style={{ marginLeft: '8px' }}>{groupCount || "No"} Task{groupCount !== 1 && "s"}</Text>
    </section>
}

export default GroupHeader
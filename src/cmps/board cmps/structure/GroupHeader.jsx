import { Heading, Icon, Text } from "@vibe/core";
import { DropdownChevronDown, DropdownChevronRight } from "@vibe/icons";

const GroupHeader = ({ group, isCollapsed, setIsCollapsed }) => {
    const groupCount = group.tasks?.length || 0;
    return <section className="group-header">
        {isCollapsed && <button onClick={() => setIsCollapsed(false)}>
            <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronRight} iconSize={20} />
        </button>}
        {!isCollapsed && <button onClick={() => setIsCollapsed(true)}>
            <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronDown} iconSize={20} />
        </button>}
        <Heading type="h3" style={{ color: group.color || 'inherit' }}>{group.name || group._id}</Heading>
        <Text className="items-count" color='secondary' type="text2" style={{ marginLeft: '8px' }}>{groupCount} items</Text>
    </section>
}

export default GroupHeader
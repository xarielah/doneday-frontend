import { EditableHeading, Icon, Text } from "@vibe/core"
import { DropdownChevronDown, DropdownChevronRight } from "@vibe/icons"

const GroupHeader = ({ group, isCollapsed, setIsCollapsed }) => {
    return <section className="group-header">
        {isCollapsed && <button onClick={() => setIsCollapsed(false)}>
            <Icon className="collapse-chevron" icon={DropdownChevronRight} iconSize={20} />
        </button>}
        {!isCollapsed && <button onClick={() => setIsCollapsed(true)}>
            <Icon className="collapse-chevron" icon={DropdownChevronDown} iconSize={20} />
        </button>}
        <EditableHeading type="h3" value={group._id} />
        <Text className="items-count" color='secondary' type="text2" style={{ marginLeft: '8px' }}>2 items</Text>
    </section>
}

export default GroupHeader
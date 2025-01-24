import { EditableHeading, Icon, Text } from "@vibe/core"
import { DropdownChevronDown, DropdownChevronRight } from "@vibe/icons"
import { updateGroup } from "../../../store/actions/board.actions"

const GroupHeader = ({ group, isCollapsed, setIsCollapsed }) => {

    function taskNumberDisplay() {
        if (group.tasks.length > 1) {
            return group.tasks.length + " Tasks"
        } else if (group.tasks.length === 1) {
            return group.tasks.length + " Task"
        } else if (group.tasks.length === 0) {
            return "No Tasks"
        }
        return
    }

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
            <Icon className="collapse-chevron" icon={DropdownChevronRight} iconSize={20} />
        </button>}
        {!isCollapsed && <button onClick={() => setIsCollapsed(true)}>
            <Icon style={{ color: group.color }} className="collapse-chevron" icon={DropdownChevronDown} iconSize={20} />
        </button>}
        <EditableHeading onChange={handleChangeName} style={{ color: group.color }} type="h3" value={group.name} />
        <Text className="items-count" color='secondary' type="text2" style={{ marginLeft: '8px' }}>{taskNumberDisplay()}</Text>
    </section>
}

export default GroupHeader
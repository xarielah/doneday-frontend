import { Text } from "@vibe/core"
import { useSelector } from "react-redux"
import { cn } from "../../../services/util.service"
import { addSelectedGroup, removeSelectedGroup } from "../../../store/actions/taskSelect.actions"
import GroupPreRow from "./GroupPreRow"
import GroupScrollableColumns from "./GroupScrollableColumns"
import GroupStickyColumns from "./GroupStickyColumns"

const GroupTableHeader = ({ columnLabels, group }) => {
    const selectedTasks = useSelector(storeState => storeState.taskSelectModule.selectedTasks)

    function isGroupSelected(groupId, tasks) {
        const found = selectedTasks?.find(selectedGroup => selectedGroup.groupId === groupId) || false
        if (!found) return false
        if (!Array.isArray(tasks) || tasks.length === 0) return false
        return tasks.every(task => found.tasks.includes(task._id))
    }

    async function handleChangeSelectGroup(ev, groupId, tasks) {
        if (ev.target.checked) {
            await addSelectedGroup(groupId, tasks)
        } else {
            await removeSelectedGroup(groupId, tasks)
        }
    }


    return <section className="table-header">
        <GroupStickyColumns>
            <GroupPreRow roundedTopLeft group={group}
                isChecked={isGroupSelected(group._id, group.tasks)}
                onCheckBox={(ev) => handleChangeSelectGroup(ev, group._id, group.tasks)}
            />
            <div className="min-table-cell default-cell-color table-cell-first-column task-border-top"><Text type="text2">Task</Text></div>
        </GroupStickyColumns>
        <GroupScrollableColumns>
            {columnLabels.map(label => <Text type="text2" key={label} className={cn('min-table-cell default-cell-color task-border-top column-label', `column-label-${label}`)}>{label}</Text>)}
        </GroupScrollableColumns>
    </section>
}

export default GroupTableHeader
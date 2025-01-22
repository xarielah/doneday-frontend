import { EditableText } from "@vibe/core"
import { addSelectedTask, removeSelectedTask, updateTask } from "../../../store/actions/board.actions"
import DynamicColumn from "./DynamicColumn"
import GroupPreRow from "./GroupPreRow"
import GroupScrollableColumns from "./GroupScrollableColumns"
import GroupStickyColumns from "./GroupStickyColumns"
import { useSelector } from "react-redux"

const GroupTableContentTask = ({ task, columnLabels, group }) => {
    const selectedTasks = useSelector(storeState => storeState.boardModule.selectedTasks)

    const handleCellUpdate = (cmpType, value) => {
        const updatedTask = { ...task, [cmpType]: value }
        updateTask(group._id, updatedTask)
    }

    async function handleChangeSelect(ev, groupId, taskId) {
        if (ev.target.checked) {
            await addSelectedTask(groupId, taskId)
        } else {
            await removeSelectedTask(groupId, taskId)
        }
    }

    function isTaskSelected(groupId = "", taskId = "") {
        const group = selectedTasks.find(selectedGroups => selectedGroups.groupId === groupId)
        if (!group) return false
        return group.tasks.includes(taskId)
    }

    return (<div role="listitem" className="table-task-row">
        <GroupStickyColumns>
            <GroupPreRow
                isChecked={isTaskSelected(group._id, task._id)}
                onCheckBox={(ev) => handleChangeSelect(ev, group._id, task._id)}
                group={group}
            />
            <div className="min-table-cell table-cell-first-column">
                <EditableText type="text2" value={task.taskTitle} />
            </div>
        </GroupStickyColumns>
        <GroupScrollableColumns>
            {columnLabels.map(cmpType => <DynamicColumn key={cmpType} cmpType={cmpType} info={task[cmpType]} onTaskUpdate={(value) => handleCellUpdate(cmpType, value)} />)}
        </GroupScrollableColumns>
    </div>)
}

export default GroupTableContentTask

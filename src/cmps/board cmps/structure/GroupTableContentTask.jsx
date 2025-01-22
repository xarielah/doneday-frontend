import { EditableText } from "@vibe/core"
import { updateTask } from "../../../store/actions/board.actions"
import DynamicColumn from "./DynamicColumn"
import GroupPreRow from "./GroupPreRow"
import GroupScrollableColumns from "./GroupScrollableColumns"
import GroupStickyColumns from "./GroupStickyColumns"
import TaskDetailsTriggerCell from "./TaskDetailsTriggerCell"

const GroupTableContentTask = ({ task, columnLabels, group }) => {

    const handleCellUpdate = (cmpType, value) => {
        const updatedTask = { ...task, [cmpType]: value }
        updateTask(group._id, updatedTask)
    }

    return (<div role="listitem" className="table-task-row">
        <GroupStickyColumns>
            <GroupPreRow group={group} />
            <div className="min-table-cell table-cell-first-column task-title">
                <EditableText type="text2" value={task.taskTitle} />
                <TaskDetailsTriggerCell taskId={task._id} />
            </div>
        </GroupStickyColumns>
        <GroupScrollableColumns>
            {columnLabels.map(cmpType =>
                <DynamicColumn
                    key={cmpType}
                    cmpType={cmpType}
                    info={task[cmpType]}
                    onTaskUpdate={(value) => handleCellUpdate(cmpType, value)}
                />
            )}
        </GroupScrollableColumns>
    </div>)
}

export default GroupTableContentTask

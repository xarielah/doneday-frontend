import { EditableText } from "@vibe/core"
import { useState } from "react"
import { taskService } from "../../../services/board/task.service.local"
import { addTask } from "../../../store/actions/board.actions"
import GroupPreRow from "./GroupPreRow"
import GroupStickyColumns from "./GroupStickyColumns"

const GroupTableFooter = ({ onAddTask, group }) => {

    const [editableValue, setEditableValue] = useState('')

    const handleChange = (newValue) => {
        onAddTask(group._id, newValue)
        setEditableValue('')
    }

    function onAddTask(taskTitle) {
        const groupId = group._id
        let newTask = taskService.getEmptyTask()
        newTask = { ...newTask, groupId, taskTitle, status: "draft", priority: "tbd" }
        setEditableValue(text => text = '')
        return addTask(groupId, newTask)
    }

    return <section className="table-footer">
        <GroupStickyColumns>
            <GroupPreRow group={group} roundedBottomLeft bottomBorders disableCheckbox />
            <div className="min-table-cell add-task-cell cell-left-padding task-border-bottom" style={{ textAlign: 'left' }}>
                <EditableText
                    onChange={onAddTask}
                    className="cell-left-padding"
                    placeholder="+ Add Task"
                    value={editableValue}
                />
            </div>
        </GroupStickyColumns>
    </section>
}

export default GroupTableFooter
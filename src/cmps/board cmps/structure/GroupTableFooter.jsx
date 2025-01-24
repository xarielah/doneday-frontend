import { EditableText } from "@vibe/core"
import GroupPreRow from "./GroupPreRow"
import GroupStickyColumns from "./GroupStickyColumns"
import { addTask } from "../../../store/actions/board.actions"
import { boardService } from "../../../services/board/board.service.local"
import { useEffect, useRef, useState } from "react"
import { taskService } from "../../../services/board/task.service.local"

const GroupTableFooter = ({ onAddTask, group }) => {

    const [editableValue, setEditableValue] = useState('')

    const handleChange = (newValue) => {
        onAddTask(group._id, newValue)
        setEditableValue('')
    };

    function onAddTask(groupId, taskTitle) {
        let newTask = taskService.getEmptyTask()
        newTask = { ...newTask, groupId, taskTitle, status: "draft", priority: "tbd" }
        console.log(addTaskRef.current);
        return addTask(groupId, newTask)
    }

    return <section className="table-footer">
        <GroupStickyColumns>
            <GroupPreRow group={group} roundedBottomLeft bottomBorders disableCheckbox />
            <div className="min-table-cell add-task-cell cell-left-padding task-border-bottom" style={{ textAlign: 'left' }}>
                <EditableText
                    onChange={handleChange}
                    value={editableValue}
                    className="cell-left-padding"
                    placeholder="+ Add Task"
                />
            </div>
        </GroupStickyColumns>
    </section>
}

export default GroupTableFooter
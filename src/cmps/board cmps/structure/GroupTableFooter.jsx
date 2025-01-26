import { EditableText } from "@vibe/core"
import GroupPreRow from "./GroupPreRow"
import GroupStickyColumns from "./GroupStickyColumns"
import { addTask } from "../../../store/actions/board.actions"
import { boardService } from "../../../services/board/board.service.local"
import { useEffect, useRef, useState } from "react"
import { taskService } from "../../../services/board/task.service.local"

const GroupTableFooter = ({ onAddTask, group }) => {
    const [taskValue, setTaskValue] = useState("")

    useEffect(() => {
        setTaskValue("")
    }, [taskValue])

    const handleChange = (newValue) => {
        setTaskValue(value => value = newValue)
        onAddTask(newValue);
    };

    function onAddTask(taskTitle) {
        const groupId = group._id
        let newTask = taskService.getEmptyTask()
        newTask = { ...newTask, groupId, taskTitle, status: "draft", priority: "tbd" }
        return addTask(groupId, newTask)
    }

    return <section className="table-footer">
        <GroupStickyColumns>
            <GroupPreRow group={group} roundedBottomLeft bottomBorders disableCheckbox />
            <div className="min-table-cell add-task-cell cell-left-padding task-border-bottom" style={{ textAlign: 'left' }}>
                <EditableText
                    value={taskValue}
                    onChange={handleChange}
                    className="cell-left-padding"
                    placeholder="+ Add Task"
                />
            </div>
        </GroupStickyColumns>
    </section>
}

export default GroupTableFooter
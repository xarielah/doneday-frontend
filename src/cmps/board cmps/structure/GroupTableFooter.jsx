import { EditableText } from "@vibe/core"
import GroupPreRow from "./GroupPreRow"
import GroupStickyColumns from "./GroupStickyColumns"
import { addTask } from "../../../store/actions/board.actions"
import { boardService } from "../../../services/board/board.service.local"
import { useEffect, useRef, useState } from "react"
import { taskService } from "../../../services/board/task.service.local"

const GroupTableFooter = ({ onAddTask, group }) => {

    const handleChange = (newValue) => {
        onAddTask(newValue);
        setIsEditing(false); // Trigger unmount and remount
        setTimeout(() => setIsEditing(true), 0); // Force reset after task creation
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
                    onChange={handleChange}
                    ref={valueRef}
                    className="cell-left-padding"
                    placeholder="+ Add Task"
                />
            </div>
        </GroupStickyColumns>
    </section>
}

export default GroupTableFooter
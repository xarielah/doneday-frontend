import { EditableText } from "@vibe/core"
import { useEffect, useState } from "react"
import { boardService } from "../../../services/board/board.service.local"
import { addTask } from "../../../store/actions/board.actions"
import GroupPreRow from "./GroupPreRow"
import GroupScrollableColumns from "./GroupScrollableColumns"
import GroupStickyColumns from "./GroupStickyColumns"

const GroupTableFooter = ({ group }) => {
    const [taskValue, setTaskValue] = useState("")

    useEffect(() => {
        if (!taskValue) return;
        onAddTask(taskValue)
        setTaskValue("")
    }, [taskValue])


    function onAddTask(taskTitle) {
        const groupId = group._id
        let newTask = boardService.getEmptyTask()
        newTask = { ...newTask, groupId, taskTitle }
        return addTask(groupId, newTask)
    }

    return <section className="table-footer">
        <GroupStickyColumns>
            <GroupPreRow crudlType="none" group={group} roundedBottomLeft bottomBorders disableCheckbox />
            <div className="min-table-cell table-cell-first-column task-title default-cell-color bottom-border" style={{ textAlign: 'left' }}>
                <EditableText
                    value={taskValue}
                    onChange={setTaskValue}
                    className="cell-left-padding"
                    placeholder="+ Add Task"
                />
            </div>
        </GroupStickyColumns>
        <GroupScrollableColumns noLeftBorder={true} bottomBorder={true}>
        </GroupScrollableColumns>
    </section >
}

export default GroupTableFooter
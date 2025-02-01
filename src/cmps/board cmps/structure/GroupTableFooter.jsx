import { EditableText } from "@vibe/core"
import { useState, useEffect } from "react"
import { addTask } from "../../../store/actions/board.actions"
import GroupPreRow from "./GroupPreRow"
import GroupStickyColumns from "./GroupStickyColumns"
import { boardReducer } from "../../../store/reducers/board.reducer"
import { boardService } from "../../../services/board/board.service.local"

const GroupTableFooter = ({ onAddTask, group }) => {
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
            <div className="min-table-cell add-task-cell cell-left-padding task-border-bottom last-cell" style={{ textAlign: 'left' }}>
                <EditableText
                    value={taskValue}
                    onChange={setTaskValue}
                    className="cell-left-padding"
                    placeholder="+ Add Task"
                />
            </div>
        </GroupStickyColumns>
    </section >
}

export default GroupTableFooter
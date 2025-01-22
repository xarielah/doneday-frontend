import { EditableText } from "@vibe/core"
import GroupPreRow from "./GroupPreRow"
import GroupStickyColumns from "./GroupStickyColumns"
import { addTask } from "../../../store/actions/board.actions"
import { boardService } from "../../../services/board/board.service.local"
import { useRef } from "react"

const GroupTableFooter = ({ onAddTask, group }) => {

    const addTaskRef = useRef()

    function onAddTask(groupId, taskTitle) {
        let newTask = boardService.getEmptyTask()
        newTask = { ...newTask, groupId, taskTitle }
        addTaskRef.current.value = ""
        return addTask(groupId, newTask)
    }



    return <section className="table-footer">
        <GroupStickyColumns>
            <GroupPreRow group={group} roundedBottomLeft bottomBorders disableCheckbox />
            <div className="min-table-cell add-task-cell cell-left-padding task-border-bottom" style={{ textAlign: 'left' }}>
                <EditableText
                    // onClick={onAddTask}
                    onChange={taskTitle => onAddTask(group._id, taskTitle)}
                    className="cell-left-padding"
                    placeholder="+ Add Task"
                    ref={addTaskRef}
                />
            </div>
        </GroupStickyColumns>
    </section>
}

export default GroupTableFooter
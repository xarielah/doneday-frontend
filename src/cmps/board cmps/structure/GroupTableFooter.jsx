import { EditableText } from "@vibe/core"
import GroupPreRow from "./GroupPreRow"
import GroupStickyColumns from "./GroupStickyColumns"
import { addTask } from "../../../store/actions/board.actions"
import { boardService } from "../../../services/board/board.service.local"

const GroupTableFooter = ({ onAddTask, group }) => {

    function onAddTask(groupId, taskTitle) {
        const newTask = boardService.getEmptyTask()
        newTask.taskTitle = taskTitle
        return addTask(groupId, newTask)
    }

    function onBlurTitle(taskTitle) {
        onAddTask(group._id, taskTitle)
    }

    return <section className="table-footer">
        <GroupStickyColumns>
            <GroupPreRow group={group} roundedBottomLeft bottomBorders disableCheckbox />
            <div className="min-table-cell add-task-cell cell-left-padding task-border-bottom" style={{ textAlign: 'left' }}>
                <EditableText
                    onClick={onAddTask}
                    onChange={taskTitle => onBlurTitle(taskTitle)}
                    className="cell-left-padding"
                    placeholder="+ Add Task"
                />
            </div>
        </GroupStickyColumns>
    </section>
}

export default GroupTableFooter
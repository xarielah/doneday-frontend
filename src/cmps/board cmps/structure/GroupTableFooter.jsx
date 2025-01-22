import { EditableText } from "@vibe/core"
import GroupPreRow from "./GroupPreRow"
import GroupStickyColumns from "./GroupStickyColumns"

const GroupTableFooter = ({ onAddTask, group }) => {
    return <section className="table-footer">
        <GroupStickyColumns>
            <GroupPreRow group={group} roundedBottomLeft bottomBorders disableCheckbox />
            <div className="min-table-cell add-task-cell cell-left-padding task-border-bottom" style={{ textAlign: 'left' }}>
                <EditableText
                    onClick={onAddTask}
                    onChange={taskTitle => onAddTask(taskTitle)}
                    className="cell-left-padding"
                    placeholder="Add Task"
                />
            </div>
        </GroupStickyColumns>
    </section>
}

export default GroupTableFooter
import { EditableText } from "@vibe/core"
import DynamicColumn from "./DynamicColumn"
import GroupPreRow from "./GroupPreRow"
import GroupScrollableColumns from "./GroupScrollableColumns"
import GroupStickyColumns from "./GroupStickyColumns"

const GroupTableContent = ({ group, columnLabels }) => {
    console.log("🚀 ~ GroupTableContent ~ group:", group)
    return <section className="group-table-content">
        {group.tasks.map(task => <div role="listitem" className="table-task-row">
            <GroupStickyColumns>
                <GroupPreRow group={group} />
                <div className="min-table-cell table-cell-first-column">
                    <EditableText type="text2" value={task.taskTitle} />
                </div>
            </GroupStickyColumns>
            <GroupScrollableColumns>
                {columnLabels.map(cmpType => <DynamicColumn cmpType={cmpType} info={task[cmpType]} onTaskUpdate={console.log} />)}
            </GroupScrollableColumns>
        </div>)}
    </section>
}

export default GroupTableContent
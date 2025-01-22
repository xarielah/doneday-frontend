import { Text } from "@vibe/core"
import { cn } from "../../../services/util.service"
import GroupPreRow from "./GroupPreRow"
import GroupScrollableColumns from "./GroupScrollableColumns"
import GroupStickyColumns from "./GroupStickyColumns"

const GroupTableHeader = ({ columnLabels, group }) => {
    return <section className="table-header">
        <GroupStickyColumns>
            <GroupPreRow roundedTopLeft group={group} />
            <div className="min-table-cell table-cell-first-column task-border-top"><Text type="text2">Task</Text></div>
        </GroupStickyColumns>
        <GroupScrollableColumns>
            {columnLabels.map(label => <Text type="text2" className={cn('min-table-cell task-border-top column-label', `column-label-${label}`)}>{label}</Text>)}
        </GroupScrollableColumns>
    </section>
}

export default GroupTableHeader
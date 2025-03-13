import { Checkbox } from "@vibe/core"
import { cn } from "../../../services/util.service"
import { TaskMenuButton } from "../CrudlMenuButtons/TaskMenuButton"
const GroupPreRow = ({ group, crudlType, task = {}, roundedTopLeft, roundedBottomLeft, bottomBorders, isChecked, onCheckBox, disableCheckbox }) => {

    const topLeft = roundedTopLeft ? { borderTopLeftRadius: '4px' } : {}
    const bottomLeft = roundedBottomLeft ? { borderBottomLeftRadius: '4px' } : {}
    return <>
        <div className="task-menu-button" style={{ border: 'none' }}>{crudlType !== "none" && <TaskMenuButton crudlType={crudlType} task={task} group={group} />}</div>
        <div className="task-left-indicator" style={{ ...topLeft, ...bottomLeft, border: 'none', background: group.color }}></div>
        <div className={cn("task-left-checkbox",
            bottomBorders && "task-border-bottom"
        )}>
            <Checkbox
                checked={isChecked}
                disabled={disableCheckbox}
                onChange={onCheckBox} />
        </div>
    </>
}

export default GroupPreRow
import { Checkbox, IconButton } from "@vibe/core"
import { Menu } from "@vibe/icons"
import { cn } from "../../../services/util.service"
import { TaskMenuButton } from "../CrudlMenuButtons/TaskMenuButton"
const GroupPreRow = ({ group, task, roundedTopLeft, roundedBottomLeft, bottomBorders, isChecked, onCheckBox, disableCheckbox }) => {

    const topLeft = roundedTopLeft ? { borderTopLeftRadius: '4px' } : {}
    const bottomLeft = roundedBottomLeft ? { borderBottomLeftRadius: '4px' } : {}
    return <>
        <div className="task-menu-button" style={{ border: 'none' }}><TaskMenuButton task={task} /></div>
        <div className="task-left-indicator" style={{ ...topLeft, ...bottomLeft, border: 'none', background: group.color }}></div>
        <div className={cn("task-left-checkbox", bottomBorders && "task-border-bottom")}>
            <Checkbox
                checked={isChecked}
                disabled={disableCheckbox}
                onChange={onCheckBox} />
        </div>
    </>
}

export default GroupPreRow
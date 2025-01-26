import { Checkbox, IconButton } from "@vibe/core"
import { Menu } from "@vibe/icons"
import { cn } from "../../../services/util.service"
const GroupPreRow = ({ group, roundedTopLeft, roundedBottomLeft, bottomBorders, isChecked, onCheckBox, disableCheckbox, className }) => {

    const topLeft = roundedTopLeft ? { borderTopLeftRadius: '4px' } : {}
    const bottomLeft = roundedBottomLeft ? { borderBottomLeftRadius: '4px' } : {}
    return <>
        <div className={cn("task-menu-button", className)} style={{ border: 'none' }}><IconButton size="xs" icon={Menu} /></div>
        <div className={cn("task-left-indicator", className)} style={{ ...topLeft, ...bottomLeft, border: 'none', background: group.color }}></div>
        <div className={cn("task-left-checkbox default-cell-color", bottomBorders && "task-border-bottom")}>
            <Checkbox
                checked={isChecked}
                disabled={disableCheckbox}
                onChange={onCheckBox} />
        </div>
    </>
}

export default GroupPreRow
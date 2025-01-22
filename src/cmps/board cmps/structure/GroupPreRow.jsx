import { Checkbox, IconButton } from "@vibe/core"
import { Menu } from "@vibe/icons"
import { cn } from "../../../services/util.service"

const GroupPreRow = ({ group, roundedTopLeft, roundedBottomLeft, bottomBorders, onCheckBox, disableCheckbox }) => {
    const topLeft = roundedTopLeft ? { borderTopLeftRadius: '4px' } : {}
    const bottomLeft = roundedBottomLeft ? { borderBottomLeftRadius: '4px' } : {}
    return <>
        <div className="task-menu-button" style={{ border: 'none' }}><IconButton size="xs" icon={Menu} /></div>
        <div className="task-left-indicator" style={{ ...topLeft, ...bottomLeft, border: 'none', background: group.color }}></div>
        <div className={cn("task-left-checkbox", bottomBorders && "task-border-bottom")}><Checkbox disabled={disableCheckbox} onChange={onCheckBox} /></div>
    </>
}

export default GroupPreRow
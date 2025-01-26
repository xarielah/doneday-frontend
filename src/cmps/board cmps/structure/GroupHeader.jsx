
import { EditableHeading, Icon, Text } from "@vibe/core";
import { DropdownChevronDown, DropdownChevronRight } from "@vibe/icons";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../../../services/util.service";
import { updateGroup } from "../../../store/actions/board.actions";
import ChevronTooltip from "./ChevronTooltip";
import GroupHeaderMenu from "./GroupHeaderMenu";



const GroupHeader = forwardRef(({ group, isCollapsed, setIsCollapsed, dndProps, isDragging }, ref) => {
    const tasksCount = group.tasks?.length || 0;
    const headingRef = useRef()
    const [headerColorTrigger, setHeaderColorTrigger] = useState(false)

    useEffect(() => {
        if (headingRef.current) {
            const h3HeaderColor = headingRef.current.querySelector("h3")
            h3HeaderColor.style.color = group.color;

            const inputHeaderColor = headingRef.current.querySelector("input")
            if (inputHeaderColor) {
                inputHeaderColor.style.color = group.color;
            }
        }
    }, [headingRef, headerColorTrigger])

    const groupCount = group.tasks?.length || 0;

    function handleChangeName(name) {
        try {
            const updatedName = { ...group, name }
            updateGroup(updatedName)
        } catch (err) {
            console.error('group name could not be updated' + err);
        }
    }

    const collapsedStyle = isCollapsed ? { borderLeft: '6px solid' + (group.color || '#000') } : undefined

    return <section className={cn(!isCollapsed && "group-header", isCollapsed && "group-header-collapsed group-collapsed-border")} style={collapsedStyle}>
        {!isCollapsed && <GroupHeaderMenu group={group} onDelete={console.log} />}
        {isCollapsed && <button onClick={() => setIsCollapsed(false)}>
            <ChevronTooltip content='Expand group'>
                <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronRight} iconSize={20} />
            </ChevronTooltip>
        </button>}
        {!isCollapsed && <button onClick={() => setIsCollapsed(true)}>
            <ChevronTooltip content="Collapse group">
                <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronDown} iconSize={20} />
            </ChevronTooltip>
        </button>}
        <div ref={ref} {...dndProps} className={cn("group-header-wrapper", isDragging && "dragging")}>
            {/* <Heading type="h3" className="group-heading" style={{ color: group.color || 'inherit' }}>{group.name || group._id}</Heading> */}
            {/* && <Text className="items-count" color='secondary' type="text2" style={{ marginLeft: '8px' }}>{tasksCount} items</Text>} */}
            <EditableHeading onEditModeChange={() => setHeaderColorTrigger(!headerColorTrigger)} ref={headingRef} onChange={(name) => handleChangeName(name)} className="group-header-color" type="h3" style={{ color: group.color || 'inherit' }} value={group.name || group._id} />
            {!isCollapsed && <Text className="items-count" color='secondary' type="text2" style={{ marginLeft: '8px' }}>{groupCount || "No"} Task{groupCount !== 1 && "s"}</Text>}
        </div>
        {isCollapsed && <Text className="collapse-items" color='secondary' type="text2">{tasksCount} items</Text>}

    </section>
})

export default GroupHeader
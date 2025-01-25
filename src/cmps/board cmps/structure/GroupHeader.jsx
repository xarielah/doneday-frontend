
import { EditableHeading, Heading, Icon, Text } from "@vibe/core";
import { DropdownChevronDown, DropdownChevronRight } from "@vibe/icons";
import { updateGroup } from "../../../store/actions/board.actions";
import { useEffect, useRef, useState } from "react";

const GroupHeader = ({ group, isCollapsed, setIsCollapsed }) => {
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

    return <section className="group-header ">
        {isCollapsed && <button onClick={() => setIsCollapsed(false)}>
            <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronRight} iconSize={20} />
        </button>}
        {!isCollapsed && <button onClick={() => setIsCollapsed(true)}>
            <Icon style={{ color: group.color || 'inherit' }} className="collapse-chevron" icon={DropdownChevronDown} iconSize={20} />
        </button>}
        <EditableHeading onEditModeChange={() => setHeaderColorTrigger(!headerColorTrigger)} ref={headingRef} onChange={(name) => handleChangeName(name)} className="group-header-color" type="h3" style={{ color: group.color || 'inherit' }} value={group.name || group._id} />
        <Text className="items-count" color='secondary' type="text2" style={{ marginLeft: '8px' }}>{groupCount || "No"} Task{groupCount !== 1 && "s"}</Text>
    </section>
}

export default GroupHeader
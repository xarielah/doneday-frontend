/* eslint-disable react/prop-types */
import { Checkbox } from "@vibe/core";

export function SideGroup({ info, onTaskUpdate }) {
    return (<section className="side-">
        <Checkbox
            onChange={(ev) => info?.handleChangeSelectGroup(ev, info.groupId, info.tasks)}
            checked={info.isGroupSelected(info.groupId, info.tasks)}
        />
    </section>)
}
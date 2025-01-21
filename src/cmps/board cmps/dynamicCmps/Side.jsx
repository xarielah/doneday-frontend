/* eslint-disable react/prop-types */
import { Checkbox } from "@vibe/core";

export function Side({ info, onTaskUpdate }) {
    return (<section className="side-">
        <Checkbox
            onChange={(ev) => info?.handleChangeSelect(ev, info.groupId, info.taskId)}
            checked={info?.isTaskSelected(info.groupId, info.taskId)}
        />
    </section>)
}
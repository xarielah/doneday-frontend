import { useState } from "react";
import GroupHeader from "./GroupHeader";
import GroupTableContent from "./GroupTableContent";
import GroupTableFooter from "./GroupTableFooter";
import GroupTableHeader from "./GroupTableHeader";

const GroupContainer = ({ group, cmpOrder }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleOnAddTask = (task) => {
        console.log('task: ' + task);
    }

    return <section className="group-container" role="rowgroup">
        <section role="rowheader" className="group-header-container">
            <GroupHeader
                group={group}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <GroupTableHeader group={group} columnLabels={cmpOrder} />
        </section>
        <section role="rowgroup">
            <GroupTableContent group={group} columnLabels={cmpOrder} />
        </section>
        <footer>
            <GroupTableFooter group={group} onAddTask={handleOnAddTask} />
        </footer>
    </section>
}

export default GroupContainer
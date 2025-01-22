import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SidePanelWrapper from "../SidePanelWrapper";
import SidePanelTaskContentTabs from "./SidePanelTaskContentTabs";
import SidePanelTaskFiles from "./SidePanelTaskFiles";
import SidePanelTaskMessages from "./SidePanelTaskMessages";

const tabs = {
    messages: 0,
    files: 2,
}

const SidePanelTask = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState();
    const [currentTab, setCurrentTab] = useState(tabs.messages)

    useEffect(() => {
        if (taskId) {
            setTask(taskId)
        } else {
            setTask(null)
        }
    }, [taskId])

    return <SidePanelWrapper heading="Task name">
        <SidePanelTaskContentTabs onTabChange={setCurrentTab} />
        {currentTab === tabs.messages && <SidePanelTaskMessages />}
        {currentTab === tabs.files && <SidePanelTaskFiles />}
    </SidePanelWrapper>
}

export default SidePanelTask;
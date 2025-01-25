import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { taskService } from "../../../../services/board/task.service.local";
import SidePanelWrapper from "../SidePanelWrapper";
import SidePanelTaskContentTabs from "./SidePanelTaskContentTabs";
import SidePanelTaskFiles from "./SidePanelTaskFiles";
import SidePanelTaskMessages from "./SidePanelTaskMessages";

const tabs = {
    messages: 0,
    files: 2,
}

const SidePanelTask = () => {
    const { taskId } = useSelector(storeState => storeState.sidePanelModule.info)
    const [task, setTask] = useState();
    const [currentTab, setCurrentTab] = useState(tabs.messages)

    useEffect(() => {
        if (taskId) {
            taskService.get(taskId)
                .then(setTask)
        } else {
            setTask(null)
        }
    }, [taskId])

    return <SidePanelWrapper heading={task.taskTitle || 'loading...'}>
        <SidePanelTaskContentTabs onTabChange={setCurrentTab} />
        {currentTab === tabs.messages && <SidePanelTaskMessages task={task} />}
        {currentTab === tabs.files && <SidePanelTaskFiles />}
    </SidePanelWrapper>
}

export default SidePanelTask;
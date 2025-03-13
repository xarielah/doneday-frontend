import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SidePanelWrapper from "../SidePanelWrapper";
import SidePanelTaskContentTabs from "./SidePanelTaskContentTabs";
import SidePanelTaskFiles from "./SidePanelTaskFiles";
import SidePanelTaskMessages from "./SidePanelTaskMessages";
import { boardService } from "../../../../services/board/board.service.local";

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
            boardService.getTaskById(taskId)
                .then(setTask)
        } else {
            setTask(null)
        }
    }, [taskId])

    return <SidePanelWrapper heading={task?.taskTitle || 'loading...'}>
        <SidePanelTaskContentTabs onTabChange={setCurrentTab} />
        {currentTab === tabs.messages && <SidePanelTaskMessages task={task} />}
        {currentTab === tabs.files && <SidePanelTaskFiles />}
    </SidePanelWrapper>
}

export default SidePanelTask;
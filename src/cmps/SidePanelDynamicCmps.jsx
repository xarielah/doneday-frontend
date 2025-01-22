import { panelTypes } from "../services/sidePanel.service"
import SidePanelNotifications from "./board cmps/side-panel-contents/SidePanelNotifications"
import SidePanelTask from "./board cmps/side-panel-contents/task-details-panel/SidePanelTask"

const getComponent = (type) => {
    switch (type) {
        case panelTypes.notifications:
            return <SidePanelNotifications />
        case panelTypes.task:
            return <SidePanelTask />
        default:
            return null
    }
}

const SidePanelDynamicCmps = ({ cmpType }) => {
    return <div className="side-panel-dynamic-cmps">
        {getComponent(cmpType)}
    </div>
}

export default SidePanelDynamicCmps
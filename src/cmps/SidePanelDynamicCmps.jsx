import { panelTypes } from "../services/sidePanel.service"

const getComponent = (type) => {
    switch (type) {
        case panelTypes.notifications:
            return <div>notifications</div>
        case panelTypes.notifications:
            return <div>task</div>
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
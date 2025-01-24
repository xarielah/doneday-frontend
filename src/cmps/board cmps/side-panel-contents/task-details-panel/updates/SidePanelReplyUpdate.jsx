import SidePanelReplyInput from "./SidePanelReplyInput"
import SidePanelUpdateReplysList from "./SidePanelUpdateReplysList"

const SidePanelReplyUpdate = ({ onAddComment }) => {
    return <div className="side-panel-reply-update">
        <SidePanelUpdateReplysList />
        <SidePanelReplyInput />
    </div>
}

export default SidePanelReplyUpdate
import SidePanelNoUpdates from "./SidePanelNoUpdates";
import SidePanelUpdatePreview from "./SidePanelUpdatePreview";

const SidePanelUpdateList = ({ updates, onUpdateChange, onUpdateReply, onRemoveReply }) => {
    if (!updates) return <div>Loading comments...</div>
    return <section className="updates-list">
        {updates.length === 0 && <SidePanelNoUpdates />}
        {updates.length > 0 && updates.map(update =>
            <SidePanelUpdatePreview
                key={update._id}
                update={update}
                onUpdateChange={onUpdateChange}
                onUpdateReply={onUpdateReply}
                onRemoveReply={onRemoveReply}
            />
        )}
    </section>
}

export default SidePanelUpdateList
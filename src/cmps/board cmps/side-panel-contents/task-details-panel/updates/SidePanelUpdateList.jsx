import SidePanelNoUpdates from "./SidePanelNoUpdates";
import SidePanelUpdatePreview from "./SidePanelUpdatePreview";

const SidePanelUpdateList = ({ updates, onUpdateLike, onUpdateReply, onAddReply }) => {
    if (!updates) return <div>Loading comments...</div>
    return <section className="updates-list">
        {updates.length === 0 && <SidePanelNoUpdates />}
        {updates.length > 0 && updates.map(update =>
            <SidePanelUpdatePreview
                key={update._id}
                update={update}
                onUpdateLike={onUpdateLike}
                onUpdateReply={onUpdateReply}
                onAddReply={onAddReply}
            />
        )}
    </section>
}

export default SidePanelUpdateList
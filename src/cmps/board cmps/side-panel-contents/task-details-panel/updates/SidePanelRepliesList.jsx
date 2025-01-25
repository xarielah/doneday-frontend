import SidePanelReplyPreview from "./SidePanelReplyPreview"

const SidePanelRepliesList = ({ replies }) => {
    if (!replies || replies.length === 0) return null
    return <section className="update-replies-list">
        {replies.map(reply => <SidePanelReplyPreview key={reply._id} reply={reply} />)}
    </section>
}

export default SidePanelRepliesList
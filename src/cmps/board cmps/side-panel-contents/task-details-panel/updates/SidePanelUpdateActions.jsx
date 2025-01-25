import { Button } from "@vibe/core"
import { Reply, ThumbsUp } from "@vibe/icons"

const SidePanelUpdateActions = ({ update, onUpdateLike, onClickUpdateReply }) => {
    const handleUpdateLike = () => {
        onUpdateLike(update)
    }

    return <section className="update-preview-actions">
        <Button
            onClick={handleUpdateLike}
            kind="tertiary"
            size="small"
            type="button"
            leftIcon={ThumbsUp}>
            Like
        </Button>
        <Button
            onClick={onClickUpdateReply}
            kind="tertiary"
            size="small"
            type="button"
            leftIcon={Reply}
            style={{ marginLeft: '4px' }}>
            Reply
        </Button>
    </section>
}

export default SidePanelUpdateActions
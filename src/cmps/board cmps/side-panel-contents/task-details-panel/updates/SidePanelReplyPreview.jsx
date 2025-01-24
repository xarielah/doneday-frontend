import { Avatar, Text } from "@vibe/core"

const SidePanelReplyPreview = ({ reply, onDeleteReply }) => {
    return <article className="side-panel-reply-preview">
        <Avatar size="medium" className="side-panel-reply-user-avatar" text={reply.by.name[0]} />
        <article className="reply-content">
            <Text element="div" weight="bold" className="side-panel-reply-user-name" type="text2">{reply.by.name}</Text>
            <Text element="p" className="side-panel-reply-text" type="text2">{reply.text}</Text>
        </article>
    </article>
}

export default SidePanelReplyPreview
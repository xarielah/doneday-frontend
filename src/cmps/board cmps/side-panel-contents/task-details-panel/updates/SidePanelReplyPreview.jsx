import { Avatar, Text } from "@vibe/core"

const SidePanelReplyPreview = ({ reply, onDeleteReply }) => {
    return <article className="side-panel-reply-preview">
        {reply.by.avatar && <Avatar className="side-panel-reply-avatar" type="img" size="medium" src={reply.by.avatar} />}
        {!reply.by.avatar && <Avatar className="side-panel-reply-avatar" type="text" size="medium" text={reply.by.name[0]} />}
        <article className="reply-content">
            <Text element="div" weight="bold" className="side-panel-reply-user-name" type="text2">{reply.by.name}</Text>
            <Text element="p" className="side-panel-reply-text" type="text2">{reply.text}</Text>
        </article>
    </article>
}

export default SidePanelReplyPreview
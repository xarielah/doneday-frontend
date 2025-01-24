import { Avatar, IconButton, Text } from "@vibe/core"
import { Menu } from "@vibe/icons"
import { useRef } from "react"
import SidePanelReplyInput from "./SidePanelReplyInput"
import SidePanelUpdateActions from "./SidePanelUpdateActions"

const SidePanelUpdatePreview = ({ update, onUpdateLike, onAddReply }) => {
    const textAreaRef = useRef();

    const onClickUpdateReply = () => {
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }

    const handleUpdateLike = () => {
        onUpdateLike(update)
    }

    const handleUpdateReply = (reply) => {
        onAddReply(reply)
    }

    return <article className="update-preview">
        <header className="update-preview-header">
            <div className="update-preview-user">
                <Avatar className="update-preview-avatar" size="medium" text={update.by.name[0]} />
                <Text className="update-preview-user-name" type="text2" element="p">{update.by.name}</Text>
                <IconButton className="update-preview-update-menu" icon={Menu} size="xs" />
            </div>
            <section className="update-preview-contents">
                <Text type="text2" element="p">{update.text}</Text>
            </section>
        </header>
        <SidePanelUpdateActions onUpdateLike={handleUpdateLike} onClickUpdateReply={onClickUpdateReply} />
        <SidePanelReplyInput ref={textAreaRef} onAddReply={handleUpdateReply} />
    </article>
}

export default SidePanelUpdatePreview
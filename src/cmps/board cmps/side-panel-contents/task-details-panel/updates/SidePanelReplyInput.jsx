import { Avatar, Button, TextArea } from "@vibe/core";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../../../../services/util.service";
import { boardService } from "../../../../../services/board/board.service.local";

export default forwardRef(function SidePanelReplyInput({ onAddReply }, ref) {
    const [inputFocus, setInputFocus] = useState(false)
    const [reply, setReply] = useState('');
    const textAreaRef = ref;

    useEffect(() => {
        if (textAreaRef.current) {
            if (reply) {
                textAreaRef.current.style.height = 'auto';
                textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
            } else {
                textAreaRef.current.style.height = 'auto';
            }
        }
    }, [reply])

    const handleAddReply = () => {
        const newReply = boardService.getEmptyReply();
        newReply.text = reply;
        onAddReply(newReply)
        setReply('')
    }

    const showFocusedStyles = (reply || inputFocus)

    return (<section className="side-panel-reply-input">
        <Avatar size="medium" text="U" className="side-panel-reply-avatar" />
        <section className={cn('side-panel-input-group', showFocusedStyles && 'focused')}>
            <TextArea
                ref={textAreaRef}
                row={1}
                resize={false}
                value={reply}
                style={showFocusedStyles ? { border: 'none' } : {}}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                onChange={ev => setReply(ev.target.value)}
                placeholder="Write a reply and collaborate with your teammates"
            />
            {showFocusedStyles && <Button size="small" className={cn(showFocusedStyles && 'focused-margins')} onClick={handleAddReply}>Reply</Button>}
        </section>
    </section>)
});
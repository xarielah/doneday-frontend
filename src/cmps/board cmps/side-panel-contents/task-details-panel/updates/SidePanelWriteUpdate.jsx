import { Button, TextArea } from "@vibe/core"
import { useEffect, useRef, useState } from "react"

const SidePanelWriteUpdate = ({ onAddUpdate }) => {
    const [text, setText] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const textAreaRef = useRef();

    const handleAddUpdate = () => {
        onAddUpdate(text)
        setText('')
    }

    useEffect(() => {
        if (textAreaRef.current) {
            if (text) {
                textAreaRef.current.style.height = 'auto';
                textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
            } else {
                textAreaRef.current.style.height = 'auto';
            }
        }
    }, [text])

    return <div className="side-panel-write-update">
        <TextArea
            ref={textAreaRef}
            value={text}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={1}
            maxLength={1000}
            size="large"
            onChange={e => setText(e.target.value)}
            placeholder="Write a new update for your team!"
            resize={false}
            style={{ maxHeight: '400px' }}
        />
        <div className="write-update-actions-container">
            {(text || isFocused) && <Button size="small" disabled={!text.trim()} onClick={handleAddUpdate}>Update</Button>}
        </div>
    </div>
}

export default SidePanelWriteUpdate
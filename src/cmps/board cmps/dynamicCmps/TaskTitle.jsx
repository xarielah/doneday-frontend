import { EditableText } from "@vibe/core";

export function TaskTitle({ info, onTaskUpdate }) {
    return (<div><EditableText
        type={EditableText.types.TEXT2}
        weight={EditableText.weights.NORMAL}
        value={info}
    /></div>)
}
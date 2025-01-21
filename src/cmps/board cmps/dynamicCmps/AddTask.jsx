/* eslint-disable react/prop-types */
import { EditableText } from "@vibe/core";

export function AddTask({ info = {}, onTaskUpdate }) {
    return (<div><EditableText
        readOnly={true}
        type={EditableText.types.TEXT2}
        weight={EditableText.weights.NORMAL}
        // value={info}
        isEditMode={info?.isEdit}
        placeholder="Add Task"
        onClick={info?.onAddTask}
    /></div>)
}
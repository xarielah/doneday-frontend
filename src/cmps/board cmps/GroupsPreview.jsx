import { EditableText, } from "@vibe/core";
import { Date } from "./dynamicCmps/Date";
import { Member } from "./dynamicCmps/Member";
import { Priority } from "./dynamicCmps/Priority";
import { Side } from "./dynamicCmps/Side";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";

/* eslint-disable react/prop-types */
export function GroupPreview({ labels, group, cmpOrder }) {

    function onTaskUpdate(taskInfo) {
        console.log("Task Updated:", taskInfo);
    }


    return (
        <section className="group-list" style={{ borderLeft: `6px solid ${group.color}` }}>
            <section className="group-label">
                {cmpOrder.map((cmp, index) => (
                    <section className={`label-${cmp}`} key={`label-${index}`}>
                        {index === 0 && <>
                            {/* <div className="group-color-bar" style={{ backgroundColor: `${group.color}` }}></div> */}
                            <input type="checkbox" /></>}
                        {index > 0 && <EditableText
                            readOnly={index < 2}
                            type={EditableText.types.TEXT2}
                            weight={EditableText.weights.NORMAL}
                            value={labels[index]}
                        /> || ""}</section>
                ))}

            </section>

            {
                group.tasks.map((task) => (
                    <section className="task-row" key={`task-${task.id}`}>
                        {cmpOrder.map((cmp, idx) => (
                            <section
                                className={`grid-item ${cmp}`}
                                key={`task-${task.id}-cmp-${idx}`}
                            >
                                <DynamicCmp
                                    cmpType={cmp}
                                    info={cmp === "side" ? group.color : task[cmp]}
                                    onTaskUpdate={onTaskUpdate}
                                />
                            </section>
                        ))}
                    </section>
                ))
            }

        </section >
    )
}


const DynamicCmp = ({ cmpType, info, onTaskUpdate }) => {

    switch (cmpType) {
        case "side":
            return <Side info={info} onTaskUpdate={onTaskUpdate} />;
        case "priority":
            return <Priority info={info} onTaskUpdate={onTaskUpdate} />;
        case "taskTitle":
            return <TaskTitle info={info} onTaskUpdate={onTaskUpdate} />;
        case "status":
            return <Status info={info} onTaskUpdate={onTaskUpdate} />;
        case "members":
            return <Member info={info} onTaskUpdate={onTaskUpdate} />;
        case "date":
            return <Date info={info} onTaskUpdate={onTaskUpdate} />;
        default:
            console.error(`Unknown component type: ${cmpType}`);
            return <div>Unknown component: {cmpType}</div>;
    }
};
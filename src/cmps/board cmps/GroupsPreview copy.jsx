/* eslint-disable react/jsx-key */
import { EditableText, } from "@vibe/core";
import { Date } from "./dynamicCmps/Date";
import { Member } from "./dynamicCmps/Member";
import { Priority } from "./dynamicCmps/Priority";
import { Side } from "./dynamicCmps/Side";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import React from "react";
import { addTask, removeTask } from "../../store/actions/board.actions";
import { boardService } from "../../services/board/board.service.local";

/* eslint-disable react/prop-types */
export function GroupPreview({ group = [], cmpOrder = [] }) {



    function onTaskUpdate(taskInfo) {
        console.log("Task Updated:", taskInfo);
    }

    function onTaskRemove(groupId, taskId) {
        return removeTask(groupId, taskId)
    }

    function onAddTask(groupId) {
        const newTask = boardService.getEmptyTask()
        return addTask(groupId, newTask)
    }

    return (


        // <section className="group-list">
        //     <button onClick={() => onAddTask(group._id)}>+++</button>
        //     {/* <!-- Group 1 --> */}
        //     <section className="group-side" style={{ borderRadius: "8px 0 0 0", borderLeft: `6px solid ${group.color}` }}>
        //         <section className="label-side">
        //             <section className="label-select">
        //                 {/* <!-- Placeholder for Side component --> */}
        //             </section>
        //             <section className="label-side task-title">
        //                 <div>Task</div>
        //             </section>
        //         </section>

        //         {/* <!-- Task 1 --> */}
        //         <section className="task-side" key="task-task101-Title-0">
        //             <section className="label-select">
        //                 {/* <!-- Placeholder for Side component --> */}
        //             </section>
        //             <section className="title-side task-title">
        //                 <button onClick={() => onTaskRemove(group._id, task._id)}>X</button>
        //                 <div>Design homepage UI</div>
        //             </section>
        //         </section>

        //         {/* <!-- Task 2 --> */}
        //         <section className="task-side" key="task-task102-Title-1">
        //             <section className="label-select">
        //                 {/* <!-- Placeholder for Side component --> */}
        //             </section>
        //             <section className="title-side task-title">
        //                 <button onClick={() => onTaskRemove(group._id, task._id)}>X</button>
        //                 <div>Integrate payment gateway</div>
        //             </section>
        //         </section>

        //         {/* <!-- Task 3 --> */}
        //         <section className="task-side" key="task-task103-Title-2">
        //             <section className="label-select">
        //                 {/* <!-- Placeholder for Side component --> */}
        //             </section>
        //             <section className="title-side task-title">
        //                 <button onClick={() => onTaskRemove(group._id, task._id)}>X</button>
        //                 <div>Write test cases for API</div>
        //             </section>
        //         </section>

        //         {/* <!-- Task 4 --> */}
        //         <section className="task-side" key="task-task104-Title-3">
        //             <section className="label-select">
        //                 {/* <!-- Placeholder for Side component --> */}
        //             </section>
        //             <section className="title-side task-title">
        //                 <button onClick={() => onTaskRemove(group._id, task._id)}>X</button>
        //                 <div>Create onboarding illustrations</div>
        //             </section>
        //         </section>
        //     </section>

        //     <section className="group-info">
        //         {/* <!-- Info Rows --> */}
        //         <section className="info-type">
        //             <section className="label-info">
        //                 <div>STATUS</div>
        //             </section>
        //             <section className="task-info">
        //                 <div>IN WORK</div>
        //             </section>
        //             <section className="task-info">
        //                 <div>STUCK</div>
        //             </section>
        //             <section className="task-info">
        //                 <div>DONE</div>
        //             </section>
        //             <section className="task-info">
        //                 <div>IN WORK</div>
        //             </section>
        //         </section>

        //         <section className="info-type">
        //             <section className="label-info">
        //                 <div>PRIORITY</div>
        //             </section>
        //             <section className="task-info">
        //                 <div>HIGH</div>
        //             </section>
        //             <section className="task-info">
        //                 <div>CRITICAL</div>
        //             </section>
        //             <section className="task-info">
        //                 <div>MEDIUM</div>
        //             </section>
        //             <section className="task-info">
        //                 <div>LOW</div>
        //             </section>
        //         </section>
        //     </section>
        // </section>








        <section className="group-list">

            {/* Labels */}

            <section className="label-row">
                <section className="label-select" >
                    <Side onTaskUpdate={onTaskUpdate} />
                </section>
                <section className="label label-task">
                    <EditableText
                        readOnly={true}
                        type="text2"
                        weight="normal"
                        value={"Task"}
                    />
                </section>
                {cmpOrder.length > 0 && cmpOrder?.map((cmpType, idx) => (
                    <section className={`label label-${cmpType}`} key={cmpType + idx} >
                        <EditableText
                            key={cmpType + idx}
                            readOnly={true}
                            type="text2"
                            weight="normal"
                            value={cmpType.toUpperCase()}
                        />
                    </section>
                ))}
            </section>

            {/* Task Rows */}



            {/* Add Task */}



            {/* Label Status */}

            <section></section>


            <button onClick={() => onAddTask(group._id)}>+++</button>

            {/* SideBar Rows (checkbox, task title) sticky */}
            <section className="group-side" style={{ borderRadius: "8px 0 0 0", borderLeft: `6px solid ${group.color}` }}>

                {/*Label side*/}
                <section className="label-side">

                    {/* CRUDL MenuButton WIP */}
                    {/* <section className="crudl-side"></section> */}


                    {/* Checkbox */}
                    <section className="label-select" >
                        <Side onTaskUpdate={onTaskUpdate} />
                    </section>


                    {/* "Task" label */}
                    <section className="label-side task-title">
                        <EditableText
                            readOnly={true}
                            type="text2"
                            weight="normal"
                            value={"Task"}
                        />
                    </section>
                </section>


                {/* Task title side*/}
                <section className="task-title-flex">
                    {
                        // task MAP
                        group.tasks.length > 0 && group?.tasks?.map((task, idx) => (


                            // title row container

                            <section className="task-side" key={`task-${task._id}-Title-${idx}`}>

                                {/* CRUDL MenuButton */}
                                {/* <section className="crudl-side"></section> */}

                                {/* Checkbox */}
                                <section className="label-select" >
                                    <Side onTaskUpdate={onTaskUpdate} />

                                </section>

                                {/* Task Title */}
                                <section className="title-side task-title">
                                    <button onClick={() => onTaskRemove(group._id, task._id)}>X</button>
                                    <DynamicCmp
                                        cmpType={"taskTitle"}
                                        info={task?.taskTitle}
                                        onTaskUpdate={onTaskUpdate}
                                    />
                                </section>
                            </section>
                        ))
                    }
                </section>
            </section>





            {/* Info Rows */}
            <section className="group-info">
                {
                    // Cmp Order map
                    cmpOrder.length > 0 && cmpOrder?.map((cmpType, idx) => (
                        <section className="info-type" key={`group-${group._id}-cmpType-${cmpType}`}>
                            {/* Label */}
                            <section className="label-info">
                                <EditableText
                                    type={EditableText.types.TEXT2}
                                    weight={EditableText.weights.NORMAL}
                                    value={cmpType.toUpperCase()}
                                />
                            </section>

                            {/* Tasks map */}
                            {group?.tasks?.map((task) => (
                                <section className="task-info" key={`group-${group._id}-task-${task._id}-${cmpType}`}>
                                    <DynamicCmp
                                        cmpType={cmpType}
                                        info={task[cmpType]}
                                        onTaskUpdate={onTaskUpdate}
                                    />
                                </section>
                            ))}


                        </section>
                    )

                    )
                }
            </section >

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
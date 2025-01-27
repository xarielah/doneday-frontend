/* eslint-disable react/jsx-key */
import { EditableText } from "@vibe/core";
import React from "react";
import { boardService } from "../../services/board/board.service.local";
import { addSelectedGroup, addSelectedTask, addTask, removeSelectedGroup, removeSelectedTask, removeTask } from "../../store/actions/board.actions";
import { AddTask } from "./dynamicCmps/AddTask";
import { Date } from "./dynamicCmps/Date";
import { Member } from "./dynamicCmps/Member";
import { Priority } from "./dynamicCmps/Priority";
import { Side } from "./dynamicCmps/Side";
import { SideGroup } from "./dynamicCmps/SideGroup";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { Timeline } from "./dynamicCmps/Timeline";
import { taskService } from "../../services/board/task.service.local";

/* eslint-disable react/prop-types */
export function GroupPreview({ group = [], cmpOrder = [], selectedTasks = [] }) {
    function onTaskUpdate(taskInfo) {
        console.log("Task Updated:", taskInfo);
    }

    function onTaskRemove(groupId, taskId) {
        return removeTask(groupId, taskId)
    }

    function onAddTask(groupId, taskTitle) {
        const newTask = taskService.getEmptyTask()
        newTask.taskTitle = taskTitle
        return addTask(groupId, newTask)
    }

    function isTaskSelected(groupId = "", taskId = "") {
        const group = selectedTasks.find(selectedGroups => selectedGroups.groupId === groupId)
        if (!group) return false
        return group.tasks.includes(taskId)
    }

    function isGroupSelected(groupId, tasks) {
        const found = selectedTasks?.find(selectedGroup => selectedGroup.groupId === groupId) || false
        if (!found) return false

        if (!Array.isArray(tasks) || tasks.length === 0) return false

        return tasks.every(task => found.tasks.includes(task._id))
    }

    async function handleChangeSelect(ev, groupId, taskId) {
        if (ev.target.checked) {
            await addSelectedTask(groupId, taskId)
        } else {
            await removeSelectedTask(groupId, taskId)
        }
    }

    async function handleChangeSelectGroup(ev, groupId, tasks) {
        if (ev.target.checked) {
            await addSelectedGroup(groupId, tasks)
        } else {
            await removeSelectedGroup(groupId, tasks)
        }
    }


    return (
        <section className="group-list">



            <section className="side-bar" style={{ borderLeft: `6px solid ${group.color}` }}>
                <section className="label-side">
                    {/* <section className="crudl-menu"></section> */}
                    <section className="group-select">
                        <SideGroup info={{ handleChangeSelectGroup, isGroupSelected, groupId: group._id, tasks: group.tasks }} onTaskUpdate={onTaskUpdate} />
                    </section>
                    <section className="label label-task">
                        <EditableText
                            readOnly={true}
                            type="text2"
                            weight="normal"
                            value={"Task"}
                        />
                    </section>
                </section>


                {
                    group.tasks.length > 0 && group?.tasks?.map((task, idx) => (
                        <section className="task-side" key={task._id + idx + "task"}>
                            {/* <section className="crudl-menu"></section> */}

                            <section className="group-select">
                                <Side info={{ handleChangeSelect, isTaskSelected, groupId: group._id, taskId: task._id }} onTaskUpdate={onTaskUpdate} />
                            </section>
                            <section className="task-title task-item">
                                <DynamicCmp
                                    cmpType={"taskTitle"}
                                    info={task?.taskTitle}
                                    onTaskUpdate={onTaskUpdate}
                                />
                            </section>
                        </section>
                    ))

                }
                <section className="task-side add-task">
                    <section className="group-select">
                        {/* <Side info={{ handleChangeSelect, isTaskSelected }} onTaskUpdate={onTaskUpdate} /> */}
                    </section>
                    <section className="task-title task-item">
                        <DynamicCmp
                            // readOnly={true}
                            onClick={() => onAddTask()}
                            cmpType={"add"}
                            info={{ isEdit: false, onAddTask: () => onAddTask(group._id) }}
                            onTaskUpdate={onTaskUpdate}
                        />
                    </section>
                </section>
            </section>








            {/* Labels */}

            <section className="label-row">
                <section className="group-select">
                    <Side info={{ handleChangeSelect, isTaskSelected, groupId: group._id, taskId: "0" }} onTaskUpdate={onTaskUpdate} />
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
                            readOnly={false}
                            type="text2"
                            weight="normal"
                            value={cmpType[0].toUpperCase() + cmpType.slice(1)}
                        />
                    </section>
                ))}
                <section className="label label-filler"></section>
            </section>

            {/* Task Rows */}

            {
                group.tasks.length > 0 && group?.tasks?.map((task, idx) => (
                    <section className="task-row" key={task._id + idx + "task"}>
                        <section className="task-select" >
                            <Side onTaskUpdate={onTaskUpdate} />
                        </section>
                        <section className="task-title task-item">

                            <DynamicCmp
                                cmpType={"taskTitle"}
                                info={task?.taskTitle}
                                onTaskUpdate={onTaskUpdate}
                            />
                        </section>
                        {cmpOrder.length > 0 && cmpOrder?.map((cmpType, idx) => (
                            <section className={`task-${cmpType} task-item`} key={task._id + cmpType + idx}>
                                
                                <DynamicCmp
                                    cmpType={cmpType}
                                    info={task[cmpType]}
                                    allMembers={cmpType === 'members' ? task['allMembers'] : ''}
                                    onTaskUpdate={onTaskUpdate}
                                />
                            </section>
                        ))}
                        <section className="task task-filler"></section>

                    </section>
                ))
            }

            {/* Add Task */}
            <section className="task-row">
                <section className="task-title add-task">
                    <section className="group-select">
                        <Side info={{ handleChangeSelect, isTaskSelected, groupId: group._id, taskId: "0" }} onTaskUpdate={onTaskUpdate} />
                    </section>
                    <section className="task-title task-item">
                        {/* <DynamicCmp
                            readOnly={true}
                            onClick={() => onAddTask()}
                            cmpType={"taskTitle"}
                            info={"add task"}
                            onTaskUpdate={onTaskUpdate}
                        /> */}
                    </section>
                </section>
            </section>
            <button onClick={() => onAddTask(group._id)}> add task
            </button>


            {/* Label Status */}

            <section></section>


        </section >
    )
}


const DynamicCmp = ({ cmpType, info, allMembers, onTaskUpdate }) => {

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
            return <Member info={info} allMembers={allMembers} onTaskUpdate={onTaskUpdate} />;
        case "timeline":
            return <Timeline info={info} onTaskUpdate={onTaskUpdate} />;
        case "date":
            return <Date info={info} onTaskUpdate={onTaskUpdate} />;
        case "add":
            return <AddTask info={info} onTaskUpdate={onTaskUpdate} />;
        default:
            console.error(`Unknown component type: ${cmpType}`);
            return <div>Unknown component: {cmpType}</div>;
    }
};
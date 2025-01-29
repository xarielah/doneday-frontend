import { Button, Dialog, DialogContentContainer, IconButton, Menu, MenuDivider, MenuItem } from "@vibe/core";
import { Board, Checkbox, Delete, Duplicate, Group, Menu as MenuDots, MoveArrowRight, Open } from "@vibe/icons"
import { useSelector } from "react-redux";
import { addGroup, addTask, removeGroup, removeTask, updateGroup, updateTask } from "../../../store/actions/board.actions";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getRandomColor } from "../../../services/util.service";
import { addSelectedGroup } from "../../../store/actions/taskSelect.actions";

export function TaskMenuButton({ task, group, crudlType }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()

    const modifiers = [
        {
            name: "preventOverflow",
            options: {
                mainAxis: false,
            },
        },
    ];

    // Task CRUDL
    function moveTaskToGroup(groupId) {
        const updatedTask = { ...task, groupId }
        return updateTask(task.groupId, updatedTask)
    }

    function onTaskDuplicate(task) {
        const cloneTask = { ...task, taskTitle: task?.taskTitle + " (copy)", id: undefined }
        addTask(task.groupId, cloneTask)
    }

    function onTaskRemove(taskId) {
        try {
            removeTask(task.groupId, taskId)
        } catch (error) {
            console.error("Error removing task or tasks:", error);
        }
    }

    // Group CRUDL
    function onGroupRemove(groupId) {
        try {
            removeGroup(groupId)
        } catch (error) {
            console.error("Error removing group or tasks:", error);
        }
    }

    async function onGroupDuplicate(group) {
        console.log(group)
        const cloneGroup = {
            ...group,
            name: "Duplicate of " + group.name,
            tasks: undefined,
            id: undefined,
        }
        try {
            const newGroup = await addGroup(cloneGroup)
            if (group.tasks) {
                for (const task of group.tasks) {
                    const cloneTask = {
                        ...task,
                        taskTitle: task?.taskTitle,
                        id: undefined,
                        groupId: newGroup._id,
                    }
                    await addTask(newGroup._id, cloneTask)
                }
            }
        } catch (error) {
            console.error("Error duplicating group or tasks:", error);
        }
    }

    function selectAllTasks(group) {
        try {
            addSelectedGroup(group._id, group.tasks)
        } catch (error) {
            console.error("Error selecting all tasks:", err);
        }
    }

    function moveGroupToBoard(boardId) {
        try {
            const updatedGroup = { ...group, boardId }
            updateGroup(updatedGroup)
        } catch (error) {
            console.error("Error moving group to board:", error);
        }

    }


    return (
        <Dialog
            zIndex={10000}
            position="bottom-start"
            showTrigger={["click"]}
            hideTrigger={["clickoutside", "click", "blur"]}
            content={
                (crudlType === "task" && <DialogContentContainer>
                    <Menu id="menu" size="medium">
                        <MenuItem
                            icon={Open}
                            onClick={() => navigate(`/board/${board._id}/task/${task._id}`)}
                            title="Open item"
                        />
                        <MenuDivider />
                        <MenuItem
                            icon={Duplicate}
                            onClick={() => onTaskDuplicate(task)}
                            title="Duplicate task"
                        />
                        <MenuItem icon={MoveArrowRight} title="Move to group">
                            <Menu>
                                {board.groups.map(group => (
                                    <MenuItem
                                        key={group._id}
                                        icon={Group}
                                        title={group.name}
                                        onClick={() => moveTaskToGroup(group._id)}
                                    />
                                ))}
                            </Menu>
                        </MenuItem>
                        <MenuItem
                            icon={Delete}
                            onClick={() => onTaskRemove(task._id)}
                            title="Delete task"
                        />
                    </Menu>
                </DialogContentContainer>)
                || (crudlType === "group" && <DialogContentContainer>
                    <Menu id="menu" size="medium">
                        <MenuItem
                            icon={Duplicate}
                            onClick={() => onGroupDuplicate(group)}
                            title="Duplicate group"
                        />
                        <MenuItem
                            icon={Checkbox}
                            onClick={() => selectAllTasks(group)}
                            title="Select group"
                        />
                        <MenuItem icon={MoveArrowRight} title="Move to board">
                            <Menu>
                                {boards.map(newBoard => (
                                    <MenuItem
                                        key={newBoard._id}
                                        icon={Board}
                                        title={newBoard.name}
                                        onClick={() => moveGroupToBoard(newBoard._id)}
                                    />
                                ))}
                            </Menu>
                        </MenuItem>
                        <MenuItem
                            icon={Delete}
                            onClick={() => onGroupRemove(group._id)}
                            title="Delete group"
                        />
                    </Menu>
                </DialogContentContainer>)
            }
        >
            <IconButton
                key="xs"
                icon={MenuDots}
                kind="secondary"
                size="xs"
                ariaLabel={crudlType === "task" ? "Task menu" : "Group menu"}
            />
        </Dialog >
    )
}
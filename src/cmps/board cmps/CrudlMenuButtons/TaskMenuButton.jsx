import { Button, Dialog, DialogContentContainer, IconButton, Menu, MenuDivider, MenuItem } from "@vibe/core";
import { Board, Checkbox, Delete, Duplicate, Group, Menu as MenuDots, MoveArrowRight, Open } from "@vibe/icons"
import { useSelector } from "react-redux";
import { addGroup, addTask, getBoardById, loadBoards, removeGroup, removeTask, updateBoard, updateGroup, updateTask } from "../../../store/actions/board.actions";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getRandomColor } from "../../../services/util.service";
import { addSelectedGroup } from "../../../store/actions/taskSelect.actions";

export function TaskMenuButton({ task, group, crudlType }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()

    // Task CRUDL
    async function moveTaskToGroup(groupId, task) {
        try {
            const updatedTask = { ...task, groupId };
            await removeTask(task.groupId, task._id);
            await addTask(groupId, updatedTask);
        } catch (error) {
            console.error("Error moving task to group:", error);
        }
    }

    async function onTaskDuplicate(task) {
        try {
            console.log(task);

            const cloneTask = { ...task, taskTitle: `${task.taskTitle} (copy)`, _id: undefined };
            await addTask(task.groupId, cloneTask);
        } catch (error) {
            console.error("Error duplicating task:", error);
        }
    }

    async function onTaskRemove(taskId) {
        try {
            await removeTask(task.groupId, taskId);
        } catch (error) {
            console.error("Error removing task:", error);
        }
    }

    // Group CRUDL
    async function onGroupRemove(groupId) {
        try {
            await removeGroup(groupId);
        } catch (error) {
            console.error("Error removing group:", error);
        }
    }

    async function onGroupDuplicate(group) {
        try {
            const cloneGroup = {
                ...group,
                name: `Duplicate of ${group.name}`,
                tasks: undefined,
                _id: undefined,
            };
            const newGroup = await addGroup(board._id, cloneGroup);
            const newTasks = []
            if (group.tasks) {
                for (const task of group.tasks) {
                    const cloneTask = {
                        ...task,
                        taskTitle: task.taskTitle,
                        _id: undefined,
                        groupId: newGroup._id,
                    };
                    newTasks.push(cloneTask);
                }
                await updateGroup({ ...newGroup, tasks: newTasks });
            }
        } catch (error) {
            console.error("Error duplicating group:", error);
        }
    }

    async function selectAllTasks(group) {
        try {
            await addSelectedGroup(group._id, group.tasks);
        } catch (error) {
            console.error("Error selecting all tasks:", error);
        }
    }

    async function moveGroupToBoard(targetBoardId) {
        try {
            await removeGroup(group._id)
                .then(() => {
                    addGroup(targetBoardId, { ...group });
                })
        } catch (error) {
            console.error("Error moving group to board:", error);
            throw error;
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
                                        onClick={() => moveTaskToGroup(group._id, task)}
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
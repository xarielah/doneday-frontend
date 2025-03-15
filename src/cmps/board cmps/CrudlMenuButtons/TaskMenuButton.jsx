import { Dialog, DialogContentContainer, IconButton, Menu, MenuDivider, MenuItem } from "@vibe/core"
import { Board, Checkbox, Delete, Duplicate, Group, Menu as MenuDots, MoveArrowRight, Open } from "@vibe/icons"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { makeId } from "../../../services/util.service"
import { updateBoard, updateBoardOnBackground } from "../../../store/actions/board.actions"
import { addSelectedGroup } from "../../../store/actions/taskSelect.actions"

export function TaskMenuButton({ task, group, crudlType }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()

    // Task CRUDL
    async function moveTaskToGroup(groupId, task) {
        try {
            const newBoard = { ...board }
            const groupIdx = newBoard.groups.findIndex(group => group._id === task.groupId)

            if (groupIdx === -1) throw new Error(`Group with ID ${task.groupId} not found`)
            newBoard.groups[groupIdx].tasks = newBoard.groups[groupIdx].tasks.filter(prevTask => prevTask._id !== task._id)

            const newGroupIdx = newBoard.groups.findIndex(group => group._id === groupId)
            if (newGroupIdx === -1) throw new Error(`Group with ID ${groupId} not found`)
            if (!newBoard.groups[newGroupIdx].tasks) {
                newBoard.groups[newGroupIdx].tasks = []
            }
            const newTask = { ...task, groupId }
            newBoard.groups[newGroupIdx].tasks.push(newTask)

            return await updateBoard(newBoard)
        } catch (error) {
            console.error("Error moving task to group:", error)
        }
    }

    async function onTaskDuplicate(task) {
        try {
            const cloneTask = {
                ...task,
                taskTitle: `${task.taskTitle} (copy)`,
                _id: 't' + makeId()
            }
            const newBoard = { ...board }
            const groupIdx = newBoard.groups.findIndex(group => group._id === task.groupId)
            if (groupIdx === -1) throw new Error(`Group with ID ${task.groupId} not found`)

            const taskIndex = newBoard.groups[groupIdx].tasks.findIndex(t => t._id === task._id)
            if (taskIndex === -1) throw new Error(`Task with ID ${task._id} not found`)

            newBoard.groups[groupIdx].tasks.splice(taskIndex + 1, 0, cloneTask)

            return await updateBoard(newBoard)
        } catch (error) {
            console.error("Error duplicating task:", error)
        }
    }


    async function onTaskRemove(taskId) {
        try {
            const newBoard = { ...board }
            for (const group of newBoard.groups) {
                group.tasks = group.tasks.filter(task => task._id !== taskId)
            }
            return await updateBoard(newBoard)
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    // Group CRUDL
    async function onGroupRemove(groupId) {
        try {
            const newBoard = { ...board }
            newBoard.groups = newBoard.groups.filter(group => group._id !== groupId)
            return await updateBoard(newBoard)
        } catch (error) {
            console.error("Error removing group:", error)
        }
    }

    async function onGroupDuplicate(group) {
        try {
            const newBoard = { ...board }

            const cloneGroup = {
                ...group,
                name: `Duplicate of ${group.name}`,
                _id: 'g' + makeId(),
                tasks: []
            }

            if (group.tasks) {
                const newTasks = group.tasks.map(task => ({
                    ...task,
                    _id: 't' + makeId(),
                    groupId: cloneGroup._id,
                }))
                cloneGroup.tasks = newTasks
            }

            const groupIndex = newBoard.groups.findIndex(g => g._id === group._id)
            if (groupIndex === -1) throw new Error("Original group not found")

            newBoard.groups.splice(groupIndex + 1, 0, cloneGroup)

            return await updateBoard(newBoard)
        } catch (error) {
            console.error("Error duplicating group:", error)
        }
    }


    async function selectAllTasks(group) {
        try {
            await addSelectedGroup(group._id, group.tasks)
        } catch (error) {
            console.error("Error selecting all tasks:", error)
        }
    }

    async function moveGroupToBoard(targetBoardId) {
        try {
            const boardId = board._id
            const groupId = group._id
            const sourceBoardIndex = boards.findIndex(board =>
                board._id === boardId
            )
            if (sourceBoardIndex === -1) {
                throw new Error(`Group with ID ${groupId} not found in any board`)
            }

            const sourceBoard = { ...boards[sourceBoardIndex] }
            const groupIndex = sourceBoard.groups.findIndex(group => group._id === groupId)
            if (groupIndex === -1) {
                throw new Error(`Group with ID ${groupId} not found in source board`)
            }
            const groupToMove = sourceBoard.groups[groupIndex]

            sourceBoard.groups = sourceBoard.groups.filter(group => group._id !== groupId)

            const targetBoardIndex = boards.findIndex(board => board._id === targetBoardId)
            if (targetBoardIndex === -1) {
                throw new Error(`Target board with ID ${targetBoardId} not found`)
            }
            const targetBoard = { ...boards[targetBoardIndex] }
            if (!Array.isArray(targetBoard.groups)) {
                targetBoard.groups = []
            }

            targetBoard.groups.push(groupToMove)

            await updateBoardOnBackground(targetBoard)
            return await updateBoard(sourceBoard)

        } catch (error) {
            console.error("Error moving group to board:", error)
            throw error
        }
    }


    return (
        <Dialog
            zIndex={10000}
            position="bottom-start"
            showTrigger={["click"]}
            hideTrigger={["click", "clickoutside", "blur"]}
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
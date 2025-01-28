import { Button, Dialog, DialogContentContainer, IconButton, Menu, MenuDivider, MenuItem } from "@vibe/core";
import { Delete, Duplicate, Group, Menu as MenuDots, MoveArrowRight, Open } from "@vibe/icons"
import { useSelector } from "react-redux";
import { removeTask, updateTask } from "../../../store/actions/board.actions";
import { useState } from "react";

export function TaskMenuButton( {task}){
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isOpen, setIsOpen] = useState(false)
    

    function moveTaskToGroup(groupId){
        const updatedTask = {...task, groupId}
        return updateTask(task.groupId, updatedTask)
        .then(()=>{
            setIsOpen(false)
        })
    }

    function onTaskRemove(taskId){
        removeTask(task.groupId,taskId)
        setIsOpen(false)
    }

    return (
        <Dialog
        zIndex={10000}
        position="bottom-start"
        open={isOpen}
        content={
          <DialogContentContainer>
                <Menu id="menu" size="medium">
                    <MenuItem icon={Open} title="Open item" />
                    <MenuDivider />
                    <MenuItem icon={Duplicate} title="Duplicate" />
                    <MenuItem icon={MoveArrowRight} title="Move to">
                        <Menu>
                            {board.groups.map(group => (
                                <MenuItem key={group._id} icon={Group} title={group.name} onClick={()=> moveTaskToGroup(group._id)} />
                            ))}
                        </Menu>
                    </MenuItem>
                    <MenuItem icon={Delete} onClick={()=> onTaskRemove(task._id)} title="Delete" />
                </Menu>
          </DialogContentContainer>
        }
      >
          <IconButton
    key="xs"
    icon={MenuDots}
    kind="secondary"
    onClick={()=>setIsOpen(true)}
    size="xs"
    ariaLabel="Task Menu"
  />
      </Dialog>
    )
}
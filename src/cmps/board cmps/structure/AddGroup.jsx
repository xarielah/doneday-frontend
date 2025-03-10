import { Button } from "@vibe/core";
import { Add } from "@vibe/icons";
import { useSelector } from "react-redux";
import { boardService } from "../../../services/board/board.service.local";
import { addGroup } from "../../../store/actions/board.actions";
import GroupStickyColumns from "./GroupStickyColumns";


export function AddGroup() {
    const boardId = useSelector((storeState) => storeState.boardModule.board._id)

    async function onAddGroup() {
        try {

            let newGroup = boardService.getEmptyGroup()
            newGroup = { ...newGroup, boardId, name: "New Group" }
            await addGroup(boardId, newGroup)
        } catch (err) {
            console.error('group could not be added' + err);
        }
    }

    return (
        <GroupStickyColumns>
            <section className="add-group">
                <Button kind="secondary" onClick={() => onAddGroup()} size="small" leftIcon={Add}> Add new group</Button>
            </section>
        </GroupStickyColumns>
    )
}
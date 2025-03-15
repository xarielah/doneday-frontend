import { Button } from "@vibe/core";
import { Add } from "@vibe/icons";
import { useSelector } from "react-redux";
import { boardService } from "../../../services/board/board.service.local";
import { makeId } from "../../../services/util.service";
import { updateBoard } from "../../../store/actions/board.actions";
import GroupStickyColumns from "./GroupStickyColumns";


export function AddGroup() {
    const board = useSelector((storeState) => storeState.boardModule.board)

    async function onAddGroup() {
        try {
            let newGroup = boardService.getEmptyGroup()
            newGroup._id = 'g' + makeId();
            newGroup = { ...newGroup, boardId: board._id, name: "New Group" }

            const newBoard = { ...board }

            if (!newBoard.groups) {
                newBoard.groups = []
            }
            newBoard.groups.push(newGroup);

            await updateBoard(newBoard)
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
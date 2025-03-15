import { Button } from "@vibe/core";
import { Add } from "@vibe/icons";
import { useSelector } from "react-redux";
import { boardService } from "../../../services/board/board.service.local";
import { makeId } from "../../../services/util.service";
import { updateBoard } from "../../../store/actions/board.actions";


export function AddGroup() {
    const board = useSelector((storeState) => storeState.boardModule.board)

    async function onAddGroup() {
        try {
            let newGroup = boardService.getEmptyGroup()
            newGroup._id = 'g' + makeId();
            newGroup = { ...newGroup, name: "New Group" }

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
        <section className="add-new-group">
            <section className="add-group">
                <div style={{ width: '40px', height: '40px' }}></div>
                <Button kind="secondary" onClick={() => onAddGroup()} size="small" leftIcon={Add}> Add new group</Button>
            </section>
            <div className="spacer-div"></div>
        </section>
    )
}
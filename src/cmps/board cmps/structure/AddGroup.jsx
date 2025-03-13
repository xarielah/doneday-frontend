import { Button } from "@vibe/core";
import { Add } from "@vibe/icons";
import { useSelector } from "react-redux";
import { boardService } from "../../../services/board/board.service.local";
import { addGroup } from "../../../store/actions/board.actions";


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
        <section className="add-new-group">
            <section className="add-group">
                <div style={{ width: '40px', height: '40px' }}></div>
                <Button kind="secondary" onClick={() => onAddGroup()} size="small" leftIcon={Add}> Add new group</Button>
            </section>
            <div className="spacer-div"></div>
        </section>
    )
}
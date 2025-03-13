/* eslint-disable react/no-children-prop */
import { useSelector } from "react-redux";
import { addGroup, addTask } from "../../store/actions/board.actions";
import BoardHeaderContextualActions from "./BoardHeaderContextualActions";
import BoardHeadersTabList from "./BoardHeadersTabList";
import BoardHeaderTitleButtons from "./BoardHeaderTitleButtons";
import { boardService } from "../../services/board/board.service.local";

export function BoardHeader() {
    const board = useSelector((storeState) => storeState.boardModule.board)

    async function onAddGroup() {
        try {
            let newGroup = boardService.getEmptyGroup()
            newGroup = { ...newGroup, name: "New Group" }
            await addGroup(board._id, newGroup)
        } catch (err) {
            console.error('group could not be added' + err);
        }
    }

    async function onAddTask() {
        const groupId = board.groups[0]._id
        let newTask = boardService.getEmptyTask()
        newTask = { ...newTask, groupId, taskTitle: "New task", status: "draft", priority: "tbd" }
        return await addTask(groupId, newTask)
    }

    return (
        <section
            className="board-header"
        >
            <BoardHeaderTitleButtons />
            <BoardHeadersTabList />
            <BoardHeaderContextualActions onAddGroup={() => onAddGroup()} onAddTask={() => onAddTask()} />
        </section>
    );
}

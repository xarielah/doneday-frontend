/* eslint-disable react/no-children-prop */
import { useSelector } from "react-redux";
import { allMembers, boardService } from "../../services/board/board.service.local";
import { makeId } from "../../services/util.service";
import { updateBoard } from "../../store/actions/board.actions";
import BoardHeaderContextualActions from "./BoardHeaderContextualActions";
import BoardHeadersTabList from "./BoardHeadersTabList";
import BoardHeaderTitleButtons from "./BoardHeaderTitleButtons";

export function BoardHeader() {
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

    async function onAddTask() {
        try {
            const groupId = board.groups[0]._id

            let newTask = boardService.getEmptyTask()
            newTask.taskTitle = 'New task'
            newTask.allMembers = allMembers;
            newTask._id = 't' + makeId();
            newTask.priority = 'tbd'
            newTask.status = 'draft'
            newTask = { ...newTask, groupId }

            const groupIdx = board.groups.findIndex(group => group._id === groupId);
            const newBoard = { ...board }

            if (!newBoard.groups[groupIdx].tasks) {
                newBoard.groups[groupIdx].tasks = [];
            }
            newBoard.groups[groupIdx].tasks.push(newTask)
            await updateBoard(newBoard)
        } catch (error) {
            console.log('Could not add task', error);

        }
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

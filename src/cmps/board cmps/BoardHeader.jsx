/* eslint-disable react/no-children-prop */
import { useSelector } from "react-redux";
import { groupService } from "../../services/board/group.service.local";
import { taskService } from "../../services/board/task.service.local";
import { addGroup, addTask } from "../../store/actions/board.actions";
import BoardHeaderContextualActions from "./BoardHeaderContextualActions";
import BoardHeadersTabList from "./BoardHeadersTabList";
import BoardHeaderTitleButtons from "./BoardHeaderTitleButtons";

export function BoardHeader() {
    const board = useSelector((storeState) => storeState.boardModule.board)

    function onAddGroup() {
        try {
            let newGroup = groupService.getEmptyGroup()
            newGroup = { ...newGroup, boardId: board._id, name: "New Group" }
            addGroup(newGroup)
        } catch (err) {
            console.error('group could not be added' + err);
        }
    }

    function onAddTask() {
        console.log(board);

        const groupId = board.groups[0]._id
        let newTask = taskService.getEmptyTask()
        newTask = { ...newTask, groupId, taskTitle: "New task", status: "draft", priority: "tbd" }
        return addTask(groupId, newTask)
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

import { Icon } from "@vibe/core";
import { AddUpdate } from "@vibe/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TaskDetailsTriggerCell = ({ taskId = '' }) => {
    const currentBoard = useSelector(state => state.boardModule.board);
    const url = `/board/${currentBoard._id}/task/${taskId}`;

    return <Link to={url} className="task-details-button-cell">
        <button className="task-details-icon">
            <Icon icon={AddUpdate} iconSize={22} />
        </button>
    </Link>
}

export default TaskDetailsTriggerCell;
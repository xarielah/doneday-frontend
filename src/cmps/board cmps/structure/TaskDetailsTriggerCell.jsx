// import { Icon } from "@vibe/core";
// import { AddUpdate, Update } from "@vibe/icons";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { cn } from "../../../services/util.service";

// const TaskDetailsTriggerCell = ({ task }) => {
//     const currentBoard = useSelector(state => state.boardModule.board);
//     const url = `/board/${currentBoard._id}/task/${task._id}`;

//     const hasReplies = task?.replies?.length > 0;

//     return <Link to={url} className="task-details-button-cell" style={{ zIndex: 1500 }}>
//         <button onClick={(e) => e.preventDefault()} className="task-details-icon">
//             {hasReplies && <div className="task-details-badge-container">
//                 <Icon className={cn(hasReplies && 'has-updates')} icon={Update} iconSize={22} badge="1" />
//                 <span className="task-details-badge">{task.replies.length > 9 ? '9+' : task.replies.length}</span>
//             </div>}
//             {!hasReplies && <Icon icon={AddUpdate} iconSize={22} badge="1" />}
//         </button>
//     </Link>
// }

// export default TaskDetailsTriggerCell;
import { Icon } from "@vibe/core";
import { AddUpdate, Update } from "@vibe/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../services/util.service";

const TaskDetailsTriggerCell = ({ task }) => {
    const navigate = useNavigate();
    const currentBoard = useSelector(state => state.boardModule.board);
    const url = `/board/${currentBoard._id}/task/${task._id}`;
    const hasReplies = task?.replies?.length > 0;

    return (
        <div
            type="button"
            onClick={() => navigate(url)}
            className="task-details-button-cell"
            style={{ zIndex: 1500 }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onDragStart={(e) => e.stopPropagation()}
        >
            <div className="task-details-icon">
                {hasReplies ? (
                    <div className="task-details-badge-container">
                        <Icon
                            className={cn(hasReplies && "has-updates")}
                            icon={Update}
                            iconSize={22}
                            badge="1"
                        />
                        <span className="task-details-badge">
                            {task.replies.length > 9 ? "9+" : task.replies.length}
                        </span>
                    </div>
                ) : (
                    <Icon icon={AddUpdate} iconSize={22} badge="1" />
                )}
            </div>
        </div>
    );
};

export default TaskDetailsTriggerCell;


import { Heading, Icon } from "@vibe/core"
import { makeId } from "../../services/util.service"
import { Close, Delete, Duplicate, MoveArrowRight, Upload, } from "@vibe/icons"
import { getGroupById, getTaskById, removeTask, setBoard, updateBoard } from "../../store/actions/board.actions"
import { useSelector } from "react-redux"
import { deleteSelectedTasks, duplicateSelectedTasks, moveSelectedTasks, setSelectedTask } from "../../store/actions/taskSelect.actions"


export function CrudlBar() {

    const selectedTasks = useSelector((storeState) => storeState.taskSelectModule.selectedTasks)
    const board = useSelector((storeState) => storeState.boardModule.board)

    async function onDuplicateSelectedTasks() {
        return duplicateSelectedTasks(selectedTasks, board)
    }

    async function onDeleteSelectedTasks() {
        return deleteSelectedTasks(selectedTasks)
    }


    async function onMoveSelectedTasks(targetGroupId = null) {
        return moveSelectedTasks(selectedTasks, targetGroupId)
    }


    function getSelectedTasksSum(selectedTasks) {
        if (!Array.isArray(selectedTasks)) {
            return 0;
        }
        return selectedTasks.reduce((total, group) => {
            if (Array.isArray(group.tasks)) {
                return total + group.tasks.length;
            }
            return total;
        }, 0);
    }

    function onUnselectTasks() {
        setSelectedTask([])
    }

    function exportSelectedTasks() {
        console.log("export");

    }


    function s() {
        if (selectedTasks.length === 1 && selectedTasks[0].tasks.length === 1) {
            return ""
        } else {
            return "s"
        }
    }

    function getSelectedTasksDots() {
        const allDots = selectedTasks.flatMap(group => {
            const groupColor = getGroupById(group.groupId).color;

            return Array.from({ length: group.tasks.length }).map((_, i) => (
                <div
                    style={{ background: groupColor }}
                    key={`${group.groupId}-${i}`}
                    className={`${group.groupId}-dot dot`}
                >
                </div>
            ));
        });

        return (
            <div className="dot-container">
                {allDots}
            </div>
        );
    }

    return (

        selectedTasks.length > 0 && (<section className="crudl-bar">
            <section className="select-count">
                <Heading color="onPrimary" type="h2" weight="normal">
                    {getSelectedTasksSum(selectedTasks)}
                </Heading>
            </section>

            <section className="tasks-selected">
                <Heading className="task-selected-heading" color="Primary" type="h2" weight="light">
                    Task{s()} selected
                </Heading>
                {selectedTasks.length > 0 && getSelectedTasksDots()}
            </section>

            <section onClick={() => onDuplicateSelectedTasks()} className="duplicate crud-btn">
                <Icon className="icon" iconSize={14} icon={Duplicate} />
                <span>Duplicate</span>
            </section>

            <section onClick={() => exportSelectedTasks()} className="export crud-btn">
                <Icon className="icon" iconSize={14} icon={Upload} />
                <span>Export</span>
            </section>

            <section onClick={() => onDeleteSelectedTasks()} className="delete crud-btn ">
                <Icon className="icon" iconSize={14} icon={Delete} />
                <span>Delete</span>
            </section>

            <section onClick={() => onMoveSelectedTasks()} className="move-to crud-btn">
                <Icon className="icon" iconSize={14} icon={MoveArrowRight} />
                <span>Move to</span>
            </section>

            <section onClick={() => onUnselectTasks()} className="unselect">
                <Icon icon={Close} />
            </section>

        </section>)

    )
}
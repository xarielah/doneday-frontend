import { Heading, Icon } from "@vibe/core"
import { makeId } from "../../services/util.service"
import { Close, Delete, Duplicate, MoveArrowRight, Upload, } from "@vibe/icons"
import { getGroupById, getTaskById, removeTask, setBoard, updateBoard } from "../../store/actions/board.actions"
import { useSelector } from "react-redux"
import { setSelectedTask } from "../../store/actions/taskSelect.actions"


export function CrudlBar() {

    const selectedTasks = useSelector((storeState) => storeState.taskSelectModule.selectedTasks)
    const board = useSelector((storeState) => storeState.boardModule.board)



    async function duplicateSelectedTasks() {
        if (!Array.isArray(selectedTasks)) {
            console.error("selectedTasks must be an array.");
            return;
        }
        for (const { groupId, tasks } of selectedTasks) {
            if (!Array.isArray(tasks)) {
                console.error(`Tasks for groupId ${groupId} must be an array.`);
                continue;
            }

            for (const taskId of tasks) {
                const originalTask = getTaskById(taskId);
                console.log(originalTask);


                if (!originalTask) {
                    console.error(`Task with ID ${taskId} not found in the board.`);
                    continue;
                }

                const newTask = {
                    ...originalTask,
                    _id: `task${Date.now()}`,
                    taskTitle: `${originalTask.taskTitle} (copy)`,
                };

                await addTask(groupId, newTask);
            }
        }
    }

    async function deleteSelectedTasks() {
        for (const { groupId, tasks } of selectedTasks) {
            for (const taskId of tasks) {
                await removeTask(groupId, taskId)
            }
        }
        setSelectedTask([])
    }


    async function moveSelectedTasks(targetGroupId = null) {
        let actualTargetGroupId = targetGroupId

        if (!actualTargetGroupId) {
            const newGroupObj = {
                title: 'My New Group',
            }
            const savedGroup = await addGroup(newGroupObj)
            actualTargetGroupId = makeId(5)
            actualTargetGroupId._id = makeId(5)
        }
        for (const { groupId, tasks } of selectedTasks) {
            for (const taskId of tasks) {
                await removeTask(groupId, taskId)
                const movedTask = {
                    title: `Moved ${taskId}`,
                }
                await addTask(actualTargetGroupId, movedTask)
            }
        }
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

            <section onClick={() => duplicateSelectedTasks()} className="duplicate crud-btn">
                <Icon className="icon" iconSize={14} icon={Duplicate} />
                <span>Duplicate</span>
            </section>

            <section onClick={() => exportSelectedTasks()} className="export crud-btn">
                <Icon className="icon" iconSize={14} icon={Upload} />
                <span>Export</span>
            </section>

            <section onClick={() => deleteSelectedTasks()} className="delete crud-btn ">
                <Icon className="icon" iconSize={14} icon={Delete} />
                <span>Delete</span>
            </section>

            <section className="move-to crud-btn">
                <Icon className="icon" iconSize={14} icon={MoveArrowRight} />
                <span>Move to</span>
            </section>

            <section onClick={() => onUnselectTasks()} className="unselect">
                <Icon icon={Close} />
            </section>

        </section>)

    )
}
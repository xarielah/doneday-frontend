import { Heading, Icon } from "@vibe/core"
import { makeId } from "../../services/util.service"
import { Close, Delete, Duplicate, MoveArrowRight, Upload, } from "@vibe/icons"
import { addGroup, addTask, removeTask, setSelectedTask } from "../../store/actions/board.actions"
import { useSelector } from "react-redux"


export function CrudlBar() {

    const selectedTasks = useSelector((storeState) => storeState.boardModule.selectedTasks)


    async function duplicateSelectedTasks(selectedTasks = []) {
        for (const { groupId, tasks } of selectedTasks) {
            for (const taskId of tasks) {
                const newTask = {
                    title: `Copy of ${taskId}`,
                }
                await addTask(groupId, newTask)
            }
        }
    }


    async function deleteSelectedTasks(selectedTasks = []) {
        for (const { groupId, tasks } of selectedTasks) {
            for (const taskId of tasks) {
                await removeTask(groupId, taskId)
            }
        }
    }

    async function moveSelectedTasks(selectedTasks = [], targetGroupId = null) {
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


    return (

        selectedTasks.length > 0 && (<section className="crudl-bar">
            <section className="select-count">
                <Heading color="onPrimary" type="h1" weight="normal">
                    {getSelectedTasksSum(selectedTasks)}
                </Heading>
            </section>
            <section className="tasks-selected">
                <Heading className="number" color="Primary" type="h2" weight="light">
                    Tasks selected
                </Heading></section>
            <section className="duplicate crud-btn"><Icon iconSize={22} icon={Duplicate} /> Duplicate</section>
            <section className="export crud-btn"><Icon iconSize={22} icon={Upload} /> Export</section>
            <section className="delete crud-btn "><Icon iconSize={22} icon={Delete} />Delete</section>
            <section className="move-to crud-btn"> <Icon iconSize={22} icon={MoveArrowRight
            } />Move to</section>
            <section onClick={() => onUnselectTasks()} className="unselect"><Icon icon={Close
            } /></section>
        </section>)

    )
}
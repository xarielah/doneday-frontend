import { Dialog, DialogContentContainer, Heading, Icon, Menu, MenuItem } from "@vibe/core"
import { Close, Delete, Duplicate, Group, MoveArrowRight, Upload } from "@vibe/icons"
import { useSelector } from "react-redux"
import { deleteSelectedTasks, duplicateSelectedTasks, moveSelectedTasks, setSelectedTask } from "../../store/actions/taskSelect.actions"


export function CrudlBar() {

    const selectedTasks = useSelector((storeState) => storeState.taskSelectModule.selectedTasks)
    const board = useSelector((storeState) => storeState.boardModule.board)


    async function onDuplicateSelectedTasks() {
        try {
            await duplicateSelectedTasks(selectedTasks, board);
        } catch (err) {
            console.error('Error duplicating tasks:', err);
        }
    }

    async function onDeleteSelectedTasks() {
        try {
            await deleteSelectedTasks(selectedTasks, board);
        } catch (err) {
            console.error('Error deleting tasks:', err);
        }
    }

    async function onMoveSelectedTasks(targetGroupId = null) {
        try {
            await moveSelectedTasks(selectedTasks, board, targetGroupId);
        } catch (err) {
            console.error('Error moving tasks:', err);
        }
    }


    function getSelectedTasksSum() {
        if (!Array.isArray(selectedTasks)) return 0;
        return selectedTasks.reduce((total, group) => total + (group.tasks?.length || 0), 0);
    }

    function onUnselectTasks() {
        setSelectedTask([]);
    }

    function exportSelectedTasks() {
        console.log("Export selected tasks");
    }

    function s() {
        return selectedTasks.length === 1 && selectedTasks[0].tasks.length === 1 ? "" : "s";
    }

    function getSelectedTasksDots() {
        return (
            <div className="dot-container">
                {selectedTasks.flatMap(group => {
                    const groupData = board.groups.find(g => g._id === group.groupId);
                    const groupColor = groupData?.color || "#ccc";

                    return Array.from({ length: group.tasks.length }).map((_, i) => (
                        <div
                            style={{ background: groupColor }}
                            key={`${group.groupId}-${i}`}
                            className="dot"
                        />
                    ));
                })}
            </div>
        );
    }

    return (

        selectedTasks.length > 0 && (
            <section className="crudl-bar">
                <section className="select-count">
                    <Heading color="onPrimary" type="h2" weight="normal">
                        {getSelectedTasksSum()}
                    </Heading>
                </section>

                <section className="tasks-selected">
                    <Heading className="task-selected-heading" color="Primary" type="h2" weight="light">
                        Task{s()} selected
                    </Heading>
                    {getSelectedTasksDots()}
                </section>

                <section onClick={onDuplicateSelectedTasks} className="duplicate crud-btn">
                    <Icon className="icon" iconSize={14} icon={Duplicate} />
                    <span>Duplicate</span>
                </section>

                <section onClick={exportSelectedTasks} className="export crud-btn">
                    <Icon className="icon" iconSize={14} icon={Upload} />
                    <span>Export</span>
                </section>

                <section onClick={onDeleteSelectedTasks} className="delete crud-btn ">
                    <Icon className="icon" iconSize={14} icon={Delete} />
                    <span>Delete</span>
                </section>

                <Dialog
                    zIndex={10000}
                    position="bottom-start"
                    // open={isOpen}
                    showTrigger={["click"]}
                    hideTrigger={["clickoutside"]}
                    content={
                        <DialogContentContainer>

                            <Menu>
                                {board.groups.map(group => (
                                    <MenuItem key={group._id} icon={Group} title={group.name} onClick={() => onMoveSelectedTasks(group._id)} />
                                ))}
                            </Menu>

                        </DialogContentContainer>
                    }
                >
                    <section className="move-to crud-btn">
                        <Icon className="icon" iconSize={14} icon={MoveArrowRight} />
                        <span>Move to</span>
                    </section>
                </Dialog>

                <section onClick={() => onUnselectTasks()} className="unselect">
                    <Icon icon={Close} />
                </section>

            </section>)

    )
}
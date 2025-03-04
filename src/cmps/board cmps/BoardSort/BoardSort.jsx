import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContentContainer, Icon } from "@vibe/core";
import { FiFilter } from "react-icons/fi";
import { values as priorityValue } from "../dynamicCmps/Priority";
import { Status, values as statusValue } from "../dynamicCmps/Status";
import FilterHeader from "./FilterHeader";
import FilterBody from "./FilterBody";
import { allMembers, boardService, priorityList, statusList } from "../../../services/board/board.service.local";
import { useSelector } from "react-redux";
import { setFilterBy } from "../../../store/actions/board.actions";

export function BoardFilter() {
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isFilter, setIsFilter] = useState(false)
    const unfilteredBoard = boards.filter(unfilteredBoard => unfilteredBoard._id === board._id)[0];


    useEffect(() => {
        const hasFilters = filterBy && Object.values(filterBy).some(value => {
            if (Array.isArray(value)) {
                return value.length > 0
            }
            if (typeof value === 'string') {
                return value.trim() !== ''
            }
            return false
        })
        setIsFilter(hasFilters)
    }, [filterBy])

    const filterColumns = [
        { title: "Priority", options: priorityList },
        { title: "Status", options: statusList },
        { title: "Members", options: allMembers },
        // { title: "Timeline", options: boardService.getDateFilters() },
    ];

    function countBoardTasks(board) {
        if (!board || !board.groups) return 0;
        return board.groups.reduce((total, group) => {
            const taskCount = group.tasks ? group.tasks.length : 0;
            return total + taskCount;
        }, 0);
    }

    function countTasksByFilter(filterType, filterValue) {
        let count = 0;
        for (const group of board.groups) {
            for (const task of group.tasks) {
                const taskFilter = task[filterType.toLowerCase()];
                if (Array.isArray(taskFilter)) {
                    if (taskFilter.includes(filterValue)) count++;
                } else if (taskFilter === filterValue) {
                    count++;
                }
            }
        }

        return count;
    }

    function resetFilters() {
        setFilterBy({ Status: [], Priority: [], Members: [] })
        console.log(filterBy);

    }

    function toggleFilterBy(filterTitle, filterProp) {
        const tempFilter = { ...filterBy }
        if (filterBy[filterTitle]) {
            const index = filterBy[filterTitle].indexOf(filterProp);
            if (index > -1) {
                filterBy[filterTitle].splice(index, 1);
                if (filterBy[filterTitle].length === 0) {
                    delete filterBy[filterTitle];
                }
            } else {
                filterBy[filterTitle].push(filterProp);
            }
        } else {
            filterBy[filterTitle] = [filterProp];
        }
        setFilterBy(tempFilter)
    }

    const totalTasks = countBoardTasks(unfilteredBoard);
    const filteredTasks = countBoardTasks(board);



    return (
        <section className="board-filter">
            <Dialog
                position="bottom-start"
                showTrigger={["click"]}
                hideTrigger={["clickoutside"]}
                content={
                    <DialogContentContainer style={{ padding: "0px" }}>
                        <section className="filter-dialog">
                            <FilterHeader
                                isFilter={isFilter}
                                resetFilters={resetFilters}
                                title="Quick filters"
                                subtitle={`Showing ${filteredTasks == totalTasks ? "all" : filteredTasks} of ${totalTasks} tasks`}
                            />
                            <FilterBody countTasksByFilter={countTasksByFilter} filterBy={filterBy} toggleFilterBy={toggleFilterBy} columns={filterColumns} />
                        </section>
                    </DialogContentContainer>
                }
            >
                <Button
                    className={`icon-button filter-btn ${isFilter ? 'active' : ''}`}
                    size="small"
                    ariaLabel="Filter"
                    kind="tertiary"
                >
                    <Icon iconSize={20} icon={FiFilter} /> Filter
                </Button>
            </Dialog>
        </section>
    );
}

import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContentContainer, Icon } from "@vibe/core";
import { FiFilter } from "react-icons/fi";
import { values as priorityValue } from "../dynamicCmps/Priority";
import { values as statusValue } from "../dynamicCmps/Status";
import FilterHeader from "./FilterHeader";
import FilterBody from "./FilterBody";
import { allMembers, priorityList, statusList } from "../../../services/board/board.service.local";
import { useSelector } from "react-redux";
import { setFilterBy } from "../../../store/actions/board.actions";

export function BoardFilter() {
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const [isFilter, setIsFilter] = useState(false)

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
    ];

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
                                title="Quick filters"
                                subtitle="Showing all 3 tasks"
                            />
                            <FilterBody filterBy={filterBy} toggleFilterBy={toggleFilterBy} columns={filterColumns} />
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

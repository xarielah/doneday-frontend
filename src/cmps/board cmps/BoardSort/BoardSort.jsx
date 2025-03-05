import { Button, Dialog, DialogContentContainer, Icon } from "@vibe/core";
import { Sort } from "@vibe/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setSortBy } from "../../../store/actions/board.actions";
import SortBody from "./SortBody";
import SortHeader from "./SortHeader";

export function BoardSort() {
    const sortBy = useSelector(storeState => storeState.boardModule.sortBy)
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isSort, setIsSort] = useState(false)
    const [sortList, setSortList] = useState(['name', 'status', 'priority', 'timeline'])
    const [sortByList, setSortByList] = useState([{ title: '', order: 1 }])

    // Name, Status, Priority, timeline

    useEffect(() => {
        isSort && sortBy.length > 0 ? setIsSort(true) : setIsSort(false)
    }, [sortBy])

    function resetFilters() {
        setSortBy([])
        setSortByList([{ title: '', order: 1 }])
    }

    function addSort(sortTitle, order) {
        const newSort = { sortTitle, order }
        setSortBy([...sortBy, newSort])
    }

    function removeSort(sortTitle) {
        const newSort = sortBy.filter(sort => sort.sortTitle !== sortTitle)
        setSortBy(newSort)
        setSortByList(sortByList.filter(sort => sort.title !== sortTitle))
    }

    function addSortByList() {
        const newSort = { title: '', order: 1 }
        setSortByList([...sortByList, newSort])
    }

    return (
        <section className="board-sort">
            <Dialog
                position="bottom-start"
                showTrigger={["click"]}
                hideTrigger={["clickoutside"]}
                content={
                    <DialogContentContainer style={{ padding: "0px" }}>
                        <section className="sort-dialog">
                            <SortHeader
                                title="Sort by"
                            />
                            <SortBody sortByList={sortByList} sortList={sortList} />
                        </section>
                    </DialogContentContainer>
                }
            >
                <Button
                    className={`icon-button sort-btn ${isSort ? 'active' : ''}`}
                    size="small"
                    ariaLabel="Sort"
                    kind="tertiary"
                >
                    <Icon iconSize={20} icon={Sort} /> Sort
                </Button>
            </Dialog>
        </section>
    );
}

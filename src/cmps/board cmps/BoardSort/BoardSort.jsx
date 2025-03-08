import { Button, Dialog, DialogContentContainer, Icon } from "@vibe/core";
import { Sort } from "@vibe/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setSortBy } from "../../../store/actions/board.actions";
import SortBody from "./SortBody";
import SortHeader from "./SortHeader";

export function BoardSort() {
    const sortBy = useSelector(storeState => storeState.boardModule.sortBy);
    const board = useSelector(storeState => storeState.boardModule.board);
    // List of available columns to sort by.
    const sortList = ['name', 'status', 'priority', 'timeline'];
    // Local state holds an array of sort row objects.
    const [sortByList, setSortByList] = useState([{ title: '', order: 1 }]);

    // Determine if any valid sort row exists (i.e. title is set).
    const isSortActive = sortByList.some(sort => sort.title !== '') || sortByList.length > 1;

    // Whenever sortByList changes, update Redux (filtering out empty sort rows)
    useEffect(() => {
        // setSortBy(sortByList)
        console.log(sortBy);
        console.log(sortByList);
        setSortBy(sortByList)
    }, [sortByList]);

    function getAvailableSortOptions() {
        return sortList.filter((sort) => !sortByList.some((s) => s.title === sort));
    }

    // Update a particular sort row in the list.
    function updateSortRow(index, newSort) {
        const newList = [...sortByList];
        newList[index] = newSort;
        setSortByList(newList);
    }

    function clearSortRow(idx) {
        const newList = [...sortByList];
        newList[idx] = { ...newList[idx], title: '' };
        setSortByList(newList);
    }

    // Remove a sort row by index.
    function removeSort(index) {
        const newList = sortByList.filter((sort, idx) => idx !== index);
        setSortByList(newList);
        if (sortByList.length === 1) resetSort();
    }

    // Add a new (empty) sort row.
    function addSortByList() {
        setSortByList([...sortByList, { title: '', order: 1 }]);
    }

    // Optionally, reset to a single empty sort row.
    function resetSort() {
        setSortByList([{ title: '', order: 1 }]);
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
                            <SortBody
                                addSortByList={addSortByList}
                                resetSort={resetSort}
                                isSortActive={isSortActive}
                                sortByList={sortByList}
                                sortList={sortList}
                                onSortRowChange={updateSortRow}
                                onRemoveSortRow={removeSort}
                                getAvailableSortOptions={getAvailableSortOptions}
                                clearSortRow={clearSortRow}
                            />
                        </section>
                    </DialogContentContainer>
                }
            >
                <Button
                    className={`icon-button sort-btn ${isSortActive ? "active" : ""}`}
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

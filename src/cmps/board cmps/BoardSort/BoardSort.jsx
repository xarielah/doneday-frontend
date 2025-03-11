import { Button, Dialog, DialogContentContainer, Icon } from "@vibe/core";
import { Sort } from "@vibe/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setSortBy } from "../../../store/actions/board.actions";
import SortBody from "./SortBody";
import SortHeader from "./SortHeader";

export function BoardSort() {
    const sortBy = useSelector(storeState => storeState.boardModule.sortBy);

    const sortList = ['name', 'status', 'priority', 'timeline'];

    const [sortByList, setSortByList] = useState(sortBy.length > 0 ? sortBy : [{ title: '', order: 1 }]);

    const isSortActive = sortByList.some(sort => sort.title !== '') || sortByList.length > 1;

    useEffect(() => {
        // setSortBy(sortByList)

    }, [sortByList]);

    function getAvailableSortOptions() {
        return sortList.filter((sort) => !sortByList.some((s) => s.title === sort));
    }

    function updateSortRow(index, newSort) {
        const newList = [...sortByList];
        newList[index] = newSort;
        setSortByList(newList);
        setSortBy(newList);
    }

    function clearSortRow(index) {
        const newList = [...sortByList];
        newList[index] = { ...newList[index], title: '' };
        setSortByList(newList);
        setSortBy(newList);
    }

    function removeSort(index) {
        const newList = sortByList.filter((_, idx) => idx !== index);
        setSortByList(newList);
        setSortBy(newList);
        if (newList.length === 0) resetSort()
    }

    function addSortByList() {
        const newList = [...sortByList, { title: '', order: 1 }];
        setSortByList(newList);
        setSortBy(newList);
    }


    function resetSort() {
        const defaultSort = [{ title: '', order: 1 }];
        setSortByList(defaultSort);
        setSortBy(defaultSort);
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

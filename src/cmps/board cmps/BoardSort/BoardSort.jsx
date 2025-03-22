import { Button, Dialog, DialogContentContainer, Icon } from "@vibe/core";
import { Sort } from "@vibe/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setSortBy } from "../../../store/actions/board.actions";
import SortBody from "./SortBody";
import SortHeader from "./SortHeader";

export function BoardSort() {
    const sortByFromStore = useSelector(
        (storeState) => storeState.boardModule.sortBy
    );
    const sortList = ["name", "status", "priority", "timeline"];

    // Initialize sortByList – add a unique id if missing
    const [sortByList, setSortByList] = useState(() => {
        const initial =
            sortByFromStore && sortByFromStore.length > 0
                ? sortByFromStore
                : [{ title: "", order: 1 }];
        return initial.map((item, idx) => {
            if (!item.id) {
                return {
                    ...item,
                    id: `${Date.now()}-${idx}-${Math.random()
                        .toString(36)
                        .substr(2, 5)}`,
                };
            }
            return item;
        });
    });

    const isSortActive =
        sortByList.some((sort) => sort.title !== "") || sortByList.length > 1;

    useEffect(() => {
        // setSortBy(sortByList)

    }, [sortByList]);

    function getAvailableSortOptions() {
        return sortList.filter(
            (sort) => !sortByList.some((s) => s.title === sort)
        );
    }

    function updateSortRow(index, newSort) {
        const newList = [...sortByList];
        newList[index] = { ...newList[index], ...newSort };
        setSortByList(newList);
        setSortBy(newList);
    }

    function clearSortRow(index) {
        const newList = [...sortByList];
        newList[index] = { ...newList[index], title: "" };
        setSortByList(newList);
        setSortBy(newList);
    }

    function removeSort(index) {
        const newList = sortByList.filter((_, idx) => idx !== index);
        setSortByList(newList);
        setSortBy(newList);
        if (newList.length === 0) resetSort();
    }

    function addSortByList() {
        const newSort = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            title: "",
            order: 1,
        };
        const newList = [...sortByList, newSort];
        setSortByList(newList);
        setSortBy(newList);
    }

    function resetSort() {
        const defaultSort = [
            {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                title: "",
                order: 1,
            },
        ];
        setSortByList(defaultSort);
        setSortBy(defaultSort);
    }

    function reorderSortRows(newList) {
        setSortByList(newList);
        setSortBy(newList);
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
                            <SortHeader title="Sort by" />
                            <SortBody
                                addSortByList={addSortByList}
                                resetSort={resetSort}
                                isSortActive={isSortActive}
                                sortByList={sortByList}
                                sortList={sortList}
                                onSortRowChange={updateSortRow}
                                onRemoveSortRow={removeSort}
                                onReorder={reorderSortRows}
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

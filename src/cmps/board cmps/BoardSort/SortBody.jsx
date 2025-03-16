import { Button } from "@vibe/core";
import React, { useEffect } from "react";
import SortRow from "./SortRow";
import { useSelector } from "react-redux";

const SortBody = ({ sortList, sortByList, onSortRowChange, onRemoveSortRow, isSortActive, addSortByList, getAvailableSortOptions, clearSortRow }) => {

    const sortBy = useSelector(storeState => storeState.boardModule.sortBy)

    return (
        <section className="sort-body">
            {sortByList.map((sort, idx) => (
                <SortRow
                    isSortActive={isSortActive}
                    key={idx}
                    sortList={sortList}
                    sort={sort}
                    onChange={(newSort) => onSortRowChange(idx, newSort)}
                    onRemove={() => onRemoveSortRow(idx)}
                    getAvailableSortOptions={getAvailableSortOptions}
                    clearSortRow={() => clearSortRow(idx)}
                />
            ))}
            <Button
                kind='tertiary'
                size="small"
                className="add-sort"
                onClick={addSortByList}
                disabled={sortList.length === sortByList.length || sortByList[0] === ''}
            >
                Add sort
            </Button>
        </section>
    );
};

export default SortBody;

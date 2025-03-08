import { Button } from "@vibe/core";
import React from "react";
import SortRow from "./SortRow";

const SortBody = ({ sortList, sortByList, onSortRowChange, onRemoveSortRow, isSortActive, addSortByList, getAvailableSortOptions, clearSortRow }) => {
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
                disabled={sortList.length === sortByList.length}
            >
                Add sort
            </Button>
        </section>
    );
};

export default SortBody;

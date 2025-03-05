import React from "react";
import SortRow from "./SortRow";

const SortBody = ({ sortList, sortByList }) => {
    return (
        <section className="sort-body">
            {sortByList.map((sort, idx) => {
                return <SortRow key={idx} sortList={sortList} sort={sort} />
            })}
        </section >
    );
};

export default SortBody;

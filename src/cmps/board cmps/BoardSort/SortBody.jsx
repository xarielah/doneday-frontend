import React from "react";
import { Dropdown, Text } from "@vibe/core";
import SortRow from "./SortRow";

const SortBody = ({ sortList }) => {
    return (
        <section className="sort-body">
            <SortRow sortList={sortList} />
        </section >
    );
};

export default SortBody;

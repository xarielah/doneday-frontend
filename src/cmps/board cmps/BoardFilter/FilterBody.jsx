import { Text } from "@vibe/core";
import React from "react";
import FilterColumn from "./FilterColumn";

const FilterBody = ({ columns, toggleFilterBy, filterBy, countTasksByFilter }) => {
    return (
        <section className="filter-body">
            <section className="filter-body-header">
                <Text type="text1" weight="medium">
                    All columns
                </Text>
            </section>
            <section className="filter-body-content">
                {columns.map((column, idx) => (
                    <FilterColumn countTasksByFilter={countTasksByFilter} filterBy={filterBy} toggleFilterBy={toggleFilterBy} key={idx} title={column.title} options={column.options} />
                ))}
            </section>
        </section>
    );
};

export default FilterBody;

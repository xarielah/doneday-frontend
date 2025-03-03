import React from "react";
import { Text } from "@vibe/core";
import FilterColumn from "./FilterColumn";

const FilterBody = ({ columns }) => {
    return (
        <section className="filter-body">
            <section className="filter-body-header">
                <Text type="text1" weight="medium">
                    All columns
                </Text>
            </section>
            <section className="filter-body-content">
                {columns.map((column, idx) => (
                    <FilterColumn key={idx} title={column.title} options={column.options} />
                ))}
            </section>
        </section>
    );
};

export default FilterBody;

import React from "react";
import { Text } from "@vibe/core";

const FilterHeader = ({ title, subtitle }) => {
    return (
        <section className="filter-header">
            <Text type="text1" weight="medium">
                {title}
            </Text>
            <Text type="text2" weight="normal">
                {subtitle}
            </Text>
        </section>
    );
};

export default FilterHeader;

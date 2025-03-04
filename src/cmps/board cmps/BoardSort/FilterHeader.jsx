import React from "react";
import { Button, Text } from "@vibe/core";

const FilterHeader = ({ title, subtitle, resetFilters, isFilter }) => {
    return (
        <section className="filter-header">
            <Text type="text1" weight="medium">
                {title}
            </Text>
            <Text type="text2" weight="normal">
                {subtitle}
            </Text>
            <Button
                size="small"
                kind="secondary"
                onClick={() => resetFilters()}
                ariaLabel="Clear all"
                className="clear-btn"
                disabled={!isFilter}
            >
                Clear all
            </Button>
        </section>
    );
};

export default FilterHeader;

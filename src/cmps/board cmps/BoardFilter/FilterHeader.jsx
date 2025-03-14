import { Button, Text } from "@vibe/core";
import React from "react";

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
                kind="tertiary"
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

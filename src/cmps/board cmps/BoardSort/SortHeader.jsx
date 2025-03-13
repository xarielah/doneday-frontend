import React from "react";
import { Button, Text } from "@vibe/core";

const SortHeader = ({ title }) => {
    return (
        <section className="sort-header">
            <Text type="text1" weight="medium">
                {title}
            </Text>
        </section>
    );
};

export default SortHeader;

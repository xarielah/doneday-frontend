import React from "react";
import { List, ListItem, MenuTitle } from "@vibe/core";

const FilterColumn = ({ title, options }) => {
    return (
        <section className="filter-column">
            <List>
                <MenuTitle
                    className="filter-column-title"
                    type="h3"
                    weight="medium"
                    caption={title}
                />
                {options.map((option, idx) => (
                    <ListItem key={idx} className="filter-item" kind='secondary' size="small">
                        {option.label}
                    </ListItem>
                ))}
            </List>
        </section>
    );
};

export default FilterColumn;

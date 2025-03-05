import React from "react";
import { Dropdown, List, ListItem, MenuTitle } from "@vibe/core";

const SortRow = () => {

    // const activeOptions = options.filter(
    //     (option) =>
    //         filterBy[title] && filterBy[title].includes(option.value)
    // );
    // const inactiveOptions = options.filter(
    //     (option) =>
    //         !filterBy[title] || !filterBy[title].includes(option.value)
    // );

    return (
        <section className="sort-row">
            <Dropdown
                className="sort-list"
                options={[
                    {
                        label: 'Option 1',
                        value: 1
                    },
                    {
                        label: 'Option 2',
                        value: 2
                    },
                    {
                        label: 'Option 3',
                        value: 3
                    }
                ]}
                placeholder="Placeholder text here"
            />
            <Dropdown
                clearable={false}
                defaultOptions={ }
                className="ascending-decsending"
                options={[
                    {
                        label: 'Ascending',
                        value: 1,
                    },
                    {
                        label: 'Decsending',
                        value: -1,
                    }
                ]}
            />
        </section>
    );
};

export default SortRow;
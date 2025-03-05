import React, { useState } from "react";
import { Dropdown, List, ListItem, MenuTitle } from "@vibe/core";

const SortRow = ({ sortList }) => {

    // const activeOptions = options.filter(
    //     (option) =>
    //         filterBy[title] && filterBy[title].includes(option.value)
    // );
    // const inactiveOptions = options.filter(
    //     (option) =>
    //         !filterBy[title] || !filterBy[title].includes(option.value)
    // );

    const orderOptions = [
        {
            label: 'Ascending',
            value: 1,
        },
        {
            label: 'Decsending',
            value: -1,
        }
    ]
    const [order, setOrder] = useState(orderOptions[0]);

    return (
        <section className="sort-row">
            <Dropdown
                className="sort-list"
                options={sortList.map(sort => {
                    return {
                        label: sort.charAt(0).toUpperCase() + sort.slice(1),
                        value: sort
                    }
                })}
            />
            <Dropdown
                defaultValue={order}
                onChange={(option) => setOrder(option.value - 1)}
                clearable={false}
                className="ascending-decsending"
                options={orderOptions}
            />
        </section>
    );
};

export default SortRow;
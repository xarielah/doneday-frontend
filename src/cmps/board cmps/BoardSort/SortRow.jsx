import { Dropdown, IconButton } from "@vibe/core";
import { CloseSmall } from "@vibe/icons";
import React, { useState } from "react";

const SortRow = ({ sortList, sort }) => {

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
                value={sort.title}
                className="sort-list"
                placeholder="Choose column"
                options={sortList.map(sort => {
                    return {
                        label: sort.charAt(0).toUpperCase() + sort.slice(1),
                        value: sort
                    }
                })}
            />
            <Dropdown
                value={order}
                onChange={(option) => setOrder(option)}
                clearable={false}
                className="ascending-descending"
                options={orderOptions}
            />
            <IconButton icon={CloseSmall} className="icon-btn" kind="tertiary" />
        </section>
    );
};

export default SortRow;
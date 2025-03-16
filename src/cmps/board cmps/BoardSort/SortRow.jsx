import { Dropdown, Icon, IconButton } from "@vibe/core";
import { CloseSmall, Drag } from "@vibe/icons";
import React from "react";

const SortRow = ({ sortList, sort, onChange, onRemove, isSortActive, getAvailableSortOptions, clearSortRow }) => {

    const orderOptions = [
        { label: "Ascending", value: 1 },
        { label: "Descending", value: -1 },
    ];
    let titleValue = sortList.find((title) => title === sort.title) || ''

    return (
        <section className="sort-row">
            <Icon icon={Drag} />
            <Dropdown
                onClear={clearSortRow}
                className="sort-list"
                placeholder="Choose column"
                options={getAvailableSortOptions().map(s => ({
                    label: s.charAt(0).toUpperCase() + s.slice(1),
                    value: s,
                }))}
                onChange={(option) => onChange({ ...sort, title: option?.value || '' })}
                value={titleValue != "" ? {
                    label: titleValue.charAt(0).toUpperCase() + titleValue.slice(1),
                    value: titleValue
                } : null}
            />
            <Dropdown
                onChange={(option) => onChange({ ...sort, order: option.value })}
                clearable={false}
                className="ascending-descending"
                options={orderOptions}
                value={orderOptions.find((option) => option.value === sort.order)}
            />
            {isSortActive && <IconButton
                icon={CloseSmall}
                className="icon-btn"
                kind="tertiary"
                onClick={onRemove}
            />}
        </section>
    );
};

export default SortRow;

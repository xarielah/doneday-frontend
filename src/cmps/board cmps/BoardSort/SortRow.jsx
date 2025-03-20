import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dropdown, Icon, IconButton } from "@vibe/core";
import { CloseSmall, Drag } from "@vibe/icons";
import React from "react";

const SortRow = ({
    sortList,
    sort,
    onChange,
    onRemove,
    isSortActive,
    getAvailableSortOptions,
    clearSortRow,
    idx,
    isActive
}) => {
    // Use the unique sort.id for dnd-kit
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: sort.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const orderOptions = [
        { label: "Ascending", value: 1 },
        { label: "Descending", value: -1 },
    ];
    let titleValue = sortList.find((title) => title === sort.title) || "";

    return (
        <section className="sort-row" ref={setNodeRef} style={style}>
            {isActive && <div {...attributes} {...listeners}>
                <Icon icon={Drag} iconSize={20} />
            </div>}
            {!isActive && <div>
                <Icon icon={Drag} iconSize={20} customColor="grey" />
            </div>}
            <Dropdown
                onClear={clearSortRow}
                className="sort-list"
                placeholder="Choose column"
                options={getAvailableSortOptions().map((s) => ({
                    label: s.charAt(0).toUpperCase() + s.slice(1),
                    value: s,
                }))}
                onChange={(option) =>
                    onChange({ ...sort, title: option?.value || "" })
                }
                value={
                    titleValue !== ""
                        ? {
                            label:
                                titleValue.charAt(0).toUpperCase() +
                                titleValue.slice(1),
                            value: titleValue,
                        }
                        : null
                }
            />
            <Dropdown
                onChange={(option) => onChange({ ...sort, order: option.value })}
                clearable={false}
                className="ascending-descending"
                options={orderOptions}
                value={orderOptions.find((option) => option.value === sort.order)}
            />
            {isSortActive && (
                <IconButton
                    icon={CloseSmall}
                    className="icon-btn"
                    kind="tertiary"
                    onClick={onRemove}
                />
            )}
        </section>
    );
};

export default SortRow;

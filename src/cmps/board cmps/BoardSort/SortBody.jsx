import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@vibe/core";
import React from "react";
import { useSelector } from "react-redux";
import SortRow from "./SortRow";

const SortBody = ({
    sortList,
    sortByList,
    onSortRowChange,
    onRemoveSortRow,
    isSortActive,
    addSortByList,
    onReorder,
    getAvailableSortOptions,
    clearSortRow,
    resetSort,
}) => {
    const sortBy = useSelector((storeState) => storeState.boardModule.sortBy);

    const isActive = ((sortByList[0] && sortByList[0].title !== "") || sortByList.length > 1) && sortBy.length >= 1 && sortList.length !== sortByList.length

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // When drag ends, update the order using the onReorder callback.
    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = sortByList.findIndex((item) => item.id === active.id);
        const newIndex = sortByList.findIndex((item) => item.id === over.id);
        const newSortByList = arrayMove(sortByList, oldIndex, newIndex);
        if (onReorder) {
            onReorder(newSortByList);
        }
    };


    return (
        <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
            collisionDetection={closestCenter}
        >
            <SortableContext
                items={sortByList.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <section className="sort-body">
                    {sortByList.map((sort, idx) => (
                        <SortRow
                            isSortActive={isSortActive}
                            key={sort.id}
                            sortList={sortList}
                            sort={sort}
                            idx={idx}
                            onChange={(newSort) => onSortRowChange(idx, newSort)}
                            onRemove={() => onRemoveSortRow(idx)}
                            getAvailableSortOptions={getAvailableSortOptions}
                            clearSortRow={() => clearSortRow(idx)}
                            isActive={isActive}
                        />
                    ))}
                    <Button
                        kind="tertiary"
                        size="small"
                        className="add-sort"
                        onClick={addSortByList}
                        disabled={!isActive}
                    >
                        Add sort
                    </Button>
                </section>
            </SortableContext>
        </DndContext>
    );
};

export default SortBody;

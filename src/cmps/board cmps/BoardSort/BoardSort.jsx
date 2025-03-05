import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContentContainer, Icon } from "@vibe/core";
import { Filter, Sort } from "@vibe/icons";
import { useSelector } from "react-redux";
import { setSortBy } from "../../../store/actions/board.actions";
import SortHeader from "./SortHeader";
import SortBody from "./SortBody";

export function BoardSort() {
    const sortBy = useSelector(storeState => storeState.boardModule.sortBy)
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isSort, setIsSort] = useState(false)
    const [sortList, setSortList] = useState(['name', 'status', 'priority', 'timeline'])

    // Name, Status, Priority, timeline

    useEffect(() => {
    }, [sortBy])

    return (
        <section className="board-sort">
            <Dialog
                position="bottom-start"
                showTrigger={["click"]}
                hideTrigger={["clickoutside"]}
                content={
                    <DialogContentContainer style={{ padding: "0px" }}>
                        <section className="sort-dialog">
                            <SortHeader
                                title="Sort by"
                            />
                            <SortBody sortList={sortList} />
                        </section>
                    </DialogContentContainer>
                }
            >
                <Button
                    className={`icon-button sort-btn ${isSort ? 'active' : ''}`}
                    size="small"
                    ariaLabel="Sort"
                    kind="tertiary"
                >
                    <Icon iconSize={20} icon={Sort} /> Sort
                </Button>
            </Dialog>
        </section>
    );
}

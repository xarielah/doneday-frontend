import React from "react";
import { Button, Dialog, DialogContentContainer, Icon } from "@vibe/core";
import { FiFilter } from "react-icons/fi";
import { values as priorityValue } from "../dynamicCmps/Priority";
import { values as statusValue } from "../dynamicCmps/Status";
import FilterHeader from "./FilterHeader";
import FilterBody from "./FilterBody";
import { allMembers, priorityList, statusList } from "../../../services/board/board.service.local";

export function BoardFilter() {


    const filterColumns = [
        { title: "Priority", options: priorityList },
        { title: "Status", options: statusList },
        { title: "Members", options: allMembers },
    ];

    return (
        <section className="board-filter">
            <Dialog
                position="bottom-start"
                showTrigger={["click"]}
                hideTrigger={["clickoutside"]}
                content={
                    <DialogContentContainer style={{ padding: "0px" }}>
                        <section className="filter-dialog">
                            <FilterHeader
                                title="Quick filters"
                                subtitle="Showing all 3 tasks"
                            />
                            <FilterBody columns={filterColumns} />
                        </section>
                    </DialogContentContainer>
                }
            >
                <Button
                    className="icon-button"
                    size="small"
                    ariaLabel="Filter"
                    kind="tertiary"
                >
                    <Icon iconSize={20} icon={FiFilter} /> Filter
                </Button>
            </Dialog>
        </section>
    );
}

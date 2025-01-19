import { Tooltip, IconButton, ExpandCollapse, Heading } from "@vibe/core";
import { BoardsSection } from "./BoardsSection.jsx";

export function CollapseSection({headerTitle, headerTooltip, headerIcon, openState, data}) {

    return (
        <section className="collapse-section">
            <ExpandCollapse
                title={
                    <div className="collapse-title">
                        <Heading type="h3" color="primary">
                            {headerTitle}
                        </Heading>
                        <Tooltip content={headerTooltip}>
                            <IconButton icon={headerIcon} ariaLabel={headerTitle} size={IconButton.sizes.SMALL} />
                        </Tooltip>
                    </div>
                }
                headerClassName="collapse-header"
                className="custom-collapse"
                contentClassName="collapse-content"
                hideBorder
                defaultOpenState={openState ?? false}
            >
                <BoardsSection boards={data}/>
            </ExpandCollapse>
        </section>
    )
}
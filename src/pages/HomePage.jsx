// import { Tooltip, IconButton, ExpandCollapse, Heading, Box, Avatar, Icon, Text } from "@vibe/core";
import { Info } from "@vibe/icons";

import { useSelector } from "react-redux";
import { CollapseSection } from "../cmps/home-page/CollapseSection.jsx";

export function HomePage() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    return (
        <section className="home-page">
            <CollapseSection
                headerTitle="Recent Boards"
                headerTooltip="These are the recent boards in the account that you are a member of."
                headerIcon={Info}
                data={boards.slice(0, 2)}
                openState
            />
            <CollapseSection
                headerTitle="My Boards"
                headerTooltip="These are the boards in the account that you are a member of."
                headerIcon={Info}
                data={boards}
                openState
            />
        </section>
    );
}

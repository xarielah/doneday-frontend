// import { Tooltip, IconButton, ExpandCollapse, Heading, Box, Avatar, Icon, Text } from "@vibe/core";
import { Info } from "@vibe/icons";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CollapseSection } from "../cmps/home-page/CollapseSection.jsx";
import { loadBoards } from "../store/actions/board.actions.js";

export function HomePage() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

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

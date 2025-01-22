// import { Tooltip, IconButton, ExpandCollapse, Heading, Box, Avatar, Icon, Text } from "@vibe/core";
import { Info } from "@vibe/icons";

import { CollapseSection } from "../cmps/home-page/CollapseSection.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadBoards } from "../store/actions/board.actions.js";

export function HomePage() {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    console.log(boards);

    useEffect(() => {
        loadBoards()
        console.log(boards);

    }, [])


    // const boards = [
    //     {
    //         id: "board1",
    //         title: "Main Workspace",
    //         subTitle: "Sub main workspace",
    //         squareColor: 'orange'
    //     },
    //     {
    //         id: "board1",
    //         title: "New Workspace",
    //         subTitle: "Sub new workspace",
    //         squareColor: 'bubble'
    //     },
    //     {
    //         id: "board1",
    //         title: "Main Workspace",
    //         subTitle: "Sub main workspace",
    //         squareColor: 'bubble'
    //     }
    // ]

    const workspaces = [
        {
            id: "group1",
            title: "Main Workspace",
            subTitle: "Sub main workspace",
            squareColor: 'orange'
        },
        {
            id: "group2",
            title: "New Workspace",
            subTitle: "Sub new workspace",
            squareColor: 'bubble'
        },
        {
            id: "group3",
            title: "Main Workspace",
            subTitle: "Sub main workspace",
            squareColor: 'bubble'
        }
    ]

    return (
        <section className="home-page">
            <CollapseSection headerTitle="My Boards123" openState={true} headerTooltip="These are the boards in the account that you are a member of." headerIcon={Info} data={boards} />

            <CollapseSection headerTitle="My Workspaces" openState={false} headerTooltip="These are the boards in the account that you are a member of." headerIcon={Info} data={workspaces} />
        </section>
    );
}

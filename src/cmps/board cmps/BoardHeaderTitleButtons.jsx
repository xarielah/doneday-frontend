import { Button, Flex, Heading, Icon, IconButton, MenuButton } from "@vibe/core";
import { Integrations, Notifications, Robot } from "@vibe/icons";
import { useState } from "react";
import { useSelector } from "react-redux";

const BoardHeaderTitleButtons = ({ boardName }) => {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [numberOfMembers, setNumberOfMembers] = useState(0);


    return <>
        <Heading type="h2" className="title">{board.name}</Heading>

        <Flex className="actions" gap="small" align="center" justify="end" style={{ height: '36px' }}>
            <Button className="icon-button" size="small" kind="tertiary"><Icon icon={Integrations} />Integrate</Button>
            <Button className="icon-button" size="small" kind="tertiary"><Icon icon={Robot} />Automate</Button>
            <IconButton icon={Notifications} ariaLabel="Notifications" badge="1" />
            <Button className="icon-button" kind="secondary" size="small">
                Invite / {numberOfMembers}
            </Button>
            <MenuButton ariaLabel="More options" />
        </Flex>
    </>
}

export default BoardHeaderTitleButtons
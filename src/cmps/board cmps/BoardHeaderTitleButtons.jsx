import { Button, Dialog, DialogContentContainer, Flex, Heading, Icon, IconButton, MenuButton, Text } from "@vibe/core";
import { DropdownChevronDown, DropdownChevronUp, Notifications } from "@vibe/icons";
import { useState } from "react";
import { useSelector } from "react-redux";

const BoardHeaderTitleButtons = ({ boardName }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const board = useSelector(storeState => storeState.boardModule.board)
    const [numberOfMembers, setNumberOfMembers] = useState(0);


    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleOpenDialog = (event) => {
        event.stopPropagation();
        setDialogOpen(!isDialogOpen);
    };

    const currentDate = new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '');


    return <>
        <Dialog
            modifiers={[{ name: "preventOverflow", options: { mainAxis: false } }]}
            open={isDialogOpen}
            showTrigger={isDialogOpen ? [] : null}
            onClickOutside={isDialogOpen && handleCloseDialog}
            position="bottom"
            zIndex={1010}
            content={
                <DialogContentContainer size="large">
                    <div className="headerDialog">
                        <Heading type="h4" className="title">
                            {board.name}
                        </Heading>
                        <Text>
                            A clone of monday.com
                        </Text>
                        <hr />
                        <div class="headerBoardInfo">
                            <Heading type="h4" weight="light" className="title">
                                Board info
                            </Heading>
                            <div className="infos">
                                <div className="info">
                                    <div className="infoType">
                                        <Text>
                                            Created at
                                        </Text>
                                    </div>
                                    <div className="infoValue">
                                        <Text>
                                            {currentDate}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContentContainer>
            }
        >
            <div className={`space-y-4 headerTitle ${isDialogOpen ? "active-header" : ""}`} style={{ display: "flex" }}>
                <Heading type="h2" className="title" onClick={(event) => handleOpenDialog(event)}>
                    {board.name}
                </Heading>

                <Icon className="board-icon" icon={isDialogOpen ? DropdownChevronUp : DropdownChevronDown} ariaLabel={board.name} iconSize="22" />
            </div>
        </Dialog>

        <Flex className="actions" gap="small" align="center" justify="end" style={{ height: '36px' }}>
            <IconButton icon={Notifications} ariaLabel="Notifications" badge="1" />
            <Button className="icon-button" kind="secondary" size="small">
                Invite / {numberOfMembers}
            </Button>
            <MenuButton ariaLabel="More options" />
        </Flex>
    </>
}

export default BoardHeaderTitleButtons
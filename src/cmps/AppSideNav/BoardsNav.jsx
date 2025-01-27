import { useState } from "react";
import {
    Button, Dialog, DialogContentContainer, Divider, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuTitle, Search
} from "@vibe/core";
import {
    Add, AddSmall, Board, Dashboard, DropdownChevronDown, DropdownChevronUp, Filter, Search as SearchIcon, Workspace
} from "@vibe/icons";
import { AddBoardCmp } from "./AddBoardCmp";
import { addBoard } from "../../store/actions/board.actions";

export function BoardNav({ boards, location, handleNavigate, isSearch, setIsSearch, searchRef,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddBoard, setIsAddBoard] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedBoard, setSelectedBoard] = useState("Main Board")

    const handleCloseModal = () => {
        setIsAddBoard(false)
    }

    const handleShowModal = () => {
        return isAddBoard
    }

    const handleSelect = (board) => {
        setSelectedBoard(board.name);
        setIsOpen(false);
        handleNavigate(`/board/${board._id}`);
    };


    async function handleAddBoard(name) {
        const newBoard = { name }
        return addBoard(newBoard)
            .then(() => {
                console.log(`Board added: ${name}`);
                handleCloseModal();
            })
    }

    const filteredBoards = boards.filter((board) =>
        board.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (
        <>
            <section className="workspaces-nav">
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    width={300}
                    title="Select a Board"
                    showTrigger={[]}
                    position="bottom"
                    content={
                        <DialogContentContainer className="dialog-container">
                            <Search
                                placeholder="Search for a board"
                                size="small"
                                value={searchValue}
                                onChange={(val) => setSearchValue(val)}
                            />
                            <Menu>
                                <MenuTitle caption="My board" />
                                {filteredBoards.map((board) => (
                                    <MenuItem
                                        key={board._id}
                                        className={
                                            location.pathname === `/board/${board._id}` ? "active" : ""
                                        }
                                        title={board.name}
                                        icon={Board}
                                        onClick={() => handleSelect(board)}
                                    />
                                ))}
                            </Menu>
                            <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
                            <Button kind="tertiary" size="small" onClick={() => setIsAddBoard(true)}>
                                <Icon icon={AddSmall} />
                                Add Board
                            </Button>
                            {/* <Button kind="tertiary" size="small">
                                <Icon icon={Workspace} />
                                Browse all
                            </Button> */}
                        </DialogContentContainer>
                    }
                >
                    {/* --- Trigger Section (Board Title, Search) --- */}
                    <section className="workspace-title">
                        {!isSearch && (
                            <>
                                <Icon icon={Workspace} className="icon" />
                                <MenuTitle className="title" caption="Boards" icon={Workspace} />

                                <MenuButton size="xs" className="menu-btn">
                                    <Menu id="menu" size={Menu.sizes.MEDIUM}>
                                        <MenuItem iconType="svg" title="test 1" />
                                        <MenuItem iconType="svg" title="test 2" />
                                        <MenuItem title="test 3" />
                                    </Menu>
                                </MenuButton>

                                <IconButton
                                    className="search-btn"
                                    icon={SearchIcon}
                                    kind="tertiary"
                                    ariaLabel="Search boards"
                                    size="xs"
                                    onClick={() => setIsSearch(true)}
                                />
                            </>
                        )}
                        {isSearch && (
                            <Search
                                className="search"
                                ref={searchRef}
                                placeholder="Search in Main workspaces"
                                size="small"
                                autoFocus
                                onClick={() => setIsSearch(true)}
                                renderAction={
                                    <IconButton icon={Filter} ariaLabel="Filter results" size="xs" />
                                }
                            />
                        )}
                    </section>

                    {/* --- Board Dropdown + Add Button --- */}
                    <section className="workspaces-dropdown">
                        <Button
                            size={Button.sizes.SMALL}
                            className="workspace-dropdown-btn"
                            kind={Button.kinds.TERTIARY}
                            onClick={() => setIsOpen(prev => !prev)}
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                border: "1px solid #d0d4e4"
                            }}
                        >
                            <span style={{ marginLeft: "8px" }}>{selectedBoard}</span>
                            <Icon icon={isOpen ? DropdownChevronUp : DropdownChevronDown} />
                        </Button>

                        <IconButton
                            className="add-workspace-btn"
                            size={Button.sizes.SMALL}
                            kind={Button.kinds.PRIMARY}
                            ariaLabel="Add Board"
                            icon={Add}
                            aria-disabled="false"
                            style={{
                                marginLeft: "8px",
                                backgroundColor: "#0073ea",
                                color: "#ffffff"
                            }}
                            onClick={() => setIsAddBoard(true)}

                        />
                    </section>
                </Dialog>
            </section>

            {/* --- Board Navigation below --- */}
            <Menu className="board-nav">
                {boards.map((board) => (
                    <MenuItem
                        key={board._id}
                        className={location.pathname === `/board/${board._id}` ? "active" : ""}
                        title={board.name}
                        icon={Board}

                        onClick={() => handleSelect(board)}
                    />
                ))}
                <MenuItem
                    className={location.pathname === "/overviews" ? "active" : ""}
                    title="Dashboard and reporting"
                    icon={Dashboard}
                    onClick={() => handleNavigate("/overviews")}
                />
            </Menu>
            <AddBoardCmp onAddBoard={handleAddBoard} show={isAddBoard} onClose={handleCloseModal} />


        </>
    );
}

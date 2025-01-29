import { useState } from "react";
import {
    Button, Dialog, DialogContentContainer, Divider, Icon, IconButton, ListItem, Menu, MenuButton, MenuDivider, MenuItem, MenuTitle, Search
} from "@vibe/core";
import {
    Add, AddSmall, Board, Dashboard, Delete, DropdownChevronDown, DropdownChevronUp, Duplicate, Edit, ExternalPage, Favorite, Filter, Moon, Remove, Search as SearchIcon, Sun, Workspace
} from "@vibe/icons";
import { AddBoardCmp } from "./AddBoardCmp";
import { addBoard, addGroup, addTask, removeBoard, setBoard } from "../../store/actions/board.actions";
import { useSelector } from "react-redux";

export function BoardNav({ boards, location, handleNavigate, isSearch, setIsSearch, searchRef,
}) {

    const board = useSelector(store => store.boardModule.board)

    const [isOpen, setIsOpen] = useState(false)
    const [isAddBoard, setIsAddBoard] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [selectedBoard, setSelectedBoard] = useState("Main Board")
    const [addedBoard, setAddedBoard] = useState({name: ''})
    const [isDuplicate, setIsDuplicate] = useState(false)

    const handleCloseModal = () => {
        setIsAddBoard(false)
    }

    const handleShowModal = () => {
        return isAddBoard
    }

    const openBoardLink = (boardId) => {
        const currentUrl = window.location.origin
        const newUrl = `${currentUrl}/board/${boardId}`
        window.open(newUrl, '_blank', 'noopener,noreferrer');
      };

    const handleSelect = (board) => {
        setSelectedBoard(board.name);
        setIsOpen(false);
        handleNavigate(`/board/${board._id}`);
    };


    async function handleAddBoard() {
        const newBoard = { name: addedBoard.name , _id: undefined }
        return addBoard(newBoard)
            .then((savedboard) => {
                console.log(`Board added: ${addedBoard.name}`);
                handleCloseModal();
                return savedboard
            })
    }

    async function handleDuplicateBoard() {
        try {
                return addBoard(newBoard)
                    .then(async (savedboard) => {
                        console.log(`Board duplicated: ${name}`);
                        handleCloseModal();
                        const prevBoard = {...board}
                        setBoard(savedboard)
                        for (const group of prevBoard.groups){
                            console.log(group);
                            const newGroup = {...group, _id:undefined}
                            await addGroup(newGroup)
                            .then((async savedGroup => {
                                console.log(task);
                                for(const task of group.tasks){
                                    const newTask = {...task, _id:undefined}
                                    await addTask(savedGroup._id, newTask)
                                }
                            }))
                        }
                    })
                    .finally(()=>{
                        setAddedBoard({name: ""})
                        setIsDuplicate(false)
                    })
            } catch (error) {
                console.error('Could not duplicate board' + error);
            }
    }

    function openDuplicateModal(boardName, boardId){
        setAddedBoard({name: "Duplicate of "+boardName, _id: boardId})
        setIsAddBoard(true)
    }

    function onDuplicateBoard(boardId){
        try {
            const newBoard = {name:addedBoard.name}
            return addBoard(newBoard)
                .then((savedboard) => {
                    console.log(`Board added: ${name}`);
                    handleCloseModal();
                    const prevBoard = getboa
                })
            .finally(()=>{
                setAddedBoard({name: ""})
                setIsDuplicate(false)
            })
        } catch (error) {
            console.error('Could not duplicate board' + error);
            
        }
    }

    function onRemoveBoard(boardId){
        try {
            return removeBoard(boardId)
        } catch (error) {
            console.error('Could not remove board' + error);
            
        }
    }

    function onRenameBoard(){

    }

    function onAddBoardToFavorite(){

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
            <div className="board-nav">
                {boards.map((board) => (
                    <ListItem
                        key={board._id}
                        className={location.pathname === `/board/${board._id}` ? "active board-item" : "board-item"}
                        title={board.name}
                        icon={Board}
                        onClick={() => handleSelect(board)}
                    >{board.name}
                    <MenuButton onClick={(e) => e.stopPropagation()} className="board-crudl" size="xs">
                        <Menu id="menu" size={Menu.sizes.MEDIUM}>
                            <MenuItem icon={ExternalPage} onClick={()=>openBoardLink(board._id)} iconType="svg" title="Open in new tab" />
                            <MenuDivider />
                            <MenuItem onClick={()=> openDuplicateModal(board.name)} icon={Duplicate} title="Duplicate board" />
                            <MenuItem onClick={()=> onRemoveBoard(board._id)} icon={Delete} title="Delete board" />
                            <MenuItem icon={Edit} title="Rename board" />
                            <MenuDivider />
                            <MenuItem icon={Favorite} title="Add to favorite" />
                        </Menu>
                    </MenuButton>

                    </ListItem>
                ))}
                <ListItem
                    className={location.pathname === "/overviews" ? "active" : ""}
                    title="Dashboard and reporting"
                    icon={Dashboard}
                    onClick={() => handleNavigate("/overviews")}
                >Dashboard and reporting</ListItem>
            </div>
            <AddBoardCmp addedBoard={addedBoard} setAddedBoard={setAddedBoard} handleDuplicateBoard={handleDuplicateBoard} handleAddBoard={handleAddBoard} show={isAddBoard} onClose={handleCloseModal} isDuplicate={isDuplicate} />


        </>
    );
}

import { Button, Dialog, DialogContentContainer, Divider, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuTitle, Search } from "@vibe/core"
import { Add, AddSmall, Board, Dashboard, DropdownChevronDown, DropdownChevronUp, Favorite, Filter, Home, MyWeek, Search as SearchIcon, Workspace } from "@vibe/icons"
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearch, setIsSearch] = useState(false)
  const searchRef = useRef(null)

  const sidebarRef = useRef(null)
  const isResizing = useRef(false)

  const handleClickOutside = () => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
  }
  useEffect(() => {
    if (isSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearch]);


  // List of your workspaces:
  const workspaces = [
    { id: 1, label: "Main board" },
    { id: 2, label: "another workspace" },
  ];

  // State to handle the currently selected workspace
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  // State to handle search
  const [searchValue, setSearchValue] = useState("");

  // State to toggle the dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Filtered workspace list based on the search
  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleMouseDown = () => {
    isResizing.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      const newWidth = e.clientX
      const minWidth = 229
      const maxWidth = 576

      // Enforce min and max width constraints
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        sidebarRef.current.style.width = `${newWidth}px`
      }
    }
  }
  const handleMouseUp = () => {
    isResizing.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleNavigate = (path) => {
    navigate(path);
  }

  const handleSelect = (workspace) => {
    setSelectedWorkspace(workspace);
    setIsOpen(false);
  }

  return (
    <section className="app-nav" ref={sidebarRef}>

      <nav className="nav">

        <Menu className="menu-nav">
          <MenuItem
            className={location.pathname === "/" ? 'active home' : 'home'}
            title="Home"
            size="small"
            icon={Home}
            onClick={() => handleNavigate("/")}
          />
          <MenuItem
            className={location.pathname === "/my_work" ? 'active my-work' : 'my-work'}
            title="My work"
            icon={MyWeek}
            onClick={() => handleNavigate("/my_work")}
          />
        </Menu>


        <MenuDivider />
        <section className="favorites-nav">
          <Menu>
            <MenuItem
              title="Favorites"
              icon={Favorite}
            />
          </Menu>
          {/* <Icon className="dropdown-favorite" icon={DropdownChevronDown} /> */}
        </section>
        <MenuDivider />

        <section className="workspaces-nav">
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            width={300}
            title="Select a Board"
            showTrigger={[]}
            position="bottom"

            content={
              <DialogContentContainer className="dialog-container ">
                <Search
                  placeholder="Search for a board"
                  size="small"
                  value={searchValue}
                  onChange={(val) => setSearchValue(val)}
                />
                <Menu>

                  <MenuTitle caption="My board" />
                  {/* List of filtered items */}
                  {filteredWorkspaces.map((workspace) => (
                    <MenuItem
                      key={workspace.id}
                      title={workspace.label}
                      className={workspace.label == selectedWorkspace.label ? ' active ' : ' '}
                      onClick={() => handleSelect(workspace)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </Menu>



                <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />

                <Button
                  kind="tertiary"
                  size="small"
                >
                  <Icon icon={AddSmall} />
                  Add Board
                </Button>
                <Button
                  kind="tertiary"
                  size="small"

                >
                  <Icon icon={Workspace} />
                  Browse all
                </Button>
              </DialogContentContainer>
            }
          >
            <section className="workspace-title">

              {!isSearch && <>
                <Icon icon={Workspace}
                  className="icon" />
                <MenuTitle
                  className="title"
                  caption="Boards"
                  icon={Workspace}
                />

                <MenuButton size="xs" className="menu-btn">
                  <Menu id="menu" size={Menu.sizes.MEDIUM}>
                    <MenuItem iconType="svg" title="test 1" />
                    <MenuItem iconType="svg" title="test 2" />
                    <MenuItem
                      title="test 3"
                    />
                  </Menu>
                </MenuButton>
                <IconButton
                  className="search-btn"
                  icon={SearchIcon}
                  kind="tertiary"
                  ariaLabel="Search results"
                  size="xs"
                  key="xs"
                  onClick={() => setIsSearch(true)}
                />
              </>}


              {isSearch && <Search
                className="search"
                ref={searchRef}
                placeholder="Search in Main workspaces"
                size="small"
                autoFocus={true}
                onClick={() => setIsSearch(true)}
                renderAction={
                  <IconButton
                    icon={Filter}
                    ariaLabel="Filter results"
                    size="xs" />
                }
              />}

            </section>
            <section className="workspaces-dropdown">
              {/* Dropdown trigger */}
              <Button
                size={Button.sizes.SMALL}
                className="workspace-dropdown-btn"
                kind={Button.kinds.TERTIARY}
                onClick={() => setIsOpen(isOpen => !isOpen)}
                style={{ flex: 1, justifyContent: "space-between", border: "1px solid #d0d4e4" }}
              >
                <span style={{ marginLeft: "8px" }}>
                  {selectedWorkspace.label}
                </span>
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
                  marginLeft: "8px", backgroundColor: "#0073ea",
                  color: "#ffffff"
                }}
              />

            </section>
          </Dialog>
        </section>

        <Menu className="board-nav">
          <MenuItem
            className={location.pathname === "/board" ? 'active' : ''}
            title="monday recreate"
            icon={Board}
            onClick={() => handleNavigate("/board")}
          />
          <MenuItem
            className={location.pathname === "/overviews" ? 'active' : ''}
            title="Dashboard and reporting"
            icon={Dashboard}
            onClick={() => handleNavigate("/overviews")}
          />
        </Menu>


      </nav >
      <div className="resize-bar" onMouseDown={handleMouseDown}></div>

    </section >

  )
}
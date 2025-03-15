import { Avatar, Button, Icon, IconButton } from "@vibe/core";
import { Add, DropdownChevronDown, DropdownChevronUp, Home } from "@vibe/icons";

export default function WorkspacesDropdown({ selectedBoard, isBoardMenuOpen, toggleBoardMenu, onToggleModal, boardColor }) {
    return <section className="workspaces-dropdown">
        <Button
            size={Button.sizes.SMALL}
            className="workspace-dropdown-btn"
            kind={Button.kinds.TERTIARY}
            onClick={toggleBoardMenu}
            style={{
                border: "1px solid #d0d4e4"
            }}
        >
            <Avatar
                size="xs"
                type="text"
                className="board-avatar-icon"
                text={selectedBoard.charAt(0)}
                backgroundColor={boardColor}
                bottomRightBadgeProps={{
                    icon: Home,
                    size: "medium",
                    className: "little-home-icon"
                }}
                square
                ariaLabel={selectedBoard}
            />
            <span className="workspace-selected-name" style={{ marginLeft: "8px", textOverflow: 'ellipsis' }}>{selectedBoard}</span>
            <Icon icon={isBoardMenuOpen ? DropdownChevronUp : DropdownChevronDown} className="board-dropdown-chevron" />
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
            onClick={onToggleModal}
        />
    </section>
}
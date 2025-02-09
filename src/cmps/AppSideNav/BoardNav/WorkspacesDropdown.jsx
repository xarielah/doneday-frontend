import { Button, Icon, IconButton } from "@vibe/core";
import { Add, DropdownChevronDown, DropdownChevronUp } from "@vibe/icons";

export default function WorkspacesDropdown({ selectedBoard, isBoardMenuOpen, toggleBoardMenu, onToggleModal }) {
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
            <span style={{ marginLeft: "8px", textOverflow: 'ellipsis' }}>{selectedBoard}</span>
            <Icon icon={isBoardMenuOpen ? DropdownChevronUp : DropdownChevronDown} />
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
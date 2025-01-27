import { Menu, MenuButton, MenuItem } from "@vibe/core"
import { Delete } from "@vibe/icons"

const GroupHeaderMenu = ({ group, onDelete }) => {
    return <MenuButton size={MenuButton.sizes.XS} className="group-header-menu-button">
        <Menu size={Menu.sizes.MEDIUM}>
            <MenuItem
                icon={Delete}
                iconType="svg"
                onClick={() => onDelete(group._id)}
                title="Delete group"
            />
        </Menu>
    </MenuButton>
}

export default GroupHeaderMenu
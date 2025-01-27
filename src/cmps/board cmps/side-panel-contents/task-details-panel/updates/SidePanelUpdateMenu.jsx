import { Menu, MenuButton, MenuItem } from "@vibe/core"
import { Delete, Edit } from '@vibe/icons'

const SidePanelUpdateMenu = ({ onEdit, onDelete }) => {
    return <MenuButton size="xs" zIndex={1400} closeMenuOnItemClick>
        <Menu id="menu" size={Menu.sizes.MEDIUM}>
            <MenuItem icon={Edit} onClick={onEdit} iconType="svg" title="Edit update" />
            <MenuItem icon={Delete} onClick={onDelete} iconType="svg" title="Delete update" />
        </Menu>
    </MenuButton>
}

export default SidePanelUpdateMenu
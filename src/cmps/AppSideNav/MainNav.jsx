import { Menu, MenuItem } from "@vibe/core";
import { Home, MyWeek } from "@vibe/icons";

export function MainNav({ location, handleNavigate }) {
    return (
        <Menu className="menu-nav">
            <MenuItem
                className={location.pathname === "/" ? "active home" : "home"}
                title="Home"
                size="small"
                icon={Home}
                onClick={() => handleNavigate("/")}
            />
            <MenuItem
                className={location.pathname === "/my_work" ? "active my-work" : "my-work"}
                title="My work"
                icon={MyWeek}
                onClick={() => handleNavigate("/my_work")}
            />
        </Menu>
    );
}

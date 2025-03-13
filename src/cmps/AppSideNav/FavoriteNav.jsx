import { Menu, MenuItem, MenuDivider } from "@vibe/core";
import { Favorite } from "@vibe/icons";

export function FavoritesNav() {
    return (
        <>
            <MenuDivider />
            <section className="favorites-nav">
                <Menu>
                    <MenuItem title="Favorites" icon={Favorite} />
                </Menu>
            </section>
            <MenuDivider />
        </>
    );
}

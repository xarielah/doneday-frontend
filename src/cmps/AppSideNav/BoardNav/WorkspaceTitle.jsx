import { Icon, IconButton, MenuTitle, Search } from "@vibe/core";
import { Filter, Workspace } from "@vibe/icons";

export default function WorkspaceTitle({ isSearch, setIsSearch }) {
    return <section className="workspace-title">
        {!isSearch && (
            <>
                <Icon icon={Workspace} className="icon" />
                <MenuTitle className="title" caption="Boards" icon={Workspace} />
            </>
        )}
        {isSearch && (
            <Search
                className="search"
                placeholder="Search in Main workspaces"
                size="small"
                autoFocus
                onClick={() => setIsSearch(true)}
                renderAction={<IconButton icon={Filter} ariaLabel="Filter results" size="xs" />}
            />
        )}
    </section>
}
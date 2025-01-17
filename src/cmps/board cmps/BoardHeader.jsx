/* eslint-disable react/no-children-prop */
import BoardHeaderContextualActions from "./BoardHeaderContextualActions";
import BoardHeadersTabList from "./BoardHeadersTabList";
import BoardHeaderTitleButtons from "./BoardHeaderTitleButtons";

export function BoardHeader() {
    return (
        <section
            className="board-header"
        >
            <BoardHeaderTitleButtons />
            <BoardHeadersTabList />
            <BoardHeaderContextualActions />
        </section>
    );
}

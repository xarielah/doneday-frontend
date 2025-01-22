import { Heading, IconButton } from "@vibe/core";
import { CloseMedium } from "@vibe/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CLEAR_PAGE_INFO } from "../../../store/reducers/sidePanel.reducer";

const SidePanelWrapper = ({ children, heading, resetUrl = '/' }) => {
    const currentBoard = useSelector(state => state.boardModule.board);
    const closingURL = currentBoard?._id ? `/board/${currentBoard._id}` : resetUrl;
    const dispatch = useDispatch();
    const closePage = () => dispatch({ type: CLEAR_PAGE_INFO });

    return <section className="side-panel-contents-wrapper">
        <header className="side-panel-header">
            <div className="side-panel-closing-bar">
                <Link to={closingURL} onClick={closePage}>
                    <IconButton size="xs" icon={CloseMedium} />
                </Link>
            </div>
            {heading && <Heading className="side-panel-heading" type="h2">{heading}</Heading>}
        </header>
        <section role="main" className="side-panel-contents">
            {children}
        </section>
    </section>
}

export default SidePanelWrapper;
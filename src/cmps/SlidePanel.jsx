import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGE_INFO } from "../store/reducers/sidePanel.reducer";
import SidePanelDynamicCmps from "./SidePanelDynamicCmps";

const SlidePanel = ({ params }) => {
    const [isOpen, setIsOpen] = useState(false);
    const store = useSelector(storeState => storeState.sidePanelModule)
    const { type } = store;
    const { boardId, taskId } = params;
    const dispatch = useDispatch();

    // This will be the listener for the store that holds the navigation content information.
    // if the side panel store is empty - set isOpen to false, and otherwise.
    useEffect(() => {
        if (taskId) {
            dispatch({ type: SET_PAGE_INFO, payload: { type: 'task', info: { boardId, taskId } } });
        }
    }, [taskId])

    useEffect(() => {
        if (type) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [type])

    const openClass = isOpen ? ' open' : '';

    return <aside className="slide-panel-container">
        <div className={`slide-panel` + openClass} style={{ width: '700px', marginTop: '0' }}>
            <SidePanelDynamicCmps cmpType={type} />
        </div>
    </aside>
}

export default SlidePanel
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { panelTypes } from "../services/sidePanel.service";
import { SET_PAGE_INFO } from "../store/reducers/sidePanel.reducer";
import SidePanelDynamicCmps from "./SidePanelDynamicCmps";

const SlidePanel = ({ params }) => {
    const [isOpen, setIsOpen] = useState(false);
    const store = useSelector(storeState => storeState.sidePanelModule)
    const { type } = store;
    const { boardId, taskId } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        // We know we should present the side panel with the task details, otherwise we wont have the task id.
        if (taskId) {
            dispatch({ type: SET_PAGE_INFO, payload: { type: panelTypes.task, info: { boardId, taskId } } });
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { panelTypes } from "../services/sidePanel.service";
import { CLEAR_PAGE_INFO, SET_PAGE_INFO } from "../store/reducers/sidePanel.reducer";
import SidePanelDynamicCmps from "./SidePanelDynamicCmps";

const SlidePanel = ({ params }) => {
    const [isOpen, setIsOpen] = useState(false);
    const store = useSelector(storeState => storeState.sidePanelModule)
    const { type } = store;
    const { boardId, taskId } = params;
    const dispatch = useDispatch();
    // const sidePanelRef = useRef(null);
    // const navigate = useNavigate()

    useEffect(() => {
        if (taskId) {
            dispatch({ type: SET_PAGE_INFO, payload: { type: panelTypes.task, info: { boardId, taskId } } });
        } if (!taskId && type === panelTypes.task) {
            dispatch({ type: CLEAR_PAGE_INFO });
        }

    }, [taskId])

    useEffect(() => {
        if (type) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [type])

    // const handleClickOutside = (event) => {
    //     if (sidePanelRef.current && !sidePanelRef.current.contains(event.target) && isOpen) {
    //         navigate(-1)
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    const openClass = isOpen ? ' open' : '';

    return <aside className="slide-panel-container">
        <div
            // ref={sidePanelRef}
            className={`slide-panel` + openClass}>
            <SidePanelDynamicCmps cmpType={type} />
        </div>
    </aside>
}

export default SlidePanel
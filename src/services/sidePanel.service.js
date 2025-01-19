import { CLEAR_PAGE_INFO, SET_PAGE_INFO } from "../store/reducers/sidePanel.reducer";
import { store } from "../store/store";

export const panelTypes = Object.freeze({
    notifications: 'notifications',
    task: 'task',
})

export function togglePanel(givenType) {
    const { type } = store.getState().sidePanelModule
    if (type !== givenType)
        if (type) {
            store.dispatch({ type: CLEAR_PAGE_INFO });
            setTimeout(() => {
                store.dispatch({ type: SET_PAGE_INFO, payload: { type: givenType } });
            }, 125)
        } else {
            store.dispatch({ type: SET_PAGE_INFO, payload: { type: givenType } });
        }
    else {
        store.dispatch({ type: CLEAR_PAGE_INFO });
    }
}
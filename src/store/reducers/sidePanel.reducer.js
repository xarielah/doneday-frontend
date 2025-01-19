export const SET_PAGE_INFO = 'SET_PAGE_INFO'
export const CLEAR_PAGE_INFO = 'CLEAR_PAGE_INFO'

const initialState = {
    type: null,
    info: null
}

export function sidePanelReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_PAGE_INFO:
            return { ...state, type: action.payload.type, info: action.payload.info || null }
        case CLEAR_PAGE_INFO:
            return { type: null, info: null }
        default: return state
    }
}

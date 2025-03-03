import { combineReducers, legacy_createStore as createStore } from 'redux'
import { boardReducer } from './reducers/board.reducer'
import { sidePanelReducer } from './reducers/sidePanel.reducer'
import { taskSelectReducer } from './reducers/taskSelect.reducer'


const rootReducer = combineReducers({
    boardModule: boardReducer,
    sidePanelModule: sidePanelReducer,
    taskSelectModule: taskSelectReducer
    // userModule: userReducer,
    // systemModule: systemReducer,
    // reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import auth from '../features/userSign/reducers';
import project from '../features/project/reducers';
import task from '../features/task/reducers';

const rootReducer = combineReducers({auth, project, task});

let rootStore = createStore(rootReducer, applyMiddleware(thunk));

export default rootStore;
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import auth from '../features/userSign/reducers';

// const rootReducer = combineReducers({auth});

let rootStore = createStore(auth, applyMiddleware(thunk));

export default rootStore;
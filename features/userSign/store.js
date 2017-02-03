import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers';

let store = createStore(auth, applyMiddleware(thunk));
export default store;
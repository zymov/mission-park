import {combineReducers} from 'redux';
import auth from './user.js';
import personalHomeData from './personalHomeData.js';

export default combineReducers({
	auth, 
	personalHomeData
});
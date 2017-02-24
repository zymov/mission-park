import { combineReducers } from 'redux';
import task from './taskReducers';
import tasklist from './tasklistReducers';


const taskboard = combineReducers({task, tasklist});

export default taskboard;
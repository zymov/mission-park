import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

export const SAVE_TAGS_REQUEST = 'SAVE_TAGS_REQUEST';
export const SAVE_TAGS_SUCCESS = 'SAVE_TAGS_SUCCESS';
export const SAVE_TAGS_FAILURE = 'SAVE_TAGS_FAILURE';

export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

export const SEARCH_INPUT_REQUEST = 'SEARCH_INPUT_REQUEST';
export const UPDATE_PROJECT_ARR = 'UPDATE_PROJECT_ARR';
export const UPDATE_TASKLIST_ARR = 'UPDATE_TASKLIST_ARR';
export const UPDATE_TASK_ARR = 'UPDATE_TASK_ARR';
export const SEARCH_INPUT_FAILURE = 'SEARCH_INPUT_FAILURE';



export function findUsersByName(userName){
	return function(dispatch){
		dispatch(fetchUsersRequest());
		dispatch(openNotification());
		axios.get('/projects/getusers', {
			params: {
				userName: userName
			}
		})
		.then(function(res){
			dispatch(fetchUsersSuccess(res.data.users));
		})
		.catch(function(err){
			dispatch(fetchUsersFailure(err));
		});
	}
}


export function fetchUsers(projectId){
	return function(dispatch){
		dispatch( fetchUsersRequest() );
		dispatch(openNotification());
		axios.get('/projects/getusers', {
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch( fetchUsersSuccess(res.data.users) );
		})
		.catch(function(err){
			dispatch( fetchUsersFailure(err) );
		});
	}
}

export function fetchUsersRequest(){
	return {
		type: 'FETCH_USERS_REQUEST'
	}
}

export function fetchUsersSuccess(users){
	return {
		type: 'FETCH_USERS_SUCCESS',
		payload: users
	}
}

export function fetchUsersFailure(err){
	return {
		type: 'FETCH_USERS_FAILURE',
		payload: {
			errors: err
		}
	}
}



export function findTagsByName(tagName){
	return function(dispatch){
		dispatch(fetchTagsRequest());
		axios.get('/projects/gettags', {
			params: {
				tagName: tagName
			}
		})
		.then(function(res){
			dispatch(fetchTagsSuccess(res.data));
		})
		.catch(function(err){
			dispatch(fetchTagsFailure(err));
		});
	}
}


export function fetchTags(projectId){
	return function(dispatch){
		dispatch(fetchTagsRequest());
		dispatch(openNotification());
		axios.get('/projects/fetchtags', {
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch( fetchTagsSuccess(res.data) );
		})
		.catch(function(err){
			dispatch( fetchTagsFailure(err) );
		});
	}
}

export function fetchTagsRequest(){
	return {
		type: 'FETCH_TAGS_REQUEST'
	}
}

export function fetchTagsSuccess(tags){
	return {
		type: 'FETCH_TAGS_SUCCESS',
		payload: tags
	}
}

export function fetchTagsFailure(err){
	return {
		type: 'FETCH_TAGS_FAILURE',
		payload: {
			errors: err
		}
	}
}


export function saveTag(tagName, projectId){		//return value from action or dispatch ?
	return function(dispatch){
		dispatch(saveTagsRequest());
		dispatch(openNotification());
		axios.post('/projects/addtag', {
			tagName: tagName,	
			projectId: projectId
		})
		.then(function(res){
			dispatch( saveTagsSuccess(res.data) );
		})
		.catch(function(err){
			dispatch( saveTagsFailure(err) );
		});
	}
}

export function saveTagsRequest(){
	return {
		type: 'SAVE_TAGS_REQUEST'
	}
}

export function saveTagsSuccess(tags){
	return {
		type: 'SAVE_TAGS_SUCCESS',
		payload: tags
	}
}

export function saveTagsFailure(err){
	return {
		type: 'SAVE_TAGS_FAILURE',
		payload: {
			errors: err
		}
	}
}



export function openNotification(){
	return {
		type: 'OPEN_NOTIFICATION'
	}
}

export function closeNotification(){
	return {
		type: 'CLOSE_NOTIFICATION'
	}
}

export function searchInput(model, searchObj, parentId){
	const modelName = model;
	return function(dispatch){
		dispatch(searchInputRequest());
		dispatch(openNotification());
		axios.post('/tasks/searchinput', {
				model: model,
				searchObj: searchObj,
				parentId: parentId
		})
		.then(function(res){
			if(modelName == 'project'){
				dispatch(updateProjectArr(res.data.projects));
			} else if (modelName == 'tasklist'){
				dispatch(updateTasklistArr(res.data.tasklists));
			} else if (modelName == 'task'){
				dispatch(updateTaskArr(res.data.tasks));
			}
		})
		.catch(function(err){
			dispatch(searchInputFailure(err));
		});
	}
}

export function searchInputRequest(){
	return {
		type: 'SEARCH_INPUT_REQUEST'
	}
}

export function updateProjectArr(projects){
	return {
		type: 'UPDATE_PROJECT_ARR',
		payload: projects
	}
}
export function updateTasklistArr(tasklists){
	return {
		type: 'UPDATE_TASKLIST_ARR',
		payload: tasklists
	}
}
export function updateTaskArr(tasks){
	return {
		type: 'UPDATE_TASK_ARR',
		payload: tasks
	}
}

export function searchInputFailure(err){
	return {
		type: 'SEARCH_INPUT_FAILURE',
		payload: {
			errors: err
		}
	}
}


export function updateCurrentFilter(searchContent){
	return function(dispatch){



	}
}
import axios from 'axios';

export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

export const FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS';
export const FETCH_FILES_FAILURE = 'FETCH_FILES_FAILURE';

export const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';
export const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE';
export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS';
export const DELETE_FILE_FAILURE = 'DELETE_FILE_FAILURE';

export function uploadFile(e, projectId){
	return function(dispatch){
		let file = e.target.files[0];
		let user = jwt_decode(localStorage.getItem('token'));
		let data = new FormData();
		data.append('projectId', projectId);
		data.append('creatorId', user.sub);
		data.append('creatorName', user.name);
		data.append('uploadDate', new Date());
		data.append('file', file);
		axios.post('/filecenter/upload', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(function(res){
				dispatch(uploadFileSuccess({
					file:res.data.file
				}));
			})
			.catch(function(err){
				dispatch(uploadFileFailure(err));
			});
	}
}

export function uploadFileSuccess(file){
	return {
		type: 'UPLOAD_FILE_SUCCESS',
		payload: file
	}
}

export function uploadFileFailure(err){
	return {
		type: 'UPLOAD_FILE_FAILURE',
		payload: err
	}
}

export function updateUploadProgress(data){
	return {
		type: 'UPDATE_UPLOAD_PROGRESS',
		payload: {
			lastModified: data.lastModified,
			filename: data.filename,
			fileSize: data.fileSize,
			folder: data.folder,
			percentage: data.percentage
		}
	}
}

export function addUploadFile(data){
	return {
		type: 'ADD_UPLOAD_FILE',
		payload: {
			lastModified: data.lastModified,
			filename: data.filename,
			fileSize: data.fileSize,
			folder: data.folder,
			percentage: data.percentage
		}
	}
}
export function fetchFiles(projectId){
	return function(dispatch){
		axios.get('/filecenter/fetch',{
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch(fetchFilesSuccess(res.data.files));
		})
		.catch(function(err){
			dispatch(fetchFilesFailure(err));
		});
	}
}

export function fetchFilesSuccess(files){
	return {
		type: 'FETCH_FILES_SUCCESS',
		payload: files
	}
}
export function fetchFilesFailure(err){
	return {
		type: 'FETCH_FILES_FAILURE',
		payload: err
	}
}

export function deleteFile(fileId){
	return function(dispatch){
		axios.get('/filecenter/delete', {
			params: {
				fileId: fileId
			}
		})
		.then(function(res){
			dispatch(deleteFileSuccess(res.data.fileId));
		})
		.catch(function(err){
			dispatch(deleteFileFailure(err));
		});
	}
}

export function deleteFileSuccess(fileId){
	return {
		type: 'DELETE_FILE_SUCCESS',
		payload: fileId
	}
}
export function deleteFileFailure(err){
	return {
		type: 'DELETE_FILE_FAILURE',
		payload: err
	}
}
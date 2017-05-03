import axios from 'axios';

export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

export function uploadFile(e){
	return function(dispatch){
		let file = e.target.files[0];
		let user = jwt_decode(localStorage.getItem('token'));
		let data = new FormData();
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
					file:res.data.file, 
					creatorName: res.data.creatorName,
					creatorId: res.data.creatorId 
				}));
			})
			.catch(function(err){
				dispatch(uploadFileFailure(err));
			});
	}
}

export function uploadFileSuccess(fileData){
	return {
		type: 'UPLOAD_FILE_SUCCESS',
		payload: fileData
	}
}

export function uploadFileFailure(err){
	return {
		type: 'UPLOAD_FILE_FAILURE',
		payload: err
	}
}
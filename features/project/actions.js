import axios from 'axios';

export const ADD_PROJECT = 'ADD_PROJECT';
export const FETCH_PROJECT = 'FETCH_PROJECT';

export function addProject(payload){

	return function(dispatch){
		axios.post('/project/addproject',payload)
		.then(function(res){
			console.log(res.data.message, res.data.owner);
		})
		.catch(function(err){
			console.log(err);
		});	
	}
	

}

export function fetchProject(){
	return function(dispatch){
		axios.get('/project/fetch')
		.then(function(res){
			console.log(res.data);
		})
		.catch(function(err){
			console.log(err);
		});
	}
}
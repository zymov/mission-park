import axios from 'axios';

export const FETCH_PROJECT = 'FETCH_PROJECT';

export function fetchProject(){
	return function(dispatch){
		axios.get('/')
		.then(function(res){
			console.log(res.body);
		})
		.catch(function(err){
			console.log(err);
		});
	}
}
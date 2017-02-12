import axios from 'axios';

export const ADD_TASK = 'ADD_TASK';

export function addTask(taskName){
	return function(dispatch){
		axios.post('/task/addtask', {
			taskName: taskName
		})
		.then(function(res){
			console.log(res.data.message);

		})
		.catch(function(error){
			console.log(error);
		});
	}
}
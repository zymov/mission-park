module.exports = {

		validateTaskForm: function (formBody){
		let errors = {};
		let isFormValid = true;

		if(typeof formBody.taskName !== 'string' || formBody.taskName.trim() === ''){
			isFormValid = false; errors.taskName = true;
		} 
		//if dueDate is not required field, remove it.
		if(typeof formBody.dueDate !== 'string' || formBody.dueDate.trim() === ''){
			isFormValid = false; errors.dueDate = true;
		}
		return {
			isFormValid,
			errors
		};

	},

	validateTasklistForm: function (formBody){
		let errors = {};
		let isFormValid = true;

		if(typeof formBody.tasklistName !== 'string' || formBody.tasklistName.trim() === ''){
			isFormValid = false; errors.tasklistName = true;
		} 
		//if dueDate is not required field, remove it.
		if(typeof formBody.dueDate !== 'string' || formBody.dueDate.trim() === ''){
			isFormValid = false; errors.dueDate = true;
		}
		return {
			isFormValid,
			errors
		};
	},

	validateProjectForm: function (formBody){
		let errors = {};
		let isFormValid = true;

		if(typeof formBody.projectName !== 'string' || formBody.projectName.trim() === ''){
			isFormValid = false; errors.projectName = true;
		} 
		return {
			isFormValid,
			errors
		};
	}

}
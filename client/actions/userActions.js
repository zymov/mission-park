export function loginRequest(){
	return {
		type: USER_LOGIN_REQUEST
	}
}
export function loginSuccess(token){
	localStorage.setItem('token', token);
	return {
		type: USER_LOGIN_SUCCESS,
		payload: {
			token: token
		}
	}
}
export function loginFailure(err){
	localStorage.removeItem('token');
	return {
		type: USER_LOGIN_FAILURE,
		payload: {
			status: error.response.status,
			statusText: error.response.statusText
		}
	}
}
export function logout(){
	localStorage.removeItem('token');
	return {
		type: USER_LOGOUT
	}
}

export function signinUser(email, password, redirect='/'){
	return function(dispatch){
		dispatch(loginRequest());
		formData = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
		const xhr = new XMLHttpRequest();
		xhr.open('post', '/auth/login');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = 'json';
		xhr.addEventListener('load', ()=>{
			if(xhr.status === 200){
				dispatch(loginSuccess(xhr.response.token));
				this.context.router.replace(redirect);
			} else {
				// const errors = xhr.response.errors ? xhr.response.errors : {};
				// errors.summary = xhr.response.message;
				dispatch(loginFailure({
					payload: {
						status: xhr.status,
						statusText: xhr.response.message
					}
				}));
			}
		});
		xhr.send(formData);
	}
}

export function signupUser(name, email, password, redirect='/'){
	// const name = encodeURIComponent(this.state.user.name);
 //  const email = encodeURIComponent(this.state.user.email);
 //  const password = encodeURIComponent(this.state.user.password);
 //  const formData = `name=${name}&email=${email}&password=${password}`;

 
}

export function receivePersonalHomeData(data) {
	return {
		type: RECEIVE_PERSONAL_HOME_DATA,
    payload: {
      data: data
    }
	}
}

export function fetchPersonalHomeDataRequest() {
  return {
    type: FETCH_PERSONAL_HOME_DATA_REQUEST
  }
}

export function fetchPersonalHomeData(token) {
	return (dispatch, state) => {
		dispatch(fetchPersonalHomeDataRequest());
		const xhr = new XMLHttpRequest();
    xhr.open('get', '/');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${token}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        dispatch(receiveProtectedData(xhr.response.data))
      } else {
      	// if()
      }
    });
    xhr.send();
	}
}

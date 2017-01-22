export function checkHttpStatus(response){
	if(response.status >= 200 && response.status < 300){
		return response;
	} else {
		var err = new Error(response.statusText);
		err.response = response;
		throw err;
	}
}

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}


export function checkUserSignin(){
  return !!localStorage.getItem('token');
}

export function deAuthenticateUser(){
  localStorage.removeItem('token');
}
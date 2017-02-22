module.exports = {


  checkHttpStatus: function (response){
  	if(response.status >= 200 && response.status < 300){
  		return response;
  	} else {
  		var err = new Error(response.statusText);
  		err.response = response;
  		throw err;
  	}
  },

  createConstants: function (...constants) {
      return constants.reduce((acc, constant) => {
          acc[constant] = constant;
          return acc;
      }, {});
  },

  createReducer: function (initialState, reducerMap) {
    return (state = initialState, action) => {
      const reducer = reducerMap[action.type];

      return reducer
        ? reducer(state, action.payload)
        : state;
    };
  },


  checkUserSignin: function (){
    return !!localStorage.getItem('token');
  },

  deAuthenticateUser: function (){
    localStorage.removeItem('token');
  },

  addNewObjectToList: function (list, newObject){
    list.unshift(newObject);
    return list;
  },

  getQueryVariable: function (url, key){
    var query = url.split('?')[1];
    var variables = query.split('&');
    for(var i = 0; i < variables.length; i++){
      var pair = variables[i].split('=');
      if(key == pair[0]){
        return pair[1];
      }
    }
    return null;
  }

}

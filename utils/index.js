module.exports = {

  that: this,

  priorityList: ['一般', '紧急', '非常紧急'],
  priorityColors: ['#555', '#ffaf38', '#ff4f3e'],
  repeatList: ['不重复', '每小时', '每天', '每周', '每月', '每年'],
  repeatFuncList: ['', 'Hours', 'Date', 'Date', 'Month', 'FullYear'],

  escapeRegex: function(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },

  formatDate: function(date){
    return date.replace('T', ' ').slice(0, -8);
  },

  checkHttpStatus: function (response){
  	if(response.status >= 200 && response.status < 300){
  		return response;
  	} else {
  		var err = new Error(response.statusText);
  		err.response = response;
  		throw err;
  	}
  },

  createConstants: function (...constants) {    //check usage
      return constants.reduce((acc, constant) => {
          acc[constant] = constant;
          return acc;
      }, {});
  },

  createReducer: function (initialState, reducerMap) {    //check usage
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

  addNewItemToArrayBegin: function (list, newObject){
    var newList = list.slice(0);
    newList.unshift(newObject);
    return newList;
  },

  addNewItemToArrayEnd: function (list, newObject){
    return list.concat(newObject);
  },

  getQueryVariable: function (url, key){
    if(~url.indexOf('?')){
      var query = url.split('?')[1];
      var variables = query.split('&');
      for(var i = 0; i < variables.length; i++){
        var pair = variables[i].split('=');
        if(key == pair[0]){
          return pair[1];
        }
      }
    } else {
      return null;
    }
  },

  getIndexOfArray: function(arr, obj, attribute){
    return arr.map(function(item, index){
      return item[attribute];
    }).indexOf(obj[attribute]);
  },

  getIndexOfArrayByValue: function(arr, attribute, value){
    return arr.map(function(item, index){
      return item[attribute];
    }).indexOf(value);
  },

  removeSpecificItemFromArray: function(arr, obj, attribute){ //return a new array instead of mutating the original array
    return arr.filter(function(object){
      return object[attribute] != obj[attribute];
    });
  },

  updateItemFromArray: function(arr, obj){
    var index = module.exports.getIndexOfArray(arr, obj, '_id')
    var newArr = arr.slice();
    newArr[index] = obj;
    return newArr;
  },

  insertItemFromArray: function(arr, obj, index){
    var newArr = arr.slice();
    newArr.splice(index, 0, obj);
    return newArr;
  },

  updateAndMoveItemFromArray: function(arr, obj){   //this method needs to be optimized!!!
    const self = module.exports;
    if(obj.repeat){
      return self.updateItemFromArray(arr, obj);
    } else{
      var newArr = self.removeSpecificItemFromArray(arr, obj, '_id');
      if(obj.accomplished){
        return self.addNewItemToArrayEnd(newArr, obj);
      } else {
        var index = self.getIndexOfArrayByValue(arr, 'accomplished', true);
        return self.insertItemFromArray(newArr, obj, index);
      }
    } 
  }

}

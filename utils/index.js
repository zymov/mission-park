module.exports = {

  priorityList: ['一般', '紧急', '非常紧急'],
  priorityColors: ['#555', '#ffaf38', '#ff4f3e'],
  priorityMenuList: [
          {name: '一般', style: {color: '#555'}}, 
          {name: '紧急', style: {color: '#ffaf38'}}, 
          {name: '非常紧急', style: {color: "#ff4f3e"}}
        ],
  repeatList: ['不重复', '每小时', '每天', '每周', '每月', '每年'],
  repeatFuncList: ['', 'Hours', 'Date', 'Date', 'Month', 'FullYear'],
  repeatMenuList: [ {name: '不重复'}, {name: '每小时'}, {name: '每天'}, {name: '每周'}, {name: '每月'}, {name: '每年'} ],

  escapeRegex: function(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },

  formatDate: function(date){
    if(!date){return;}
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

  updateItemInArray: function(arr, obj){
    var index = module.exports.getIndexOfArray(arr, obj, '_id')
    var newArr = arr.slice();
    newArr[index] = obj;
    return newArr;
  },

  insertItemIntoArray: function(arr, obj, index){
    var newArr = arr.slice();
    newArr.splice(index, 0, obj);
    return newArr;
  },

  updateAndMoveItemInArray: function(arr, obj){   //this method needs to be optimized!!!
    const self = module.exports;
    if(obj.repeat){
      return self.updateItemInArray(arr, obj);
    } else{
      var newArr = self.removeSpecificItemFromArray(arr, obj, '_id');
      if(obj.accomplished){
        return self.addNewItemToArrayEnd(newArr, obj);
      } else {
        var index = self.getIndexOfArrayByValue(arr, 'accomplished', true);
        return self.insertItemIntoArray(newArr, obj, index);
      }
    } 
  },

  /*
    params:
        obj1: original object, may have other keys
        obj2: be compared object, has the key you want to be compared
  */
  checkPropertyEquals: function(obj1, obj2){
    let keys = Object.keys(obj2);
    return keys.every(function(item, index){
      return obj1[item] == obj2[item];
    });
  }

}

module.exports = {

  emojiList: ['&#x1F600;', '&#x1F601;', '&#x1F602;', '&#x1F603;', '&#x1F604;', '&#x1F605;', '&#x1F606;', '&#x1F607;', '&#x1F608;', '&#x1F609;', '&#x1F60A;', '&#x1F60B;', '&#x1F60C;', '&#x1F60D;', '&#x1F60E;', '&#x1F60F;', '&#x1F610;', '&#x1F611;', '&#x1F612;', '&#x1F613;', '&#x1F614;', '&#x1F615;', '&#x1F616;', '&#x1F617;', '&#x1F618;', '&#x1F619;', '&#x1F61A;', '&#x1F61B;', '&#x1F61C;', '&#x1F61D;', '&#x1F61E;', '&#x1F61F;', '&#x1F620;', '&#x1F621;', '&#x1F622;', '&#x1F623;', '&#x1F624;', '&#x1F625;', '&#x1F626;', '&#x1F627;', '&#x1F628;', '&#x1F629;', '&#x1F62A;', '&#x1F62B;', '&#x1F62C;', '&#x1F62D;', '&#x1F62E;', '&#x1F62F;', '&#x1F630;', '&#x1F631;', '&#x1F632;', '&#x1F633;', '&#x1F634;', '&#x1F635;', '&#x1F636;', '&#x1F637;', '&#x1F638;', '&#x1F639;', '&#x1F63A;', '&#x1F63B;', '&#x1F63C;', '&#x1F63D;', '&#x1F63E;', '&#x1F63F;', '&#x1F640;', '&#x1F641;', '&#x1F642;', '&#x1F643;', '&#x1F644;'],
  priorityList: ['一般', '紧急', '非常紧急'], // not used
  priorityColors: ['#555', '#ffaf38', '#ff4f3e'],
  priorityMenuList: [
          {name: '一般', style: {color: '#555'}}, 
          {name: '紧急', style: {color: '#ffaf38'}}, 
          {name: '非常紧急', style: {color: "#ff4f3e"}}
        ],
  repeatList: ['不重复', '每小时', '每天', '每周', '每月', '每年'],
  repeatFuncList: ['', 'Hours', 'Date', 'Date', 'Month', 'FullYear'],
  repeatMenuList: [ {name: '不重复'}, {name: '每小时'}, {name: '每天'}, {name: '每周'}, {name: '每月'}, {name: '每年'} ],
  taskToolMenuList: [ {name: '删除'} ],
  tasklistToolMenuList: [ {name: '删除'} ],
  projectToolMenuList: [ {name: '删除'} ],
  taskAttrMenuList: [ {name: '任务名称', keyName: 'taskName'}, {name: '标签', keyName: 'tags'}, {name: '参与者', keyName: 'executors.name'} ],

  sendmsgMenuList: [ {name: '按Enter发送消息', keyName: 1}, {name: '按Ctrl+Enter发送消息', keyName: 2} ],

  escapeRegex: function(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },

  formatDate: function(date){
    if(!date){ return null; }
    return date.replace('T', ' ').slice(0, -8);
  },

  getLocaleDate: function(date){
    if(!date){ return null; }
    let utc = new Date(date);
    utc.setHours(utc.getHours() + 8);
    return utc;
  },

  getLocaleDateR: function(date){
    let utc = new Date(date);
    utc.setHours(utc.getHours() - 8);
    return utc;
  },

  checkHttpStatus: function (response){
  	if(response.status >= 200 && response.status < 300){
  		return response;
  	} else {
  		let err = new Error(response.statusText);
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

  leaveChatRoom: function(){
    socket.emit('leave', {token: localStorage.getItem('token')});
  },

  deAuthenticateUser: function (){
    socket.emit('leave', {token: localStorage.getItem('token')});
    localStorage.removeItem('token');
  },

  addNewItemToArrayBegin: function (list, newObject){
    let newList = list.slice(0);
    newList.unshift(newObject);
    return newList;
  },

  addNewItemToArrayEnd: function (list, newObject){
    return list.concat(newObject);
  },

  getQueryVariable: function (url, key){
    if(url.indexOf(key) == -1){return null;}
    if(~url.indexOf('?')){
      let query = url.split('?')[1];
      let variables = query.split('&');
      for(let i = 0; i < variables.length; i++){
        let pair = variables[i].split('=');
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

  getArrayOfSpecKey: function(arr, key){
    return arr.map(function(item, index){
      return item[key];
    })
  },

  removeSpecificItemByAttrValue: function(arr, attribute, value){
    return arr.filter(function(object){
      return object[attribute] != value;
    });
  },

  removeSpecificItemFromArray: function(arr, obj, attribute){ //return a new array instead of mutating the original array
    return arr.filter(function(object){
      if(attribute){
        return object[attribute] != obj[attribute];
      } else {
        return object != obj;
      }
    });
  },

  updateItemInArray: function(arr, obj){
    let index = module.exports.getIndexOfArray(arr, obj, '_id')
    let newArr = arr.slice();
    newArr[index] = obj;
    return newArr;
  },

  insertItemIntoArray: function(arr, obj, index){
    let newArr = arr.slice();
    newArr.splice(index, 0, obj);
    return newArr;
  },

  updateAndMoveItemInArray: function(arr, obj){   //this method needs to be optimized!!!
    const self = module.exports;
    if(obj.repeat){
      return self.updateItemInArray(arr, obj);
    } else{
      let newArr = self.removeSpecificItemFromArray(arr, obj, '_id');
      if(obj.accomplished){
        return self.addNewItemToArrayEnd(newArr, obj);
      } else {
        let index = self.getIndexOfArrayByValue(arr, 'accomplished', true);
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
      if(item == 'dueDate'){
        let dueDate1 = module.exports.formatDate(obj1[item]);
        return dueDate1 == obj2[item];
      }
      return obj1[item] == obj2[item];
    });
  },

  isEmptyObject: function(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },

  deepCloneObject: function(obj){
    return JSON.parse(JSON.stringify(obj));
  }

}

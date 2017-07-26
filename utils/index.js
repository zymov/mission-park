module.exports = {

  repeatFuncList: ['', 'Hours', 'Date', 'Date', 'Month', 'FullYear'],

  setEndOfContenteditable: function(contentEditableElement){
    let range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
  },

  getHTMLCaretPosition: function(element){
    var textPosition = module.exports.getCaretCharacterOffsetWithin(element),
        htmlContent = element.innerHTML,
        textIndex = 0,
        htmlIndex = 0,
        insideHtml = false,
        htmlBeginChars = ['&', '<'],
        htmlEndChars = [';', '>'];
    if (textPosition == 0) {
      return 0;
    }
    while(textIndex < textPosition) {
      htmlIndex++;
      // check if next character is html and if it is, iterate with htmlIndex to the next non-html character
      while(htmlBeginChars.indexOf(htmlContent.charAt(htmlIndex)) > -1) {
        // console.log('encountered HTML');
        // now iterate to the ending char
        insideHtml = true;
        while(insideHtml) {
          if (htmlEndChars.indexOf(htmlContent.charAt(htmlIndex)) > -1) {
            if (htmlContent.charAt(htmlIndex) == ';') {
              htmlIndex--; // entity is char itself
            }
            // console.log('encountered end of HTML');
            insideHtml = false;
          }
          htmlIndex++;
        }
      }
      textIndex++;
    }
    //console.log(htmlIndex);
    //console.log(textPosition);
    // in htmlIndex is caret position inside html
    return htmlIndex;
    },

  getCaretCharacterOffsetWithin: function(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  },

  formatFileSize: function(size){
    let s = '';
    if(size < 1024){
      return size + 'B';
    } else if(1024 < size && size < 1024*1024){
      s = size/1024;
      return s.toFixed(1) + 'KB';
    } else if(1024*1024 < size && size < 1024*1024*1024){
      s = size/(1024*1024);
      return s.toFixed(1) + 'MB';
    } else {
      return '大于1GB';
    }

  },

  emptyInputValue: function(e){
    e.target.value = null;
  },

  escapeRegex: function(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },

  formatDate: function(date){
    if(!date){ return ""; }
    return date.replace('T', ' ').slice(0, -8);
  },

  getLocaleDate: function(date){
    if(!date){ return ""; }
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

  removeSpecificItemByAttrValue: function(arr, attribute, value){   //same as the next function...
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

  updateItemInArray: function(arr, obj, attribute){
    let index = module.exports.getIndexOfArray(arr, obj, attribute);
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
      return self.updateItemInArray(arr, obj, '_id');
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

import React from 'react';

class DropdownInput extends React.Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		
	}

	render(){


	  return (
	  	<div className="dd">
	  		<div className="dd-input">
		  		<input type="text" className="form-control" placeholder="查找"/>
	  		</div>
  		  <ul className="dd-menu" >
  		  	<li><a className="menu-item" href="javascript:void(0);" ><img src="/static/imgs/100.png"/>asdklaskj</a></li>
  		    <li><a className="menu-item" href="javascript:void(0);" ><img src="/static/imgs/100.png"/>asdkla</a></li>
  		    <li><a className="menu-item" href="javascript:void(0);" ><img src="/static/imgs/100.png"/>asdklskj</a></li>
  		    <li><a className="menu-item" href="javascript:void(0);" ><img src="/static/imgs/100.png"/>asdklasdaaskj</a></li>
  		  </ul>
  	  </div>
  	);
	}

}


export default DropdownInput;
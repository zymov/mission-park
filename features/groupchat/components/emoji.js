import React from 'react';

class Emoji extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			showEmoji: false
		};
		this.documentClick = this.documentClick.bind(this);
	}

	toggleEmojiList(e){
		if(this.state.showEmoji) {
			this.setState({
				showEmoji: false
			});
		} else {
			this.setState({
				showEmoji: true
			});
		}
	}

	componentDidMount(){
		document.addEventListener('click', this.documentClick, false);
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.documentClick, false);
	}

	documentClick(e){
		if(!$('.emoji-wapper')[0].contains(e.target)){
			this.setState({
				showEmoji: false
			});
		}
	}

	render(){

		let emojiList = [];
		for(let i = 0; i < 5; i++){
			for(let j = 48; j < 71; j++){
				if(i == 4 && j == 53){
					break;
				}
				if(j == 58){
					j = 65;
				}

				let str = i + String.fromCharCode(j).toLowerCase();
				emojiList.push(
					<li className="emoji-item" key={str} onClick={this.props.sendEmoji.bind(this)}>
						<img alt={`emoji${str}`} src={`../../../static/imgs/faceEmoji/1f6${str}.png`} />
					</li>
				);
			}
		}

		return(
			<div className="emoji-wapper">
				<div className="emoji" onClick={this.toggleEmojiList.bind(this)}>
					<img alt="emoji" src="../../../static/imgs/faceEmoji/1f600.png" />
				</div>
				{
					this.state.showEmoji && <ul className="emoji-list">
						{emojiList}
					</ul>
				}
			</div>
		);

	}

}

export default Emoji;
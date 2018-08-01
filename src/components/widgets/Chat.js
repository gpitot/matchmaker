import React, {Component} from 'react';
import { 
	sendMessage,
	recieveMessage
} from '../../components/socket/Socket';

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mymessage:'',
			messages:[]
		}



		recieveMessage((data)=> {
			let messages = this.state.messages.slice();
			messages.push(data);
			this.setState({messages:messages});
		})



		this.onChange = this.onChange.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.newMessage = this.newMessage.bind(this);


	}


	componentDidUpdate(prevProps) {
		if (this.props.isFullLobby !== prevProps.isFullLobby) {
			let messages = this.state.messages.slice();
			messages.push({
				message:"Lobby is now full, will the top laner from team 1 please create a game, and give the password to everyone in the chat",
				user:"ADMIN",
				type:'admin'
			});
			this.setState({messages:messages});
		}
	}


	onChange(e) {
		this.setState({mymessage:e.target.value});
	}

	newMessage() {
		let message = {
			message:this.state.mymessage,
			user:this.props.user.username
		}

		if (message.message.length < 1) return

		let lobbyid = this.props.lobbyid;
		let session = this.props.session;
		
		sendMessage(session, lobbyid, message);

		this.setState({mymessage:''})
	}



	onKeyPress(e) {
		if (e.keyCode === 13) {
			this.newMessage();
		}
	}




	render() {
		return (
			<div className = "chatArea">

				<div className = "messages">
					{
						this.state.messages.map((message, i) => {
							return (
								<p key = {i}
								className = {message.type === 'admin' ? 'admin message' : 'message'}
								>[{message.user}] : {message.message}</p>

							);
						})
					}

				</div>

				<input 
					type = "text"
					value = {this.state.mymessage}
					onChange = {this.onChange}
					onKeyDown = {this.onKeyPress}
				/>
				<input type = "submit"
					onClick = {this.newMessage}
					value = "Send"
				/>

			</div>
		);
	}
}


export default Chat;
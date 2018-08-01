import React, {Component} from 'react';


import { getInviteUrl_Api } from '../../components/api/Account_Api';



class Profile extends Component {

	constructor(props) {
		super(props);


		this.state = {
			password:'',
			code:'',
			stage:false,
			buttonText:'Invite a friend',
			url:'',
			urlCopied:false
		}


		this.invite = this.invite.bind(this);
		this.changePassword = this.changePassword.bind(this);

	}


	invite() {
		let stage = this.state.stage;
		if (stage === false) {
			this.setState({stage:'password', buttonText: 'Submit'})

			return
		}


		if (stage === 'password' && this.state.password != '') {
			this.setState({stage:'code', buttonText: 'Hide'});

			let session = this.props.session;
			let password = this.state.password;
			if (session === null) return;

			getInviteUrl_Api(session, password)
				.then((data) => {
					console.log(data);
					if (data.url != null) {
						let url = process.env.PUBLIC_URL + '/register?code=' + data.url;
						this.setState({url:url})

						navigator.clipboard.writeText(url)
							.then(() => {
								console.log(this);
								this.setState({
									urlCopied:true,
									
								});
							}, (err) => {
								
							});
					}
				});

			return
		}

		if (stage === 'code') {
			this.setState({
				stage:false, 
				buttonText: 'Invite a friend',
				password:'',
				code:'',
				urlCopied:false
			});
		}
		
	}


	changePassword(e) {
		this.setState({password:e.target.value});
	}





	showCode() {
		if (this.state.stage === false) return;

		if (this.state.stage === 'password') {
			return (
				<div className = "code">
					<input
						type = "password"
						className = "code-gen"

						onChange = {this.changePassword}
						value = {this.state.password}
					/>
					

					
					<div className = "code-info">
						Enter a password that your friend will use to register
					</div>

				</div>
			);
		}
		//else in code stage
		return (
			<div className = "code">	

				<input
					type = "text"
					className = "code-gen"

					value = {this.state.url}
				/>

				<div className = "code-info">
					Give this url to a friend and they will be able to register an account. 
					<p>This url can only be used once.</p>
				</div>

			</div>
		);
	}

	render() {
		return (
			<div className = "profile">

				<div className = "user">{this.props.user.username}</div>

				<div className = "invite">
					<div 
						onClick = {this.invite}
						className = "invite-button">

						{this.state.buttonText}
					</div>

					{this.state.urlCopied ? "Url copied to clipboard" : ""}

					{this.showCode()}

				</div>

			</div>
		);
	}
}




export default Profile;
import React, {Component} from 'react'

import { login_Api } from '../../components/api/Account_Api';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username:'',
			password:''
		}


		this.login = this.login.bind(this);
		this.usernameChange = this.usernameChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
	}

	login(e) {
		e.preventDefault();
		login_Api(this.state.username, this.state.password).then(data=> {
			
			if (data.session) {
				//logged in correctly
				localStorage.setItem('session', data.session);
				this.props.onLogin(data.session);
			}
		});
	}

	usernameChange(event) {
		this.setState({username: event.target.value});
	}

	passwordChange(event) {
		this.setState({password: event.target.value});
	}
	


	render() {

		return (
			<form className = "registerForm">
				<div className = "info">username</div>
				<input
					type = "text" 
					onChange = {this.usernameChange}
					value = {this.state.username}
				/>
				<div className = "info">password</div>
				<input
					type = "password" 
					onChange = {this.passwordChange}
					value = {this.state.password}
				/>

				<button 
					className="btn draw-border"
					onClick = {this.login}
				>Login</button>


			</form>

		);
		
	}
}

export default Login;

import React, {Component} from 'react'

import {
	register_Api,
	getUser_Api
} from '../../components/api/Account_Api';

class Register extends Component {

	constructor(props) {
		super(props);

		let params = parseQueryParams(this.props.location.search);
		let session = getSession();

		this.state = {
			code:params.code,
			code_password:'',
			username:'',
			password:'',
			verify_password:'',

			stage:0,
			session:session
		}



		
		this.getUser(session);
	
		

		this.inputChanged = this.inputChanged.bind(this);
		this.submit = this.submit.bind(this);
	}

	getUser(session) {
		//check if session is valid
		//returns user id, username etc
		//if None then go to login
		getUser_Api(session).then((data)=>{
			

			if (data.playerid != null) {
				this.props.history.push({
					pathname: process.env.PUBLIC_URL + '/'
	    		})
			} 
		});
	}


	inputChanged(e , key) {
		if (key === 'code_password') {
			this.setState({code_password:e.target.value});
		} else if (key === 'username') {
			this.setState({username:e.target.value});
		} else if (key === 'password') {
			this.setState({password:e.target.value});
		} else if (key === 'verify_password') {
			this.setState({verify_password:e.target.value});
		}
	}

	submit() {
		let stage = this.state.stage;
		if (stage === 0) {
			this.setState({stage:1})
			return
		}

		if (stage === 1) {
			this.setState({stage:2})

			console.log("attempt register")

			let username = this.state.username;
			let password = this.state.password;
			let verify_password = this.state.verify_password;
			let code = this.state.code;
			let code_password = this.state.code_password;
			if (this.checkClientSideValid(username, password, verify_password, code, code_password)) {
				console.log("client side valid");
				register_Api(username, password, code, code_password)
					.then((data) => {
						console.log(data);
						if (data.session) {
							localStorage.setItem('session', data.session);
							this.getUser(data.session);
						} else {
							//invalid info
						}
					})
			}
		}
	}

	checkClientSideValid(u, p, vp, c, cp) {
		console.log(u, p, vp, c, cp);
		return (u.length > 4 && p.length > 4 && p === vp && c.length > 6);
	}


	renderStage() {
		let stage = this.state.stage;
		if (stage === 0) {
			return (
					<div>
						<div className = "info">Enter the password that was given to you with this url</div>
						<input 
							type = "password"

							value = {this.state.code_password}
							onChange = {(e)=>{this.inputChanged(e, 'code_password')}}
						/>
						<button className="btn draw-border"
							type = "submit"
							onClick = {this.submit}
						>Submit</button>
					</div>
			);
		}

		if (stage === 1) {
			return (
					<div>
						<div className = "info">username</div>
						<input 
							type = "text"

							value = {this.state.username}
							onChange = {(e)=>{this.inputChanged(e, 'username')}}
						/>

						<div className = "info">password</div>
						<input 
							type = "password"

							value = {this.state.password}
							onChange = {(e)=>{this.inputChanged(e, 'password')}}
						/>

						<div className = "info">verify password</div>
						<input 
							type = "password"

							value = {this.state.verify_password}
							onChange = {(e)=>{this.inputChanged(e, 'verify_password')}}
						/>

						<button className="btn draw-border"
							type = "submit"
							onClick = {this.submit}
						>Submit</button>
					</div>
			);
		}
	}

	render() {
		if (this.state.code === null || this.state.code === undefined) return <div>Missing url code</div>
		return (
			<form className = "registerForm">
				{this.renderStage()}
			</form>

		);
	}

}



function parseQueryParams(params) {
	if (params.slice(0,1) === '?') params = params.slice(1);
	params = params.split('&');

	let d= {}

	for (let p of params) {
		let k = p.split('=');
		if (k.length > 1) {
			d[k[0]] = k[1];
		}
	}
	return d;
}


function getSession() {

	return localStorage.getItem('session');

}

export default Register;
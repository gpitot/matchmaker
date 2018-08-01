

const HOST = 'http://localhost:5000';

export function getUser_Api(session) {
	let url = HOST + '/getUserBySession';
	let data = {
		session:session
	}


	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(url, config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		});
}


export function login_Api(username, password) {
	let url = HOST + '/login';
	let data = {
		username:username,
		password:password
	}


	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(url, config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		});
}


export function logout_Api(session) {
	
}



export function register_Api(username, password, code, code_password) {
	let url = HOST + '/register';
	let data = {
		username:username,
		password:password,
		code:code,
		code_password:code_password
	}
	
	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(url, config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		});
}



export function getInviteUrl_Api(session, password) {
	let url = HOST + '/invite';
	let data = {
		session:session,
		password:password
	}
	
	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
    	},
	    method: "POST",
	    body: JSON.stringify(data)
	}

	return fetch(url, config)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log(err);
		});
}






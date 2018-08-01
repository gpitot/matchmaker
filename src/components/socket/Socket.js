import openSocket from 'socket.io-client';
const HOST = 'http://localhost:5000';
const socket = openSocket(HOST);

export function startQueue_Socket(playerid, role, session) {
	let data = {
		playerid:playerid,
		role:role,
		session:session
	}

	socket.emit('start_queue', data, function (res) {
		//updatedLobby will be called now
	});
}


export function leaveQueue_Socket(lobbyid, teamid, playerid, session) {
	let data = {
		lobbyid:lobbyid,
		teamid:teamid,
		playerid:playerid,
		session:session
	}



	socket.emit('cancel_queue', data, function (res) {
		//updatedLobby will be called now
	});
}


export function joinsLobby_Socket(cb) {
	socket.on('updatelobby', function (data) {
		cb(data);
	});
}


export function leavesLobby_Socket(cb) {
	socket.on('update_all_lobbies', function (data) {
		cb(data);
	});
}





/* chat */

export function sendMessage(session, lobbyid, message) {
	let data = {
		session:session,
		lobbyid:lobbyid,
		message:message
	}

	socket.emit('sendMessage', data, function(res) {

	})
}

export function recieveMessage(cb) {
	socket.on('recieveMessage', function(data) {
		cb(data);
	})
}
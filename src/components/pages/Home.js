
import React, {Component} from 'react';





import Login from '../../components/pages/Login';
import Queue from '../../components/pages/Queue';
import Lobby from '../../components/pages/Lobby';


import Profile from '../../components/widgets/Profile';
import ServerInfo from '../../components/widgets/ServerInfo';


import { getUser_Api } from '../../components/api/Account_Api';
import { 
	startQueue_Socket,
	joinsLobby_Socket,
	leaveQueue_Socket,
	leavesLobby_Socket
} from '../../components/socket/Socket';







class Home extends Component {
	constructor(props) {
		super(props);

		let session = this.getSession();

		this.state = {
			session:session,
			user:null,
			loggedIn:null, //null until getUser is evald
			role:null,
			lobby:null,
			searching:false
		}

		

		this.getUser = this.getUser.bind(this);
		this.selectRole = this.selectRole.bind(this);
		this.startQueue = this.startQueue.bind(this);


		this.getUser(session);


		joinsLobby_Socket((newlobby) => {
			//somone joins lobby
			this.setState({ 
				lobby:newlobby.lobby 
			})
			
			
		});

		leavesLobby_Socket((lobbies) => {
			//somone leaves lobby
			let playerid = this.state.user.playerid;

			let lobby = getMyLobby(playerid, lobbies.lobbies);
			if (lobby == null) return;
			this.setState({ 
				lobby:lobby 
			})
		});
	}


	getSession() {
		return localStorage.getItem('session');
	}

	getUser(session) {
		//check if session is valid
		//returns user id, username etc
		//if None then go to login

		getUser_Api(session).then((data)=>{
			console.log(data);

			if (data.playerid != null) {
				this.setState({
					user:data,
					loggedIn:true,
					session:session
				})
			}  else {
				this.setState({loggedIn:false})
			}
		});
	}



	selectRole(role) {
		this.setState({
			role:role
		});
	}

	startQueue() {
		//start and cancel queue
		if (this.state.searching) {
			
			let lobbyid = this.state.lobby.lobbyid;
			let teamid = this.getTeamFromPlayerid();
			let playerid = this.state.user.playerid;
			let session = this.state.session;

			if (lobbyid === null || teamid === null || playerid === null || session === null) return;
			this.setState({
				searching:false,
				lobby:null
			});


			leaveQueue_Socket(lobbyid, teamid, playerid, session);

			

			return
		}

		let playerid = this.state.user.playerid;
		let role = this.state.role;
		let session = this.state.session;
		if (playerid === null || role === null || session === null) return;
		this.setState({searching:true});
		startQueue_Socket(playerid, role, session);
	}


	getTeamFromPlayerid() {
		let playerid = this.state.user.playerid;
		let lobby = this.state.lobby;

		if (playerid == null || lobby == null) return null;

		if (lobby.team1.TOP.playerid === playerid || lobby.team1.JUNGLE.playerid === playerid || lobby.team1.MID.playerid === playerid ||
		 lobby.team1.ADC.playerid === playerid || lobby.team1.SUPPORT.playerid === playerid) return lobby.team1.teamid;

		return lobby.team2.teamid;
	}






	render() {

		if (this.state.loggedIn) {
			return (
				<div className="stage">

					<Profile
						user = {this.state.user}
						session = {this.state.session}
					/>
					<Queue
						selectRole = {this.selectRole}
						startQueue = {this.startQueue}
						searching = {this.state.searching}
					/>
					<Lobby 
						lobby = {this.state.lobby}
						user = {this.state.user}
						session = {this.state.session}


						cancelQueue = {this.startQueue}
					/>
					

				</div>
			);
		}

		if (this.state.loggedIn == false) {
			return (
				<Login
					onLogin = {this.getUser}
				/>
			);
		}


		return (<div></div>); //waiting to see if logged in or not *maybe put a loading widget

		
		
	}
}




/* helper functions */
function getMyLobby(playerid, data) {
	//for every lobby check if playerid is in team1 or 2
	for (let L of data) {
		if (inTeam(playerid, L.team1) || inTeam(playerid, L.team2)) return L;
	}
	return null;
}

function inTeam(pid, team) {

	return (team.TOP.playerid === pid || team.JUNGLE.playerid === pid ||
	 team.MID.playerid === pid || team.ADC.playerid === pid || team.SUPPORT.playerid === pid);
}





export default Home;
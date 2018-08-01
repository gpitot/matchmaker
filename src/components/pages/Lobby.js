import React, {Component} from 'react';

import Chat from '../../components/widgets/Chat';
import AfkCheck from '../../components/widgets/AfkCheck'


import TOP_icon from '../../static/images/TOP_icon.png';
import JUNGLE_icon from '../../static/images/JUNGLE_icon.png';
import MID_icon from '../../static/images/MID_icon.png';
import ADC_icon from '../../static/images/ADC_icon.png';
import SUPPORT_icon from '../../static/images/SUPPORT_icon.png';


class Lobby extends Component {


	constructor(props) {
		super(props);


		this.state = {
			isFullLobby : false,
			afkCheck: false
		}

		this.turnOffAfkCheck = this.turnOffAfkCheck.bind(this);

	}

	componentDidUpdate(prevProps) {
		if (this.props.lobby !== prevProps.lobby) {
			let isFull = isFullLobby(this.props.lobby);
			this.setState({
				isFullLobby : isFull,
			})

			if (isFull) {
				this.setState({afkCheck:true});
			}

		}
	}

	turnOffAfkCheck() {
		this.setState({afkCheck:false})
		console.log('turn off afk')
	}



	AfkCHECK() {
		if (this.state.afkCheck) {
			return (
				<AfkCheck 
					cancelQueue = {this.props.cancelQueue}
					turnOffAfkCheck = {this.turnOffAfkCheck}
				/>
			);
		}
	}
	

	


	render() {
		if (this.props.lobby === null || this.props.lobby === undefined) return <div className = "lobby" />

		let team1 = this.props.lobby.team1;
		let team2 = this.props.lobby.team2;

		return (
			<div className = "lobby">
				<div className = "blue-team">
					{renderPlayer(team1, 'TOP')}
					{renderPlayer(team1, 'JUNGLE')}
					{renderPlayer(team1, 'MID')}
					{renderPlayer(team1, 'ADC')}
					{renderPlayer(team1, 'SUPPORT')}
				</div>

				<Chat 
					lobbyid = {this.props.lobby.lobbyid}
					user = {this.props.user}
					session = {this.props.session}

					isFullLobby = {this.state.isFullLobby}


				/>

				<div className = "red-team">
					{renderPlayer(team2, 'TOP')}
					{renderPlayer(team2, 'JUNGLE')}
					{renderPlayer(team2, 'MID')}
					{renderPlayer(team2, 'ADC')}
					{renderPlayer(team2, 'SUPPORT')}
				</div>



				{this.AfkCHECK()}

			</div>
		);
	}
}


function renderPlayer(team , role) {
	
	return (
		<div className = "player">
			<img 
			className = "role"
			src = {renderImage(role)}
			/>
			<div className = "player-username">{team[role].username}</div>
		</div>
	);
}

function renderImage(role) {
	if (role === 'TOP') return TOP_icon;
	if (role === 'JUNGLE') return JUNGLE_icon;
	if (role === 'MID') return MID_icon;
	if (role === 'ADC') return ADC_icon;
	if (role === 'SUPPORT') return SUPPORT_icon;
}



function isFullLobby(lobby) {
	if (lobby === null) return false;
	return lobby.team2.TOP.playerid !== null;
	return (
		lobby.team1.TOP.playerid !== null &&
		lobby.team1.JUNGLE.playerid !== null &&
		lobby.team1.MID.playerid !== null &&
		lobby.team1.ADC.playerid !== null &&
		lobby.team1.SUPPORT.playerid !== null &&

		lobby.team2.TOP.playerid !== null &&
		lobby.team2.JUNGLE.playerid !== null &&
		lobby.team2.MID.playerid !== null &&
		lobby.team2.ADC.playerid !== null &&
		lobby.team2.SUPPORT.playerid !== null
	);
}


export default Lobby;
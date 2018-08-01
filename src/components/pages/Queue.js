import React, { Component } from 'react';

import TOP_icon from '../../static/images/TOP_icon.png';
import JUNGLE_icon from '../../static/images/JUNGLE_icon.png';
import MID_icon from '../../static/images/MID_icon.png';
import ADC_icon from '../../static/images/ADC_icon.png';
import SUPPORT_icon from '../../static/images/SUPPORT_icon.png';



class Queue extends Component {
	constructor(props) {
		super(props);


		this.state = {
			selected : null
		}

	}

	highlightRole(role) {
		this.setState({selected:role});
		this.props.selectRole(role);
	}


	renderRole(role) {
		return (
			<img 
				className = {this.state.selected==role ? "role select-role select-role-selected" : "role select-role"}
				onClick = {()=>{
					this.highlightRole(role);
				}}
				src = {this.renderImage(role)}
			/>
		);
	}

	renderImage(role) {
		if (role === 'TOP') return TOP_icon;
		if (role === 'JUNGLE') return JUNGLE_icon;
		if (role === 'MID') return MID_icon;
		if (role === 'ADC') return ADC_icon;
		if (role === 'SUPPORT') return SUPPORT_icon;
	}



	htmlRoles() {
		if (!this.props.searching) {
			return (
				<div className = "queue-role-select">
					{this.renderRole('TOP')}
					{this.renderRole('JUNGLE')}
					{this.renderRole('MID')}
					{this.renderRole('ADC')}
					{this.renderRole('SUPPORT')}
				</div>

			);
		}

		return 
	}


	render() {
		return (
			<div className = "queue">

				{this.htmlRoles()}

				<div 
					className = "queue-button"
					onClick = {this.props.startQueue}
				>
				{this.props.searching ? "Leave lobby" : "Search for game"}
				</div>

			</div>

		);
	}

}


export default Queue;
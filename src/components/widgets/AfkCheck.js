import React , {Component} from 'react';

import Timer from '../widgets/Timer';



class AfkCheck extends Component {



	constructor(props) {
		super(props);


		this.state = {
			percentage:100,
			accepted:null
		}

		this.timerFn = this.timerFn.bind(this);
		this.DeclinedOrMissed = this.DeclinedOrMissed.bind(this);
		this.Accepted = this.Accepted.bind(this);
		
		console.log(this.props);

		
	}

	componentDidMount() {
		this.timerFn();
	}


	timerFn() {
		const MAX_TIME = 30000;//30 seconds
		let time_left = MAX_TIME; 
		
	
		
		this.timer = setInterval(() => {
			time_left -= 50;


			
			this.setState({
				percentage:(100 / MAX_TIME) * time_left
			})
			
			
			if (time_left <= 0) {
				clearInterval(this.timer);
				this.DeclinedOrMissed();
				

			} 

		}, 50);
	}


	DeclinedOrMissed() {
		console.log('declined or missed');
		clearInterval(this.timer);

		this.props.cancelQueue();
	}

	Accepted() {
		
		clearInterval(this.timer);
		this.props.turnOffAfkCheck();
	}












	render() {
		return (
			<div className = "afkcheck">
				<p>Match found </p>

				<div 
					className = "invite-button half"
					onClick = {this.Accepted}
				>
					Accept
				</div>

				<div 
					className = "decline-button half"
					onClick = {this.DeclinedOrMissed}
					>
					Decline
				</div>

				<div className = "timer">
					
					<Timer 
						percentage = {this.state.percentage}
					/>

					<div className = "full"></div>
					
				</div>
			</div>
		);
	}
	
}



export default AfkCheck;
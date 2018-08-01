import React from 'react';




function Timer(props) {
	return (
		<div 
			className = "actual"
			style = {{width:props.percentage + '%'}}
		/>

	);
}


export default Timer;
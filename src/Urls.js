import React from 'react'
import { Switch, Route } from 'react-router-dom'


import Home from './components/pages/Home';
import Register from './components/pages/Register';


const Urls = (props) => {
 
	return (
		<div>
			<Route exact path={process.env.PUBLIC_URL + '/'} component={Home}/>
			<Route path={process.env.PUBLIC_URL + '/register'} component={Register}/>
		</div>
	);
  
}

export default Urls
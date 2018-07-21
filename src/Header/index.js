import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { GuestMenu, UserMenu } from 'Header/navmenu'

export default class Header extends Component {
    
    render() {
    	console.log(this.props);
    	const headerStyle = {
    		position: (this.props.fixed) ? '' : 'relative'
    	}
    
        return <div id="header" style={headerStyle} >
			<div id="logo">
				<Link to="/"><img src="/images/yepicon.png" /></Link>
			</div>
			<Switch>
				<Route path="/account/:slug" component={UserMenu} />
				<Route path="/:slug?" component={GuestMenu} />
			</Switch>
		</div>
    }
}
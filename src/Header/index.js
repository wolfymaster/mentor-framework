import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import { GuestMenu, UserMenu } from 'Header/navmenu'

export default class Header extends Component {
    
    render() {
    	console.log(this.props);
    	const headerStyle = {
    		position: (this.props.fixed) ? '' : 'relative'
    	}
    
        return <div id="header" style={headerStyle} >
			<div id="logo">
				<a href="/"><img src="/images/yepicon.png" /></a>
			</div>
			<Switch>
				<Route path="/account/:slug" component={UserMenu} />
				<Route path="/:slug?" component={GuestMenu} />
			</Switch>
		</div>
    }
}
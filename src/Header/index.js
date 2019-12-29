import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { Route, Switch, Link } from 'react-router-dom';

import { GuestMenu, UserMenu } from 'Header/navmenu'

class Header extends Component {
    
    constructor(props)
    {
    	super(props);
    }
    
    render() {
    	const headerStyle = {
    		position: (this.props.fixed) ? '' : 'relative'
    	}
    	
        return <div id="header" style={headerStyle} >
			<div id="logo">
				<Link to="/"><img src="http://placehold.it/150x80" /></Link>
			</div>
	          { this.props.auth.isAuthenticated() ?
	        	<UserMenu {...this.props} />
	    	  :
	    		<GuestMenu {...this.props} />
	          }
		</div>
    }
}

export default withRouter(Header)
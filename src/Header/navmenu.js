/* global env */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Registration from 'Registration';

const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, SITE_BASE_URL } = env;

export const GuestMenu = () => (
		<nav id="nav-menu">
            <div className="menu-item">
			    <div className="parent">
					<Registration showStyle={false} />
				</div>
			</div>
			<div className="menu-item">
				<div className="parent">For Mentees</div>
				<div className="submenu">
					<div className="submenu-item">
						<Link to="about-the-YEP-mentor-program">About the YEP Mentor Program</Link>
					</div>
					<div className="submenu-item">
						<Link to="curriculum">Curriculum</Link>
					</div>
					<div className="submenu-item">
						<Link to="find-a-mentor">Find A Mentor</Link>
					</div>
				</div>
			</div>
			<div className="menu-item">
				<div className="parent">For Mentors</div>
				<div className="submenu">
					<div className="submenu-item">
						<Link to="why-become-a-mentor">Why Become a YEP Mentor?</Link>
					</div>
					<div className="submenu-item">
						<Link to="mentor-requirements-expectations">Mentor Requirements & Expectations</Link>
					</div>
					<div className="submenu-item">
						<Link to="mentor-resources">Mentor Resources</Link>
					</div>
				</div>
			</div>
			
			<Link to="frequently-asked-questions">
				<div className="menu-item">
					<div className="parent">
						FAQ
					</div>
				</div>
			</Link>
			
			<Link to="media">
				<div className="menu-item">
					<div className="parent">
						Media
					</div>
				</div>
			</Link>
			
			<Link to="login">
				<div className="menu-item">
					<div className="parent">
						Login
					</div>
				</div>
			</Link>
		</nav>
);


export const UserMenu = (props) => (
		<nav id="nav-menu">
    		<Link to="/find-a-mentor">
	    		<div className="menu-item">
	    			<div className="parent">
	    				Find A Mentor
	    			</div>
	    		</div>
    		</Link>
    		<Link to="/account/management">
	    		<div className="menu-item">
	    			<div className="parent">
	    			    Management
	    			</div>
	    		</div>
    		</Link>
    		
    		<a href={"https://"+AUTH0_DOMAIN+"/v2/logout?client_id="+AUTH0_CLIENT_ID+"&returnTo="+SITE_BASE_URL+"?federated"} onClick={ () => (props.auth.logout()) }>
	    		<div className="menu-item">
	    			<div className="parent logout">Logout</div>
	    		</div>
    		</a>
		</nav>
);
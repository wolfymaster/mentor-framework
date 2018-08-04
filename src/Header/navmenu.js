import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Registration from 'Registration';

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
						<Link to="./about-the-YEP-mentor-program">About the YEP Mentor Program</Link>
					</div>
					<div className="submenu-item">
						<Link to="./curriculum">Curriculum</Link>
					</div>
					<div className="submenu-item">
						<Link to="find-a-mentor">Find A Mentor</Link>
					</div>
				</div>
			</div>
			<div className="menu-item">
				<div className="parent">For Mentors</div>
				<div className="submenu">
					<div className="submenu-item">Why Become a YEP Mentor?</div>
					<div className="submenu-item">Mentor Requirements & Expectations</div>
					<div className="submenu-item">Mentor Resources</div>
				</div>
			</div>
			<div className="menu-item">
				<div className="parent">FAQ</div>
			</div>
			<div className="menu-item">
				<div className="parent">Media</div>
			</div>
			<div className="menu-item">
				<div className="parent">
					<Link to="login">Login</Link>
				</div>
			</div>
		</nav>
);


export const UserMenu = () => (
		<nav id="nav-menu">
        	<div className="menu-item">
    			<div className="parent">
    				<a href="/dashboard.html">Dashboard</a></div>
    		</div>
    		<div className="menu-item">
    			<div className="parent">
    				<a href="find-a-mentor.html">Find A Mentor</a>
    			</div>
    		</div>
    		<div className="menu-item">
    			<div className="parent">
    			    <a href="management-mentor.html">Management</a>
    			</div>
    		</div>
    		<div className="menu-item">
    			<div className="parent logout">Logout</div>
    		</div>
		</nav>
);
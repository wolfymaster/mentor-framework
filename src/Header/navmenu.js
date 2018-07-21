import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export const GuestMenu = () => (
		<nav id="nav-menu">
            <div class="menu-item">
			    <div class="parent">
					<Link to="/apply">Apply Now</Link>
				</div>
			</div>
			<div class="menu-item">
				<div class="parent">For Mentees</div>
				<div class="submenu">
					<div class="submenu-item">
						<Link to="./about-the-YEP-mentor-program">About the YEP Mentor Program</Link>
					</div>
					<div class="submenu-item">
						<Link to="./curriculum">Curriculum</Link>
					</div>
					<div class="submenu-item">
						<Link href="find-a-mentor">Find A Mentor</Link>
					</div>
				</div>
			</div>
			<div class="menu-item">
				<div class="parent">For Mentors</div>
				<div class="submenu">
					<div class="submenu-item">Why Become a YEP Mentor?</div>
					<div class="submenu-item">Mentor Requirements & Expectations</div>
					<div class="submenu-item">Mentor Resources</div>
				</div>
			</div>
			<div class="menu-item">
				<div class="parent">FAQ</div>
			</div>
			<div class="menu-item">
				<div class="parent">Media</div>
			</div>
			<div class="menu-item">
				<div class="parent">
					<Link to="management.html">Login</Link>
				</div>
			</div>
		</nav>
);


export const UserMenu = () => (
		<nav id="nav-menu">
        	<div class="menu-item">
    			<div class="parent">
    				<a href="/dashboard.html">Dashboard</a></div>
    		</div>
    		<div class="menu-item">
    			<div class="parent">
    				<a href="find-a-mentor.html">Find A Mentor</a>
    			</div>
    		</div>
    		<div class="menu-item">
    			<div class="parent">
    			    <a href="management-mentor.html">Management</a>
    			</div>
    		</div>
    		<div class="menu-item">
    			<div class="parent logout">Logout</div>
    		</div>
		</nav>
);
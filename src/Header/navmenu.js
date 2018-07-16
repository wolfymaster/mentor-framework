import React, {Component} from 'react';

export const GuestMenu = () => (
		<nav id="nav-menu">
            <div class="menu-item">
			    <div class="parent">
					<a href="/apply">Apply Now</a>
				</div>
			</div>
			<div class="menu-item">
				<div class="parent">For Mentees</div>
				<div class="submenu">
					<div class="submenu-item">
						<a href="./about-the-YEP-mentor-program.html">About the YEP Mentor Program</a>
					</div>
					<div class="submenu-item">
						<a href="./curriculum.html">Curriculum</a>
					</div>
					<div class="submenu-item">
						<a href="find-a-mentor.html">Find A Mentor</a>
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
					<a href="management.html">Login</a>
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
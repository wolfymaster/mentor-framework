import React, {Component} from 'react';

import Registration from 'Registration';

export default class Banner extends Component {
 
 render() {
     return <section id="banner">
    			<div className="inner">
    				<h1>2018 YEP Mentor Program</h1>
    				<p>Seeking college Juniors, Seniors, Post-Grads and recent graduates</p>
    				<Registration buttonStyle="button" />
    			</div>
    			{ /* <video autoplay loop muted playsinline src="images/banner.mp4"></video> */ }
    		</section>
 }
    
}
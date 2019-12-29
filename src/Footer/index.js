import React, {Component} from 'react';

export default class Footer extends Component {
 
 render() {
     return <footer id="footer">
				<div className="inner">
					<div className="content">
						<section>
							<h3>Mentor Framework</h3>
							<p>{'{Description}'.toUpperCase()}</p>
						</section>
						<section>

						</section>
						<section>
							<h4>Join Our Networks</h4>
							<ul className="plain">
								<li><a href="https://twitter.com/" target="_blank"><i className="icon fa-twitter">&nbsp;</i>Twitter</a></li>
								<li><a href="https://www.facebook.com/" target="_blank"><i className="icon fa-facebook">&nbsp;</i>Facebook</a></li>
								<li><a href="https://www.instagram.com/" target="_blank"><i className="icon fa-instagram">&nbsp;</i>Instagram</a></li>
								<li><a href="https://www.linkedin.com/" target="_blank"><i className="icon fa-linkedin">&nbsp;</i>LinkedIn</a></li>
							</ul>
						</section>
					</div>
					<div className="copyright">
						&copy; {(new Date()).getFullYear()}. Mentor Framework.
					</div>
				</div>
			</footer>
 }
    
}
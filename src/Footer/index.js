import React, {Component} from 'react';

export default class Footer extends Component {
 
 render() {
     return <footer id="footer">
				<div className="inner">
					<div className="content">
						<section>
							<h3>Young Erie Professionals</h3>
							<p>Young Erie Professionals is dedicated to providing opportunities for emerging leaders and career-minded peers to develop professionally, while actively participating in their community to connect, attract and retain young talent in the local workforce.</p>
						</section>
						<section>

						</section>
						<section>
							<h4>Join Our Networks</h4>
							<ul className="plain">
								<li><a href="https://twitter.com/yeperie" target="_blank"><i className="icon fa-twitter">&nbsp;</i>Twitter</a></li>
								<li><a href="https://www.facebook.com/YepErie/" target="_blank"><i className="icon fa-facebook">&nbsp;</i>Facebook</a></li>
								<li><a href="https://www.instagram.com/young_erie_professionals/" target="_blank"><i className="icon fa-instagram">&nbsp;</i>Instagram</a></li>
								<li><a href="https://www.linkedin.com/company/young-erie-professionals/" target="_blank"><i className="icon fa-linkedin">&nbsp;</i>LinkedIn</a></li>
							</ul>
						</section>
					</div>
					<div className="copyright">
						&copy; 2018. Young Erie Professionals.
					</div>
				</div>
			</footer>
 }
    
}
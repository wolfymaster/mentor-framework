import React, {Component} from 'react';

import Banner from 'Banner';
import Highlights from 'Mentor/highlights';

export default class Homepage extends Component {
 render() {
        return <div>

            { /* Homepage Banner */ }
            <Banner />
            
            { /* Highlights */ }
            <section className="wrapper">
				<div className="inner">
					<header className="special">
						<h2>See our awesome group of mentors</h2>
						<p>Something here about our awesome group of mentor volunteers. Very diverse professional backgrounds... blah blah </p>
					</header>
					<Highlights />
				</div>
			</section>
			
			{ /* CTA */ }
			<section id="cta" className="wrapper">
				<div className="inner">
					<h2>Why {'Something'}?</h2>
					<p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida odio porttitor sem non mi integer non faucibus ornare mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia sapien lorem accumsan varius montes viverra nibh in adipiscing. Lorem ipsum dolor vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing sed feugiat eu faucibus. Integer ac sed amet praesent. Nunc lacinia ante nunc ac gravida.</p>
				</div>
			</section>			

        </div>
    }   
}
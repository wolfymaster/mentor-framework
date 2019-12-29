import React, {Component} from 'react';

export default class Highlight extends Component {

render() {
    return <section>
            	<div className="content">
            		<img src="http://placehold.it/250x300" />
            		<header>
            			<h3>{'{Name]'.toUpperCase()}</h3>
            		</header>
            		<p>{'{Title}'.toUpperCase()}</p>
            	</div>
            </section>
}

}
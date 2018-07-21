import React, {Component} from 'react';

export default class FindAMentor extends Component {
 
 render() {
     return <div>
            
                { /* Title */ }
    		    <div id="heading" >
    		        <h1>{ this.state.page.title }</h1>
    	        </div>
    	        
    	        { /* Content */ }
    	        <section id="main" className="wrapper">
    				<div className="inner">
    					<div className="content" dangerouslySetInnerHTML= {{__html: this.state.page.content }}></div>
    				</div>
    	        </section>

            </div>
 }
    
}
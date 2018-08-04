import React, {Component} from 'react';

import MentorSummary from 'Mentor/summary'

export default class FindAMentor extends Component {
 
 constructor(props) {
     super(props);
     
     this.state = {
         filters: {},
         mentors: [{
             name: "John",
             position: "Administrator",
             image: "",
             summary: "John is a blah blah blah... Kristi is a blah blah blah...Kristi is a blah blah blah... Kristi is a blah blah blah...Kristi is a blah blah blah... Kristi is a blah blah blah..."
         }]
     }
     
 }
 
 render() {

     return <div>
            
                { /* Title */ }
    		    <div id="heading" >
    		        <h1>Browse Mentors</h1>
    	        </div>
    	        
    	        { /* Content */ }
    	        <section id="main" className="wrapper">
    				<div className="inner">
    					<div className="content">
    				        <form id="mentor-search" style={{display:"flex",justifyContent:"space-between"}}>
    				            <div style={{width:"45%"}}>
    				                <label htmlFor="search-value">Search</label>
    				                <input id="search-value" type="text" value="" />
    				                
    				                <label htmlFor="search-industry">Industry</label>
    				                <select id="search-industry">
    				                    <option value="technology">Technology</option>
    				                    <option value="finance">Finance</option>
    				                    <option value="insurance">Insurance</option>
    				                    <option value="marketing">Marketing</option>
    				                    <option value="healthwellness">Health & Wellness</option>
    				                </select>
    				            </div>
    				            <div style={{width:"45%"}}>
    				                <label htmlFor="search-almamater">Alma Mater</label>
    				                <select id="search-almamater">
    			                        <option value="edinboro">Edinboro</option>
    			                        <option value="gannon">Gannon</option>
    			                        <option value="mercyhurst">Mercyhurst</option>
    			                        <option value="pennstate">Penn State Behrend</option>
    			                    </select>
    				                
    				                <input type="submit" value="Filter" />
    				            </div>
    				        </form>
    				    </div>
    				    
                        { this.state.mentors.map( (mentor) => (<MentorSummary {...mentor} />) ) }
				    
    				</div>
    	        </section>

            </div>
 }
    
}
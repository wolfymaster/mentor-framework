import React, {Component} from 'react';

import Highlight from 'Mentor/highlight';

export default class Highlights extends Component {
 
    constructor(props) {
        super(props);
        
        this.state = {
            mentors: [0,1,2]
        }
    }
    
    onComponentDidMount() {
        
    }
 
    render() {
        return 	<div className="highlights">
                {
                    this.state.mentors.map( (mentor, i) => (<Highlight key={i} />) )
                }
                </div>
    }
    
}
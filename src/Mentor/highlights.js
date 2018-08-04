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
        return 	<div class="highlights">
                {
                    this.state.mentors.map(mentor => (<Highlight />) )
                }
                </div>
    }
    
}
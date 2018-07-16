import React, {Component} from 'react';

export default class AboutPage extends Component {
    
 render() {
        
        return <div>

                { this.props.match.params.slug }
			
            </div>
    }   
}
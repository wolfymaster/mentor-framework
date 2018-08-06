/* global localStorage */
import React, {Component} from 'react';

import Loading from 'react-loading-animation';

export default class Management extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading: true,
            user: null
        }
    }
    
    componentDidMount() {
        this.props.auth.getUserInfo((error, profile) => {
            if(error) {
                console.log(error);
                return;
            }
            
            console.log(profile, profile.user_metadata, profile.user_appdata);
            
            this.setState( {
                loading:false,
                user: profile
            });
        });
    }
    
     render() {
            
            return <div>
            
                    { /* Title */ }
    			    <div id="heading" >
				        <h1>Management</h1>
			        </div>
			        
			        { /* Content */ }
			        <section id="main" className="wrapper">
			            <Loading isLoading={this.state.loading}>
            				<div className="inner">
            					<div className="content"></div>
            				</div>
        				</Loading>
			        </section>

                </div>
        }   
    
}
/* global localStorage */
import React, {Component} from 'react';

import Loading from 'react-loading-animation';

export default class Management extends Component {
    
    API_ENDPOINT = 'https://us-central1-young-erie-professionals.cloudfunctions.net/websiteApi/users';
    
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
                user: profile
            });
            
            // Get user data
            fetch(`${this.API_ENDPOINT}/${profile.email}`)
            .then(res => res.json())
            .then(res => {
                this.setState((prevState, props) => ({
                    loading: false,
                    user: Object.assign({}, prevState.user, res.user)
                }))
            })             
        });
        
    }
    
     render() {
            console.log("state", this.state);
            
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
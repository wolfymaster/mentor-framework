/* global localStorage */
import React, {Component} from 'react';

import Loading from 'react-loading-animation';

// TODO : swap these out for dynamic import() or React Loadable
import ManageProfile from 'Profile/manage';
import ManageMentor from 'Mentor/manage';
import ManageMentee from 'Mentor/manageMentee';

export default class Management extends Component {
    
    API_ENDPOINT = 'https://us-central1-young-erie-professionals.cloudfunctions.net/websiteApi/users';
    
    constructor(props) {
        super(props)
    
        this.state = {
            loading: true,
            user: null,
            tab: "profile",
            section: "general"
        }
        
    }
    
    change = e => {
      this.setState({
        user: {
            [e.target.name]: e.target.value
        }
      })
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
            
            let RenderComponent;
            switch(this.state.tab) {
                case 'profile':
                    RenderComponent = <ManageProfile user={this.state.user} />;
                    break;
                case 'mentor':
                    RenderComponent = <ManageMentor user={this.state.user} />;
                    break;
                case 'mentee':
                    RenderComponent = <ManageMentee user={this.state.user} />;
                    break;
                default:
                    RenderComponent = <ManageProfile user={this.state.user} />;
                    break;
            }

            return <div>
            
                    { /* Title */ }
    			    <div id="heading" >
				        <h1>Management</h1>
			        </div>
			        
			        { /* Content */ }
			        <section id="main" className="wrapper">

            				<div className="inner" style={{ background:"white" }}>
            					<div className="row gtr-0" style={{padding:"20px",marginLeft:"-28px" }}>
            					    <div className="col-3">
            					        <ul id="profile-nav">
            					            <li className={this.state.tab === 'profile' ? 'active' : ''} onClick={() => this.setState({tab:'profile'})}>Profile</li>
            					            <li className={this.state.tab === 'mentor' ? 'active' : ''} onClick={() => this.setState({tab:'mentor'})}>My Mentors</li>
            					            { ( !this.state.loading && this.state.user.profile_data.isMentor || true) && <li className={this.state.tab === 'mentee' ? 'active' : ''} onClick={() => this.setState({tab:'mentee'})}>My Mentees</li> }
            					        </ul>
            					    </div>
            					    
            					    <div className="col-9">
            					    
                                        <Loading isLoading={this.state.loading}>
                    					    { !this.state.loading && RenderComponent }
    		            				</Loading>                                       
                                        
            					    </div>
            					    
		    			            
            					</div>
            				</div>
			        </section>

                </div>
        }   
    
}
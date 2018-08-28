/* global localStorage */
import React, {Component} from 'react';

import Loading from 'react-loading-animation';

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
            					            <li className="active">Profile</li>
            					            <li>My Mentors</li>
            					            <li>Settings</li>
            					        </ul>
            					        
            					        { ( !this.state.loading && this.state.user.profile_data.isMentor || true) && 
        						        <ul id="mentor-nav">
        						        	<li className="active">My Mentees (1)</li>
        						        </ul>            					        
        						         }
            					    </div>
            					    
            					    <div className="col-9">
            					        <div className="row">
                					        <div className="col-4 off-2" style={{ display:"flex" }}>
                					            <div className="sectionTab" style={{ padding:"10px 30px", marginLeft:"10px", background:"#531519", color:"#FFF" }} onClick={() => this.setState({section:"general"})}>General</div>
                					            <div className="sectionTab" style={{ padding:"10px 30px", marginLeft:"10px", background:"#531519", color:"#FFF" }} onClick={() => this.setState({section:"employment"})}>Employment</div>
                					            <div className="sectionTab" style={{ padding:"10px 30px", marginLeft:"10px", background:"#531519", color:"#FFF" }} onClick={() => this.setState({section:"education"})}>Education</div>
                					            <div className="sectionTab" style={{ padding:"10px 30px", marginLeft:"10px", background:"#531519", color:"#FFF" }} onClick={() => this.setState({section:"other"})}>Other</div>
                					        </div>
                                        </div>
                                        
                                        <Loading isLoading={this.state.loading}>
                    					    { !this.state.loading && 
                					    	<form>
                        					    <div id="general" style={{ display: this.state.section == "general" ? "block" : "none" }}>
        
                        					    	    <label htmlFor="user_summary">Profile Summary:</label>
                        					    	    <textarea name="user_summary" id="user_summary" value={this.state.user.summary} onChange={e => this.change(e)}></textarea>
                        					    	    
                                                        <label htmlFor="user_mentor_qualities">Mentor Qualities:</label>
                        					    	    <textarea name="user_mentor_qualities" id="user_mentor_qualities" value={this.state.user.profile_data.mentor_qualities} onChange={e => this.change(e)}></textarea>                					    	    
                        					    	    
                                                        <label htmlFor="user_mentee_qualities">Mentee Qualities:</label>
                        					    	    <textarea name="user_mentee_qualities" id="user_mentee_qualities" value={this.state.user.mentee_qualities} onChange={e => this.change(e)}></textarea>                					    	                    					    	    
            
                        					    </div>    
                        					    
                        					    <div id="education" style={{ display: this.state.section == "education" ? "block" : "none" }}>
                        					    	    <label htmlFor="user_school">College/Alma Mater:</label>
                        					    	    <input type="text" name="user_school" id="user_school" value={this.state.user.user_school} onChange={e => this.change(e)} />
                        					    	    
                        					    	    <label htmlFor="user_major">Major(s):</label>
                        					    	    <input type="text" name="user_major" id="user_major" value={this.state.user.user_major} onChange={e => this.change(e)} /> 
                        					    </div>
                        					    
                        					    <div id="employment" style={{ display: this.state.section == "employment" ? "block" : "none" }}>
                                                        <label htmlFor="user_employer">Employer:</label>
                        					    	    <input type="text" name="user_employer" id="user_employer" value={this.state.user.employment.employer} onChange={e => this.change(e)} />  
                        					    	    
                        					    	    <label htmlFor="user_jobtitle">Job Title:</label>
                        					    	    <input type="text" name="user_jobtitle" id="user_jobtitle" value={this.state.user.employment.jobtitle} onChange={e => this.change(e)} />                					    	    
            
                        					    	    <label htmlFor="user_yearsexperience">Years Experience:</label>
                        					    	    <input type="text" name="user_yearsexperience" id="user_yearsexperience" value={this.state.user.employment.years_experience} onChange={e => this.change(e)} />                            					    
                        					    </div>
                        					    
                        					    <div id="other" style={{ display: this.state.section == "other" ? "block" : "none" }}>
                                                        <label htmlFor="user_interests">Hobbies/Interests:</label>
                        					    	    <textarea name="user_interests" id="user_interests" value={this.state.user.interests} onChange={e => this.change(e)}></textarea>
                        					    	    
                        					    	    <label htmlFor="user_volunteer_experience">Volunteer Experience:</label>
                        					    	    <textarea name="user_volunteer_experience" id="user_volunteer_experience" value={this.state.user.volunteer_experience} onChange={e => this.change(e)}></textarea>                					    	    
                        					    </div>
                        					    
                        					    <div className="row" style={{ padding:"20px" }}>
                        					        <div className="col-12 off-9">
                        					            <input type="submit" value="Save Profile" />
                    					            </div>
                					            </div>
                					    	</form>    
                    					    }
    		            				</Loading>                                        
                                        
            					    </div>
            					    
		    			            
            					</div>
            				</div>
			        </section>

                </div>
        }   
    
}
import React, {Component} from 'react';

export default class ProfileManagement extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            section: "general",
        }
    }
    
    render() {
        return <div>
                    <div className="row">
        		        <div className="col-4 off-2" style={{ display:"flex" }}>
        		            <div className="sectionTab" style={{ padding:"10px 30px", marginLeft:"10px", background:"#531519", color:"#FFF" }} onClick={() => this.setState({section:"general"})}>General</div>
        		            <div className="sectionTab" style={{ padding:"10px 30px", marginLeft:"10px", background:"#531519", color:"#FFF" }} onClick={() => this.setState({section:"employment"})}>Employment</div>
        		            <div className="sectionTab" style={{ padding:"10px 30px", marginLeft:"10px", background:"#531519", color:"#FFF" }} onClick={() => this.setState({section:"education"})}>Education</div>
        		            <div className="sectionTab" style={{ padding:"10px 30px", marginLeft:"10px", background:"#531519", color:"#FFF" }} onClick={() => this.setState({section:"other"})}>Other</div>
        		        </div>
                    </div>
                                            
    		    	<form>
    				    <div id="general" style={{ display: this.state.section == "general" ? "block" : "none" }}>
    
    				    	    <label htmlFor="user_summary">Profile Summary:</label>
    				    	    <textarea name="user_summary" id="user_summary" value={this.props.user.summary} onChange={e => this.change(e)}></textarea>
    				    	    
                                <label htmlFor="user_mentor_qualities">Mentor Qualities:</label>
    				    	    <textarea name="user_mentor_qualities" id="user_mentor_qualities" value={this.props.user.profile_data.mentor_qualities} onChange={e => this.change(e)}></textarea>                					    	    
    				    	    
                                <label htmlFor="user_mentee_qualities">Mentee Qualities:</label>
    				    	    <textarea name="user_mentee_qualities" id="user_mentee_qualities" value={this.props.user.mentee_qualities} onChange={e => this.change(e)}></textarea>                					    	                    					    	    
    
    				    </div>    
    				    
    				    <div id="education" style={{ display: this.state.section == "education" ? "block" : "none" }}>
    				    	    <label htmlFor="user_school">College/Alma Mater:</label>
    				    	    <input type="text" name="user_school" id="user_school" value={this.props.user.user_school} onChange={e => this.change(e)} />
    				    	    
    				    	    <label htmlFor="user_major">Major(s):</label>
    				    	    <input type="text" name="user_major" id="user_major" value={this.props.user.user_major} onChange={e => this.change(e)} /> 
    				    </div>
    				    
    				    <div id="employment" style={{ display: this.state.section == "employment" ? "block" : "none" }}>
                                <label htmlFor="user_employer">Employer:</label>
    				    	    <input type="text" name="user_employer" id="user_employer" value={this.props.user.employment.employer} onChange={e => this.change(e)} />  
    				    	    
    				    	    <label htmlFor="user_jobtitle">Job Title:</label>
    				    	    <input type="text" name="user_jobtitle" id="user_jobtitle" value={this.props.user.employment.jobtitle} onChange={e => this.change(e)} />                					    	    
    
    				    	    <label htmlFor="user_yearsexperience">Years Experience:</label>
    				    	    <input type="text" name="user_yearsexperience" id="user_yearsexperience" value={this.props.user.employment.years_experience} onChange={e => this.change(e)} />                            					    
    				    </div>
    				    
    				    <div id="other" style={{ display: this.state.section == "other" ? "block" : "none" }}>
                                <label htmlFor="user_interests">Hobbies/Interests:</label>
    				    	    <textarea name="user_interests" id="user_interests" value={this.props.user.interests} onChange={e => this.change(e)}></textarea>
    				    	    
    				    	    <label htmlFor="user_volunteer_experience">Volunteer Experience:</label>
    				    	    <textarea name="user_volunteer_experience" id="user_volunteer_experience" value={this.props.user.volunteer_experience} onChange={e => this.change(e)}></textarea>                					    	    
    				    </div>
    				    
    				    <div className="row" style={{ padding:"20px" }}>
    				        <div className="col-12 off-9">
    				            <input type="submit" value="Save Profile" />
    			            </div>
    		            </div>
    		    	</form>    
		    </div>
    }
    
}

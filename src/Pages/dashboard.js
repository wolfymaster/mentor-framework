import React, {Component} from 'react';

import Loading from 'react-loading-animation';

/* global fetch */
export default class Dashboard extends Component {
    
    API_ENDPOINT = 'https://us-central1-young-erie-professionals.cloudfunctions.net/websiteApi';
     
    constructor(props) {
        super(props)
        
        this.state = {
            loading: true,
            user: {},
            lessons: [],
            lessonIndex: 0
        }
    }    
    
    componentDidMount() {
        // get Lessons from db
        this.props.auth.getUserInfo((error, profile) => {
            if(error) {
                console.log(error);
                return;
            }
            
            fetch(`${this.API_ENDPOINT}/users/${profile.email}`)
            .then(res => res.json())
            .then(res => {
                console.log('users', res);
                this.setState((prevState, props) => ({
                    user: Object.assign({}, profile, res.user)
                }))
            });
            
            fetch(`${this.API_ENDPOINT}/lessons`)
            .then(res => res.json())
            .then(res => {
                console.log('lessons', res);
                this.setState((prevState, props) => ({
                    loading: false,
                    lessons: res.lessons,
                    lessonsCount: res.lessonsCount
                }))
            });
            
        });
    }
    
    render() {
        return <div>
            
                    { /* Title */ }
    			    <div id="heading" >
				        <h1>Dashboard</h1>
			        </div>
			        
			        { /* Content */ }
			        <section id="main" className="wrapper">
			            <Loading isLoading={this.state.loading}>
			            {!this.state.loading && (
            				<div className="inner">
            					<div className="content">
            					
            					    <div className="row gtr-50">
            					        <div className="col-3">
            					            <div className="profileImageContainer" style={{ marginBottom:"20px" }}>
            					                <div className="profileImage" style={{ margin:"0 auto", borderRadius:"50%", width:"50%", paddingBottom:"50%", background:"url('"+this.state.user.picture+"') center center/cover" }}></div>
            					                <div className="mentors" style={{ "display":"flex", justifyContent:"center", margin:"10px 0" }}>
            					                    { /*
            					                    <div className="mentor" style={{ marign:"0 10px", width:"35px", height:"35px", borderRadius:"50%", background:"url('https://media.licdn.com/dms/image/C5600AQGAl0TLT2VVvg/profile-originalphoto-shrink_450_600/0?e=1534194000&v=beta&t=i3sBsh-FGrgXrEixJGifpO4CLrFXmpOfr4IQsjntMqw') center center/cover" }} ></div>
            					                    <div className="mentor" style={{ margin:"0 10px", width:"35px", height:"35px", borderRadius:"50%", background:"url('https://media.licdn.com/dms/image/C5600AQGAl0TLT2VVvg/profile-originalphoto-shrink_450_600/0?e=1534194000&v=beta&t=i3sBsh-FGrgXrEixJGifpO4CLrFXmpOfr4IQsjntMqw') center center/cover" }}></div>
            					                    */ }
            					                </div>
            					            </div>
            					            <h3 style={{ textAlign:"center" }}>Mentee Curriculum</h3>
                                            <ul id="profile-nav" style={{ listStyle:"none", margin:"0", padding:"0" }}>
                                            {
                                                this.state.lessons.map( lesson => <li onClick={() => this.setState({lessonIndex: lesson.lesson_order})}>{lesson.lesson_title}</li> )
                                            }
                					        </ul>            					        
            					        </div>
            					        
            					        <div className="col-9">
                                            <div className="row">
                    					        <div className="col-12">
                    					        <h1>{this.state.lessons[this.state.lessonIndex]['lesson_title']}</h1>
                    					        </div>
                    					    </div>
                    					    
                    					    <div className="row">
                    					        <div className="col-12">
                    					            {this.state.lessons[this.state.lessonIndex]['lesson_summary']}
                    					        </div>
                    					    </div>                       					    
                    					    
                    					    <div className="row" style={{ margin:"15px 0 15px -3em" }}>
                    					        <div className="col-12">Areas of focus:</div>
                    					        {
                    					            this.state.lessons[this.state.lessonIndex]['lesson_areasoffocus'].map(function(a) {
                            					        return <div className="col-4">
                            					            <div className="areaoffocus" style={{ textAlign:"center", background:"#CCC", padding:"10px" }}>
                            					                {a}
                        					                </div>
                            					        </div>                    					                
                    					            })
                    					        }
                    					    </div>      
                    					    
                    					    {/* Activities */}
                					    	<div id="tab-container">
                					    	{
                					    	    this.state.lessons[this.state.lessonIndex]['lesson_activities'].map(function(a) {
                    					    	    return <div className="tab">
                        					    	    <label className="title" htmlFor="box1">{a.title}</label>
                        					    	    <input type="checkbox" defaultChecked id="box1" />
                        					    	    <div className="tab-content">
                        					    	        {a.content}
                    					    	        </div>
                    					    	    </div>                					    	    
                					    	    })
                					    	}
                					    	</div> {/* END Activities */}                  					    
                    					    
           					        
            					        </div> { /* END col-9 */}
            					    
            					    </div> {/* END row */}
            					              					    
            					    
            					</div> { /* END Content */}
            				</div>
			            )}
        				</Loading>
			        </section>

                </div>
    }
}
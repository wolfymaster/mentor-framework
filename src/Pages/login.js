import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import Loading from 'react-loading-animation';

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.login_url = "https://yeperie.auth0.com/authorize?response_type=token&client_id=y0l9g2y5L6PL4ogoiY2AHC9QpdMCWxCg&connection=linkedin&redirect_uri=https://0adbdbd4026c44d389258e6d70a241e2.vfs.cloud9.us-east-2.amazonaws.com/login&state=mountaindew";
        
        this.props.auth.onAuthenticated(() => this.setState({
            loggedin: props.auth.isAuthenticated(),
            loggingIn: false
        }));
        
        this.state = {
          loggedin: props.auth.isAuthenticated(),
          loggingIn: false
        };
    }

    componentDidMount() {
        if ( !this.state.loggedin && !(/access_token|id_token|error/.test(this.props.location.hash)) ) {
            //this.props.auth.show();
        } else  {
            this.setState( {
                loggingIn: true
            })
        }
    }

    
    render() {
        return !this.state.loggedin ? (<Loading isLoading={this.state.loggingIn} >
                    <section id="main" className="wrapper">
        			    <div className="inner">
        			    { /*
        			        <div id="login" style={{ display:"flex", justifyContent:"space-around" }}>
        			            <div style={{ flex:"2 1 25%" }}>
        			                <h2>Welcome Back!</h2>
        			                <a href={this.login_url}>Login</a>
        			            </div>
                                <div id="loginbox" style={{ flex: "1 auto" }}></div>
        			        </div>
    			        */ }
    			            <div id="login" style={{ background:"#FFF", padding:"20px", textAlign:"center" }}>
    			                <h3><strong>YEP Mentorship Program Log In</strong></h3>
    			                    <div id="loginbox"></div>
    			                    <Loading isLoading={true}>
    			                        something
    			                    </Loading>
    			                <hr />
    			                <div><img src="https://0adbdbd4026c44d389258e6d70a241e2.vfs.cloud9.us-east-2.amazonaws.com/images/yepicon.png" width="25" /> &copy;2018</div>
    			            </div>
                        </div>
                        <button onClick={() => (this.props.auth.show())}>Show</button>
                    </section>
                </Loading>) : <Redirect to="/account/dashboard" />
    }
}
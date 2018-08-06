import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from 'Header';
import Footer from 'Footer';

import Homepage from 'Pages/homepage';
import SubPage from 'Pages/subpage';
import FindAMentor from 'Pages/find_a_mentor';
import Login from 'Pages/login';
import Management from 'Pages/management';
import {AuthLock} from 'Auth/auth';

const auth = new AuthLock();

export default class AppContainer extends Component {
    render() {
        return <Router>
        			<div>
        				{ /* Header */ } 
        				<Header auth={auth} />

						<Switch>
							<Route exact path="/account/management" render={ (props) => { return auth.isAuthenticated() ? <Management {...props} auth={auth} /> : <Redirect to="/login" /> } } />
							<Route exact path="/account/:slug" render={ (props) => { return auth.isAuthenticated() ? <SubPage {...props} /> : <Redirect to="/login" /> } } />
							<Route exact path="/find-a-mentor" component={FindAMentor} />
							<Route exact path="/login" render={ (props) => { return <Login {...props} auth={auth} /> } } />			
							<Route exact path="/:slug" component={SubPage} />						
							<Route exact path="/" render={ (props) => { return <Homepage {...props} auth={auth} /> } } />
						</Switch>

						{ /* Footer */ } 
						<Footer />
					</div>
        		</Router>
    }
}
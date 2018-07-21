import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from 'Header';
import Footer from 'Footer';

import Homepage from 'Pages/homepage';
import SubPage from 'Pages/subpage';
import FindAMentor from 'Pages/find_a_mentor';

export default class AppContainer extends Component {
    
    render() {
        return <Router>
        			<div>
        				{ /* Header */ } 
        				<Header />

						<Switch>
							<Route exact path="/account/:slug" component={SubPage} />
							<Route exact path="/find-a-mentor" component={FindAMentor} />
							<Route exact path="/:slug" component={SubPage} />						
							<Route exact path="/" component={Homepage} />
						</Switch>

						{ /* Footer */ } 
						<Footer />
					</div>
        		</Router>
    }
}
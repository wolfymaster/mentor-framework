import React, {Component} from 'react';

import Loading from 'react-loading-animation';

export default class AboutPage extends Component {
    
    API_ENDPOINT = 'https://us-central1-young-erie-professionals.cloudfunctions.net/websiteApi/pages';
    
    constructor(props) {
        super(props)
    
        this.state = {
            loading: true,
            page: {
                title: null,
                content: null
            }
        }
        
    }
    
    componentDidMount() {
        fetch(`${this.API_ENDPOINT}/${this.props.match.params.slug}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                loading: false,
                page: {
                    title: res.article.page_pageTitle,
                    content: res.article.page_pageContent
                }
            })
        })
        
        
    }
    
        
     render() {
            
            return <div>
            
                    { /* Title */ }
    			    <div id="heading" >
				        <h1>{ this.state.page.title }</h1>
			        </div>
			        
			        { /* Content */ }
			        <section id="main" className="wrapper">
			            <Loading isLoading={this.state.loading}>
            				<div className="inner">
            					<div className="content" dangerouslySetInnerHTML= {{__html: this.state.page.content }}></div>
            				</div>
        				</Loading>
			        </section>

                </div>
        }   
}
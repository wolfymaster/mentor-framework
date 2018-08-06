/* global env */
import React, {Component} from 'react';
import Modal from 'react-modal';

import {Auth} from 'Auth/auth';

const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, SITE_BASE_URL } = env;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : '',
    padding               : 0,
    border                : 'none',
    width                 : '50%',
    height                : 'calc(50% + 2.0rem)'
  },
  overlay : {
    background            : 'linear-gradient(rgba(19, 47, 69, 1),60%, #132F45, 85%, rgba(19,47,69,0.8))',
    
  }
};

export default class Registration extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      step: 1,
      applyPath: null
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
    this.applyPath = this.setApplyPath.bind(this)
    
    this.auth = new Auth();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
   setApplyPath(path) {
     this.setState({
       applyPath: path,
       step: 2
     })
   }
   
   onRetrieveData = (event) => {
      event.preventDefault();
      window.open('https://'+AUTH0_DOMAIN+'/authorize?response_type=token&client_id='+AUTH0_CLIENT_ID+'&connection=linkedin&redirect_uri='+SITE_BASE_URL+'login&state=mountaindew', '', 'width=600,height=600');
      //window.open('https://us-central1-young-erie-professionals.cloudfunctions.net/linkedinAuth', '', "width=600,height=600")
      window.addEventListener("message", this.receiveMessage, false)
    }
    
    receiveMessage = (event) => {
      /*
      if( event.origin !== "https://us-central1-young-erie-professionals.cloudfunctions.net")
        return;
      */

        
      let responseData = JSON.parse(event.data);
      
      // populating the form
      this.setState({
          firstName: responseData.firstName,
          lastName: responseData.lastName
      })
    } 

  render() {
    /*
    let params = {
      "client_id": AUTH0_CLIENT_ID,
      "response_type":"token id_token",
      "redirect_uri": SITE_BASE_URL+"login",
      "audience": "https://"+AUTH0_DOMAIN+"/userinfo",
      "connection": "linkedin",
      "state": btoa(JSON.stringify({"registration_type" : "mentor"})),
      "scope": "openid profile email",
      "nonce": AuthLock.generateNonce()
    } 
    */
    
    return (
      <div>
        <div className={this.props.buttonStyle} onClick={this.openModal}>Apply Now</div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Mentee Registation"
        >
        
          <div className="apply-steps">
              <div className={"apply-step"+ ((this.state.step === 1) ? " active" : "")}></div>
              <div className={"apply-step"+ ((this.state.step === 2) ? " active" : "")}></div>
          </div>

          <div id="apply-step-1" style={{ display: (this.state.step === 1) ? 'flex' : 'none', justifyContent: 'space-between'}}>
            <div onClick={() => this.setApplyPath("mentee")} style={{ background: 'url("/images/student.jpg") 25% center/cover #FFF', display: 'flex', alignItems: 'flex-end', width: '49%', justifyContent: 'center', padding: '50% 0 5px 0', cursor: "pointer" }}>
              <div className="large" style={{ background: "#3FA3DA", width:"100%", boxShadow: "none", color: "#FFF", padding:"10px 0", fontSize: '1.5rem', textAlign: 'center' }}>Become A Mentee</div>
            </div>
            <div onClick={() => this.setApplyPath("mentor")} style={{ background: 'url("/images/mentor.jpg") 73% center/cover #FFF', display: 'flex', alignItems: 'flex-end', width: '49%', justifyContent: 'center', padding: '50% 0 5px 0', cursor: "pointer" }}>
              <div className="large" style={{ background: "#F43D2E", width:"100%", boxShadow: "none", color: "#FFF", padding:"10px 0", fontSize: '1.5rem', textAlign: 'center' }}>Become A Mentor</div>
            </div>
          </div>
           
  
          <div id="apply-step-2" style={{ display: (this.state.step === 2) ? 'block' : 'none', justifyContent: 'space-between' }}>
            <h2>Welcome! <span>Lets get you enrolled!</span></h2>
            <div>
              <button onClick={ () => this.auth.login("mentee") }>Apply with LinkedIn</button>
            </div>
            <div className="desc" style={{ marginTop: '20px' }}>
              <strong>Apply with LinkedIn</strong> We've make it quick and easy to enroll in the YEP Mentorship Program! Simply click the button above to connect your LinkedIn account with us. Once connected, you will have the option to review your information
              before sending it off to us to review. After submitting, be on the lookout for an email from a YEP representative with your username and password. 
            </div>
          </div>
  
        </Modal>
      </div>
    );
  }
    
}
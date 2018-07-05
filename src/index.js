import React from 'react'
import {render} from 'react-dom'
import YepForm from './YepForm/YepForm'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
 

  render() {
    return (
      <div>
        <div className="button" onClick={this.openModal}>Register Now</div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Mentee Registation"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Mentee Registration</h2>
           
               <YepForm />
           
          <div onClick={this.closeModal} className="button small">Close Registration</div>
        </Modal>
      </div>
    );
  }
}

render(<Register />, document.getElementById('register'));

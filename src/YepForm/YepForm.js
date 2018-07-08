import React, {Component} from 'react'

 function serialize(form) {
	if (!form || form.nodeName !== "FORM") {
		return;
	}
	var i, j, q = [];
	for (i = form.elements.length - 1; i >= 0; i = i - 1) {
		if (form.elements[i].name === "") {
			continue;
		}
		switch (form.elements[i].nodeName) {
		case 'INPUT':
			switch (form.elements[i].type) {
			case 'text':
			case 'hidden':
			case 'password':
			case 'button':
			case 'reset':
			case 'submit':
			case 'color':
			case 'date':
			case 'datetime-local':
			case 'email':
			case 'month':
			case 'number':
			case 'range':
			case 'search':
			case 'tel':
			case 'time':
			case 'url':
			case 'week':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			case 'checkbox':
			case 'radio':
				if (form.elements[i].checked) {
					q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				}
				break;
			case 'file':
				break;
			}
			break;
		case 'TEXTAREA':
			q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
			break;
		case 'SELECT':
			switch (form.elements[i].type) {
			case 'select-one':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			case 'select-multiple':
				for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
					if (form.elements[i].options[j].selected) {
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
					}
				}
				break;
			}
			break;
		case 'BUTTON':
			switch (form.elements[i].type) {
			case 'reset':
			case 'submit':
			case 'button':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			}
			break;
		}
	}
	return q.join("&");
}



export default class YepForm extends Component {

    state = {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    }

    change = e => {
      this.setState({
        [e.target.name]: e.target.value
      
      })
      console.log(this.state);
    }

    
    
    onRetrieveData = (event) => {
      event.preventDefault();
      window.open('https://us-central1-young-erie-professionals.cloudfunctions.net/linkedinAuth', '', "width=600,height=600")
      window.addEventListener("message", this.receiveMessage, false)
    }
    
    receiveMessage = (event) => {
      if( event.origin !== "https://us-central1-young-erie-professionals.cloudfunctions.net")
        return;
        
      let responseData = JSON.parse(event.data);
      
      // populating the form
      this.setState({
          firstName: responseData.firstName,
          lastName: responseData.lastName
      })
    } 
  
    onSubmit = e => {
      e.preventDefault();
      const formData = Array.from(e.target.parentNode.elements)
          .filter(el => el.name)
          .reduce((a, b) => ({...a, [b.name]: b.value}), {});
          
      const fetchedUrl = 'https://us-central1-young-erie-professionals.cloudfunctions.net/webpage_submit'
      fetch(fetchedUrl, {
        method: 'post',
        mode: 'cors',
      
        body: JSON.stringify(formData)
      })
      .then( res => res.json() )
      .then( res => console.log(res) )
      console.log(formData);
    }
    
  render() {
    return (
          <form>
          
          { /*
          <button onClick={this.onRetrieveData}>Open LinkedIn</button>
          */ }
        
          
          { /*
          <fieldset style={{ display:'none' }}>
            <label>
                <input
                name="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={e => this.change(e)}
                /> 
             </label>
              
              <label>
                Last Name:  <abbr title="required">*</abbr>
                 <input
                name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={e => this.change(e)}
                /> 
              </label>
            </fieldset>
            
            <fieldset>
              <label>
                E-mail: <strong><abbr title="required">*</abbr></strong>
                <input type="email" name="email" />
              </label>
            </fieldset>
            
            <fieldset>
              <label>
                Age: <abbr title="required">*</abbr>
                <input type="number" name="personAge" placeholder="" /> 
              </label>
            </fieldset>

            <fieldset>
              <label>
                Phone: <strong><abbr title="required">*</abbr></strong>
                <input id="telNo" name="telNo" type="tel" size="20" placeholder="814-888-8888" />
              </label>
            </fieldset>
            
            <fieldset>
              <label>
                College: <strong><abbr title="required">*</abbr></strong>
                <input type="text" name="major" />
              </label>
              <label>
                Field of Study: <strong><abbr title="required">*</abbr></strong>
                <input type="text" name="major" />
              </label>
            </fieldset>

            
            <button onClick={e => this.onSubmit(e)}>Submit</button>
            
            */ }
            </form>
    );
  }
}
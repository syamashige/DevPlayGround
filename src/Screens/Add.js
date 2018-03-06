import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import * as C from './Components';





class Add extends Component {
	constructor(props){
		super(props)

		this.state ={
			api: '',
			feature: '',
			demo: '',
			code: '',
			guide: '',
			video: ''
		}
	}

	login() {
    this.props.auth.login();
  }

  handleNewDemo(){

  }

	render() {
		const { api, feature, demo, code, guide, video } = this.state;
		const {isAuthenticated} = this.props.auth;
		if(!isAuthenticated()){
			return(<C.NotLogginIn login={this.login.bind(this)}/>)
		}
		else{
			return(
		<div>
			<div>
       <BS.Navbar>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="/" className='header-title'>30 Days of API</a>
          </BS.Navbar.Brand>
        </BS.Navbar.Header>
      </BS.Navbar>
     </div>

			<div style={{margin: 'auto',width: 500}}>
				<BS.Form horizontal>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Powered by:</BS.ControlLabel>
			    <BS.FormControl
			    	value={api}
			    	onChange={(e)=>this.setState({api: e.target.value})}
			    	placeholder="ex. IBM Watson" 
			    	type="text" />
			    	{api.length !== 0 && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Feature of your API:</BS.ControlLabel>
			    <BS.FormControl
			    	value={feature}
			    	onChange={(e)=>this.setState({feature: e.target.value})}
			    	placeholder="ex. Chat/Conversation tool" 
			    	type="text" />
			    	{feature.length !== 0 && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Link to your demo:</BS.ControlLabel>
			    <BS.FormControl
			    	value={demo}
			    	onChange={(e)=>this.setState({demo: e.target.value})}
			    	placeholder="ex. https://onermcalc.herokuapp.com/" 
			    	type="text" />
			    	{demo.length !== 0 && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Link to your code:</BS.ControlLabel>
			    <BS.FormControl
			    	value={code}
			    	onChange={(e)=>this.setState({code: e.target.value})}
			    	placeholder="ex. https://github.com/ba5eem/DevPlayGround" 
			    	type="text" />
			    	{code.length !== 0 && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Link to the docs for the API:</BS.ControlLabel>
			    <BS.FormControl
			    	value={guide}
			    	onChange={(e)=>this.setState({guide: e.target.value})}
			    	placeholder="ex. https://console.bluemix.net/developer/watson/documentation" 
			    	type="text" />
			    	{guide.length !== 0 && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationNull" validationState={null}>
			    <BS.ControlLabel>Link to video tutorial: (optional)</BS.ControlLabel>
			    <BS.FormControl
			    	value={video}
			    	onChange={(e)=>this.setState({video: e.target.value})}
			    	placeholder="ex. https://www.youtube.com/watch?v=Atv8HtCuPyg" 
			    	type="text" />
			    	{video.length !== 0 && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup>
			    <BS.Col smOffset={4} sm={5}>
			      <BS.Button 
			      	bsStyle="primary"
			      	onClick={this.handleNewDemo.bind(this)}
			      	type="submit">Submit API Demo</BS.Button>
			    </BS.Col>
			  </BS.FormGroup>

			

			 </BS.Form>
			</div>
		</div>
		)
		}	
	}
}

export default Add;
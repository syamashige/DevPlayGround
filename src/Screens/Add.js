import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import * as C from './Components';
import validator from 'validator';
import axios from 'axios';




class Add extends Component {
	constructor(props){
		super(props)

		this.state ={
			api: 'testapi',
			feature: 'testfeature',
			demo: 'www.google.com',
			demoIsUrl: false,
			code: 'www.google.com',
			codeIsUrl: false,
			guide: 'www.google.com',
			guideIsUrl: false,
			video: 'www.google.com',
			videoIsUrl: false
		}
	}

	login() {
    this.props.auth.login();
  }

  handleChange(e){
  	const { api, feature, demo, code, guide, video } = this.state;
  	let {title,value} = e.target;
  	this.setState({[title]:value})
  	if(validator.isURL(demo,['http','https'])){
  		this.setState({demoIsUrl: true})
  	}
  	if(validator.isURL(code,['http','https'])){
  		this.setState({codeIsUrl: true})
  	}
  	if(validator.isURL(guide,['http','https'])){
  		this.setState({guideIsUrl: true})
  	}
  }

  handleNewDemo(e){
  	e.preventDefault()
  	const { api, feature, demo, code, guide, video } = this.state;
  	let local = {
  		api: api,
  		feature: feature,
  		demo: demo,
  		code: code,
  		guide: guide,
  		video: video
  	}
  	console.log(local);
  	axios.post('http://localhost:9000/add', local)
  	.then(res => {
  		console.log(res);
  	})


  }

	render() {
		const { api, feature, demo, code, guide, video, demoIsUrl, codeIsUrl, guideIsUrl,videoIsUrl } = this.state;
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
			    	title='api'
			    	onChange={this.handleChange.bind(this)}
			    	placeholder="ex. IBM Watson" 
			    	type="text" />
			    	{api.length !== 0 && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Feature of your API:</BS.ControlLabel>
			    <BS.FormControl
			    	value={feature}
			    	title='feature'
			    	onChange={this.handleChange.bind(this)}
			    	placeholder="ex. Chat/Conversation tool" 
			    	type="text" />
			    	{feature.length !== 0 && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Link to your demo:</BS.ControlLabel>
			    <BS.FormControl
			    	value={demo}
			    	title='demo'
			    	onChange={this.handleChange.bind(this)}
			    	placeholder="ex. https://onermcalc.herokuapp.com/" 
			    	type="text" />
			    	{demoIsUrl && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Link to your code:</BS.ControlLabel>
			    <BS.FormControl
			    	value={code}
			    	title='code'
			    	onChange={this.handleChange.bind(this)}
			    	placeholder="ex. https://github.com/ba5eem/DevPlayGround" 
			    	type="text" />
			    	{codeIsUrl && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationSuccess2" validationState="success">
			    <BS.ControlLabel>Link to the docs for the API:</BS.ControlLabel>
			    <BS.FormControl
			    	value={guide}
			    	title='guide'
			    	onChange={this.handleChange.bind(this)}
			    	placeholder="ex. https://console.bluemix.net/developer/watson/documentation" 
			    	type="text" />
			    	{guideIsUrl && <BS.FormControl.Feedback />}   
			  </BS.FormGroup>

			  <BS.FormGroup controlId="formValidationNull" validationState={null}>
			    <BS.ControlLabel>Link to video tutorial: (optional)</BS.ControlLabel>
			    <BS.FormControl
			    	value={video}
			    	title='video'
			    	onChange={this.handleChange.bind(this)}
			    	placeholder="ex. https://www.youtube.com/watch?v=Atv8HtCuPyg" 
			    	type="text" />
			    	{videoIsUrl && <BS.FormControl.Feedback />}   
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
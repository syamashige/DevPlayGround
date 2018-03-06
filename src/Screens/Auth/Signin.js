import React, { Component } from 'react';
import * as C from '../Components.js';
import * as BS from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Redirect } from "react-router-dom";

class Signin extends Component {
	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: ''
		}
		this.signInUser=this.signInUser.bind(this);
	}

	signInUser(e){
		e.preventDefault();
		let {email, password} = this.state;
		console.log(email, password);
	}





	render() {
		return (
			<div>
				<C.Header/>
					<div style={{margin: 'auto', width: 600}}>
					<BS.Form horizontal>
					  <BS.FormGroup controlId="formHorizontalEmail">
					    <BS.Col componentClass={BS.ControlLabel} sm={2}>
					      Email
					    </BS.Col>
					    <BS.Col sm={10}>
					      <BS.FormControl
					      	onChange={(e)=>this.setState({email: e.target.value})} 
					      	type="email"
					      	value={this.state.email} 
					      	placeholder="Email" />
					    </BS.Col>
					  </BS.FormGroup>

					  <BS.FormGroup controlId="formHorizontalPassword">
					    <BS.Col componentClass={BS.ControlLabel} sm={2}>
					      Password
					    </BS.Col>
					    <BS.Col sm={10}>
					      <BS.FormControl 
					      	type="password"
					      	onChange={(e)=>this.setState({password: e.target.value})}
					      	value={this.state.password} 
					      	placeholder="Password" />
					    </BS.Col>
					  </BS.FormGroup>
					  <BS.FormGroup>
					    <BS.Col smOffset={2} sm={10}>
					      <BS.Button 
					      	onClick={this.signInUser}
					      	type="submit">Sign in</BS.Button>
					    </BS.Col>
					  </BS.FormGroup>
					</BS.Form>
				</div>
			</div>
		);
	}
}

export default Signin;
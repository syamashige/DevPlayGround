import React, { Component } from 'react';
import * as C from './Components';
import { Widget, addResponseMessage } from 'react-chat-widget';
import axios from 'axios';
import {data} from './data';
import {chatUrl, apiurl} from '../config';




class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state={ 
      data: []
    }
    this.handleNewUserMessage=this.handleNewUserMessage.bind(this);
  }


  componentWillMount() {
    axios.get(apiurl)
    .then(res => {
      this.setState({ data: res.data})
    }).catch(err => {
      console.log('fallback initiated')
      this.setState({ data: data })
    })
  }

  handleNewUserMessage(newMessage){
    console.log(newMessage)
    axios.post(chatUrl,{msg:newMessage})
    .then((msg) => {
      addResponseMessage(msg.data);
    }).catch(err => {
      console.log('server not connected')
    })

  }

  login() {
    this.props.auth.login();
  }


  render(){
    const { auth } = this.props;
    return (
      <div>
        <C.Header auth={auth} login={this.login.bind(this)}/>
        <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title="Welcome to API PlayGround!"
            subtitle="this chatbot is here to help you"
          />
        <C.RenderDemos src={this.state.data}/>
      </div>
    );
  }
} 


export default Home;

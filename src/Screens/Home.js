import React, { Component } from 'react';
import * as C from './Components';
import { Widget, addResponseMessage } from 'react-chat-widget';
import axios from 'axios';
import {data} from './data';
import {chatUrl, apiurl} from '../config';




class Home extends Component {
  constructor() {
    super();
    
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


  render(){
    return (
      <div>
        <C.Header />
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

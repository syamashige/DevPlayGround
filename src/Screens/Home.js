import React, { Component } from 'react';
import * as C from './Components';
import { Widget, addResponseMessage } from 'react-chat-widget';
import axios from 'axios';




class Home extends Component {
  constructor() {
    super();
    
    this.state={ 
      data: []
    }
    this.handleNewUserMessage=this.handleNewUserMessage.bind(this);
  }

  handleNewUserMessage(newMessage){
    console.log(newMessage)
    axios.post('http://54.88.118.239/chat',{msg:newMessage})
    .then((msg) => {
      addResponseMessage(msg.data);
    })

  }








  render(){
    return (
      <div>
        <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title="Welcome to API PlayGround!"
            subtitle="this chatbot is here to help you"
          />
      </div>
    );
  }
} 


export default Home;

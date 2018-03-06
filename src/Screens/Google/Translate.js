import React, { Component } from 'react';
import axios from 'axios';
import { PageHeader, Well } from 'react-bootstrap';
import './Translate.css';
import {translate_URL} from '../../config';



class Translate extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: '',
      translated: '...'
    }
    this.translate=this.translate.bind(this);
  }

  translate(){
    axios.post(translate_URL,{q:this.state.value})
    .then(data => {
      this.setState({translated: data.data.data.translations[0].translatedText})
      console.log(data.data.data.translations[0].translatedText)
    }).catch(err => {
      console.log('error')
    })
  }



  render() {
    return (
      <div>
        <PageHeader className="wrapper">
          Translate it!
        </PageHeader>
        <input
          className="searchfield" 
          value={this.state.value}
          onChange={(e)=>this.setState({value: e.target.value})}
          type="text"/>
        <button className="translateit" onClick={this.translate}>Submit</button>

        <Well bsSize="large" className="result">
          <p>{this.state.translated}</p>
        </Well>
        
      </div>

    );
  }
}

export default Translate;
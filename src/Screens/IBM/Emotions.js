import React, { Component } from 'react';
import { PropagateLoader } from 'react-spinners';
import axios from 'axios';
import './emotions.css';
import {arr,placeholder,uri,temp} from '../../config';


class Emotion extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: '', 
      emotions: temp,
      loading: false
    }
    this.analysis=this.analysis.bind(this);
  }

  analysis(){
    this.setState({loading: true})
    axios.post(uri,{text: this.state.value})
    .then(res => {
      this.setState({emotions:res.data})
    })
    setTimeout(() => {
      this.setState({
        value: placeholder,
        loading: false})
    }, 1000)
  }


  renderScores(data){
    return(<div className='wrapper'>
        {data.map((elem, i) => {
          let score = Math.floor(elem.percentile*100);
          let color = arr[Math.floor(arr.length * Math.random())]
          return (
            <div key={i} className='donut-wrapper'>
              <p style={style.donutTitle}>{elem.name}</p>
              <h3 style={{fontSize: 40, color: "white", padding: 20,backgroundColor: color, margin: 0}}>{score}%</h3>
            </div>
            )
        })}
      </div>)
    }


  render() {
    const {emotions, loading, value} = this.state;
    const warning = emotions.warnings;
    return (
      <div>
        <h1 style={style.header}>Emotional Analysis</h1>
        <div className="input">
            <input 
              type="text" 
              value={value}
              onChange={(e)=>this.setState({value: e.target.value})} 
              placeholder={placeholder}/>
        </div>
        <div className="loader">
          {!loading ?
            <button className='analyze' onClick={this.analysis}>analyze</button>
            :<PropagateLoader
            color={'#9B9B9B'}
            loading={this.state.loading}/>
          }
        </div>
        {warning.map(elem => {
          return (<h3 key={1} style={style.warnings}>{elem.message}</h3>)
        })}
        <h1 style={style.personality}>Personality</h1>
          {this.renderScores(emotions.personality)}

        
        <h1 style={style.needs}>Needs</h1>
          {this.renderScores(emotions.needs)}


        <h1 style={style.values}>Values</h1>
          {this.renderScores(emotions.values)}
      </div>
      
    );
  }
}




const style = {
  donutTitle: {
    color: "white",
    padding: 20,
    backgroundColor: "black",
    textAlign: 'center',
    height: 30,
    fontSize: 18,
    verticalAlign: "middle",
    textOverflow: 'ellipsis',
    margin: 0
  },
  personality: {
    background: 'linear-gradient(to right, yellow , salmon)',
    padding: 20,
    margin: 10,
    display: 'flex',
    flex: 1
  },
  needs: {
    background: 'linear-gradient(to right, powderblue, cornflowerblue)',
    padding: 20,
    margin: 10,
    display: 'flex',
    flex: 1
  },
  values: {
    background: 'linear-gradient(to right, lightgreen, #11D4A0)',
    padding: 20,
    margin: 10,
    display: 'flex',
    flex: 1
  },
  warnings: {
    margin: 10,
    textAlign: 'center'
  },
  header: {
    background: 'linear-gradient(to right, #2E92A7 , #7C9FA7)',
    padding: 20,
    margin: 10,
    display: 'flex',
    flex: 1,
  },
}




export default Emotion;

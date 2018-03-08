import React, { Component } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './Gifs.css';
import {gifurl} from '../../config';



class Gifs extends Component{
  constructor(props){
    super(props);

    this.state = {
      data: [],
      value: '',
    }
    this.gifIt=this.gifIt.bind(this);
  }


  componentWillMount() {;
    axios.get(gifurl)
    .then(res => {
      console.log(res.data);
      this.setState({ data: res.data.data})
    }).catch(err => {
      console.log('error')
      this.setState({ data: []})
    })
  }

  gifIt(e){
    e.preventDefault();
    let query = this.state.value;
    axios.get(gifurl +'/'+ query)
    .then(res => {
      this.setState({ data: res.data.data})
    }).catch(err => {
      console.log('error')
      this.setState({ data: []})
    })
  }




  renderCarousel(data){
    return(
    <Carousel 
        interval={1000}
        indicators={false}
        pauseOnHover 
        style={{margin: "auto", width: 600, marginTop: 20}}>
        {data.map((elem, i) => {
          return(<Carousel.Item key={i}>
                  <img 
                    width={600} 
                    height={400} 
                    alt="200x200" 
                    src={elem.images.fixed_height.url} />
                </Carousel.Item>
                )
        })}
      </Carousel>

      )
  }



  render() {
    const {data} = this.state;
    return (
      <div style={{backgroundColor: 'black', height: '800px', paddingTop: 10}}>
        <input
          className="searchfield"
          placeholder="gif search powered by GIPHY" 
          value={this.state.value}
          onChange={(e)=>this.setState({value: e.target.value})}
          type="text"/>
        <button className="translateit" onClick={this.gifIt}>Submit</button>
        {this.renderCarousel(data)}


      </div>
    );
  }
}

export default Gifs;
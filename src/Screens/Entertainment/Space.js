import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {spaceUrl, mapurl} from '../../config';


class Space extends Component{
  constructor(props){
    super(props);

    this.state = {
      center: {lat: 32.251037, lng: -91.735880},
      zoom: 4,
      data: []
    }
    this.launchPads=this.launchPads.bind(this);
  }

  componentWillMount() {
    axios.get(spaceUrl).then(res => {
      this.setState({data: res.data})
    }).catch(err => {
      console.log('error')
    })
  }

  onMarkerClick(){
    console.log('ola');
  }

  onMapClick(){
    console.log(this);
  }

  launchPads(){
    this.setState({
      zoom: 4,
      center: {lat: 32.251037, lng: -91.735880}
    })
  }



  renderMap(data){
    return(<Map
        style={{width: '100%', height: 400, marginTop:20}}
        center={this.state.center}
        onClick={this.onMapClick} 
        google={this.props.google} 
        zoom={this.state.zoom}>
        
        {data.map((elem,i) => {
          return ( 
            <Marker 
              key={i} 
              position={{lat:elem.location.latitude, lng: elem.location.longitude}}/>
              )
        })}

      </Map>)
  }


  render() {
    const {data} = this.state;
    return (
      <div className="space-wrapper">
        <div className="space-header">
          <h1>SPACE X API</h1>
        </div>
        <div className="space-sub-header">
          <Button 
            onClick={this.launchPads}
            bsStyle="info">Launchpads
          </Button>
        </div>
        <div className="space-map">
        {this.renderMap(data)}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (mapurl)
})(Space)
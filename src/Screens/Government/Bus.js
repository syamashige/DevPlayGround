import React, { Component } from 'react';
import { ListGroupItem, ListGroup, Button, Navbar, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import './Bus.css';
import {busURL,mapUrl} from '../../config';


class BusSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: '', 
      bus: [],
      loading: false
    }
    this.findBus=this.findBus.bind(this);
  }

  componentWillMount() {
    let busStopNum = '883';
    axios.get(busURL+busStopNum)
    .then(res => {
      this.setState({bus: res.data})
    }).catch(err => {
      this.setState({value: 'system is done right now'})
    })
  }

  findBus(){
    axios.get(busURL+this.state.value)
    .then(res => {
      if(res.data.length === 0){
        this.setState({value: 'This Bus Stop doesnt exist'})
      }
      this.setState({bus:res.data})
    }).catch(err => {
      this.setState({value: 'system is done right now'})
    })
  }



  renderStops(data){
    return(
        <ListGroup>
          {data.map((elem,i) => {
            return(
              <ListGroupItem key={i}>
                <Button bsStyle="warning">{elem.stop}</Button>
                <span style={{padding: 10}}></span>
                <Button style={{width: 250}}>{elem.headsign}</Button>
                <span style={{padding: 10}}></span>
                <Button bsStyle="success">{elem.stopTime}</Button>
                <span style={{padding: 10}}></span>
                <Button bsStyle="info">{elem.direction}</Button>
                <span style={{padding: 10}}></span>
                {elem.canceled === 1 &&
                <Button bsStyle="danger">Canceled</Button>}
                {elem.lat !== "0" && elem.lng !== "0" &&
                  <a href={mapUrl+elem.lat+','+elem.lng}>
                  <Button
                    onClick={()=>console.log(elem)}
                    bsStyle="primary">MAP</Button></a>}
              </ListGroupItem>
              )
          })}
        </ListGroup>
      )
    }




  render() {
    const data = this.state.bus;
    return (

        <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>BUS STOP#:</Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl 
                  type="text"
                  style={{width: 200}}
                  value={this.state.value}
                  onChange={(e)=>this.setState({value: e.target.value})} 
                  placeholder="Search" />
              </FormGroup>{' '}
              <Button 
                onClick={this.findBus}
                type="submit">Submit</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
          {this.renderStops(data)}

        </div>



      
    );
  }
}

export default BusSearch;

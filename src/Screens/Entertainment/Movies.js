import React, { Component } from 'react';
import axios from 'axios';
import {Navbar,FormGroup, FormControl, Button, Image, ListGroup, ListGroupItem, Col, Popover, Tooltip, Modal, OverlayTrigger,Badge,Glyphicon,Label} from 'react-bootstrap';
import {apikey} from '../../config';
const moviedb = 'https://www.themoviedb.org/static_cache/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png'



class Movies extends Component {
  constructor(props){
    super(props);

    this.state = {
      query: '',
      title: '',
      overview: '',
      poster: '',
      rating: [],
      vote: '',
      results: [],
      date: '',
      show: false
    }
    this.getFilm=this.getFilm.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=batman`
    axios.get(url)
    .then(data => {
      console.log(data);
      this.setState({results: data.data.results})
    })
  }

  getFilm(){
    const {query} = this.state;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${query}`
    axios.get(url)
    .then(data => {
      let res = data.data;
      console.log(data);
      this.setState({
        title: res.title,
        overview: res.overview,
        poster: res.homepage+res.poster_path,
        vote: res.vote_average,
        results: res.results,
      })
    })
    .catch(err => {
      console.log('error')
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(e) {
    let rating = [];
    rating = new Array(Math.floor(e.vote_average)).fill('i')
    this.setState({
      show: true,
      title: e.title,
      overview: e.overview,
      rating: rating,
      vote: e.vote_average,
      date: e.release_date
    });
  }




  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
    const wikipedia = 'https://en.wikipedia.org/wiki/';
    const hulu = 'https://www.hulu.com/search?q=';
    const imdb = 'http://www.imdb.com/find?ref_=nv_sr_fn&q=';
    const rotten = 'https://www.rottentomatoes.com/search/?search=';
    const amazon = 'https://www.amazon.com/s?field-keywords=';
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Search Movies by Title</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl 
                  value={this.state.query}
                  onChange={(e)=>this.setState({query: e.target.value})} 
                  type="text" 
                  placeholder="Search" />
              </FormGroup>
              <Button onClick={this.getFilm} type="submit">Search</Button>
            </Navbar.Form>
            <Navbar.Text pullRight><Image style={{width: 100}} src={moviedb} thumbnail /></Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <section>
          <ListGroup>
            {this.state.results.map((elem, i) => {
              return(
                <ListGroupItem key={i}>
                  <a href={elem.poster_path}>
                    <Button 
                      style={{marginTop:5}} 
                      bsStyle="warning">{elem.vote_count} votes
                    </Button>
                    </a>
                  <span style={{marginLeft: 15}}>
                  </span>
                  <Button 
                    style={{marginTop:5}} 
                    onClick={()=>this.handleShow(elem)}>{elem.title}
                  </Button>
                  <span style={{marginLeft: 15}}>
                  </span>
                  <Button 
                    style={{marginTop:5}} 
                    onClick={()=>this.handleShow(elem)} 
                    bsStyle="info">Info
                  </Button> 
                  <span style={{marginLeft: 15}}>
                  </span>
                  <a href={wikipedia+elem.title}>
                    <Button 
                      style={{marginTop:5}} 
                      bsStyle="primary">Wiki
                    </Button>
                  </a>
                  <span style={{marginLeft: 15}}>
                  </span>
                  <a href={hulu+elem.title}>
                    <Button 
                      style={{marginTop:5}} 
                      bsStyle="success">Find on Hulu
                    </Button>
                  </a>
                  <span style={{marginLeft: 15}}>
                  </span>
                  <a href={imdb+elem.title}>
                    <Button 
                      style={{marginTop:5}} 
                      bsStyle="warning">Find on IMDB
                    </Button>
                  </a> 
                  <span style={{marginLeft: 15}}>
                  </span>
                  <a href={rotten+elem.title}>
                    <Button 
                      style={{marginTop:5}} 
                      bsStyle="danger">Find on Rotten Tomatoes
                    </Button>
                  </a>  
                  <span style={{marginLeft: 15}}>
                  </span>
                  <a href={amazon+elem.title}>
                    <Button 
                      style={{marginTop:5}} 
                      bsStyle="info">Buy on Amazon
                    </Button>
                  </a>      
                </ListGroupItem>
                )
            })}

          </ListGroup>
        </section>
        <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title} ({this.state.date})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Movie Summary</h4>
            <p>{this.state.overview}</p>
            <hr />
            <h4>Movie Rating <Badge>{this.state.vote}/10</Badge></h4>
            {this.state.rating.map((elem,i) => {
              return(<Glyphicon key={i} glyph="star"/>)
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <h4>This product uses the TMDb API but is not endorsed or certified by TMDb.</h4>
      </div>



    );
  }
}

export default Movies;
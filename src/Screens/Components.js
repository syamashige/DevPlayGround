import React from 'react';
import * as BS from 'react-bootstrap';

export const Header = () => {
  return (
     <div>
       <BS.Navbar>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="#home">30 Days of API</a>
          </BS.Navbar.Brand>
        </BS.Navbar.Header>
      </BS.Navbar>
     </div>
    );
}

export const RenderDemos = ({src}) => {
  return(
    <BS.ListGroup>
            {src.map((elem,i) => {
              return(
                <BS.ListGroupItem key={i}>
                  <BS.Badge style={btnStyle} >{i+1}</BS.Badge>
                  <a href={elem.demo}>
                  <BS.Button style={btnStyle} bsStyle="success">Demo</BS.Button></a>
                  <span style={style}></span>
                  <BS.Button style={{width: 250, marginTop:10}}>{elem.feature}</BS.Button>
                  <span style={style}></span>
                  <a href={elem.guide}>
                  <BS.Button style={btnStyle} bsStyle="warning">{elem.api}</BS.Button></a>
                  <span style={style}></span>
                  <a href={elem.code}>
                  <BS.Button style={btnStyle} bsStyle="info">Code</BS.Button></a>
                  <span style={style}></span>
                  <a href={elem.guide}>
                  <BS.Button style={btnStyle} bsStyle="primary">API Docs</BS.Button></a>
                  <span style={style}></span>
                </BS.ListGroupItem>
                )
            })}
          </BS.ListGroup>)
}

const style = {
  padding: 10
}

const btnStyle = {
  marginTop: 10
}
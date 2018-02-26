import React from 'react';
import * as BS from 'react-bootstrap';

export const Header = () => {
  return (
     <div>
       <BS.Navbar>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="#home">api playground {"{ }"}</a>
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
                  <a href={elem.demo}>
                  <BS.Button bsStyle="success">Demo</BS.Button></a>
                  <span style={{padding: 10}}></span>
                  <BS.Button style={{width: 250}}>{elem.feature}</BS.Button>
                  <span style={{padding: 10}}></span>
                  <a href={elem.guide}>
                  <BS.Button bsStyle="warning">{elem.api}</BS.Button></a>
                  <span style={{padding: 10}}></span>
                  <a href={elem.code}>
                  <BS.Button bsStyle="info">Code</BS.Button></a>
                  <span style={{padding: 10}}></span>
                </BS.ListGroupItem>
                )
            })}
          </BS.ListGroup>)
}
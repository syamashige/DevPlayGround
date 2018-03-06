import React from 'react';
import * as BS from 'react-bootstrap';
import { toggleWidget } from 'react-chat-widget';



export const NotLogginIn = ({login}) => {
  return(
    <div className="static-modal">
      <BS.Modal.Dialog>
        <BS.Modal.Header>
          <BS.Modal.Title>Your not logged in</BS.Modal.Title>
        </BS.Modal.Header>

        <BS.Modal.Body>You arrived at this page, because you wanted to contribute to the 30 days of Api Library - which is awesome! and thank you :) first thing thou, please login - that way we can put your name next to the submission and other devs can see who created this awesome demo!</BS.Modal.Body>

        <BS.Modal.Footer>
          <BS.Button onClick={login} bsStyle="primary">Sign-in / Register</BS.Button>
        </BS.Modal.Footer>
      </BS.Modal.Dialog>
    </div>
    )
}


export const Header = ({auth,login}) => {
  return (
     <div>
       <BS.Navbar>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="/" className='header-title'>30 Days of API</a>
          </BS.Navbar.Brand>
        </BS.Navbar.Header>
        <BS.Nav pullRight>
          
                {auth.isAuthenticated() &&
                    <BS.NavItem eventKey={1} href="/add">
                      <BS.Button>Add API Demo</BS.Button>
                    </BS.NavItem>
                }
                {!auth.isAuthenticated() &&
                    <BS.NavItem eventKey={1}>
                     <BS.Button onClick={login}>Sign-in</BS.Button>
                    </BS.NavItem>
                }
          
        </BS.Nav>
      </BS.Navbar>
     </div>
    );
}

export const demotip = (
  <BS.Tooltip id="tooltip">
    <strong>Click here to try it out!</strong>
  </BS.Tooltip>
);

export const powertip = (
  <BS.Tooltip id="tooltip">
    <strong>Powered by:</strong>
  </BS.Tooltip>
);

export const codetip = (
  <BS.Tooltip id="tooltip">
    <strong>Straight to the code!</strong>
  </BS.Tooltip>
);

export const apitip = (
  <BS.Tooltip id="tooltip">
    <strong>Docs make this possible</strong>
  </BS.Tooltip>
);

export const RenderDemos = ({src}) => {
  return(
    <BS.ListGroup>
    
            {src.map((elem,i) => {
              return(
                <BS.ListGroupItem key={i}>
                  <BS.Badge style={btnStyle} >baseem</BS.Badge>
                  {/* if index is 3, change the button to open the chat widget vs changing sites*/}
                  {i === 3 ? 
                    <BS.OverlayTrigger 
                      placement="top" 
                      overlay={demotip}>
                      <BS.Button 
                        onClick={toggleWidget} 
                        style={btnStyle} 
                        bsStyle="success">Demo
                      </BS.Button>
                    </BS.OverlayTrigger>
                    :
                    <BS.OverlayTrigger 
                      placement="top" 
                      overlay={demotip}>
                      <a href={elem.demo}>
                        <BS.Button 
                          style={btnStyle} 
                          bsStyle="success">Demo
                        </BS.Button>
                      </a>
                    </BS.OverlayTrigger>
                  }

                  <span style={style}></span>

                  <BS.Button 
                    active style={{width: 250, marginTop:10}}>{elem.feature}
                  </BS.Button>

                  <span style={style}></span>

                  <BS.OverlayTrigger 
                    placement="top" 
                    overlay={powertip}>
                    <a href={elem.guide}>
                      <BS.Button 
                        style={btnStyle} 
                        bsStyle="warning">{elem.api}
                      </BS.Button>
                    </a>
                  </BS.OverlayTrigger>

                  <span style={style}></span>

                  <BS.OverlayTrigger 
                    placement="top" 
                    overlay={codetip}>
                    <a href={elem.code}>
                      <BS.Button 
                        style={btnStyle} 
                        bsStyle="info">Code
                      </BS.Button>
                    </a>
                  </BS.OverlayTrigger>

                  <span style={style}></span>

                  <BS.OverlayTrigger 
                    placement="top" 
                    overlay={apitip}>
                    <a href={elem.guide}>
                      <BS.Button 
                        style={btnStyle} 
                        bsStyle="primary">API Docs
                      </BS.Button>
                    </a>
                  </BS.OverlayTrigger>

                  <span style={style}></span>
                  
                  {/* If video val in db is null, diabled button*/}
                  {elem.video !== null ?
                    <a href={elem.video}>
                      <BS.Button 
                        active 
                        style={btnStyle} 
                        bsStyle="danger">Video Tutorial
                      </BS.Button>
                    </a>
                    :
                      <BS.Button 
                        disabled 
                        style={btnStyle} 
                        bsStyle="default">Video Tutorial Coming Soon
                      </BS.Button>
                  }

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
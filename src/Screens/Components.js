import React from 'react';
import * as BS from 'react-bootstrap';

export const Header = () => {
  return (
     <div>
       <BS.Navbar>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="#home">dev {"{ }"}</a>
          </BS.Navbar.Brand>
        </BS.Navbar.Header>
        <BS.Nav>
          <BS.NavItem eventKey={1} href="/">
            Home
          </BS.NavItem>
          <BS.NavItem eventKey={2} href="/emotions">
            Emotions
          </BS.NavItem>
        </BS.Nav>
      </BS.Navbar>
     </div>
    );
}
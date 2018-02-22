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
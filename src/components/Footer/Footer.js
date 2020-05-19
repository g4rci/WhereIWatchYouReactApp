import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Card from 'react-bootstrap/Card'
import './Footer.css'


function Footer() {
  return (
    <div className='footer'>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
        
          <img
            src="/logo.png"
            width="30"
            height="30"
            alt="Logo"
          />
           <Card.Text></Card.Text>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Footer;

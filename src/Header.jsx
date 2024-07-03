import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function StickyHeader() {
  return (
    <>
      <Navbar bg="light" sticky="top">
        <Container>
          <Navbar.Brand href="#home"><b>Get in Touch With Us</b></Navbar.Brand>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default StickyHeader;

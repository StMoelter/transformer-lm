import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

import GeneratedText from './components/GeneratedText'
import SampleText from './components/SampleText'
import TopK from './components/TopK'

function App() {
  return (
    <Container>
      <Navbar  bg="primary" variant="dark">
        <Navbar.Brand href="#">gpt-2 ui by Steffen</Navbar.Brand>
      </Navbar>
      <Row className="mt-3">
        <Col><GeneratedText /></Col>
        <Col><SampleText /></Col>
      </Row>
      <Row className="mt-3">
        <Col></Col>
        <Col><TopK /></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;

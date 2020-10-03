import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

import GeneratedText from './components/GeneratedText'
import Generator from './components/Generator'
import Predictions from './components/Predictions'
import SampleText from './components/SampleText'
import Temperature from './components/Temperature'
import TopK from './components/TopK'
import Tokens from './components/Tokens'

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
      <Predictions />
      <Row className="mt-3">
        <Col><Generator /></Col>
        <Col><TopK /></Col>
        <Col><Temperature /></Col>
        <Col><Tokens /></Col>
      </Row>
    </Container>
  );
}

export default App;

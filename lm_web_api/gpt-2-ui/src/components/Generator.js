import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'

export default class Generator extends React.Component {

  render() {
    return (
      <Card>
        <Card.Header>Go</ Card.Header>
        <Card.Body>
          <Button as="input" type="submit" value="Generate" size="lg" />
        </Card.Body>
      </Card>
    );
  }
}

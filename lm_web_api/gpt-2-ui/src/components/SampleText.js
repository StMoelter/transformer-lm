import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React from 'react';

export default class SampleText extends React.Component {
  render() {
    return (
      <Card>
        <Card.Header>Sample Text</Card.Header>
        <Card.Body>
          <Card.Text>
            <Form.Control as="textarea" rows="10" />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

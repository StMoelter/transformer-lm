import Card from 'react-bootstrap/Card';
import React from 'react';
import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'

export default class TopK extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 20
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  render() {
    const { value } = this.state
    return (
      <Card>
        <Card.Header>Top K</Card.Header>
        <Card.Body>
          <Card.Text>
          <Slider
            min={1}
            max={80}
            step={1}
            value={value}
            onChange={this.handleChange}
          />
          </Card.Text>
          <Card.Footer className="text-muted">{value}</Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

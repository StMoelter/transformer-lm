import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'

export default class Temperature extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 1,
      resetValue: 1,
    }
    this.resetValue = this.resetValue.bind(this)
    this.formatValue = this.formatValue.bind(this)
  }

  handleChange = (value) => {
    this.setState({
      value: Math.round(value * 100) / 100
    })
  }

  resetValue = (event) => {
    const { resetValue } = this.state
    this.setState({
      value: resetValue
    })
    event.target.blur()
  }

  formatValue = (value) => {
    const roundedValue = Math.round(value * 100) / 100
    const intValue = Math.trunc(roundedValue)
    const decimals = Math.round((roundedValue - intValue) * 100)
    return String(intValue).padStart(2, '0') + '.' + String(decimals).padEnd(2, '0')
  }

  render() {
    const { value } = this.state
    return (
      <Card>
        <Card.Header>Temperature</Card.Header>
        <Card.Body>
          <Slider
            min={0.1}
            max={10}
            step={0.1}
            value={value}
            onChange={this.handleChange}
          />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex">
            <div className="p-2">
              <Button as="input" type="button" value={this.formatValue(value)} size="sm" disabled/>
            </div>
            <div className="p-2 ml-auto">
              <Button as="input" type="reset" value="Reset" size="sm" onClick={this.resetValue}/>
            </div>
          </div>
        </Card.Footer>
      </Card>
    );
  }
}

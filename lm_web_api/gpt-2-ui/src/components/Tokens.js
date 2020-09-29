import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'

export default class Tokens extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 40,
      resetValue: 40,
    }
    this.resetValue = this.resetValue.bind(this)
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  resetValue = (event) => {
    const { resetValue } = this.state
    this.setState({
      value: resetValue
    })
    event.target.blur()
  }

  render() {
    const { value } = this.state
    return (
      <Card>
        <Card.Header>Tokens</ Card.Header>
        <Card.Body>
          <Slider
            min={1}
            max={100}
            step={1}
            value={value}
            onChange={this.handleChange}
          />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex">
            <div className="p-2">
              <Button as="input" type="button" value={String(value).padStart(3, '0')} size="sm" disabled/>
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

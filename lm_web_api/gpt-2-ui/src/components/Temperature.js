import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Slider from 'react-rangeslider'
import { connect } from "react-redux";

import 'react-rangeslider/lib/index.css'

class Temperature extends React.Component {
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
    this.props.setTemperature(Math.round(value * 100) / 100)
  }

  resetValue = (event) => {
    const setTemperature = this.props.resetTemperature()
    event.target.blur()
  }

  formatValue = (value) => {
    const roundedValue = Math.round(value * 100) / 100
    const intValue = Math.trunc(roundedValue)
    const decimals = Math.round((roundedValue - intValue) * 10)
    return String(intValue).padStart(2, '0') + '.' + String(decimals).padEnd(1, '0')
  }

  render() {
    const temperature = this.props.temperature
    return (
      <Card>
        <Card.Header>Temperature</Card.Header>
        <Card.Body>
          <Slider
            min={0.1}
            max={10}
            step={0.1}
            value={temperature}
            onChange={this.handleChange}
          />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex">
            <div className="p-2">
              <Button as="input" type="button" value={this.formatValue(temperature)} size="sm" disabled/>
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

const mapStateToProps = state => ({
  temperature: state.temperature,
})

const mapDispatchToProps = dispatch => {
  return {
    setTemperature: (temperature) => { dispatch({ type: "setTemperature", temperature: temperature }) },
    resetTemperature: () => { dispatch({ type: "resetTemperature" }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Temperature)

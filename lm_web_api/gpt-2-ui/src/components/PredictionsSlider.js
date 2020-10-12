import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Slider from 'react-rangeslider'
import { connect } from "react-redux";

import 'react-rangeslider/lib/index.css'

class PredictionsSlider extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.resetValue = this.resetValue.bind(this)
  }

  resetValue = (event) => {
    this.props.resetAmountOfPredictions()
    event.target.blur()
  }

  render() {
    const amountOfPredictions = this.props.amountOfPredictions
    const setAmountOfPredictions = this.props.setAmountOfPredictions
    return (
      <Card>
        <Card.Header># Predictions</Card.Header>
        <Card.Body>
          <Slider
            min={1}
            max={10}
            step={1}
            value={amountOfPredictions}
            onChange={setAmountOfPredictions}
          />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex">
            <div className="p-2">
              <Button as="input" type="button" value={String(amountOfPredictions).padStart(2, '0')} size="sm" disabled/>
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
  amountOfPredictions: state.amountOfPredictions,
})

const mapDispatchToProps = dispatch => {
  return {
    setAmountOfPredictions: (amountOfPredictions) => { dispatch({ type: "setAmountOfPredictions", amountOfPredictions: amountOfPredictions }) },
    resetAmountOfPredictions: () => { dispatch({ type: "resetAmountOfPredictions" }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PredictionsSlider)

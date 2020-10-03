import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import TextSelector from 'text-selection-react'

import { connect } from "react-redux";
import { fetchPredictions } from '../actions/predictions'

class Predictions extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  showPredictions() {
    return this.props.predictions.map( (prediction) =>
      this.showPrediction(prediction)
    )
  }

  showPrediction(prediction) {
    return (
      <Card.Body>
        <div className="d-flex">
          <div className="p-2">
            {prediction}
          </div>
          <div className="p-2 ml-auto">
            <Button
              as="input"
              type="submit"
              value="Apply"
              size="sm"
              onClick={ () => this.props.addText(prediction) }
            />
          </div>
        </div>
      </Card.Body>
    )
  }

  render() {
    return (
      <Row className="mt-3"><Col>
        <Card>
          <Card.Header>Predictions</Card.Header>
          {this.showPredictions()}
        </ Card>
      </Col></Row>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  predictions: state.predictions,
})

const mapDispatchToProps = dispatch => {
  return {
    addText: (text) => dispatch({type: 'addText', text: text})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Predictions)

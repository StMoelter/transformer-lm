import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import React from 'react';

import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


class Predictions extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.metaData = this.metaData.bind(this)
    this.showPrediction = this.showPrediction.bind(this)
  }

  showPredictions() {
    return this.props.predictions.map( (prediction) =>
      this.showPrediction(prediction)
    )
  }

  showPrediction(prediction) {
    return (
      <Card.Body key={uuidv4()}>
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

  metaData() {
    const amount_of_predictions = this.props.predictions.length
    if(amount_of_predictions === 0) {
      return ''
    }
    return ` ( time: ${this.props.time} | amount: ${amount_of_predictions} )`
  }

  render() {
    return (
      <Row className="mt-3"><Col>
        <Card>
          <Card.Header>Predictions{this.metaData()}</Card.Header>
          {this.showPredictions()}
        </ Card>
      </Col></Row>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  predictions: state.predictions,
  time: state.time,
})

const mapDispatchToProps = dispatch => {
  return {
    addText: (text) => dispatch({type: 'addText', text: text})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Predictions)

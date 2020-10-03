import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import React from 'react';

import { connect } from "react-redux";
import { fetchPredictions } from '../actions/predictions'

class Generator extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.loadPredictions = this.loadPredictions.bind(this)
  }

  loadPredictions() {
    this.props.fetchPredictions({
      generatedtext: this.props.generatedtext,
      sampletext: this.props.sampletext,
      temperature: this.props.temperature,
      tokens: this.props.tokens,
      topk: this.props.topk,
    })
  }

  render() {
    return (
      <Card>
        <Card.Header>Go</ Card.Header>
        <Card.Body>{
          this.props.isLoading ?
            <Button variant="primary" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              Loading...
            </Button>
          : <Button as="input" type="submit" value="Generate" size="lg" onClick={ this.loadPredictions }/>
        }
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  generatedtext: state.generatedtext,
  sampletext: state.sampletext,
  temperature: state.temperature,
  tokens: state.tokens,
  topk: state.topk,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchPredictions: (params) => dispatch(fetchPredictions(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generator)

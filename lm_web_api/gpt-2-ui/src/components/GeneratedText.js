import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React from 'react';

import { connect } from "react-redux";

class GeneratedText extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.setText = this.setText.bind(this)
  }

  setText(event){
    this.props.setText(event.target.value)
  }

  render() {
    return (
      <Card>
        <Card.Header>Generated Text</Card.Header>
        <Card.Body>
          <Card.Text>
            <Form.Control
              as="textarea"
              rows="10"
              value={ this.props.generatedtext }
              onChange={ this.setText }
            />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  generatedtext: state.generatedtext,
})

const mapDispatchToProps = dispatch => {
  return {
    setText: (generatedtext) => { dispatch({ type: "setText", generatedtext: generatedtext }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneratedText)

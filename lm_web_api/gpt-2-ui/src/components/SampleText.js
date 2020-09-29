import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { connect } from "react-redux";

class SampleText extends React.Component {
  render() {
    return (
      <Card>
        <Card.Header>Sample Text</Card.Header>
        <Card.Body>
          <Card.Text>
            <Form.Control
              as="textarea"
              rows="10"
              value={this.props.sampletext}
              onChange={(e) => this.props.setSampleText(e.target.value)} 
            />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  sampletext: state.sampletext,
})

const mapDispatchToProps = dispatch => {
  return {
    setSampleText: (sampletext) => { dispatch({ type: "setSampleText", sampletext: sampletext }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleText)

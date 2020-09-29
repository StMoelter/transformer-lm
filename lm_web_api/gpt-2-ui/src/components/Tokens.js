import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Slider from 'react-rangeslider'
import { connect } from "react-redux";


import 'react-rangeslider/lib/index.css'

class Tokens extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.resetValue = this.resetValue.bind(this)
  }

  resetValue = (event) => {
    this.props.resetTokens()
    event.target.blur()
  }

  render() {
    const tokens = this.props.tokens
    const setTokens = this.props.setTokens
    return (
      <Card>
        <Card.Header>Tokens</Card.Header>
        <Card.Body>
          <Slider
            min={1}
            max={100}
            step={1}
            value={tokens}
            onChange={setTokens}
          />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex">
            <div className="p-2">
              <Button as="input" type="button" value={String(tokens).padStart(3, '0')} size="sm" disabled/>
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
  tokens: state.tokens,
})

const mapDispatchToProps = dispatch => {
  return {
    setTokens: (tokens) => { dispatch({ type: "setTokens", tokens: tokens }) },
    resetTokens: () => { dispatch({ type: "resetTokens" }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tokens)

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Slider from 'react-rangeslider'
import { connect } from "react-redux";

import 'react-rangeslider/lib/index.css'

class TopK extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.resetValue = this.resetValue.bind(this)
  }

  resetValue = (event) => {
    this.props.resetTopK()
    event.target.blur()
  }

  render() {
    const topk = this.props.topk
    const setTopK = this.props.setTopK
    return (
      <Card>
        <Card.Header>Top K</Card.Header>
        <Card.Body>
          <Slider
            min={1}
            max={100}
            step={1}
            value={topk}
            onChange={setTopK}
          />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex">
            <div className="p-2">
              <Button as="input" type="button" value={String(topk).padStart(3, '0')} size="sm" disabled/>
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
  topk: state.topk,
})

const mapDispatchToProps = dispatch => {
  return {
    setTopK: (topk) => { dispatch({ type: "setTopK", topk: topk }) },
    resetTopK: () => { dispatch({ type: "resetTopK" }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopK)

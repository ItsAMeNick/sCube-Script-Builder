import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

import { connect } from "react-redux";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = { event_type: null};
        this.handleChange = this.handleChange.bind(this);
    }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      event_type: event.target.value
    });
    this.props.update({
      event_type: event.target.value
    });
    event.preventDefault();
  };

  render() {
    return (
    <div>
      <Form>
          <Form.Label>
            Please select when this event script will be running:
          </Form.Label>
          <Form.Control as="select" onChange={this.handleChange}>
            <option></option>
            <option>ASA</option>
            <option>WTUA</option>
            <option>WTUB</option>
          </Form.Control>
        </Form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  update: item => dispatch({
      type: "update_event_type",
      payload: item
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);

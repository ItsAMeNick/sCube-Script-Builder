import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

import { connect } from "react-redux";

class CORE_Function extends Component {
    constructor(props) {
        super(props);
        this.state = { functionality: null};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newFunctionality = this.props.functionality;
        newFunctionality[event.target.id] = event.target.checked;
        this.props.update({
            functionality: newFunctionality
        });
    };

  render() {
    return (
    <div>
      <Form>
          <Form.Label>
            Please select what you would like this script to do:
          </Form.Label>
          <Form.Check id="fees" type="checkbox" label="Add a Fee" onChange={this.handleChange}/>
          <Form.Check id="notification_send" type="checkbox" label="Send a Notification" onChange={this.handleChange}/>
          <Form.Check id="status_udpate" type="checkbox" label="Update the Status" onChange={this.handleChange}/>
          <Form.Check id="inspection_schedule" type="checkbox" label="Schedule an Inspection" onChange={this.handleChange}/>
        </Form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  functionality: state.functionality
});

const mapDispatchToProps = dispatch => ({
  update: item => dispatch({
      type: "update_functionality",
      payload: item
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CORE_Function);

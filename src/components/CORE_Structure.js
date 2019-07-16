import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

import { connect } from "react-redux";

class CORE_Structure extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

  handleChange(event) {
      let newStructure = this.props.structure;
      newStructure[event.target.id] = event.target.value;
      this.props.update({
          structure: newStructure
      });
  };

  render() {
    return (
    <div>
      <Form>
          <Form.Label>Module:</Form.Label>
          <Form.Control id="module" type="text" onChange={this.handleChange}/>
          <Form.Label>Type:</Form.Label>
          <Form.Control id="type" type="text" onChange={this.handleChange}/>
          <Form.Label>SubType:</Form.Label>
          <Form.Control id="subtype" type="text" onChange={this.handleChange}/>
          <Form.Label>Category:</Form.Label>
          <Form.Control id="category" type="text" onChange={this.handleChange}/>
        </Form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  structure: state.structure
});

const mapDispatchToProps = dispatch => ({
  update: item => dispatch({
      type: "update_structure",
      payload: item
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CORE_Structure);

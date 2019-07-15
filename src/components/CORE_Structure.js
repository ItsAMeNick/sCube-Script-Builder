import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

import { connect } from "react-redux";

class CORE_Structure extends Component {
    constructor(props) {
        super(props);
        this.state = { event_type: null};
        this.handleChange = this.handleChange.bind(this);
    }

  handleChange(event) {
    if (event.target.id === "module") {
        this.props.update({
            module: event.target.value,
            type: this.props.type,
            subtype: this.props.subtype,
            category: this.props.category
        });
    } else if (event.target.id === "type") {
        this.props.update({
            module: this.props.module,
            type: event.target.value,
            subtype: this.props.subtype,
            category: this.props.category
        });
    } else if (event.target.id === "subtype") {
        this.props.update({
            module: this.props.module,
            type: this.props.type,
            subtype: event.target.value,
            category: this.props.category
        });
    } else if (event.target.id === "category") {
        this.props.update({
            module: this.props.module,
            type: this.props.type,
            subtype: this.props.subtype,
            category: event.target.value
        });
    }
    event.preventDefault();
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
  module: state.structure_module,
  type: state.structure_type,
  subtype: state.structure_subtype,
  category: state.structure_category
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

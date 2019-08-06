import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash"

import Form from "react-bootstrap/Form";

class WORK_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newWorkflows = _.cloneDeep(this.props.workflows);
        let newValue = event.target.value;
        newWorkflows[this.props.work_number][event.target.id] = newValue;
        this.props.update({
            workflows: newWorkflows
        });
        this.forceUpdate();
    };

    render() {
        return (
        <tr>
            <td>{this.props.work_number}</td>
            <td>
                <Form.Control id="action" as="select" onChange={this.handleChange}>
                    <option/>
                    <option>Open</option>
                    <option>Close</option>
                </Form.Control>
            </td>
            <td>
                <Form.Control id="task" type="text" onChange={this.handleChange}/>
            </td>
            {/* The next two are split the way they are because of a "cannot render empty"
              as the child of a tr... I think because i was using fragments, but idk */}
            {this.props.workflows[this.props.work_number].action === "Close" ?
                <td>
                    <Form.Control id="status" type="text" onChange={this.handleChange}/>
                </td>
            : <td colSpan="2"></td>}
            {this.props.workflows[this.props.work_number].action === "Close" ?
                <td>
                    <Form.Control id="comment" type="text" onChange={this.handleChange}/>
                </td>
            : null}
            {this.props.work_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.work_number);
                }}>
                    Delete
                </button>
            </td>
            : null}
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    workflows: state.workflows
});

const mapDispatchToProps = dispatch => ({
    update: w => dispatch({
        type: "update_workflow",
        payload: w
    }),
    delete: w => dispatch({
        type: "delete_workflow",
        payload: w
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WORK_Item);

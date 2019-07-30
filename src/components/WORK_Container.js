import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import WorkItem from "./WORK_Item.js";

class WORK_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateWorkItems = () => {
        let workflows = [];
        for (let w in this.props.workflows) {
            workflows.push(<WorkItem key={this.props.workflows[w].key} work_number={this.props.workflows[w].key}/>)
        }
        return workflows;
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>Workflow Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Action</th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateWorkItems()}
                </tbody>
            </Table>
            <button onClick={() => {
                this.props.add();
            }}> Add Workflow Task </button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.workflow,
    workflows: state.workflows
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_workflow",
        payload: null
    }),
    update: w => dispatch({
        type: "update_workflow",
        payload: w
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(WORK_Container);

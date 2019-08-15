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

    loadTasks() {
        let tasks = [];
        for (let t in this.props.loaded_workflows) {
            tasks = [...tasks, ...this.props.loaded_workflows[t].tasks];
        }

        let used_tasks = [];
        return [<option key={-1}/>].concat(tasks.filter(item => {
            if (used_tasks.includes(item)) {
                return false;
            } else {
                used_tasks.push(item)
                return true;
            }
        }).sort((item1, item2) => {
            return item1.localeCompare(item2);
        }).map(item => {
            return <option key={item} label={item} value={item}/>
        }));
    }

    loadStatus() {
        let status = [];
        for (let t in this.props.loaded_workflows) {
            status = [...status, ...this.props.loaded_workflows[t].status];
        }

        let used_status = [];
        return [<option key={-1}/>].concat(status.filter(item => {
            if (used_status.includes(item)) {
                return false;
            } else {
                used_status.push(item)
                return true;
            }
        }).sort((item1, item2) => {
            return item1.localeCompare(item2);
        }).map(item => {
            return <option key={item} label={item} value={item}/>
        }));
    }

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
            {this.props.loaded_workflows ?
                <td>
                    <Form.Control id="task" as="select" onChange={this.handleChange}>
                        {this.loadTasks()}
                    </Form.Control>
                </td>
            :
                <td>
                    <Form.Control id="task" type="text" onChange={this.handleChange}/>
                </td>
            }
            {/* The next two are split the way they are because of a "cannot render empty"
              as the child of a tr... I think because i was using fragments, but idk */}
            {this.props.workflows[this.props.work_number].action === "Close" ?
                (this.props.loaded_workflows ?
                    <td>
                        <Form.Control id="status" as="select" onChange={this.handleChange}>
                            {this.loadStatus()}
                        </Form.Control>
                    </td>
                :
                    <td>
                        <Form.Control id="status" type="text" onChange={this.handleChange}/>
                    </td>
                )
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
    workflows: state.workflows,
    loaded_workflows: state.loaded_data.workflows
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

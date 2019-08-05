import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class CONDIT_Action extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local_comp_type: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        let newConditions = _.cloneDeep(this.props.conditions);
        newConditions[this.props.parent].actions[this.props.id] = event.target.value;
        this.props.update({
            conditions: newConditions
        });
    };

    handleDelete = event => {
        this.props.delete({
            id: this.props.id,
            parent: this.props.parent
        });
    }

    gatherActions = () => {
        let actions = [];
        actions.push("");

        //Gather Status
        if (this.props.functionality.status_update) {
            for (let s in this.props.status)  {
                actions.push("Status-"+this.props.status[s].key);
            }
        }

        //Gather Status
        if (this.props.functionality.new_record) {
            for (let r in this.props.new_records)  {
                actions.push("New Record-"+this.props.new_records[r].key);
            }
        }

        //Gather Fees
        if (this.props.functionality.fees) {
            for (let f in this.props.fees)  {
                actions.push("Fee-"+this.props.fees[f].key);
            }
        }

        //Gather Notifications
        if (this.props.functionality.notifications) {
            for (let n in this.props.notifications)  {
                actions.push("Notification-"+this.props.notifications[n].key);
            }
        }

        //Gather Workflows
        if (this.props.functionality.workflow) {
            for (let w in this.props.workflows)  {
                actions.push("Workflow-"+this.props.workflows[w].key);
            }
        }

        //Gather Inspections
        if (this.props.functionality.inspections) {
            for (let i in this.props.inspections)  {
                actions.push("Inspection-"+this.props.inspections[i].key);
            }
        }

        //Gather Cancels
        if (this.props.functionality.cancel) {
            for (let c in this.props.cancels)  {
                actions.push("Cancelation-"+this.props.cancels[c].key);
            }
        }

        //Gather ASIs
        if (this.props.functionality.asi) {
            for (let a in this.props.asis)  {
                actions.push("ASI-"+this.props.asis[a].key);
            }
        }

        return actions.map(a => {
            return <option key={a} value={a}>{a}</option>;
        });
    }

    render() {
        return (
        <tr>
            <td>
            </td>
            <td>
            </td>
            <td>
                Action:
            </td>
            <td>
                {this.props.id}
            </td>
            <td>
                <Form.Control id={this.props.id} as="select" onChange={this.handleChange}>
                    {this.gatherActions()}
                </Form.Control>
            </td>
            <td>
                <button id={this.props.id} onClick={this.handleDelete}>- Action</button>
            </td>
            <td>

            </td>
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    functionality: state.functionality,
    conditions: state.conditions,
    status: state.status,
    new_records: state.new_records,
    fees: state.fees,
    notifications: state.notifications,
    workflows: state.workflows,
    inspections: state.inspections,
    cancels: state.cancels,
    asis: state.asis
});

const mapDispatchToProps = dispatch => ({
    update: actions => dispatch({
        type: "update_conditions",
        payload: actions
    }),
    delete: a => dispatch({
        type: "delete_action",
        payload: a
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT_Action);

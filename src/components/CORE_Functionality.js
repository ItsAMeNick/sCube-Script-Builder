import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from 'react-bootstrap/Form';

class CORE_Function extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newFunctionality = _.cloneDeep(this.props.functionality);
        newFunctionality[event.target.id] = event.target.checked;
        this.props.update({
            functionality: newFunctionality
        });
    };

    componentDidMount() {
        //Have Conditions be on by default
        document.getElementById("conditions").checked = this.props.functionality.conditions;
    };

    render() {
        return (
            <div>
            <Form>
                <Form.Label>
                    Please select what you would like this script to do:
                </Form.Label>
                <Form.Check id="status_update" type="checkbox" label="Update the Status" onChange={this.handleChange}/>
                <Form.Check id="asi" type="checkbox" label="Edit ASI" onChange={this.handleChange}/>
                <Form.Check id="fees" type="checkbox" label="Add a Fee" onChange={this.handleChange}/>
                <Form.Check id="notifications" type="checkbox" label="Send a Notification" onChange={this.handleChange}/>
                <Form.Check id="workflow" type="checkbox" label="Change the Workflow" onChange={this.handleChange}/>
                <Form.Check id="inspections" type="checkbox" label="Schedule an Inspection" onChange={this.handleChange}/>
                <Form.Check id="new_record" type="checkbox" label="Create a new Record" onChange={this.handleChange}/>
                <Form.Check id="report" type="checkbox" label="Generate a Report" onChange={this.handleChange}/>
                {(((this.props.event_type && ["ASB", "IRSB", "WTUB"].includes(this.props.event_type)) || this.props.mode === "pageflow") && this.props.mode !== "batch_script") ?
                    <Form.Check id="cancel" type="checkbox" label="Prevent Submission/Action" onChange={this.handleChange}/>
                : null}
                {this.props.mode === "pageflow" ?
                    null
                : null}
                <hr/>
                <Form.Label>
                    Should this script use conditions?
                </Form.Label>
                <Form.Check id="conditions" type="checkbox" label="Use Conditions" onChange={this.handleChange}/>
            </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    functionality: state.functionality,
    event_type: state.event_type,
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
    update: item => dispatch({
        type: "update_functionality",
        payload: item
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Function);

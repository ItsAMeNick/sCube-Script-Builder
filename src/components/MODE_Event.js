import React, { Component } from 'react';
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form'

class CORE_Event extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.getElementById("event_type_master").value = this.props.event_type;
    }

    handleChange(event) {
        this.props.update({
            event_type: event.target.value
        });
    };

    genLabel() {
        switch(this.props.mode) {
            case "event_script": {
                return "When will this script run?";
            }
            case "function": {
                return "Where will this function be used?";
            }
            default: {
                return "ERROR"
            }
        }
    }

    render() {
        return (
        <div>
            <Form>
            <Form.Label>
                {this.genLabel()}
            </Form.Label>
            <Form.Control as="select" id="event_type_master" onChange={this.handleChange}>
                <option/>
                <option value="ASA">ASA - After an application is submitted.</option>
                <option value="ASB">ASB - Before an application can be submitted.</option>
                <option value="CTRCA">CTRCA - After a record is submitted in ACA.</option>
                <option value="IRSA">IRSA - After inspection results have been submitted.</option>
                <option value="IRSB">IRSB - Before inspection results can be submitted.</option>
                <option value="PRA">PRA - After a payment is made.</option>
                <option value="WTUA">WTUA - After the workflow has advanced.</option>
                <option value="WTUB">WTUB - Before the workflow is able to advance.</option>
                {this.props.mode === "function" ?
                    <option value="NA">NA</option>
                : null}
            </Form.Control>
            </Form>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    event_type: state.event_type,
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
    update: item => dispatch({
        type: "update_event_type",
        payload: item
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Event);

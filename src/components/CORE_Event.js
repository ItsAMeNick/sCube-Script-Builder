import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

import { connect } from "react-redux";

class CORE_Event extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
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
                When will this script run?
            </Form.Label>
            <Form.Control as="select" onChange={this.handleChange}>
                <option></option>
                <option value="ASA">ASA - A backoffice user submits an application.</option>
                <option value="WTUA">WTUA - The workflow has successfully advanced.</option>
                <option value="WTUB">WTUB - Before the workflow is able to advance.</option>
            </Form.Control>
            </Form>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    event_type: state.event_type
});

const mapDispatchToProps = dispatch => ({
    update: item => dispatch({
        type: "update_event_type",
        payload: item
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Event);

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
                Please select when this event script will be running:
            </Form.Label>
            <Form.Control as="select" onChange={this.handleChange}>
                <option></option>
                <option value="ASA">When a backoffice user submits an application.</option>
                <option value="WTUA">When the workflow has successfully advanced.</option>
                <option value="WTUB">Beore the workflow is able to advance.</option>
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

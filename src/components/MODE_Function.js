import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

import { connect } from "react-redux";

class MODE_Function extends Component {
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
        <Form>
            <Form.Label>
                Name of your function:
            </Form.Label>
            <Form.Control type="text" placeholder="Ex. MyNewFunctionForAccela" onChange={this.handleChange}/>
            <hr/>
            <Form.Label>
                Description of your function:
            </Form.Label>
            <Form.Control as="textarea" rows="7" placeholder="Ex. Sends an email to all LPs on a record." onChange={this.handleChange}/>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(MODE_Function);

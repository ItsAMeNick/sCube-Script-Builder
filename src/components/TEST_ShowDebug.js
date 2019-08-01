import React, { Component } from 'react';
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form';

class TEST_ShowDebug extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.update({
            show_debug: event.target.checked
        });
    };

    render() {
        return (
        <div>
        {this.props.mode !== "batch_script" ?
        <Form>
            <hr/>
            <Form.Label>
                Should this script display the debug window?:
            </Form.Label>
            <Form.Check type="checkbox" label="Show Debug " onChange={this.handleChange}/>
        </Form>
        : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    show_debug: state.show_debug,
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
    update: item => dispatch({
        type: "update_show_debug",
        payload: item
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(TEST_ShowDebug);

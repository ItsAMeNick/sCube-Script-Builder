import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import Sets from "./PARAM_Set.js";

class PARAM_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>Parameter Manager</h3>
                <Sets set_number={1}/>
            <button onClick={() => {this.props.add()}}> Add Set</button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.notification_send,
    parameter_sets: state.parameter_sets
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_note",
        payload: null
    }),
    update: s => dispatch({
        type: "update_notes",
        payload: s
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Container);

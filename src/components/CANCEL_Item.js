import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class CANCEL_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newCancels = _.cloneDeep(this.props.cancels);
        let newValue = event.target.value;
        newCancels[this.props.cancel_number][event.target.id] = newValue.replace(/\n/g, " ");
        this.props.update({
            cancels: newCancels
        });
    };

    render() {
        return (
        <tr>
            <td>{this.props.cancel_number}</td>
            <td>
                <Form.Control id="message" as="textarea" onChange={this.handleChange}/>
            </td>
            {this.props.cancel_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.cancel_number);
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
    cancels: state.cancels
});

const mapDispatchToProps = dispatch => ({
    update: c => dispatch({
        type: "update_cancels",
        payload: c
    }),
    delete: c => dispatch({
        type: "delete_cancel",
        payload: c
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CANCEL_Item);

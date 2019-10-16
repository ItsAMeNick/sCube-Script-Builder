import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class STATUS_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newStatus = _.cloneDeep(this.props.status);
        let newValue = event.target.value;
        if (event.target.id === "optional_cap") {
            newValue = event.target.checked;
        }
        newStatus[this.props.status_number][event.target.id] = newValue;
        this.props.update({
            status: newStatus
        });
        this.forceUpdate();
    };

    render() {
        return (
        <tr>
            <td>{this.props.status_number}</td>
            <td>
                <Form.Control id="label" type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="comment" type="text" onChange={this.handleChange}/>
            </td>

            {this.props.status_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.status_number);
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
    status: state.status
});

const mapDispatchToProps = dispatch => ({
    update: s => dispatch({
        type: "update_status",
        payload: s
    }),
    delete: s => dispatch({
        type: "delete_status",
        payload: s
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(STATUS_Item);

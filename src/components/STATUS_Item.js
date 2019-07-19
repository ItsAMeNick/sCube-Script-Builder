import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

class STATUS_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newStatus = this.props.status;
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
            <td>
                <Form.Check id="optional_cap" onChange={this.handleChange}/>
            </td>
            <td>
                {this.props.status[this.props.status_number].optional_cap ?
                    <Form.Control id="cap" type="text" onChange={this.handleChange}/>
                : null}
            </td>
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
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(STATUS_Item);

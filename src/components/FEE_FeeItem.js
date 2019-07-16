import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

class FEE_FeeItem extends Component {
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
        <tr>
            <td>{this.props.fee_number}</td>
            <td>
                <Form.Control id="code" type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="schedule" type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="period" as="select" onChange={this.handleChange}>
                    <option>FINAL</option>
                </Form.Control>
            </td>
            <td>
                <Form.Control id="quantity" type="number" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="invoice" as="select" onChange={this.handleChange}>
                    <option></option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </Form.Control>
            </td>
            <td>
                <Form.Control id="duplicate" as="select" onChange={this.handleChange}>
                    <option></option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </Form.Control>
            </td>
            <td>
                <Form.Control id="sequence" type="text" onChange={this.handleChange}/>
            </td>
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    fees: state.fees
});

const mapDispatchToProps = dispatch => ({
    update: fees => dispatch({
        type: "update_fees",
        payload: fees
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FEE_FeeItem);

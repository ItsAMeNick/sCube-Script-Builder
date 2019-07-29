import React, { Component } from 'react';
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class FEE_FeeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newFees = this.props.fees;
        let type = event.target.id.split("-");
        newFees[this.props.fee_number][type[0]] = event.target.value;
        this.props.update({
            fees: newFees
        });
        this.forceUpdate();
    }

    render() {
        return (
        <tr>
            <td>{this.props.fee_number}</td>
            <td>
                <Form.Control id={"schedule-"+this.props.fee_number} defaultValue={this.props.fees[this.props.fee_number].schedule} type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id={"code-"+this.props.fee_number} type="text" onChange={this.handleChange}/>
            </td>
            {this.props.isAdvanced ?
            <td>
                <Form.Control id={"period-"+this.props.fee_number} defaultValue={this.props.fees[this.props.fee_number].period} as="select" onChange={this.handleChange}>
                    <option>FINAL</option>
                </Form.Control>
            </td>
            : null}
            <td>
                <OverlayTrigger overlay={<Tooltip>
                    This field will accept either a number or text.  If text is provided, the quantity will be set using a custom field. This field will become bold if text is detected.
                </Tooltip>}>
                    <Form.Control varient="danger" id={"quantity-"+this.props.fee_number} onChange={this.handleChange} style={{fontWeight: (this.props.fees[this.props.fee_number].quantity && !isNaN(parseFloat(this.props.fees[this.props.fee_number].quantity))) ? "normal":"bold"}}/>
                </OverlayTrigger>
            </td>
            {this.props.isAdvanced ?
            <td>
                <Form.Control id={"invoice-"+this.props.fee_number} defaultValue={this.props.fees[this.props.fee_number].invoice} as="select" onChange={this.handleChange}>
                    <option value={"Y"}>Yes</option>
                    <option value={"N"}>No</option>
                </Form.Control>
            </td>
            : null}
            {this.props.fee_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.fee_number);
                }}>
                    Delete
                </button>
            </td>
            : <td></td>}
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    fees: state.fees,
    isAdvanced: state.functionality.fees_advanced
});

const mapDispatchToProps = dispatch => ({
    update: fees => dispatch({
        type: "update_fees",
        payload: fees
    }),
    delete: f => dispatch({
        type: "delete_fee",
        payload: f
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FEE_FeeItem);

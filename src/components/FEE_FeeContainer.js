import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import FeeItem from "./FEE_FeeItem.js";

class FEE_FeeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.generateFeeItem = this.generateFeeItem.bind(this);
    }

    handleChange(event) {
        console.log(this.props);
    };

    addFee = () => {
        this.props.add();
    }

    generateFeeItems = () => {
        var fees = this.props.fees;
        return fees.map(this.generateFeeItem);
    }

    generateFeeItem = (fee) => {
        return <FeeItem key={fee.key} fee_number={fee.key}/>;
    }

    render() {
        return (
        <div>
        {this.props.functionality ?
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Fee Code</th>
                    <th>Fee Schedule</th>
                    <th>Fee Period</th>
                    <th>Quantity</th>
                    <th>Invoice</th>
                    <th>Duplicate</th>
                    <th>Fee Sequence</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateFeeItems()}
                </tbody>
            </Table>
            <button onClick={this.addFee}> Add Fee </button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    functionality: state.functionality.fees,
    fees: state.fees
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_fee",
        payload: null
    }),
    update: fees => dispatch({
        type: "update_fees",
        payload: fees
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FEE_FeeContainer);

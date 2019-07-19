import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import FeeItem from "./FEE_FeeItem.js";

class FEE_FeeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    addFee = () => {
        this.props.add();
    }

    generateFeeItems = () => {
        let fees = [];
        for (let fee in this.props.fees) {
            fees.push(<FeeItem key={this.props.fees[fee].key} fee_number={this.props.fees[fee].key}/>)
        }
        return fees;
    }

    render() {
        return (
        <div>
        {this.props.functionality ?
        <div>
            <hr/>
            <h3>Fee Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Fee Schedule</th>
                    <th>Fee Code</th>
                    {this.props.isAdvanced ?
                        <th>Fee Period</th>
                    : null}
                    <th>Quantity</th>
                    {this.props.isAdvanced ?
                        <th>Invoice</th>
                    : null}
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
    isAdvanced: state.functionality.fees_advanced,
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

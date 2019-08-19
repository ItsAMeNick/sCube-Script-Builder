import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FeeItem from "./FEE_FeeItem.js";

class FEE_FeeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    addFee = () => {
        this.props.add();
    }

    goAdvanced = event => {
        let newFunctionality = this.props.functionality;
        newFunctionality[event.target.id] = event.target.checked;
        this.props.update_isAdvanced({
            functionality: newFunctionality
        });
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
        {this.props.functionality.fees ?
        <div>
            <hr/>
            <h3>Fee Manager</h3>
            <Form.Check label="Advanced Mode" id="fees_advanced" onChange={this.goAdvanced}/>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Fee Schedule</th>
                    <th>Fee Code</th>
                    {this.props.isAdvanced ?
                        <th>Fee Period</th>
                    : null}
                    {this.props.loaded_fees ?
                        <th>Use Custom Field</th>
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
    functionality: state.functionality,
    isAdvanced: state.functionality.fees_advanced,
    fees: state.fees,
    loaded_fees: state.loaded_data.fees
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_fee",
        payload: null
    }),
    update_isAdvanced: item => dispatch({
        type: "update_functionality",
        payload: item
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FEE_FeeContainer);

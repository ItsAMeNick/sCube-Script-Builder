import React, { Component } from 'react';

import { connect } from "react-redux";

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
            <td>1</td>
            <td>NAME</td>
            <td>CODE</td>
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

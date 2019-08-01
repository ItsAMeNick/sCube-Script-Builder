import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import CancelItem from "./CANCEL_Item.js";

class CANCEL_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generatePrevItems = () => {
        let cancels = [];
        for (let c in this.props.cancels) {
            cancels.push(<CancelItem key={this.props.cancels[c].key} cancel_number={this.props.cancels[c].key}/>)
        }
        return cancels;
    }

    render() {
        return (
        <div>
        {(this.props.isOn
            && ((this.props.event_type
                && ["ASB", "IRSB", "WTUB"].includes(this.props.event_type))
                || this.props.mode === "pageflow")) ?
        <div>
            <hr/>
            <h3>Cancelation Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generatePrevItems()}
                </tbody>
            </Table>
            <button onClick={() => {
                this.props.add();
            }}> Add Cancelation </button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.cancel,
    event_type: state.event_type,
    mode: state.mode,
    cancels: state.cancels
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_cancel",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CANCEL_Container);

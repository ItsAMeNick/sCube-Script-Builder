import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import StatusItem from "./STATUS_Item.js";

class STATUS_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    addStatus = () => {
        this.props.add();
    }

    generateStatusItems = () => {
        let stats = [];
        for (let s in this.props.status) {
            stats.push(<StatusItem key={this.props.status[s].key} status_number={this.props.status[s].key}/>)
        }
        return stats;
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>Status Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Comment*</th>
                 
                    </tr>
                </thead>
                <tbody>
                    {this.generateStatusItems()}
                </tbody>
            </Table>
            <p>*Comments will be preceeded by "Updated via Script - (Your Text Here)"</p>
            <button onClick={this.addStatus}> Add Status </button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.status_update,
    status: state.status
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_status",
        payload: null
    }),
    update: s => dispatch({
        type: "update_status",
        payload: s
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(STATUS_Container);

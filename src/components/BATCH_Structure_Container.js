import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import BatchItem from "./BATCH_Structure_Item.js";

class BATCH_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <React.Fragment>
        {this.props.mode === "batch_script" ?
        <div>
            <hr/>
            <h3>Batch Script: Structure Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Module</th>
                    <th>Type</th>
                    <th>Sub-Type</th>
                    <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <BatchItem bsi_number="1"/>
                </tbody>
            </Table>
            <button> Add Structure </button>
        </div> : null}
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BATCH_Container);

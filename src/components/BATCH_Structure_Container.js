import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import BatchItem from "./BATCH_Structure_Item.js";

class BATCH_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    genBatchStructureItems() {
        let batch_structs = [];
        for (let bsi in this.props.batch.structures) {
            batch_structs.push(<BatchItem key={this.props.batch.structures[bsi].key} bsi_number={this.props.batch.structures[bsi].key}/>)
        }
        return batch_structs;
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
                    {this.genBatchStructureItems()}
                </tbody>
            </Table>
            <button onClick={this.props.add}> Add Structure </button>
        </div> : null}
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    batch: state.batch,
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_batch_structure",
        payload: null
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BATCH_Container);

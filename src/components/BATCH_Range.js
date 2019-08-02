import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class BATCH_Range extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newBatch = _.cloneDeep(this.props.batch);
        newBatch.lic_only[event.target.id] = event.target.value;
        this.props.update({
            batch: newBatch
        });
        this.forceUpdate();
    }

    render() {
        return (
        <React.Fragment>
        {this.props.mode === "batch_script" ?
        <div>
            <hr/>
            <h3>Batch Script: Range Manager</h3>
            <Table striped bordered>
            <tbody>
                <tr>
                    <th>How many days ahead should this script look?</th>
                    <td><Form.Control id="range" type="text" onChange={this.handleChange}/></td>
                </tr>
            </tbody>
            </Table>
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
    update: batch => dispatch({
        type: "update_batch",
        payload: batch
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(BATCH_Range);

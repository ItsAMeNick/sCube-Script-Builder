import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";

class BATCH_Status extends Component {
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
            <h3>Batch Script: Status Manager</h3>
            <Table striped bordered>
            <tbody>
                <tr>
                    <th>How many days in advance? </th>
                    <td>60</td>
                </tr>
                <tr>
                    <th>Current Status: </th>
                    <td>Module</td>
                </tr>
            </tbody>
            </Table>
            <Table striped bordered>
            <thead>
                <tr>
                    <th>New Status: </th>
                    <td>Something goes here</td>
                </tr>
            </thead>
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(BATCH_Status);

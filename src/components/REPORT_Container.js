import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import ReportItem from "./REPORT_Item.js";

class REPORT_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateReportItems = () => {
        let reps = [];
        for (let r in this.props.reports) {
            reps.push(<ReportItem key={this.props.reports[r].key} report_number={this.props.reports[r].key}/>)
        }
        return reps;
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>Report Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Module</th>
                    <th>Parameters</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateReportItems()}
                </tbody>
            </Table>
            <button onClick={this.props.add}> Add Report </button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.report,
    reports: state.reports
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_report",
        payload: null
    }),
    update: r => dispatch({
        type: "update_report",
        payload: r
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(REPORT_Container);

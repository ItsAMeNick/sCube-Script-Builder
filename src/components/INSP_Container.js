import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import InspectionItem from "./INSP_Item.js";

class INSP_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateInspectionItems = () => {
        let inspections = [];
        for (let i in this.props.inspections) {
            inspections.push(<InspectionItem key={this.props.inspections[i].key} insp_number={this.props.inspections[i].key}/>)
        }
        return inspections;
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>Insoection Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Inspection Type</th>
                    <th>Days Ahead</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateInspectionItems()}
                </tbody>
            </Table>
            <button onClick={() => {
                this.props.add();
            }}> Add Inspection </button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.inspections,
    inspections: state.inspections
});

const mapDispatchToProps = dispatch => ({
    update: i => dispatch({
        type: "update_inspections",
        payload: i
    }),
    add: () => dispatch({
        type: "add_inspection",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(INSP_Container);

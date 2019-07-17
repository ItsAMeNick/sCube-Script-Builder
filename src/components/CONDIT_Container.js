import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import ConditItem from "./CONDIT_Item.js";

class CONDIT extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateConditTable = () => {
        let cons_ids = Object.keys(this.props.conditions);
        cons_ids.sort();
        let cons = [];
        for (let c in cons_ids) {
            let cc = cons_ids[c];
            cons.push(<ConditItem  key={this.props.conditions[cc].key} id={this.props.conditions[cc].key}/>)
        }
        return cons;
    }

    render() {
        return (
        <div>
            <hr/>
            <h3>Conditions Manager</h3>
            <Table bordered>
                <thead>
                    <tr>
                    <th rowSpan="2">ID #</th>
                    <th colSpan="4">Conditional Statement</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>Portlet</td>
                        <td>Variable</td>
                        <td>Comparator</td>
                        <td>Compared Value</td>
                        <td></td>
                        <td></td>
                    </tr>
                    {this.generateConditTable()}
                </tbody>
            </Table>
            <button onClick={this.props.addConditFlat}> Add Condition </button>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    conditions: state.conditions
});

const mapDispatchToProps = dispatch => ({
    addConditFlat: () => dispatch({
        type: "add_condit_flat",
        payload: null
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT);

import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import ConditItem from "./CONDIT_Item.js";
import ConditAction from "./CONDIT_Action.js";

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
            cons.push(<ConditItem  key={this.props.conditions[cc].key} id={this.props.conditions[cc].key}/>);
            for (let a in this.props.conditions[cc].actions) {
                cons.push(<ConditAction key={cc+a} parent={cc} id={a}/>);
            }
        }
        return cons;
    }

    render() {
        return (
        <div>
            {this.props.isOn ?
                <div>
                    <hr/>
                    <h3>Conditions Manager</h3>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>ID&nbsp;#</th>
                                <th>Portlet</th>
                                <th>Variable</th>
                                <th>Comparator</th>
                                <th>Compared Value</th>
                                <th colSpan="3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generateConditTable()}
                        </tbody>
                    </Table>
                    <button onClick={this.props.addConditFlat}> Add Condition </button>
                </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    conditions: state.conditions,
    isOn: state.functionality.conditions
});

const mapDispatchToProps = dispatch => ({
    addConditFlat: () => dispatch({
        type: "add_condit_flat",
        payload: null
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT);

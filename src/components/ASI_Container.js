import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import AsiItem from "./ASI_Item.js";

class ASI_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateASIItems = () => {
        let asis = [];
        for (let a in this.props.asis) {
            asis.push(<AsiItem key={this.props.asis[a].key} asi_number={this.props.asis[a].key}/>)
        }
        return asis;
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>ASI Manager</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Field Name</th>
                    <th>Static</th>
                    <th>New Value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateASIItems()}
                </tbody>
            </Table>
            <button onClick={() => {
                this.props.add();
            }}> Add ASI </button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.asi,
    asis: state.asis
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_asi",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(ASI_Container);

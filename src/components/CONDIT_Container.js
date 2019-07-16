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

    }

    render() {
        return (
        <div>
            <hr/>
            <h3>Conditions Manager</h3>
            <Table bordered>
                <thead>
                    <tr>
                    <th>ID #</th>
                    <th colSpan="4">Conditional Statement</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/*this.generateConditTable()*/}
                    <ConditItem key="1" id="1"/>

                </tbody>
            </Table>
            <button onClick={this.addFee}> Add Fee </button>
        </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT);

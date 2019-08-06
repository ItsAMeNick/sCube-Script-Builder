import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import RecItem from "./REC_Item.js";

class REC_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateRecItems = () => {
        let recs = [];
        for (let r in this.props.new_records) {
            recs.push(
                <Table striped bordered key={this.props.new_records[r].key}>
                    <tbody>
                        <RecItem rec_number={this.props.new_records[r].key}/>
                    </tbody>
                </Table>);
        }
        return recs;
    }

    render() {
        return (
        <div>
        {this.props.isOn ?
        <div>
            <hr/>
            <h3>New Record Manager</h3>
            {this.generateRecItems()}
            <button onClick={() => {
                this.props.add();
            }}> Add Record </button>
        </div> : null}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.new_record,
    new_records: state.new_records
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_new_record",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(REC_Container);

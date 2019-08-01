import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash"

import Form from 'react-bootstrap/Form'

class MODE_Batch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.getElementById("use_lic").checked = this.props.batch.use_lic;
    }

    handleChange(event) {
        let newBatch = _.cloneDeep(this.props.batch);
        let newValue = event.target.value;
        if (event.target.id === "batch_name") {
            newBatch.name = newValue;
        } else if (event.target.id === "use_lic") {
            newBatch.use_lic = event.target.checked;
        }
        this.props.update({
            batch: newBatch
        });
    };

    render() {
        return (
        <div>
            <Form.Label>Batch Script Name:</Form.Label>
            <Form.Control id="batch_name" onChange={this.handleChange}/>
            <hr/>
            <Form.Check id="use_lic" type="checkbox" label="Will this script run against license expiration dates?" onChange={this.handleChange}/>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    batch: state.batch
});

const mapDispatchToProps = dispatch => ({
    update: b => dispatch({
        type: "update_batch",
        payload: b
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(MODE_Batch);

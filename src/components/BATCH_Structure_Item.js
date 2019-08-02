import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class BATCH_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newBatch = _.cloneDeep(this.props.batch);
        let type = event.target.id.split("-");
        newBatch.structures[this.props.bsi_number][type[0]] = event.target.value;
        this.props.update({
            batch: newBatch
        });
        this.forceUpdate();
    }

    render() {
        return (
        <React.Fragment>
        {this.props.mode === "batch_script" ?
        <tr>
            <td>{this.props.bsi_number}</td>
            <td>
                <Form.Control id={"module-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id={"type-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id={"subtype-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id={"category-"+this.props.bsi_number} type="text" onChange={this.handleChange}/>
            </td>
        </tr> : null}
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
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BATCH_Item);

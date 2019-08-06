import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

class INSP_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newInspections = _.cloneDeep(this.props.inspections);
        let newValue = event.target.value;
        newInspections[this.props.insp_number][event.target.id] = newValue;
        this.props.update({
            inspections: newInspections
        });
    };

    render() {
        return (
        <tr>
            <td>{this.props.insp_number}</td>
            <td>
                <Form.Control id="type"onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="days_out" type="number" onChange={this.handleChange}/>
            </td>
            {this.props.insp_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.insp_number);
                }}>
                    Delete
                </button>
            </td>
            : null}
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    inspections: state.inspections
});

const mapDispatchToProps = dispatch => ({
    update: i => dispatch({
        type: "update_inspections",
        payload: i
    }),
    delete: i => dispatch({
        type: "delete_inspection",
        payload: i
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(INSP_Item);

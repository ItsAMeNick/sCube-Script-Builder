import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

class PARAM_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newParameters = this.props.parameter_sets[this.props.set_number].parameters;
        newParameters[this.props.param_number][event.target.id] = event.target.value;
        this.props.update({
            set_number: this.props.set_number,
            parameters: newParameters
        });
    };

    render() {
        return (
            <tr>
                <td>{this.props.param_number}</td>
                <td>
                    <Form.Control id="ref" type="text" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Control id="portlet" as="select" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Control id="level1" as="select" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Control id="level2" as="select" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Control id="level3" as="select" onChange={this.handleChange}/>
                </td>
                <td>
                    <Form.Control id="level4" as="select" onChange={this.handleChange}/>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    parameter_sets: state.parameter_sets
});

const mapDispatchToProps = dispatch => ({
    update: p => dispatch({
        type: "update_parameter",
        payload: p
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Item);

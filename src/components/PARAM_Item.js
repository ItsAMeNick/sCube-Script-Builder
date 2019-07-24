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

});

const mapDispatchToProps = dispatch => ({
    update: n => dispatch({
        type: "update_notes",
        payload: n
    }),
    delete: n => dispatch({
        type: "delete_note",
        payload: n
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Item);

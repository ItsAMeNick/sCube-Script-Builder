import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

class ASI_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newASIs = this.props.asis;
        let newValue = event.target.value;
        newASIs[this.props.asi_number][event.target.id] = newValue;
        this.props.update({
            asis: newASIs
        });
    };

    render() {
        return (
        <tr>
            <td>{this.props.asi_number}</td>
            <td>
                <Form.Control id="name"onChange={this.handleChange}/>
            </td>
            <td>
                <Form.Control id="value" onChange={this.handleChange}/>
            </td>
            {this.props.asi_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.asi_number);
                }}>
                    Delete
                </button>
            </td>
            : <td></td>}
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    asis: state.asis
});

const mapDispatchToProps = dispatch => ({
    update: a => dispatch({
        type: "update_asis",
        payload: a
    }),
    delete: a => dispatch({
        type: "delete_asi",
        payload: a
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ASI_Item);

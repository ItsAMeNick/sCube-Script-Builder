import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form";

import ParamItem from "./PARAM_Item.js";

class PARAM_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>{this.props.set_number}</th>
                        <td>Set Name: </td>
                        <td>
                            <Form.Control id="name" type="text" onChange={this.handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Reference Name</th>
                        <th>Module</th>
                        <th>Level 1</th>
                        <th>Level 2</th>
                        <th>Level 3</th>
                        <th>Level 4</th>
                    </tr>
                </thead>
                <tbody>
                    <ParamItem param_number={1}/>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6}/>
                        <td>
                        <button onClick={() => {this.props.add()}}> Add Parameter</button>
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <hr/>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isOn: state.functionality.notification_send,
    notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_note",
        payload: null
    }),
    update: s => dispatch({
        type: "update_notes",
        payload: s
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Container);

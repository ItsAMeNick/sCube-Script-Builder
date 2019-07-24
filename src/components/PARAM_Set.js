import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form";

import ParamItem from "./PARAM_Item.js";

class PARAM_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {

    }

    generateItems() {
        let items = [];
        let parameters = this.props.parameter_sets[this.props.set_number].parameters;
        for (let p in parameters) {
            items.push(<ParamItem key={parameters[p].key} param_number={parameters[p].key}/>)
        }
        return items;
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
                    {this.generateItems()}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6}/>
                        <td>
                        <button onClick={() => {this.props.add(this.props.set_number)}}> Add Parameter</button>
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
    parameter_sets: state.parameter_sets
});

const mapDispatchToProps = dispatch => ({
    add: s => dispatch({
        type: "add_parameter",
        payload: s
    }),
    update: s => dispatch({
        type: "update_set",
        payload: s
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Container);

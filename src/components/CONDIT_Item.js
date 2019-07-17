import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

import { data } from "./CONDIT_data.js";

class CONDIT_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local_comp_type: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newConditions = this.props.conditions;
        newConditions[this.props.id][event.target.id] = event.target.value;
        this.props.update({
            conditions: newConditions
        });
        this.forceUpdate();
    };

    generateConditTypes = () => {
        let types = [];
        for (let t in data.condition_types) {
            types.push(<option key={t} value={data.condition_types[t].value}>{data.condition_types[t].label}</option>);
        }
        return types;
    }

    handleX = () => {
        if (this.props.conditions[this.props.id].condition_type === "cf") {
            return (
                <Form.Control id="comparison_x" type="text" placeholder="Custom Field Name" onChange={this.handleChange}/>
            );
        } else {
            return (
                <Form.Control id="comparison_x" as="select" onChange={this.handleChange}>
                    {this.generateX()}
                </Form.Control>
            );
        }
    }

    generateX = () => {
        let types = [];
        if (this.props.conditions[this.props.id].condition_type === "--Select--" || this.props.conditions[this.props.id].condition_type === null) return (<option/>);
        let options = data.comparison_x[this.props.conditions[this.props.id].condition_type];
        for (let t in options) {
            types.push(<option key={t} value={options[t].value}>{options[t].label}</option>);
        }
        return types;
    }

    generateCompTypes = () => {
        if (this.props.conditions[this.props.id].comparison_x === null) return (<option/>);
        let types = [];
        let x = data.comparison_x[this.props.conditions[this.props.id].condition_type];
        //Get the Type of the comparison_x
        for (let i in x) {
            if (x[i].value === this.props.conditions[this.props.id].comparison_x) {
                var type = x[i].type;
            }
        }
        if (x[0].label === "cf") type = "string";
        let options = data.comparison_types[type];
        for (let t in options) {
            types.push(<option key={t} value={options[t].value}>{options[t].label}</option>);
        }
        return types;
    }

    render() {
        return (
        <tr>
            <td>
                {this.props.id}
            </td>
            <td>
                <Form.Control id="condition_type" as="select" onChange={this.handleChange}>
                    {this.generateConditTypes()}
                </Form.Control>
            </td>
            <td>
                {this.handleX()}
            </td>
            <td>
                <Form.Control id="comparison_type" as="select" onChange={this.handleChange}>
                    {this.generateCompTypes()}
                </Form.Control>
            </td>
            <td>
                <Form.Control id="comparison_y" type="text" placeholder="Compare Against" onChange={this.handleChange}/>
            </td>
            <td>
                add action
            </td>
            <td>
                add subcondition
            </td>
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    conditions: state.conditions
});

const mapDispatchToProps = dispatch => ({
    addAction: () => dispatch({
        type: "add_condit_action",
        payload: null
    }),
    addSub: () => dispatch({
        type: "add_condit_sub",
        payload: null
    }),
    update: conditions => dispatch({
        type: "update_conditions",
        payload: conditions
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT_Item);

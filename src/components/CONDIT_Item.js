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
        this.handleAddSub = this.handleAddSub.bind(this);
        this.handleAddAction = this.handleAddAction.bind(this);
    }

    handleChange(event) {
        let newConditions = this.props.conditions;
        let type = event.target.id.split("-");
        newConditions[this.props.id][type[0]] = event.target.value;
        //Need to be very carseful with the condition Builder
        //Adding in checks to make sure that all fields to the "right" are cleared
        if (event.target.id === "condition_type-"+this.props.id) {
            document.getElementById("comparison_x-"+this.props.id).value = "";
            newConditions[this.props.id].comparison_x = "";
            document.getElementById("comparison_type-"+this.props.id).value = "";
            newConditions[this.props.id].comparison_type = "";
            document.getElementById("comparison_y-"+this.props.id).value = "";
            newConditions[this.props.id].comparison_y = "";
        } else if (event.target.id === "comparison_x-"+this.props.id) {
            document.getElementById("comparison_type-"+this.props.id).value = "";
            newConditions[this.props.id].comparison_type = "";
            document.getElementById("comparison_y-"+this.props.id).value = "";
            newConditions[this.props.id].comparison_y = "";
        } else if (event.target.id === "comparison_type-"+this.props.id) {
            document.getElementById("comparison_y-"+this.props.id).value = "";
            newConditions[this.props.id].comparison_y = "";
        }
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
                <Form.Control id={"comparison_x-"+this.props.id} type="text" placeholder="Custom Field Name" onChange={this.handleChange}/>
            );
        } else {
            return (
                <Form.Control id={"comparison_x-"+this.props.id} as="select" onChange={this.handleChange}>
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

    handleAddSub() {
        this.props.addSub(this.props.id);
    }

    handleAddAction() {
        this.props.addAction(this.props.id);
    }

    render() {
        return (
        <tr>
            <td>
                {this.props.id}
            </td>
            <td>
                <Form.Control id={"condition_type-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.generateConditTypes()}
                </Form.Control>
            </td>
            <td>
                {this.handleX()}
            </td>
            <td>
                <Form.Control id={"comparison_type-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.generateCompTypes()}
                </Form.Control>
            </td>
            <td>
                <Form.Control id={"comparison_y-"+this.props.id} type="text" placeholder="Compared Against" onChange={this.handleChange}/>
            </td>
            <td>
                <button onClick={this.handleAddAction}>+ Action</button>
            </td>
            <td>
                <button onClick={this.handleAddSub}>+ SubCondition</button>
            </td>
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    conditions: state.conditions
});

const mapDispatchToProps = dispatch => ({
    addAction: id => dispatch({
        type: "add_condit_action",
        payload: id
    }),
    addSub: id => dispatch({
        type: "add_condit_sub",
        payload: id
    }),
    update: conditions => dispatch({
        type: "update_conditions",
        payload: conditions
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT_Item);

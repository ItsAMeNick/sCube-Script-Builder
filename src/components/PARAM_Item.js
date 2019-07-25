import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

import variable_map from "./PARAM_data.js";

class PARAM_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newParameters = this.props.parameter_sets[this.props.set_number].parameters;
        newParameters[this.props.param_number][event.target.id] = event.target.value;
        //Need to remove any parameters past this one
        let level;
        if (event.target.id === "portlet") {
            level = 0
        } else {
            level = parseInt(event.target.id.split("level")[1]);
        }
        level++;
        while (newParameters[this.props.param_number]["level"+level]) {
            delete newParameters[this.props.param_number]["level"+level];
            level++;
        }

        if (event.target.id === "ref") {
            console.log("Hello");
            newParameters[this.props.param_number][event.target.id] = event.target.value.replace(/\W/g, '_');
        }

        //Reset the Script upon a Change
        newParameters[this.props.param_number].script = null;

        this.props.update({
            set_number: this.props.set_number,
            parameters: newParameters
        });
    };

    addScript(text) {
        console.log(text);
        let newParameters = this.props.parameter_sets[this.props.set_number].parameters;
        newParameters[this.props.param_number]["script"] = text;
        this.props.update({
            set_number: this.props.set_number,
            parameters: newParameters
        });
    }

    generateMap(map, level, parent, row) {
        let keys = [""].concat(Object.keys(map));
        if (row === null) row = [];
        if (keys.length <= 1) return null;
        if (keys[1] === "script") {
            if (map["script"] !== this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number]["script"]) {
                this.addScript(map["script"]);
            }
            return null;
        }
        let newId = "level"+level
        if (level === 0) newId = "portlet";

        if (keys[1] === "type") {
            return null;
        }

        let c = 0;
        if (keys[1] !== "free") {
            let levelValue = "";
            if (this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId]) {
                levelValue = this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId];
            }
            //REMOVE ERROR CHECK ON RELEASE
            let errorCheck = {color: "black", background: "white"};
            if (this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number].script === "***ADD ME!") errorCheck = {color: "white", background: "red"};
            row.push(<td key={newId}><Form.Control id={newId} as="select" value={levelValue} onChange={this.handleChange} style={errorCheck}>
                {keys.map((k) => {
                    c++;
                    return <option key={c} label={k} value={k}/>;
                })}
            </Form.Control></td>);
        }

        //Check if you should go to the next level
        if (this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId]) {
            let v = this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId];
            this.generateMap(map[v], level + 1, v, row);
        }
        return row;
    }

    render() {
        return (
            <tr>
                <td>{this.props.param_number}</td>
                <td>
                    <Form.Control id="ref" type="text" onChange={this.handleChange}/>
                </td>
                {this.generateMap(variable_map.variable_map, 0, null, null)}
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

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

        //Reset the special values upon change
        newParameters[this.props.param_number].script = null;
        newParameters[this.props.param_number].type = null;
        newParameters[this.props.param_number].free = null;

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

        this.props.update({
            set_number: this.props.set_number,
            parameters: newParameters
        });
    };

    addScript(text) {
        let newParameters = this.props.parameter_sets[this.props.set_number].parameters;
        newParameters[this.props.param_number].script = text;
        this.props.update({
            set_number: this.props.set_number,
            parameters: newParameters
        });
    }

    generateMap(map, level, parent, row) {
        let keys = [""].concat(Object.keys(map));
        keys.sort();
        if (row === null) row = [];
        if (keys.length <= 1) return null;

        let newId = "level"+level
        if (level === 0) newId = "portlet";

        let levelValue = "";
        if (this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId]) {
            levelValue = this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId];
        }

        if (keys[1] === "script") {
            if (map.script !== this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number].script) {
                this.addScript(map.script);
            }
            return null;
        } else if (keys[1] === "free") {
            let free_text = map.free.script;
            let free_value = this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number].free;
            if (!this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number].free) free_value = "";
            free_text = free_text.replace("***", free_value);
            if (free_text !== this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number].script) {
                this.addScript(free_text);
            }
        } else if (keys[1] === "type") {
            levelValue = "type";
        }

        if (keys[1] !== "free" && keys[1] !== "type") {
            //REMOVE ERROR CHECK ON RELEASE
            let errorCheck = {color: "black", background: "white"};
            if (this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number].script === "***ADD ME!") errorCheck = {color: "white", background: "red"};
            let c = 0;
            row.push(<td key={newId}><Form.Control id={newId} as="select" value={levelValue} onChange={this.handleChange} style={errorCheck}>
                {keys.map((k) => {
                    c++;
                    return <option key={c} label={k} value={k}/>;
                })}
            </Form.Control></td>);
        } else if (keys[1] === "free") {
            row.push(<td key={newId}><Form.Control id={"free"} onChange={this.handleChange}/></td>);
        } else if (keys[1] === "type") {
            row.push(<td key={newId}>Type:<Form.Control id={"type"} onChange={this.handleChange}/></td>);
        }

        //Check if you should go to the next level
        if (levelValue) {
            this.generateMap(map[levelValue], level + 1, levelValue, row);
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

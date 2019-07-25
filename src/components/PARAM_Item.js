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
        this.props.update({
            set_number: this.props.set_number,
            parameters: newParameters
        });
    };

    addScript(text) {
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
            //Set the script
            return null;
        }
        let newId = "level"+level
        if (level === 0) newId = "portlet";

        let c = 0;
        if (keys[1] !== "free") {
            row.push(<td key={newId}><Form.Control id={newId} as="select" onChange={this.handleChange}>
                {keys.map((k) => {
                    c++;
                    return <option key={c} label={k} value={k}/>;
                })}
            </Form.Control></td>);
        }

        //Check if you should go to the next level
        if (this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId]) {
            let v = this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId];
            console.log("Going On");
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

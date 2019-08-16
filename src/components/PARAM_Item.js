import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash"

import Form from "react-bootstrap/Form";

import variable_map from "./PARAM_data.js";

class PARAM_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newParameters = _.cloneDeep(this.props.parameter_sets[this.props.set_number].parameters);

        //Reset the special values upon change
        newParameters[this.props.param_number].script = null;

        newParameters[this.props.param_number][event.target.id] = event.target.value;

        //Need to remove any parameters past this one
        let level;
        if (event.target.id === "portlet") {
            level = 0;
        } else {
            level = parseInt(event.target.id.split("level")[1]);
        }

        if (event.target.id === "portlet") {
            // Clear some types
            let types = Object.keys(newParameters[this.props.param_number]).filter(item => {
                return item.split(".")[0] === "type";
            });
            for (let t in types) {
                delete newParameters[this.props.param_number][types[t]];
            }
        }

        //Delete all types past this one
        if (event.target.id.split(".")[0] === "type") {
            let myTypeId = event.target.id.split(".")[1];
            let types = Object.keys(newParameters[this.props.param_number]).filter(item => {
                return event.target.id.split(".")[0] === "type";
            });
            for (let t in types) {
                if (types[t].split(".")[1] > myTypeId) delete newParameters[this.props.param_number][types[t]];
            }
        }

        //Do the map clearing
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

    //Changes made to this function should be checked in CONDIT_Item && ASI_ITEM
    generateMap(map, level, parent, row) {
        if (row === null) row = [];

        //FILTER BASED ON PARENT
        if (parent === "Event Specific") {
            if (["ASA", "ASB"].includes(this.props.event_type)) {
                row.push(<td key="Event Specific"><Form.Control placeholder="None" readOnly/></td>)
                return row;
            } else if (["CTRCA"].includes(this.props.event_type)) {
                row.push(<td key="Event Specific"><Form.Control key="Event Specific" placeholder="None" readOnly/></td>)
                return row;
            } else if (["IRSA", "IRSB"].includes(this.props.event_type)) {
                map = map.Inspection;
                row.push(<td key="Event Specific"><Form.Control key="Event Specific" placeholder="Inspection" readOnly/></td>)
            } else if (["PRA"].includes(this.props.event_type)) {
                row.push(<td key="Event Specific"><Form.Control key="Event Specific" placeholder="None" readOnly/></td>)
                return row;
            } else if (["WTUA","WTUB"].includes(this.props.event_type)) {
                map = map.Workflow;
                row.push(<td key="Event Specific"><Form.Control key="Event Specific" placeholder="Workflow" readOnly/></td>)
            } else {
                row.push(<td key="Event Specific"><Form.Control key="Event Specific" placeholder="Select Event Type" readOnly/></td>)
                return row;
            }
        }

        let keys = [""].concat(Object.keys(map));

        //Remove invalid keys then sort
        if (this.props.mode !== "pageflow") {
            keys = _.remove(keys, k => {
                return k !== "ACA Document Name"
            });
        }
        if (this.props.event_type === "NA") {
            keys = _.remove(keys, k => {
                return k !== "Event Specific"
            });
        }
        keys.sort();

        if (keys.length <= 1) return null;

        let newId = "level"+level
        if (level === 0) newId = "portlet";

        let levelValue = "";
        if (this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId]) {
            levelValue = this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][newId];
        }

        //Handle Special Cases
        if (keys[1] === "script") {
            let types = Object.keys(this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number]).filter(item => {
                return item.split(".")[0] === "type";
            });
            if (types.length >= 1) {
                let newText = map.script;
                for (let t in types) {
                    newText = newText.replace("^$"+types[t].split(".")[1]+"$^", this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][types[t]]);
                }
                if (newText !== this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number].script) {
                    this.addScript(newText);
                }
            } else {
                if (map.script !== this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number].script) {
                    this.addScript(map.script);
                }
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
        } else if (keys[1].split(".")[0] === "type") {
            levelValue = keys[1];
        }

        if (keys[1] !== "free" && keys[1].split(".")[0] !== "type") {
            let c = 0;
            row.push(<td key={newId}><Form.Control id={newId} as="select" value={levelValue} onChange={this.handleChange}>
                {keys.map((k) => {
                    c++;
                    return <option key={c} label={k} value={k}/>;
                })}
            </Form.Control></td>);
        } else if (keys[1] === "free") {
            if (this.props.loaded_asis && this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number]["portlet"] === "Custom Field") {
                row.push(
                    <td key={newId}><Form.Control id={"free"} as="select" onChange={this.handleChange}>
                        {this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number]["level1"] === "From Parent" ?
                            this.loadAllASI()
                        :
                            this.loadMyASI()
                        }
                    </Form.Control></td>
                        );
            } else if (this.props.loaded_docs && this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number]["portlet"] === "ACA Document Name") {
                row.push(
                    <td key={newId}><Form.Control id={"free"} as="select" onChange={this.handleChange}>
                        {this.loadDocuments()}
                    </Form.Control></td>
                        );
            } else {
                row.push(<td key={newId}><Form.Control id={"free"} placeholder={"--Name--"} onChange={this.handleChange}/></td>);
            }
        } else if (keys[1].split(".")[0] === "type") {
            if (this.props.loaded_contacts && this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number]["portlet"] === "Contact") {
                row.push(
                    <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange} value={this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][keys[1]] ? this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][keys[1]] : ""}>
                        {this.loadContacts()}
                    </Form.Control></td>
                        );
            } else {
                row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="Type" onChange={this.handleChange} value={this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][keys[1]] ? this.props.parameter_sets[this.props.set_number].parameters[this.props.param_number][keys[1]] : ""}/></td>);
            }
        }

        //Check if you should go to the next level
        if (levelValue) {
            this.generateMap(map[levelValue], level + 1, levelValue, row);
        }
        return row;
    }

    loadAllASI() {
        return [<option key={-1}/>].concat(this.props.loaded_asis.filter(item => {
            return item.group === "APPLICATION";
        }).sort((item1, item2) => {
            if (item1.code.localeCompare(item2.code) === 0) {
                if (item1.type.localeCompare(item2.type) === 0) {
                    return item1.name.localeCompare(item2.name);
                } else {
                    return item1.type.localeCompare(item2.type)
                }
            } else {
                return item1.code.localeCompare(item2.code);
            }
        }).map(item => {
            return <option key={item.key} label={item.alias ? item.code+" - "+item.type+" - "+item.alias : item.code+" - "+item.type+" - "+item.name} value={item.name}/>
        }));
    }

    loadMyASI() {
        return [<option key={-1}/>].concat(this.props.loaded_asis.filter(item => {
            if (this.props.loaded_id >= 0) {
                return this.props.loaded_data[this.props.loaded_id].asi_code === item.code;
            } else {
                return true;
            }
        }).filter(item => {
            return item.group === "APPLICATION";
        }).sort((item1, item2) => {
            if (item1.code.localeCompare(item2.code) === 0) {
                if (item1.type.localeCompare(item2.type) === 0) {
                    return item1.name.localeCompare(item2.name);
                } else {
                    return item1.type.localeCompare(item2.type)
                }
            } else {
                return item1.code.localeCompare(item2.code);
            }
        }).map(item => {
            return <option key={item.key} label={item.alias ? item.code+" - "+item.type+" - "+item.alias : item.code+" - "+item.type+" - "+item.name} value={item.name}/>
        }));
    }

    loadContacts() {
        return [<option key={-1}/>].concat(this.props.loaded_contacts
            .sort((item1, item2) => {
                return item1.value.localeCompare(item2.value);
            }).map(item => {
                return <option key={item.key} label={item.value} value={item.value}/>
            }));
    }

    loadDocuments() {
        return [<option key={-1}/>].concat(this.props.loaded_docs.filter(item => {
            if (this.props.loaded_id >= 0) {
                return this.props.loaded_data[this.props.loaded_id].doc_code === item.code;
            } else {
                return true;
            }
        }).sort((item1, item2) => {
            return item1.type.localeCompare(item2.type);
        }).map(item => {
            return <option key={item.key} label={item.type} value={item.type}/>
        }));
    }

    render() {
        return (
            <tr>
                <td>{this.props.param_number}</td>
                <td>
                    <Form.Control id="ref" type="text" onChange={this.handleChange}/>
                </td>
                {this.generateMap(variable_map.variable_map, 0, null, null)}
                {this.props.param_number !== 1 ?
                    <td>
                        <button onClick={() => {
                            this.props.delete(this.props.set_number, this.props.param_number);
                        }}>
                            Delete
                        </button>
                    </td>
                : null}
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    parameter_sets: state.parameter_sets,
    event_type: state.event_type,
    mode: state.mode,
    loaded_data: state.loaded_data.caps,
    loaded_id: state.structure.loaded_id,
    loaded_asis: state.loaded_data.asis,
    loaded_contacts: state.loaded_data.contact_types,
    loaded_docs: state.loaded_data.doc_types
});

const mapDispatchToProps = dispatch => ({
    update: p => dispatch({
        type: "update_parameter",
        payload: p
    }),
    delete: (set, param) => dispatch({
        type: "delete_parameter",
        payload: {
            set: set,
            param: param
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Item);

import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

import variable_map from "./PARAM_data.js";

class ASI_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            static: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    handleSwitch() {
        let newASIs = _.cloneDeep(this.props.asis);
        newASIs[this.props.asi_number].static = !this.state.static;
        this.props.update({
            asis: newASIs
        });
        this.setState({static: !this.state.static})
    }

    handleChange(event) {
        let newASIs = _.cloneDeep(this.props.asis);
        let newValue = event.target.value;

        //Reset the special values upon change
        if (event.target.id !== "name") {
            newASIs[this.props.asi_number].value = null;
        }

        newASIs[this.props.asi_number][event.target.id] = newValue;

        //Need to remove any parameters past this one
        let level;
        if (event.target.id === "portlet") {
            level = 0;
        } else {
            level = parseInt(event.target.id.split("level")[1]);
        }

        if (event.target.id === "portlet") {
            // Clear some types
            let types = Object.keys(newASIs[this.props.asi_number]).filter(item => {
                return item.split(".")[0] === "type";
            });
            for (let t in types) {
                delete newASIs[this.props.asi_number][types[t]];
            }
        }

        //Delete all types past this one
        if (event.target.id.split(".")[0] === "type") {
            let myTypeId = event.target.id.split(".")[1];
            let types = Object.keys(newASIs[this.props.asi_number]).filter(item => {
                return event.target.id.split(".")[0] === "type";
            });
            for (let t in types) {
                if (types[t].split(".")[1] > myTypeId) delete newASIs[this.props.asi_number][types[t]];
            }
        }

        //Do the map clearing
        level++;
        while (newASIs[this.props.asi_number]["level"+level]) {
            delete newASIs[this.props.asi_number]["level"+level];
            level++;
        }

        this.props.update({
            asis: newASIs
        });
    };

    loadOptionsFromData() {
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
        if (this.props.asis[this.props.asi_number][newId]) {
            levelValue = this.props.asis[this.props.asi_number][newId];
        }

        //Handle Special Cases
        if (keys[1] === "script") {
            let types = Object.keys(this.props.asis[this.props.asi_number]).filter(item => {
                return item.split(".")[0] === "type";
            });
            if (types.length >= 1) {
                let newText = map.script;
                for (let t in types) {
                    newText = newText.replace("^$"+types[t].split(".")[1]+"$^", this.props.asis[this.props.asi_number][types[t]]);
                }
                if (newText !== this.props.asis[this.props.asi_number].value) {
                    this.handleChange({
                        target: {
                            id: "value",
                            value: newText
                        }
                    })
                }
            } else {
                if (map.script !== this.props.asis[this.props.asi_number].value) {
                    this.handleChange({
                        target: {
                            id: "value",
                            value: map.script
                        }
                    })
                }
            }
            return null;
        } else if (keys[1] === "free") {
            let free_text = map.free.script;
            let free_value = this.props.asis[this.props.asi_number].free;
            if (!this.props.asis[this.props.asi_number].free) free_value = "";
            free_text = free_text.replace("***", free_value);
            if (free_text !== this.props.asis[this.props.asi_number].value) {
                this.handleChange({
                    target: {
                        id: "value",
                        value: free_text
                    }
                })
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
            if (this.props.loaded_asis && this.props.asis[this.props.asi_number]["portlet"] === "Custom Field") {
                row.push(
                    <td key={newId}><Form.Control id={"free"} as="select" onChange={this.handleChange}>
                        {this.props.asis[this.props.asi_number]["level1"] === "From Parent" ?
                            this.loadAllASI()
                        :
                            this.loadMyASI()
                        }
                    </Form.Control></td>
                        );
            } else if (this.props.loaded_docs && this.props.asis[this.props.asi_number]["portlet"] === "ACA Document Name") {
                row.push(
                    <td key={newId}><Form.Control id={"free"} as="select" onChange={this.handleChange}>
                        {this.loadDocuments()}
                    </Form.Control></td>
                        );
            } else {
                row.push(<td key={newId}><Form.Control id={"free"} placeholder={"--Name--"} onChange={this.handleChange}/></td>);
            }
        } else if (keys[1].split(".")[0] === "type") {
            if (this.props.asis[this.props.asi_number]["portlet"] === "Contact") {
                if (this.props.loaded_contacts) {
                    row.push(
                            <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange}>
                                {this.loadContacts()}
                            </Form.Control></td>
                            );
                } else {
                    row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Contact Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                }
            } else if (this.props.asis[this.props.asi_number].portlet === "Inspection") {
                switch (keys[1]) {
                    case "type.1": {
                        if (this.props.loaded_inspections) {
                            row.push(
                                    <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}>
                                        {this.loadInspections()}
                                    </Form.Control></td>
                                );
                        } else {
                            row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                        }
                        break;
                    }
                    case "type.2": {
                        if (this.props.loaded_inspections) {
                            row.push(
                                    <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}>
                                        {this.loadInspectionResultGroups()}
                                    </Form.Control></td>
                                );
                        } else {
                            row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                        }
                        break;
                    }
                    case "type.3": {
                        if (this.props.loaded_inspections) {
                            row.push(
                                    <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}>
                                        {this.loadChecklistGroups()}
                                    </Form.Control></td>
                                );
                        } else {
                            row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                        }
                        break;
                    }
                    case "type.4": {
                        if (this.props.loaded_checklists) {
                            if (this.loadChecklistItems().length <= 1) {
                                row.push(<td key={newId}><Form.Control id={keys[1]} readOnly value="No Guidesheet"/></td>);
                            } else {
                                row.push(
                                        <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}>
                                            {this.loadChecklistItems()}
                                        </Form.Control></td>
                                    );
                            }
                        } else {
                            row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                        }
                        break;
                    }
                    case "type.5": {
                        if (this.props.loaded_checklists) {
                            row.push(
                                    <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}>
                                        {this.loadChecklistASI()}
                                    </Form.Control></td>
                                );
                        } else {
                            row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                        }
                        break;
                    }
                    case "type.6": {
                        if (this.props.loaded_asis) {
                            row.push(
                                    <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange} key={newId} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}>
                                        {this.loadASISubs()}
                                    </Form.Control></td>
                                );
                        } else {
                            row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                        }
                        break;
                    }
                    case "type.7": {
                        if (this.props.loaded_asis) {
                            row.push(
                                    <td key={newId}><Form.Control id={keys[1]} as="select" onChange={this.handleChange} key={newId} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}>
                                        {this.loadASIFields()}
                                    </Form.Control></td>
                                );
                        } else {
                            row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                        }
                        break;
                    }
                    default: row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
                }
            }
        } else {
            row.push(<td key={newId}><Form.Control id={keys[1]} placeholder="--Type--" onChange={this.handleChange} value={this.props.asis[this.props.asi_number][keys[1]] ? this.props.asis[this.props.asi_number][keys[1]] : ""}/></td>);
        }

        //Check if you should go to the next level
        if (levelValue) {
            if (levelValue.split(".")[0] === "type") {
                if (!this.props.asis[this.props.asi_number][levelValue]) return row;
            }
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

    //This function is used to generate the list of inspection groups/type
    //Removes duplicates
    loadInspections() {
        let used = [];
        return [<option key={-1}/>].concat(this.props.loaded_inspections.filter(item => {
            //Filter using CAP ID
            return true;
        }).filter(item => {
            //Filter out duplicates
            if (used.includes(item.code)) {
                return false;
            } else {
                used.push(item.code);
                return true;
            }
        }).sort((item1, item2) => {
            let i1 = item1.code
            let i2 = item2.code
            return i1.localeCompare(i2);
        }).map(item => {
            return <option key={item.key} label={item.group +"/"+item.code} value={item.code}/>
        }));
    }

    //This function generates a list of inspection result groups based on the inspection chosen.
    //This function assumes that inspection will be a "type.1" variable
    //Removes duplicates
    loadInspectionResultGroups() {
        let used = [];
        return [<option key={-1}/>].concat(this.props.loaded_inspections.filter(item => {
            if (this.props.asis[this.props.asi_number]["type.1"]) {
                return item.code === this.props.asis[this.props.asi_number]["type.1"];
            }
            return false;
        }).filter(item => {
            //Filter out duplicates
            if (used.includes(item.code)) {
                return false;
            } else {
                used.push(item.code);
                return true;
            }
        }).sort((item1, item2) => {
            let i1 = item1.result;
            let i2 = item2.result;
            return i1.localeCompare(i2);
        }).map(item => {
            return <option key={item.key} label={item.result} value={item.result}/>
        }));
    }

    //This function generates a list of checklist groups based on the inspection chosen.
    //This function assumes that inspection will be a "type.1" variable
    loadChecklistGroups() {
        return [<option key={-1}/>].concat(this.props.loaded_inspections.filter(item => {
            if (this.props.asis[this.props.asi_number]["type.1"]) {
                return item.code === this.props.asis[this.props.asi_number]["type.1"];
            }
            return false;
        }).sort((item1, item2) => {
            let i1 = item1.type;
            let i2 = item2.type;
            return i1.localeCompare(i2);
        }).map(item => {
            return <option key={item.key} label={item.type} value={item.type}/>
        }));
    }

    //This function loads checklist items for the dropdown menu
    //It removes duplicates
    //Assumes type is a "type.3" variable, then finds guidesheet
    loadChecklistItems() {
        let used = [];
        let guidesheets = [];
        if (this.props.asis[this.props.asi_number]["type.3"] && this.props.loaded_inspections) {
            for (let i in this.props.loaded_inspections) {
                if (this.props.loaded_inspections[i].type === this.props.asis[this.props.asi_number]["type.3"]) {
                    if (this.props.loaded_inspections[i].guidesheet) guidesheets.push(this.props.loaded_inspections[i].guidesheet);
                }
            }
        }
        return [<option key={-1}/>].concat(this.props.loaded_checklists.filter(item => {
            if (guidesheets.length >= 1) {
                return guidesheets.includes(item.type);
            }
            return false;
        }).filter(item => {
            if (used.includes(item.group)) {
                return false;
            } else {
                used.push(item.group);
                return true;
            }
        }).sort((item1, item2) => {
            let i1 = item1.group;
            let i2 = item2.group;
            return i1.localeCompare(i2);
        }).map(item => {
            return <option key={item.key} label={item.group} value={item.group}/>
        }));
    }

    //This function loads checklist asi's based on the value in "type.4"
    loadChecklistASI() {
        let used = [];
        return [<option key={-1}/>].concat(this.props.loaded_checklists.filter(item => {
            if (this.props.asis[this.props.asi_number]["type.4"]) {
                return item.group === this.props.asis[this.props.asi_number]["type.4"];
            }
            return false;
        }).filter(item => {
            if (!item.asi_group) return false;
            if (used.includes(item.asi_group)) {
                return false;
            } else {
                used.push(item.asi_group);
                return true;
            }
        }).sort((item1, item2) => {
            let i1 = item1.asi_group;
            let i2 = item2.asi_group;
            return i1.localeCompare(i2);
        }).map(item => {
            return <option key={item.key} label={item.asi_group} value={item.asi_group}/>
        }));
    }

    //This function loads asi's subgroups based on the value in "type.5"
    loadASISubs() {
        let used = [];
        return [<option key={-1}/>].concat(this.props.loaded_asis.filter(item => {
            if (this.props.asis[this.props.asi_number]["type.5"]) {
                return item.code === this.props.asis[this.props.asi_number]["type.5"];
            }
            return false;
        }).filter(item => {
            if (!item.type) return false;
            if (used.includes(item.type)) {
                return false;
            } else {
                used.push(item.type);
                return true;
            }
        }).sort((item1, item2) => {
            let i1 = item1.type;
            let i2 = item2.type;
            return i1.localeCompare(i2);
        }).map(item => {
            return <option key={item.key} label={item.type} value={item.type}/>
        }));
    }

    //This function loads asi's fields based on the value in "type.6"
    loadASIFields() {
        let used = [];
        return [<option key={-1}/>].concat(this.props.loaded_asis.filter(item => {
            if (this.props.asis[this.props.asi_number]["type.6"]) {
                return item.type === this.props.asis[this.props.asi_number]["type.6"];
            }
            return false;
        }).filter(item => {
            if (!item.name) return false;
            if (used.includes(item.name)) {
                return false;
            } else {
                used.push(item.name);
                return true;
            }
        }).sort((item1, item2) => {
            let i1 = item1.name;
            let i2 = item2.name;
            return i1.localeCompare(i2);
        }).map(item => {
            return <option key={item.key} label={item.name} value={item.name}/>
        }));
    }

    render() {
        return (
        <tr>
            <td>{this.props.asi_number}</td>
            <td>
                {this.props.loaded_asis ?
                    <Form.Control id="name" as="select" onChange={this.handleChange}>
                        {this.loadOptionsFromData()}
                    </Form.Control>
                :
                    <Form.Control id="name" onChange={this.handleChange}/>
                }
            </td>
            <td>
                <Form.Check id={"static"} checked={this.state.static} onChange={this.handleSwitch}/>
            </td>
            {this.state.static ?
                <td>
                    <Form.Control id="value" onChange={this.handleChange}/>
                </td>
            :
                this.generateMap(variable_map.variable_map, 0, null, null)
            }
            {this.props.asi_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.asi_number);
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
    asis: state.asis,
    loaded_asis: state.loaded_data.asis,
    loaded_data: state.loaded_data.caps,
    loaded_id: state.structure.loaded_id,
    event_type: state.event_type,
    mode: state.mode,
    loaded_contacts: state.loaded_data.contact_types,
    loaded_docs: state.loaded_data.doc_types,
    loaded_inspections: state.loaded_data.inspections,
    loaded_results: state.loaded_data.inspection_results,
    loaded_checklists: state.loaded_data.checklists
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

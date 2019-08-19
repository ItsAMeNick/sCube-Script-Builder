import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";

import condit_data from "./CONDIT_data.js";
import variable_map from "./PARAM_data.js";

class CONDIT_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local_comp_type: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newConditions = _.cloneDeep(this.props.conditions);

        let type = event.target.id.split("-")[0];
        newConditions[this.props.id][type] = event.target.value;

        if (this.props.conditions[this.props.id].portlet === "ACA Document Name") {
            document.getElementById("comparison_y-"+this.props.id).readOnly = true;
            document.getElementById("comparison_y-"+this.props.id).value = "";
            document.getElementById("comparison_y-"+this.props.id).placeholder = "NA";
        } else {
            document.getElementById("comparison_y-"+this.props.id).readOnly = false;
        }

        //Need to be very carseful with the condition Builder
        //Adding in checks to make sure that all fields to the "right" are cleared
        //Actually I'm not doing that anymore lol
        let level;
        if (type === "portlet") {
            level = 0;
        } else if (type[0] === "x") {
            level = parseInt(event.target.id.split(".")[1]);
        }

        if (type === "portlet") {
            // Clear some things
            newConditions[this.props.id].comparison_x = null;
            newConditions[this.props.id].free = "";

            let types = Object.keys(newConditions[this.props.id]).filter(item => {
                return item.split(".")[0] === "type";
            });
            for (let t in types) {
                delete newConditions[this.props.id][types[t]];
            }
        }

        //Delete all types past this one
        if (type.split(".")[0] === "type") {
            let myTypeId = type.split(".")[1];
            let types = Object.keys(newConditions[this.props.id]).filter(item => {
                return item.split(".")[0] === "type";
            });
            for (let t in types) {
                if (types[t].split(".")[1] > myTypeId) delete newConditions[this.props.id][types[t]];
            }
        }

        //Do the map clearing
        level++;
        while (newConditions[this.props.id]["x."+level]) {
            delete newConditions[this.props.id]["x."+level];
            level++;
        }

        if (!["comparison_y", "comparison_type"].includes(type)) {
            if (document.getElementById("free-"+this.props.id)) {
                document.getElementById("free-"+this.props.id).value = newConditions[this.props.id].free;
            } else {
                delete newConditions[this.props.id].free;
            }
        }

        this.props.update({
            conditions: newConditions
        });
    };

    addX(text) {
        let newConditions = _.cloneDeep(this.props.conditions);
        if (newConditions[this.props.id].comparison_x === text) return null;
        newConditions[this.props.id].comparison_x = text;
        this.props.update({
            conditions: newConditions
        });
    }

    genPortlet = () => {
        let types = [""].concat(Object.keys(variable_map.variable_map));

        //Remove invalid types then sort
        if (this.props.mode !== "pageflow") {
            types = _.remove(types, k => {
                return k !== "ACA Document Name"
            });
        }
        if (this.props.event_type === "NA") {
            types = _.remove(types, k => {
                return k !== "Event Specific"
            });
        }
        types.sort();

        types = types.map(t => {
            return <option key={t} value={t} label={t}/>
        });
        return types;
    }

    //Based off generateMap from PARAM_Item
    generateX = (map, level, parent, row) => {
        if (row === null) row = [];

        //FILTER BASED ON PARENT
        if (parent === "Event Specific") {
            if (["ASA", "ASB"].includes(this.props.event_type)) {
                row.push(<Form.Control key="Event Specific" placeholder="None" readOnly/>)
                return row;
            } else if (["CTRCA"].includes(this.props.event_type)) {
                row.push(<Form.Control key="Event Specific" placeholder="None" readOnly/>)
                return row;
            } else if (["IRSA", "IRSB"].includes(this.props.event_type)) {
                map = map.Inspection;
                row.push(<Form.Control key="Event Specific" placeholder="Inspection" readOnly/>)
            } else if (["PRA"].includes(this.props.event_type)) {
                row.push(<Form.Control key="Event Specific" placeholder="None" readOnly/>)
                return row;
            } else if (["WTUA","WTUB"].includes(this.props.event_type)) {
                map = map.Workflow;
                row.push(<Form.Control key="Event Specific" placeholder="Workflow" readOnly/>)
            } else {
                row.push(<Form.Control key="Event Specific" placeholder="Select Event Type" readOnly/>)
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

        let newId = "x."+level
        if (level === 0) newId = "portlet";

        let levelValue = "";
        if (this.props.conditions[this.props.id][newId]) {
            levelValue = this.props.conditions[this.props.id][newId];
        }

        //Handle Special Cases
        if (keys[1] === "script") {
            let types = Object.keys(this.props.conditions[this.props.id]).filter(item => {
                return item.split(".")[0] === "type";
            });
            if (types.length >= 1) {
                let newText = map.script;
                for (let t in types) {
                    newText = newText.replace("^$"+types[t].split(".")[1]+"$^", this.props.conditions[this.props.id][types[t]]);
                }
                if (newText !== this.props.conditions[this.props.id].comparison_x) {
                    this.addX(newText);
                }
            } else {
                if (map.script !== this.props.conditions[this.props.id].comparison_x) {
                    this.addX(map.script);
                }
            }
            return null;
        } else if (keys[1] === "free") {
            let free_text = map.free.script;
            let free_value = this.props.conditions[this.props.id].free;
            if (!this.props.conditions[this.props.id].free) free_value = "";
            free_text = free_text.replace("***", free_value);
            if (free_text !== this.props.conditions[this.props.id].script) {
                this.addX(free_text);
            }
        } else if (keys[1].split(".")[0] === "type") {
            levelValue = keys[1];
        }

        if (keys[1] !== "free" && keys[1].split(".")[0] !== "type") {
            let c = 0;
            row.push(<Form.Control key={newId} id={newId} as="select" value={levelValue} onChange={this.handleChange}>
                {keys.map((k) => {
                    c++;
                    return <option key={c} label={k} value={k}/>;
                })}
            </Form.Control>);
        } else if (keys[1] === "free") {
            if (this.props.loaded_asis && this.props.conditions[this.props.id].portlet === "Custom Field") {
                row.push(
                    <Form.Control id={"free-"+this.props.id} as="select" onChange={this.handleChange} key={newId}>
                        {this.props.conditions[this.props.id]["x.1"] === "From Parent" ?
                            this.loadAllASI()
                        :
                            this.loadMyASI()
                        }
                    </Form.Control>
                        );
            } else if (this.props.loaded_docs && this.props.conditions[this.props.id].portlet === "ACA Document Name") {
                row.push(
                            <Form.Control id={"free-"+this.props.id} as="select" onChange={this.handleChange} key={newId}>
                                {this.loadDocuments()}
                            </Form.Control>
                        );
            } else {
                row.push(<Form.Control id={"free-"+this.props.id} placeholder={"--Name--"} onChange={this.handleChange} key={newId}/>);
            }
        } else if (keys[1].split(".")[0] === "type") {
            if (this.props.loaded_contacts && this.props.conditions[this.props.id].portlet === "Contact") {
                row.push(
                            <Form.Control id={keys[1]+"-"+this.props.id} as="select" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}>
                                {this.loadContacts()}
                            </Form.Control>
                        );
            } else if (this.props.conditions[this.props.id].portlet === "Inspection") {

                switch (keys[1]) {
                    case "type.1": {
                        if (this.props.loaded_inspections) {
                            row.push(
                                    <Form.Control id={keys[1]+"-"+this.props.id} as="select" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}>
                                        {this.loadInspections()}
                                    </Form.Control>
                                );
                        } else {
                            row.push(<Form.Control id={keys[1]+"-"+this.props.id} placeholder="--Inspection Type--" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}/>);
                        }
                        break;
                    }
                    case "type.2": {
                        if (this.props.loaded_inspections) {
                            row.push(
                                    <Form.Control id={keys[1]+"-"+this.props.id} as="select" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}>
                                        {this.loadInspectionResultGroups()}
                                    </Form.Control>
                                );
                        } else {
                            row.push(<Form.Control id={keys[1]+"-"+this.props.id} placeholder="--Result Group--" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}/>);
                        }
                        break;
                    }
                    case "type.3": {
                        if (this.props.loaded_inspections) {
                            row.push(
                                    <Form.Control id={keys[1]+"-"+this.props.id} as="select" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}>
                                        {this.loadChecklistGroups()}
                                    </Form.Control>
                                );
                        } else {
                            row.push(<Form.Control id={keys[1]+"-"+this.props.id} placeholder="--Checklist Group--" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}/>);
                        }
                        break;
                    }
                    case "type.4": {
                        if (this.props.loaded_checklists) {
                            if (this.loadChecklistItems().length <= 1) {
                                row.push(<Form.Control id={keys[1]+"-"+this.props.id} readOnly value="No Guidesheet" key={newId}/>);
                            } else {
                                row.push(
                                        <Form.Control id={keys[1]+"-"+this.props.id} as="select" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}>
                                            {this.loadChecklistItems()}
                                        </Form.Control>
                                    );
                            }
                        } else {
                            row.push(<Form.Control id={keys[1]+"-"+this.props.id} placeholder="--Checklist Item--" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}/>);
                        }
                        break;
                    }
                    case "type.5": {
                        if (this.props.loaded_checklists) {
                            row.push(
                                    <Form.Control id={keys[1]+"-"+this.props.id} as="select" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}>
                                        {this.loadChecklistASI()}
                                    </Form.Control>
                                );
                        } else {
                            row.push(<Form.Control id={keys[1]+"-"+this.props.id} placeholder="--ASI Group Code--" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}/>);
                        }
                        break;
                    }
                    case "type.6": {
                        if (this.props.loaded_asis) {
                            row.push(
                                    <Form.Control id={keys[1]+"-"+this.props.id} as="select" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}>
                                        {this.loadASISubs()}
                                    </Form.Control>
                                );
                        } else {
                            row.push(<Form.Control id={keys[1]+"-"+this.props.id} placeholder="--ASI Group--" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}/>);
                        }
                        break;
                    }
                    case "type.7": {
                        if (this.props.loaded_asis) {
                            row.push(
                                    <Form.Control id={keys[1]+"-"+this.props.id} as="select" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}>
                                        {this.loadASIFields()}
                                    </Form.Control>
                                );
                        } else {
                            row.push(<Form.Control id={keys[1]+"-"+this.props.id} placeholder="--ASI Field--" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}/>);
                        }
                        break;
                    }
                    default: row.push(<Form.Control id={keys[1]+"-"+this.props.id} placeholder="--Type--" onChange={this.handleChange} key={newId} value={this.props.conditions[this.props.id][keys[1]] ? this.props.conditions[this.props.id][keys[1]] : ""}/>);
                }
            }
        }

        console.log(levelValue);

        //Check if you should go to the next level
        if (levelValue) {
            if (levelValue.split(".")[0] === "type") {
                if (!this.props.conditions[this.props.id][levelValue]) return row;
            }
            this.generateX(map[levelValue], level + 1, levelValue, row);
        }
        return row;
    }

    generateCompTypes = () => {
        let types = [""].concat(Object.keys(condit_data.condit_data.comparison_types));

        if (this.props.conditions[this.props.id].portlet === "ACA Document Name") {
            types = _.remove(types, t => {
                return (["","Attached","Not Attached"].includes(t));
            });
        } else {
            types = _.remove(types, t => {
                return (!["Attached","Not Attached"].includes(t));
            });
        }
        types.sort();

        types = types.map(t => {
            return <option key={t} label={t} value={condit_data.condit_data.comparison_types[t]}/>
        });
        return types;
    }

    isLeaf() {
        if (this.props.id === "1") return false;
        let tree = Object.keys(this.props.conditions);
        let me = _.indexOf(tree,this.props.id);
        tree = tree.map(c => {
            return c.split(".");
        });
        for (let c in tree) {
            if (me === c) continue;
            if (_.isEqual(tree[me], _.initial(tree[c]))) return false;
        }
        return true;
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
            if (this.props.conditions[this.props.id]["type.1"]) {
                return item.code === this.props.conditions[this.props.id]["type.1"];
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
            if (this.props.conditions[this.props.id]["type.1"]) {
                return item.code === this.props.conditions[this.props.id]["type.1"];
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
        if (this.props.conditions[this.props.id]["type.3"] && this.props.loaded_inspections) {
            for (let i in this.props.loaded_inspections) {
                if (this.props.loaded_inspections[i].type === this.props.conditions[this.props.id]["type.3"]) {
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
            if (this.props.conditions[this.props.id]["type.4"]) {
                return item.group === this.props.conditions[this.props.id]["type.4"];
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
            if (this.props.conditions[this.props.id]["type.5"]) {
                return item.code === this.props.conditions[this.props.id]["type.5"];
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
            if (this.props.conditions[this.props.id]["type.6"]) {
                return item.type === this.props.conditions[this.props.id]["type.6"];
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
            <td>
                {this.props.id}
            </td>
            <td>
                <Form.Control id={"portlet-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.genPortlet()}
                </Form.Control>
            </td>
            <td>
                {this.props.conditions[this.props.id].portlet ?
                    <React.Fragment>
                        {this.generateX(variable_map.variable_map[this.props.conditions[this.props.id].portlet], 1, this.props.conditions[this.props.id].portlet, null)}
                    </React.Fragment>
                : <Form.Control as="select"/>}
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
                <button onClick={() => {
                    this.props.addAction(this.props.id);
                }}>
                    + Action
                </button>
            </td>
            <td>
                <button onClick={() => {
                    this.props.addSub(this.props.id);
                }}>
                    + SubCondition
                </button>
            </td>
            { this.isLeaf() ?
            <td>
                <button onClick={() => {
                    this.props.deleteCondition(this.props.id);
                }}>
                    Delete
                </button>
            </td>
            : <td/>}
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    conditions: state.conditions,
    event_type: state.event_type,
    mode: state.mode,
    loaded_asis: state.loaded_data.asis,
    loaded_data: state.loaded_data.caps,
    loaded_id: state.structure.loaded_id,
    loaded_contacts: state.loaded_data.contact_types,
    loaded_docs: state.loaded_data.doc_types,
    loaded_inspections: state.loaded_data.inspections,
    loaded_results: state.loaded_data.inspection_results,
    loaded_checklists: state.loaded_data.checklists
});

const mapDispatchToProps = dispatch => ({
    update: conditions => dispatch({
        type: "update_conditions",
        payload: conditions
    }),
    addAction: id => dispatch({
        type: "add_condit_action",
        payload: id
    }),
    addSub: id => dispatch({
        type: "add_condit_sub",
        payload: id
    }),
    deleteCondition: id => dispatch({
        type: "delete_condition",
        payload: id
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CONDIT_Item);

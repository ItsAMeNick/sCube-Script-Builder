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

        //Clear some things
        newConditions[this.props.id].comparison_x = null;

        let type = event.target.id.split("-")[0];
        newConditions[this.props.id][type] = event.target.value;

        if (this.props.conditions[this.props.id].portlet === "ACA Document Name") {
            document.getElementById("comparison_y-"+this.props.id).readOnly = true;
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

        //Do the map clearing
        level++;
        while (newConditions[this.props.id]["x."+level]) {
            delete newConditions[this.props.id]["x."+level];
            level++;
        }

        this.props.update({
            conditions: newConditions
        });
        this.forceUpdate();
    };

    addX(text) {
        let newConditions = this.props.conditions;
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
            if (this.props.conditions[this.props.id].type) {
                let newText = map.script;
                newText = newText.replace("^$*$^", this.props.conditions[this.props.id].type);
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
        } else if (keys[1] === "type") {
            levelValue = "type";
        }

        if (keys[1] !== "free" && keys[1] !== "type") {
            let c = 0;
            row.push(<Form.Control key={newId} id={newId} as="select" value={levelValue} onChange={this.handleChange}>
                {keys.map((k) => {
                    c++;
                    return <option key={c} label={k} value={k}/>;
                })}
            </Form.Control>);
        } else if (keys[1] === "free") {
            row.push(<Form.Control id={"free"} onChange={this.handleChange} key={newId}/>);
        } else if (keys[1] === "type") {
            row.push(<Form.Control id={"type"} placeholder="Type" onChange={this.handleChange} key={newId}/>);
        }

        //Check if you should go to the next level
        if (levelValue) {
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
            // console.log(tree[me]);
            // console.log(tree[c]);
            // console.log(_.initial(tree[c]));
            // console.log("-----------------");
            if (_.isEqual(tree[me], _.initial(tree[c]))) return false;
        }
        return true;
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
    mode: state.mode
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
